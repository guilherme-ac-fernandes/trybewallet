import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUpdatedCurrency } from '../actions';

const INICIAL_STATE = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class ExpensesForm extends React.Component {
  constructor() {
    super();
    this.state = INICIAL_STATE;
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick = async () => {
    const { saveExpense, expenses } = this.props;
    // Utilização da lógica de id único proveniente da mentoria com Especialista Gabriel Espindola
    let id = 0;
    if (expenses.length > 0) {
      const lastElement = expenses[expenses.length - 1];
      id = lastElement.id + 1;
    }
    saveExpense({ ...this.state, id });
    this.setState({ ...INICIAL_STATE });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currenciesOptions } = this.props;
    return (
      <form>

        <label htmlFor="value">
          Valor:
          <input
            data-testid="value-input"
            type="number"
            name="value"
            value={ value }
            onChange={ this.handleChange }
            id="value"
          />
        </label>

        <label htmlFor="description">
          Descrição:
          <input
            data-testid="description-input"
            type="text"
            name="description"
            value={ description }
            onChange={ this.handleChange }
            id="description"
          />
        </label>

        <label htmlFor="currency">
          Moeda:
          <select
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
            id="currency"
          >
            {currenciesOptions
              .map((coin) => <option key={ coin }>{coin}</option>)}
          </select>
        </label>

        <label htmlFor="method">
          Método de Pagamento:
          <select
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ this.handleChange }
            id="method"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag">
          Método de Pagamento:
          <select
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
            id="tag"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>

        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

ExpensesForm.propTypes = {
  currenciesOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  saveExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

const mapStateToProps = (state) => ({
  currenciesOptions: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpense: (payload) => dispatch(fetchUpdatedCurrency(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
