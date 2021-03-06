import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchCurrency from '../actions';
import ExpensesForm from '../component/ExpensesForm';
import Table from '../component/Table';
import './Wallet.css';

const INICIAL_STATE = {
  editData: {},
  editState: false,
};

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = INICIAL_STATE;
  }

  componentDidMount() {
    const { apiRequestCurrency } = this.props;
    apiRequestCurrency();
  }

  handleEdit = (id) => {
    const { expenses } = this.props;
    const expenseToEdit = expenses.filter((expense) => expense.id === id)[0];
    this.setState({
      editState: true,
      editData: expenseToEdit,
    });
  }

  updateWalletState = () => {
    this.setState({
      editState: false,
    });
  }

  cleanWalletState = () => {
    this.setState(INICIAL_STATE);
  }

  sumTotal = (expenses) => expenses.reduce((acc, curr) => {
    const { currency } = curr;
    const exchange = Number(curr.exchangeRates[currency].ask);
    const price = Number(curr.value) * exchange;
    acc += price;
    return acc;
  }, 0);

  render() {
    const { userEmail, expenses } = this.props;
    const { editData, editState } = this.state;
    const total = this.sumTotal(expenses);
    return (
      <div className="wallet-container">
        <header className="wallet-header">
          <h3>Hello, TrybeWallet!</h3>
          <div className="wallet-header-div">
            <h5 data-testid="email-field">{ userEmail }</h5>
            <div className="btn btn-success" id="wallet-total">
              <span>R$</span>
              <span data-testid="total-field">{ total.toFixed(2) }</span>
              <span
                className="badge badge-light"
                data-testid="header-currency-field"
              >
                BRL
              </span>
            </div>
          </div>
        </header>
        <ExpensesForm
          editData={ editData }
          updateWalletState={ this.updateWalletState }
          cleanWalletState={ this.cleanWalletState }
          editState={ editState }
        />
        <Table handleEdit={ this.handleEdit } />
      </div>
    );
  }
}

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  apiRequestCurrency: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  apiRequestCurrency: (payload) => dispatch(fetchCurrency(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
