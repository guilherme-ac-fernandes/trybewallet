import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchCurrency from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    console.log('to aqui');
    const { apiRequestCurrency } = this.props;
    apiRequestCurrency();
  }

  render() {
    const { userEmail } = this.props;
    return (
      <div>
        TrybeWallet
        <header>
          <h4 data-testid="email-field">{ userEmail }</h4>
          <p data-testid="total-field">0</p>
          <span data-testid="header-currency-field">BRL</span>
        </header>
      </div>
    );
  }
}

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  apiRequestCurrency: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  apiRequestCurrency: (payload) => dispatch(fetchCurrency(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
