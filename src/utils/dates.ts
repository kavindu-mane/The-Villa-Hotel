// get 1 months from now
export const oneMonthFromNow = () => {
  const lastDay = new Date();
  lastDay.setMonth(lastDay.getMonth() + 1);
  return lastDay;
};

// get tomorrow date
export const tomorrow = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
};

// get yesterday date
export const yesterday = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday;
};
