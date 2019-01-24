
import { createSelector } from "reselect";

import * as constants from "../constants";
import { RootState } from "../store";

export const domain = (state: RootState) => state.api;

export const isPending = createSelector(
  domain,
  (api: any) => (key: string) => !api.getIn(["requests", key, "body"]) && !api.getIn(["requests", key, "error"]),
);

export const isSuccess = createSelector(
  domain,
  (api: any) => (key: string) => !!api.getIn(["requests", key, "body"]),
);

export const isFail = createSelector(
  domain,
  (api: any) => (key: string) => !!api.getIn(["requests", key, "error"]),
);

export const requestKeys = createSelector(
  domain,
  (api: any) => api.get("requests").filter((r: any) => r.get("state") === constants.api.STATE_COMPLETE).keySeq().toJS(),
);

export const body = createSelector(
  domain,
  (api: any) => (key: string) => {
    const b = api.getIn(["requests", key, "body"]);

    if (b) {
      return b.toJS();
    }
  },
);

export const requestState = createSelector(
  domain,
  (api: any) => (key: string) => api.getIn(["requests", key, "state"]),
);

export const requestStateAll = createSelector(
  domain,
  (api: any) => {
    const error = !!api.get("requests").find((r: any) => r.get("state") === constants.api.STATE_ERROR);
    if (error) {
      return constants.api.STATE_ERROR;
    }

    const requesting = !!api.get("requests").find((r: any) => r.get("state") === constants.api.STATE_REQUESTING);
    if (requesting) {
      return constants.api.STATE_REQUESTING;
    }

    return constants.api.STATE_COMPLETE;
  },
);

export const errorAny = createSelector(
  domain,
  (api: any) => {
    const error = api.get("requests").find((r: any) => r.get("state") === constants.api.STATE_ERROR);
    if (error) {
      return error.toJS();
    }
  },
);
