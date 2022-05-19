import {
  REQUEST_CURRENCY,
  REQUEST_CURRENCY_SUCESS,
  REQUEST_CURRENCY_FAILED,
  SAVE_EXPENSE,
  SAVE_ERROR,
  DELETE_EXPENSE,
  UPDATE_EXPENSE,
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
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.id),
    };
  case UPDATE_EXPENSE:
    // Utilização da map para preservar a imutabilidade do estado proveniente da mentoria com Summer de Instrução Luá Octaviano
    return {
      ...state,
      expenses: state.expenses.map((expense) => {
        if (expense.id === action.id) return action.data;
        return expense;
      }),
    };
  default: return state;
  }
};

export default wallet;
