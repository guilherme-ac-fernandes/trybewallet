import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveUserAction } from '../actions';
import './Login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { email, password } = this.state;
      const passwordMinimalLength = 6;
      const validation = {
        // Resolução da verificação proveniente do projeto Tryunfo do mesmo autor
        // sourse: https://github.com/tryber/sd-020-b-project-trybetunes/pull/33/files
        email: (!!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)),
        password: password.length >= passwordMinimalLength,
      };
      this.setState({
        isDisabled: !Object.values(validation).every((test) => test === true),
      });
    });
  }

  handleClick = () => {
    const { history, saveUser } = this.props;
    const { email, password } = this.state;
    saveUser({ email, password });
    history.push('/carteira');
  }

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <section className="login-section">
        <div className="login-container">
          <h3>TrybeWallet</h3>
          <form className="form-group login-form">
            <label htmlFor="email">
              Email
              <input
                className="form-control"
                data-testid="email-input"
                type="email"
                name="email"
                value={ email }
                onChange={ this.handleChange }
                id="email"
              />
            </label>
            <label htmlFor="password">
              Senha
              <input
                className="form-control"
                data-testid="password-input"
                type="password"
                name="password"
                value={ password }
                onChange={ this.handleChange }
                id="password"
              />
            </label>
            <button
              className="btn btn-success"
              type="button"
              disabled={ isDisabled }
              onClick={ this.handleClick }
            >
              Entrar
            </button>
          </form>
        </div>
      </section>
    );
  }
}

Login.propTypes = {
  saveUser: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveUser: (payload) => dispatch(saveUserAction(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
