import { SAVE_USER } from '../actions/index';

const INICIAL_STATE = {
  email: '',
  password: '',
};

const user = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_USER:
    return {
      ...state,
      ...action.payload,
    };
  default: return state;
  }
};

export default user;
