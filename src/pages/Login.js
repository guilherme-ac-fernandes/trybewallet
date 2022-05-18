import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveUserAction } from '../actions';

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
      <div>
        Login
        <form>
          <label htmlFor="email">
            Email:
            <input
              data-testid="email-input"
              type="email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
              id="email"
            />
          </label>
          <label htmlFor="password">
            Senha:
            <input
              data-testid="password-input"
              type="password"
              name="password"
              value={ password }
              onChange={ this.handleChange }
              id="password"
            />
          </label>
          <button
            type="button"
            disabled={ isDisabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </div>
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
