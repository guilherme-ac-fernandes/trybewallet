import {
  REQUEST_CURRENCY,
  REQUEST_CURRENCY_SUCESS,
  REQUEST_CURRENCY_FAILED,
  SAVE_EXPENSE,
  SAVE_ERROR,
} from '../actions/index';

const INICIAL_STATE = {
  currencies: [],
  expenses: [],
  errorAPI: '',
  loadingAPI: false,
  errorAPICurrent: '',
};

const wallet = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCY:
    return { ...state, loadingAPI: true };
  case REQUEST_CURRENCY_SUCESS:
    return {
      ...state,
      loadingAPI: false,
      currencies: Object.keys(action.data).filter((currency) => currency !== 'USDT'),
    };
  case REQUEST_CURRENCY_FAILED:
    return {
      ...state,
      loadingAPI: false,
      errorAPI: action.error,
    };
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case SAVE_ERROR:
    return { ...state, errorAPICurrent: action.error };
  default: return state;
  }
};

export default wallet;
