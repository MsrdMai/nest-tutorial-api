import { Injectable } from '@nestjs/common';

@Injectable()
export class MyDateHelper {
  timestampToDate(timestamp: number) {
    return new Date(timestamp * 1000);
  }

  convertDateStringToDate(datestr: string) {
    // return moment(date, 'DD/MM/YYYY');
    const datesplit = datestr.includes('/') ? datestr.split('/') : datestr;

    if (datesplit.length === 3) {
      const date = Number(datesplit[0]);
      const month = Number(datesplit[1]);
      const year = Number(datesplit[2]);
      return new Date(year, month - 1, date);
    }

    return null;
  }

  convertDateFromDB(datestr: string) {
    const datesplit = datestr.includes('/') ? datestr.split('/') : datestr;

    if (datesplit.length === 3) {
      const date = Number(datesplit[1]);
      const month = Number(datesplit[0]);
      const year = Number(datesplit[2]);
      const newDate = new Date(year, month - 1, date);
      const respDate = newDate.toLocaleDateString();
      return respDate;
    }

    return null;
  }
}
