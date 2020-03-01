import { isInRadius } from '../helpers/LocationHelper';

import chai from 'chai';

const expect = chai.expect;

const result1 = isInRadius(37.774929, -122.419418, 300, 37.975380, -122.561813);
const result2 = isInRadius(37.774929, -122.419418, 5, 37.975380, -122.561813);

describe('isInRadius', () => {
  it('Correctly identifies inside radius', () => {
    expect(result1).to.be.true;
  });

  it('Correctly identifies outside of radius', () => {
    expect(result2).to.be.false;
  })
});
