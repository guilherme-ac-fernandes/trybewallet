import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpenseAction } from '../actions';

class Table extends React.Component {
  handleDelete = (id) => {
    const { removeExpense } = this.props;
    removeExpense(id);
  }

  handleEdit = (id) => {
    console.log('edit', id);
  }

  render() {
    const { expenses } = this.props;
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
          {expenses.length > 0 && expenses.map((expense) => {
            const {
              currency,
              id,
              description,
              tag,
              method,
              value,
              exchangeRates,
            } = expense;
            const coin = exchangeRates[currency].name.split('/');
            const exchange = Number(exchangeRates[currency].ask);
            const finalPrice = (Number(value) * exchange).toFixed(2);
            return (
              <tr key={ id }>
                <td>{ description }</td>
                <td>{ tag }</td>
                <td>{ method }</td>
                <td>{ Number(value).toFixed(2) }</td>
                <td>{ coin[0] }</td>
                <td>{ Number(exchange).toFixed(2) }</td>
                <td>{ finalPrice }</td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="edit-btn"
                    type="button"
                    onClick={ () => this.handleEdit(id) }
                  >
                    Editar
                  </button>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => this.handleDelete(id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  removeExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (payload) => dispatch(deleteExpenseAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
