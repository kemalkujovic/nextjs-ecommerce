const moment = require("moment/moment");

const formatDate = (date: string) => {
  return moment(date).format("DD/MM/YYYY");
};

export default formatDate;

export const sortByDate = <T,>(data: T[]): T[] => {
  return data.sort((a: any, b: any) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
};
