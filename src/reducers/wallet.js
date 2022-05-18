const INICIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case '':
    return state;
  default: return state;
  }
};

export default wallet;
