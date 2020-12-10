import { getLocaleWeekdays } from '..';

describe('getLocaleWeekdays tests:', () => {
  test('should return list of weekdays in expected format', () => {
    // note: without further action toLocaleString always returns "en" in node env
    expect(getLocaleWeekdays('en')).toEqual([
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ]);
    expect(getLocaleWeekdays('en', 'short')).toEqual(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
    expect(getLocaleWeekdays('en', 'narrow')).toEqual(['M', 'T', 'W', 'T', 'F', 'S', 'S']);
  });
});
