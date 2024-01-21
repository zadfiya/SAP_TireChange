export const dollar = (number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumSignificantDigits: Math.trunc(Math.abs(number)).toFixed().length,
  }).format(number);
};

export function parseDateString(dateString) {
  var d = new Date(dateString);
  d.setHours(d.getHours() + 5);
  //   d.setMinutes(d.getMinutes() + 30);
  // Note: JavaScript months are 0-indexed, so we subtract 1 from the month
  return d.toISOString();
}
