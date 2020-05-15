import { isInRadius } from '../helpers/LocationHelper';

import chai from 'chai';

const expect = chai.expect;

const userLoc = {
  LAT: 37.774929,
  LONG: -122.419418,
};

const eventLoc = {
  LAT: 37.975380,
  LONG: -122.561813,
};

const result1 = isInRadius(userLoc, 300, eventLoc);
const result2 = isInRadius(userLoc, 5, eventLoc);

describe('isInRadius', () => {
  it('Correctly identifies inside radius', () => {
    expect(result1).to.be.true;
  });

  it('Correctly identifies outside of radius', () => {
    expect(result2).to.be.false;
  })
});
