import manufacturers from './data/manufacters';
import countries from './data/countries';
import validate from './validator';

const indexes = {
  MADE_IN_START: 0,
  MADE_IN_END: 2,
  MANUFACTURER_START: 0,
  MANUFACTURER_END: 3,
  DETAILS_START: 3,
  DETAILS_END: 8,
  SECURITY_CODE: 8,
  YEAR: 9,
  ASSEMBLY_PLANT: 10,
  SERIAL_NUMBER_START: 11,
};

const yearCodes = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'J',
  'K',
  'L',
  'M',
  'N',
  'P',
  'R',
  'S',
  'T',
  'V',
  'W',
  'X',
  'Y',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
];

const find = (collection, code) => {
  let result = null;
  collection.forEach(el => {
    if (result) {
      return;
    }
    if (el.code === code) {
      result = el;
    }
  });
  return result;
};

const decodeManufacturer = code => {
  const result = find(manufacturers, code);
  return result ? result.name : result;
};
const decodeCountry = code => {
  const result = find(countries, code);
  return result ? result.name : result;
};
const decodeYear = code => {
  const now = new Date();
  const currentYear = now.getFullYear();

  const yearOffset = yearCodes.indexOf(code);

  if (yearOffset === -1) {
    return [];
  }

  const possibleYears = [
    2010 + yearOffset,
    1980 + yearOffset,
  ];

  if (possibleYears[1] > currentYear) {
    return [possibleYears[1]];
  }
  if (possibleYears[0] > currentYear) {
    return [possibleYears[1]];
  }
  return possibleYears;
};

const vinDecoder = vin => {
  const valid = validate(vin);
  if (!valid) {
    return false;
  }
  const vinDecoderInstance = {
    validate() {
      return valid;
    },
    decode() {
      const values = vinDecoderInstance.split();
      return {
        ...values,
        manufacturer: decodeManufacturer(values.manufacturer),
        country: decodeCountry(values.country),
        possibleYears: decodeYear(values.year),
        year: decodeYear(values.year)[0] || null,
      };
    },
    split() {
      return {
        country: vin.substring(indexes.MADE_IN_START, indexes.MADE_IN_END),
        manufacturer: vin.substring(indexes.MANUFACTURER_START, indexes.MANUFACTURER_END),
        details: vin.substring(indexes.DETAILS_START, indexes.DETAILS_END),
        securityCode: vin.charAt(indexes.SECURITY_CODE),
        year: vin.charAt(indexes.YEAR),
        assemblyPlant: vin.charAt(indexes.ASSEMBLY_PLANT),
        serialNumber: vin.substring(indexes.SERIAL_NUMBER_START),
      };
    },
  };
  return vinDecoderInstance;
};

export default vinDecoder;
