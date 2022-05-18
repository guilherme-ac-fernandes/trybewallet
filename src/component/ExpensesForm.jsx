import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ExpensesForm extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      description: '',
      currencies: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { value, description, currencies, method, tag } = this.state;
    const { currenciesOptions } = this.props;
    return (
      <form>

        <label htmlFor="value">
          Valor:
          <input
            data-testid="value-input"
            type="text"
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

        <label htmlFor="currencies">
          Moeda:
          <select
            name="currencies"
            value={ currencies }
            onChange={ this.handleChange }
            id="currencies"
          >
            {currenciesOptions
              .map((currency) => <option key={ currency }>{currency}</option>)}
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

      </form>
    );
  }
}

ExpensesForm.propTypes = {
  currenciesOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  currenciesOptions: state.wallet.currencies,
});

// const mapDispatchToProps = (dispatch) => ({
// });

export default connect(mapStateToProps)(ExpensesForm);
