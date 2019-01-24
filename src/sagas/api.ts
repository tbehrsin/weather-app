
import querystring from "querystring";
import { put, takeEvery } from "redux-saga/effects";

import * as actions from "../actions";
import * as constants from "../constants";

function* request(action: actions.api.IRequestStart) {
  const { key, options: { method = "GET", url, query = null, bodyParser = (body: any) => body } } = action;

  try {
    const qs = querystring.stringify(query);

    const response = yield fetch(`${url}${qs ? `?${qs}` : ""}`, {
      method,
    });

    if (!response.ok) {
      throw new Error("request failed");
    }

    const json = yield response.json();
    const responseBody = bodyParser(json);

    yield put(actions.api.response(key, responseBody));
  } catch (error) {
    yield put(actions.api.error(key, error));
  }
}

export function* watchRequestStart() {
  yield takeEvery(constants.api.REQUEST_START, request);
}
