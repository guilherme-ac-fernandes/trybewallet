import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpenseAction } from '../actions';
import './Table.css';

class Table extends React.Component {
  handleDelete = (id) => {
    const { removeExpense } = this.props;
    removeExpense(id);
  }

  render() {
    const { expenses, handleEdit } = this.props;
    return (
      <section className="table-container">
        <table className="table table-striped">
          {/* Utilização da tag tbody proveniente de uma issue do GitHub
        (sourse: https://github.com/facebook/react/issues/5652) */}
          <thead>
            <tr className="table-info">
              <th scope="col">Descrição</th>
              <th scope="col">Tag</th>
              <th scope="col">Método de pagamento</th>
              <th scope="col">Valor</th>
              <th scope="col">Moeda</th>
              <th scope="col">Câmbio utilizado</th>
              <th scope="col">Valor convertido</th>
              <th scope="col">Moeda de conversão</th>
              <th scope="col">Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
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
                  <td className="table-button-container">
                    <button
                      className="btn btn-info"
                      data-testid="edit-btn"
                      type="button"
                      onClick={ () => handleEdit(id) }
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-dark"
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
      </section>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  removeExpense: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (payload) => dispatch(deleteExpenseAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
