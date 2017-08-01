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
  SERIAL_NUMBER_START: 11
};

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
}
const decodeCountry = code => {
  const result = find(countries, code);
  return result ? result.name : result;
}

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
