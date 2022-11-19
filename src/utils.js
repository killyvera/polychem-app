export const checkIfExpireToday = (d) => {
  return new Date(d).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);
};
export const checkIfExpireNextWorkingDay = (d) => {
  let date = new Date();
  let day = date.getDay();
  let add = 1;
  if (day === 6) add = 2;
  date.setDate(date.getDate() + add);
  return date.setHours(0, 0, 0, 0) === new Date(d).setHours(0, 0, 0, 0);
};
