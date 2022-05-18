// Types
export const SAVE_USER = 'SAVE_USER';
export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
export const REQUEST_CURRENCY_SUCESS = 'REQUEST_CURRENCY_SUCESS';
export const REQUEST_CURRENCY_FAILED = 'REQUEST_CURRENCY_FAILED';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const SAVE_ERROR = 'SAVE_ERROR';

// Actions
export const saveUserAction = (payload) => ({ type: SAVE_USER, payload });

const requestCurrency = () => ({ type: REQUEST_CURRENCY });
const requestCurrencySucess = (data) => ({ type: REQUEST_CURRENCY_SUCESS, data });
const requestCurrencyFailed = (error) => ({ type: REQUEST_CURRENCY_FAILED, error });

export const saveExpenseAction = (payload) => ({ type: SAVE_EXPENSE, payload });
export const saveErrorAction = (error) => ({ type: SAVE_ERROR, error });

// Action Request API
// export const fetchUpdatedCurrency = async () => {
//   const APIURL = 'https://economia.awesomeapi.com.br/json/all';
//   const response = await fetch(APIURL);
//   const data = await response.json();
//   // Utilização do delete proveniente do suporte do Especialista Gabriel Espindola
//   delete data.USDT;
//   return data;
// };

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
      dispatch(saveErrorAction(error));
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
