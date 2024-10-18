export function formateDate(date: string) {
  const dateObject = new Date(date);
  return dateObject.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
