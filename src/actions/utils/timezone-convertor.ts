"use server";

export const tzConvertor = async (date: Date) => {
  const timeZoneOffset = date.getTimezoneOffset();
  const utcHours = date.getUTCHours();
  // add one day , if timezone offset is negative
  if (timeZoneOffset < 0 && utcHours !== 0) {
    date.setDate(date.getDate() + 1);
  }

  // reset UTC date
  date.setUTCHours(0, 0, 0, 0);

  return date;
};
