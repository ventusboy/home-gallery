const through2 = require('through2');
const debug = require('debug')('storage:map:media');

function getEntryMetaByKey(entry, key) {
  if (!entry.meta) {
    debug(`Meta data is missing for ${entry.filename}`);
    return false;
  } else if (entry.meta[key]) {
    return entry.meta[key];
  } else if (entry.sidecars.length) {
    for (let i = 0; i < entry.sidecars; i++) {
      if (!entry.sidecars[i].meta) {
        debug(`Missing meta data of sidecar ${entry.sidecars[i].filename}`);
      }
      if (entry.sidecars[i].meta && entry.sidecars[i].meta[key]) {
        return entry.sidecars[i].meta[key];
      }
    }
  }
  return false;
}

function useExif(entry) {
  const exifMeta = getEntryMetaByKey(entry, 'exif');
  if (!exifMeta) {
    return {};
  }

  // '0000:00:00 00:00:00' => false
  // {tzoffsetMinutes: 120, rawValue: '2004:10:19 10:34:17'} => '2004-10-19T10:34:17+02:00'
  function parseExiftoolDate(date) {
    let value = date.rawValue ? date.rawValue : date;
    if (typeof value !== 'string' || value.length < 10 || value.startsWith('0000')) {
      return false;
    }
    
    const match = value.match(/(\d{4}).(\d{2}).(\d{2}).(\d{2}).(\d{2}).(\d{2})(\.\d+)?(([-+](\d{2}:\d{2}|\d{4}))|Z)?\s*$/);
    if (!match) {
      debug(`Unknown time format ${value} of ${JSON.stringify(date)}`);
      return false;
    }

    let iso8601 = `${match[1]}-${match[2]}-${match[3]}T${match[4]}:${match[5]}:${match[6]}${match[7] ? match[7] : ''}`;
    if (date.tzoffsetMinutes && !match[8]) {
      const offset = Math.abs(date.tzoffsetMinutes);
      const negative = date.tzoffsetMinutes < 0;
      const hour = '' + (offset / 60).toFixed();
      const minute = '' + (offset % 60);
      const offsetText = (negative ? '-' : '+') + hour.padStart(2, '0') + ':' + minute.padStart(2, '0');
      iso8601 += offsetText;
    } else if (match[8]) {
      iso8601 += match[8];
    }
    
    try {
      return new Date(iso8601).toISOString();
    } catch(e) {
      debug(`Could not create valid ISO8601 date '${iso8601}' from '${JSON.stringify(date)}': ${e}`); 
      return false;
    }
  }

  function getExifDate(exifMeta) {
    let date = false;
    if (exifMeta.GPSDateTime) {
      date = parseExiftoolDate(exifMeta.GPSDateTime);
    }
    if (!date && exifMeta.SubSecDateTimeOriginal) {
      date = parseExiftoolDate(exifMeta.SubSecDateTimeOriginal);
    }
    if (!date && exifMeta.CreateDate) {
      date = parseExiftoolDate(exifMeta.CreateDate);
    }
    return date;
  }

  function getFractionNumber(prop) {
    let result = {};
    if (!exifMeta[prop]) {
      return result;
    } 
    result[`${prop}Raw`] = exifMeta[prop];
    const match = exifMeta[prop].toString().match(/^(\d+)\/(\d+)$/);
    if (match) {
      result[`${prop}Vaule`] = (+match[1] / +match[2]);
      result[`${prop}Numerator`] = +match[1];
      result[`${prop}Divider`] = +match[2];
    } else if (typeof exifMeta[prop] === 'number') {
      result[`${prop}Value`] = exifMeta[prop];
    } 
    result[`${prop}Value`] = +exifMeta[prop];
  }

  function getExposerTime() {
    return getFractionNumber('ExposerTime');  
  }

  function getShutterSpeed() {
    return getFractionNumber('ShutterSpeed');  
  }

  const exifDate = getExifDate(exifMeta);
  const date = exifDate ? exifDate : entry.date;

  let width = exifMeta.ImageWidth;
  let height = exifMeta.ImageHeight;
  if (exifMeta.Orientation >= 5) {
    width = exifMeta.ImageHeight;
    height = exifMeta.ImageWidth;
  }

  return Object.assign({
    date,
    year: +date.substr(0, 4),
    month: +date.substr(5, 2),
    day: +date.substr(8, 2),
    tz: exifMeta.tz,
    width: width,
    height: height,
    orientation: exifMeta.Orientation,
    duration: exifMeta.MediaDuration || 0,
    make: exifMeta.Make || 'unknown',
    model: exifMeta.Model || 'unknown',
    iso: exifMeta.ISO,
    aperture: exifMeta.ApertureValue,
    exposureMode: exifMeta.ExposureMode,
    focalLength: exifMeta.FocalLength ? +(exifMeta.FocalLength.replace(' mm', '')) : -1,
    focalLength33mm: exifMeta.FocalLengthIn35mmFormat ? +(exifMeta.FocalLengthIn35mmFormat.replace(' mm', '')) : -1,
    orientation: exifMeta.Orientation || 1,
    latitude: exifMeta.GPSLatitude || 0,
    longitude: exifMeta.GPSLongitude || 0,
    altitude: exifMeta.GPSAltitude || 0,
    whiteBalance: exifMeta.WhiteBalance
  }, getExposerTime(), getShutterSpeed())
}

const mapMedia = through2.obj(function (entry, enc, cb) {
  const allStorageFiles = [entry.files]
    .concat(entry.sidecars.map(sidecar => sidecar.files))
    .reduce((r, a) => { a.forEach(v => r.push(v)); return r}, []);

  const mapFile = ({sha1sum, type, size, filename}) => { return { id: sha1sum, type, size, filename }; }

  let exifData = {};
  try {
    exifData = useExif(entry);
  } catch (e) {
    debug(`Could not extract exif data from ${entry.filename}:${entry.sha1sum}: ${e} ${JSON.stringify(entry)}`);
  }

  let geoInfo = {};
  const geoReverse = getEntryMetaByKey(entry, 'geoReverse');
  if (geoReverse) {
    ['lat', 'lon', 'addresstype'].forEach(key => geoInfo[key] = geoReverse[key]);
    ['country', 'state', 'city', 'road', 'house_number' ].forEach(key => {
      if (geoReverse.address[key]) {
        geoInfo[key] = geoReverse.address[key];
      }
    });
  }

  const media = Object.assign({
    id: entry.sha1sum,
    type: entry.type,
    date: entry.date,
    files: [mapFile(entry)].concat(entry.sidecars.map(mapFile)),
    previews: allStorageFiles.filter(file => file.match(/-preview/))
  }, exifData, geoInfo)

  this.push(media);
  cb();
});

module.exports = mapMedia;