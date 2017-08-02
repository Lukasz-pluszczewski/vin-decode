import { expect } from 'chai';
import vinDecoder from '../src/index';

const correctVins = {
  toyota: '1NXBR32E77Z923602',
  ford: 'WF0PXXGCDP8K23759',
};

describe('vin-decoder', () => {
  it('should invalidate bad VINs', () => {
    expect(vinDecoder('blahblahblah')).to.be.equal(false);
  });
  it('should split VIN into it\'s parts', () => {
    expect(vinDecoder(correctVins.ford).split()).to.be.deep.equal({
      country: 'WF',
      manufacturer: 'WF0',
      details: 'PXXGC',
      securityCode: 'D',
      year: 'P',
      assemblyPlant: '8',
      serialNumber: 'K23759',
    });
    expect(vinDecoder(correctVins.toyota).split()).to.be.deep.equal({
      country: '1N',
      manufacturer: '1NX',
      details: 'BR32E',
      securityCode: '7',
      year: '7',
      assemblyPlant: 'Z',
      serialNumber: '923602',
    });
  });
  it('should decode country and manufacturer', () => {
    expect(vinDecoder(correctVins.ford).decode()).to.be.deep.equal({
      country: 'Germany',
      manufacturer: 'Ford Germany',
      details: 'PXXGC',
      securityCode: 'D',
      possibleYears: [1993],
      year: 1993,
      assemblyPlant: '8',
      serialNumber: 'K23759',
    });
    expect(vinDecoder(correctVins.toyota).decode()).to.be.deep.equal({
      country: 'United States',
      manufacturer: 'NUMMI USA',
      details: 'BR32E',
      securityCode: '7',
      possibleYears: [2007],
      year: 2007,
      assemblyPlant: 'Z',
      serialNumber: '923602',
    });
  });
});
