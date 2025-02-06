import axios, {AxiosInstance, AxiosResponse, AxiosError} from 'axios';
import {StatusCodes} from 'http-status-codes';
import {getToken} from './token';
import {toast} from 'react-toastify';

type DetailMessageType = {
  details: { messages: string[] }[];
  type: string;
  message: string;
}
const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true
};
const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

const BACKEND_URL = 'https://15.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL as string,
    timeout: REQUEST_TIMEOUT as number,
  });

  api.interceptors.request.use(
    (config) => {
      const token = getToken();

      if (token && (config.headers)) {
        config.headers['X-Token'] = token;
      }
      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      if (error.response && shouldDisplayError(error.response)) {
        const detailMessage = (error.response.data);
        let message = '';
        if (detailMessage.details.length > 0) {
          message = detailMessage.details[0].messages.join(' ');
        } else {
          message = detailMessage.message;
        }
        toast.warn(message);
      }
      throw error;
    }
  );

  return api;
};
