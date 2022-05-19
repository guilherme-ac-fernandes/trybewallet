import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchCurrency from '../actions';
import ExpensesForm from '../component/ExpensesForm';
import Table from '../component/Table';

class Wallet extends React.Component {
  componentDidMount() {
    const { apiRequestCurrency } = this.props;
    apiRequestCurrency();
  }

  render() {
    const { userEmail, expenses } = this.props;
    const total = expenses.reduce((acc, curr) => {
      const { currency } = curr;
      const price = Number(curr.exchangeRates[currency].ask);
      const valueCurr = Number(curr.value) * price;
      acc += valueCurr;
      return acc;
    }, 0);
    return (
      <div>
        TrybeWallet
        <header>
          <h4 data-testid="email-field">{ userEmail }</h4>
          <p data-testid="total-field">{ total.toFixed(2) }</p>
          <span data-testid="header-currency-field">BRL</span>
        </header>
        <ExpensesForm />
        <Table />
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
