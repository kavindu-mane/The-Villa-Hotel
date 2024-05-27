// get 1 months from now
export const oneMonthFromNow = () => {
  const lastDay = new Date();
  lastDay.setMonth(lastDay.getMonth() + 1);
  // reset time to 00:00:00
  lastDay.setHours(0, 0, 0, 0);
  return lastDay;
};

// get tomorrow date
export const tomorrow = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  // reset time to 00:00:00
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow;
};

// get day after tomorrow date
export const dayAfterTomorrow = () => {
  const dayAfterTomorrow = new Date();
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
  // reset time to 00:00:00
  dayAfterTomorrow.setHours(0, 0, 0, 0);
  return dayAfterTomorrow;
};

// get yesterday date
export const yesterday = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  // reset time to 00:00:00
  yesterday.setHours(0, 0, 0, 0);
  return yesterday;
};

// get today date
export const today = () => {
  const today = new Date();
  // reset time to 00:00:00
  today.setHours(0, 0, 0, 0);
  return today;
};
