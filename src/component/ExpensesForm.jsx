import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUpdatedCurrency, updateExpenseAction } from '../actions';
import './ExpensesForm.css';

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

  // Utilização do componentDidUpdate para adicionar valores do input para edição proveniente da mentoria com Summer de Instrução Luá Octaviano
  componentDidUpdate() {
    this.updateFormComponent();
  }

  updateFormComponent = () => {
    const { editData, editState, updateWalletState } = this.props;
    if (editState) {
      const { value, description, currency, method, tag } = editData;
      this.setState({
        value,
        description,
        currency,
        method,
        tag,
      }, () => updateWalletState());
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClickAdd = async () => {
    const { saveExpense, expenses } = this.props;
    // Utilização da lógica de id único proveniente da mentoria com Especialista Gabriel Espindola
    let id = 0;
    if (expenses.length > 0) {
      const lastElement = expenses[expenses.length - 1];
      id = lastElement.id + 1;
    }
    saveExpense({ ...this.state, id });
    this.setState(INICIAL_STATE);
  }

  handleClickEdit = async () => {
    const {
      updateExpense,
      expenses,
      editData,
      cleanWalletState,
    } = this.props;
    const { id } = editData;
    const expenseToEdit = expenses.filter((expense) => expense.id === id)[0];
    const data = { ...expenseToEdit, ...this.state };
    updateExpense(id, data);
    cleanWalletState();
    this.setState(INICIAL_STATE);
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currenciesOptions, editData } = this.props;
    return (
      <section className="expense-form-container">
        <form className="form-group">
          <label htmlFor="description">
            Descrição
            <input
              className="form-control"
              data-testid="description-input"
              type="text"
              name="description"
              value={ description }
              onChange={ this.handleChange }
              id="description"
            />
          </label>
          <label htmlFor="value">
            Valor
            <input
              className="form-control"
              data-testid="value-input"
              placeholder="valor"
              type="number"
              max={ 1000000 }
              name="value"
              value={ value }
              onChange={ this.handleChange }
              id="value"
            />
          </label>
          <label htmlFor="currency">
            Moeda
            <select
              className="form-control"
              data-testid="currency-input"
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
            Pagamento
            <select
              className="form-control"
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
            Categoria
            <select
              className="form-control"
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
        <aside>
          {('id' in editData) ? (
            <button
              className="btn btn-danger"
              type="button"
              onClick={ this.handleClickEdit }
            >
              Editar despesa
            </button>
          ) : (
            <button
              className="btn btn-primary"
              type="button"
              onClick={ this.handleClickAdd }
            >
              Adicionar despesa
            </button>
          )}
        </aside>
      </section>
    );
  }
}

ExpensesForm.propTypes = {
  currenciesOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  saveExpense: PropTypes.func.isRequired,
  updateWalletState: PropTypes.func.isRequired,
  updateExpense: PropTypes.func.isRequired,
  cleanWalletState: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  editData: PropTypes.shape({
    currency: PropTypes.string,
    description: PropTypes.string,
    exchangeRates: PropTypes.objectOf(PropTypes.object.isRequired),
    id: PropTypes.number,
    method: PropTypes.string,
    tag: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
  editState: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  currenciesOptions: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpense: (payload) => dispatch(fetchUpdatedCurrency(payload)),
  updateExpense: (id, data) => dispatch(updateExpenseAction(id, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
