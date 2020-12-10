/**
 * Returns the difference between two dates in required unit
 * @param {Date} startDate
 * @param {Date} endDate
 * @param {'ms' | 's' | 'm' | 'h' | 'd'} unit
 * @returns {number}
 * @example
 * console.log(getDatesDifference(new Date(2020, 0, 1), new Date(2020, 0, 2), "d")); //output: 1
 */
export const getDatesDifference = (
  startDate: Date,
  endDate: Date,
  unit: 'ms' | 's' | 'm' | 'h' | 'd' = 'ms',
): Number => {
  const utcStartDate = createUTCTimestamp(startDate);
  const utcEndDate = createUTCTimestamp(endDate);

  let diff = utcEndDate - utcStartDate;

  if (unit === 's') diff /= 1000;
  else if (unit === 'm') diff = diff / 1000 / 60;
  else if (unit === 'h') diff = diff / 1000 / 60 / 60;
  else if (unit === 'd') diff = diff / 1000 / 60 / 60 / 24;

  return Math.floor(diff);
};

const createUTCTimestamp = (date: Date): number => {
  return Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds(),
  );
};
