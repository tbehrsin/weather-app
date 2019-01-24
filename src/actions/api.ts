
import * as constants from "../constants";

export interface IRequestStart {
  type: constants.api.REQUEST_START;
  key: string;
  options: IRequestOptions;
}

export interface IRequestError {
  type: constants.api.REQUEST_ERROR;
  key: string;
  error: Error;
}

export interface IRequestEnd {
  type: constants.api.REQUEST_END;
  key: string;
  body: any;
}

export type Action = IRequestStart | IRequestError | IRequestEnd;

export interface IRequestOptions {
  method?: string;
  url: string;
  query?: any;
  body?: any;
  bodyParser?: (body: any) => any;
}

export const request = (key: string, options: IRequestOptions): IRequestStart => ({
  key,
  options,
  type: constants.api.REQUEST_START,
});

export const error = (key: string, e: Error): IRequestError => ({
  error: e,
  key,
  type: constants.api.REQUEST_ERROR,
});

export const response = (key: string, body: any): IRequestEnd => ({
  body,
  key,
  type: constants.api.REQUEST_END,
});
