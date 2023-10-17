export const formatDate = (inputDateString: string) => {
  const date = new Date(inputDateString);

  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear() % 100;

  const formattedDate = `${day}/${month}/${year < 10 ? '0' : ''}${year}`;

  return formattedDate;
};
