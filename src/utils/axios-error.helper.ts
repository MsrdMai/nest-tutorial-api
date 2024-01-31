import { AxiosError } from 'axios';

export class AxiosErrorHelper {
  ae: AxiosError;

  constructor(e: AxiosError) {
    this.ae = e;
    this.RespError();
  }

  RespError = () => {
    const msg = (this.ae?.response?.data as any)?.error?.message as string;
    if (msg && msg !== null && msg !== '') {
      throw new Error(msg);
    }
    return this.ae;
  };
}
