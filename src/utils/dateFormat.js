const ParseData = date => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const timeDate = `${day}.${month}.${year} ${hours}:${minutes}`;
  return timeDate;
};
export default ParseData;
