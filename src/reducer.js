import { GRANT_UPDATED } from './actions';
import { EXPIRED_GRANT } from './util/oauth';

const defaultState = {
  auth: {
    grant: EXPIRED_GRANT
  }
};

export default function (state = defaultState, action) {
  let newState = state;

  switch (action.type) {
    case GRANT_UPDATED:
     newState = { ...state, grant: action.payload };
     break;
  }

  return newState;
};
