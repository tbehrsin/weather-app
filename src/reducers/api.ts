
import { fromJS } from "immutable";

import * as actions from "../actions";
import * as constants from "../constants";

const INITIAL_STATE = {
  requests: {},
};

export default (state = fromJS(INITIAL_STATE), action: actions.api.Action = null) => {
  switch (action.type) {
  case constants.api.REQUEST_START: {
    const { key } = action;
    return state
      .setIn(["requests", key, "state"], constants.api.STATE_REQUESTING)
      .deleteIn(["requests", key, "refresh"]);
  }
  case constants.api.REQUEST_ERROR: {
    const { key, error } = action;
    return state
      .setIn(["requests", key, "error"], fromJS(error))
      .setIn(["requests", key, "state"], constants.api.STATE_ERROR)
      .deleteIn(["requests", key, "refresh"]);
  }
  case constants.api.REQUEST_END: {
    const { key, body } = action;
    return state
      .setIn(["requests", key, "body"], fromJS(body))
      .setIn(["requests", key, "state"], constants.api.STATE_COMPLETE);
  }
  default:
    return state;
  }
};
