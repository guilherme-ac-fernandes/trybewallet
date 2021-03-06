// Types
export const SAVE_USER = 'SAVE_USER';
export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
export const REQUEST_CURRENCY_SUCESS = 'REQUEST_CURRENCY_SUCESS';
export const REQUEST_CURRENCY_FAILED = 'REQUEST_CURRENCY_FAILED';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const SAVE_ERROR = 'SAVE_ERROR';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';

// Actions
export const saveUserAction = (payload) => ({ type: SAVE_USER, payload });
const requestCurrency = () => ({ type: REQUEST_CURRENCY });
const requestCurrencySucess = (data) => ({ type: REQUEST_CURRENCY_SUCESS, data });
const requestCurrencyFailed = (error) => ({ type: REQUEST_CURRENCY_FAILED, error });
const saveExpenseAction = (payload) => ({ type: SAVE_EXPENSE, payload });
const saveExpenseErrorAction = (error) => ({ type: SAVE_ERROR, error });
export const deleteExpenseAction = (id) => ({ type: DELETE_EXPENSE, id });
export const updateExpenseAction = (id, data) => ({ type: UPDATE_EXPENSE, id, data });

// Actions Request API
export const fetchUpdatedCurrency = (payload) => {
  const APIURL = 'https://economia.awesomeapi.com.br/json/all';
  return async (dispatch) => {
    try {
      const response = await fetch(APIURL);
      const exchangeRates = await response.json();
      // Utilização do delete proveniente do suporte do Especialista Gabriel Espindola
      delete exchangeRates.USDT;
      dispatch(saveExpenseAction({ ...payload, exchangeRates }));
    } catch (error) {
      dispatch(saveExpenseErrorAction(error));
    }
  };
};

const fetchCurrency = () => {
  const APIURL = 'https://economia.awesomeapi.com.br/json/all';
  return async (dispatch) => {
    dispatch(requestCurrency());
    return fetch(APIURL)
      .then((response) => response.json())
      .then((data) => dispatch(requestCurrencySucess(data)))
      .catch((error) => dispatch(requestCurrencyFailed(error)));
  };
};

export default fetchCurrency;
