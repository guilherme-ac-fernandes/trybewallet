import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

class Table extends React.Component {
  render() {
    return (
      <table>
        {/* Utilização da tag tbody proveniente de uma issue do GitHub
        (sourse: https://github.com/facebook/react/issues/5652) */}
        <tbody>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </tbody>
      </table>
    );
  }
}

// ExpensesForm.propTypes = {
//   currenciesOptions: PropTypes.arrayOf(PropTypes.sthing).isRequired,
//   saveExpense: PropTypes.func.isRequired,
//   expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
// };

// const mapStateToProps = (state) => ({
//   currenciesOptions: state.wallet.currencies,
//   expenses: state.wallet.expenses,
// });

// const mapDispatchToProps = (dispatch) => ({
//   saveExpense: (payload) => dispatch(fetchUpdatedCurrency(payload)),
// });

export default Table;
