import { getDatesDifference } from '../lib/getDatesDifference';

describe('getDatesDifference tests:', () => {
  const testDate1 = new Date(2020, 0, 1);
  const testDate2 = new Date(2020, 0, 2);
  const testDate3 = new Date(2020, 0, 1, 0, 30);

  test('should calculate the correct difference between two dates in given unit', () => {
    // equal
    expect(getDatesDifference(testDate1, testDate1, 'd')).toEqual(0);
    // milliseconds / day
    expect(getDatesDifference(testDate1, testDate2)).toEqual(86400000);
    // seconds / day
    expect(getDatesDifference(testDate1, testDate2, 's')).toEqual(86400);
    // minutes / day
    expect(getDatesDifference(testDate1, testDate2, 'm')).toEqual(1440);
    // hours / day
    expect(getDatesDifference(testDate1, testDate2, 'h')).toEqual(24);
    // days
    expect(getDatesDifference(testDate1, testDate2, 'd')).toEqual(1);
    // 30 min
    expect(getDatesDifference(testDate1, testDate3, 'm')).toEqual(30);
  });
});
