import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Wallet extends React.Component {
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
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

export default connect(mapStateToProps)(Wallet);
