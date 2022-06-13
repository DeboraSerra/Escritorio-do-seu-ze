import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MyContext } from '../context/Provides';
import style from '../styles/Register.module.css';

const Register = () => {
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    sec_pass: '',
    disabled: true,
    error: false,
    message: '',
  });
  const { error, message } = state;
  const { registerUser } = useContext(MyContext);
  const history = useHistory();

  const handleChange = ({ target: { name, value } }) => {
    setState({
      ...state,
      [name]: value,
    })
  }

  useEffect(() => {
    validateFields();
  }, [state.name, state.email, state.password, state.sec_pass]);

  const validateFields = () => {
    const { name, email, password, sec_pass } = state;
    const isValidEmail = email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);
    const isValidPass = password.match(/\w+\W+/g) && password === sec_pass;
    if (name && isValidEmail && isValidPass) {
      setState({
        ...state,
        disabled: false,
      })
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = state;
    const data = await registerUser({ name, email, password });
    if (data.message === 'User already exists') {
      setState({
        ...state,
        error: true,
        message: data.message,
      });
      return;
    }
    history.push('/');
  }
  return (
    <form onSubmit={ handleSubmit } className={ style.form }>
      <input
        className={ style.input }
        type="text"
        name="name"
        value={ state.name }
        placeholder="Name"
        aria-label="Type your name"
        onChange={ handleChange }
      />
      <input
        type="text"
        className={ style.input }
        name="email"
        value={ state.email }
        placeholder="E-mail"
        aria-label="Type your email"
        onChange={ handleChange }
      />
      <input
        type="password"
        name="password"
        className={ style.input }
        value={ state.password }
        placeholder="Password"
        aria-label="Type your password"
        onChange={ handleChange }
      />
      <input
        type="password"
        className={ style.input }
        name="sec_pass"
        value={ state.sec_pass }
        placeholder="Confirm password"
        aria-label="Type your password again"
        onChange={ handleChange }
      />
      <button
        type="submit"
        className={ style.submitBtn }
        onClick={ handleSubmit }
        disabled={ state.disabled }
      >
        Send
      </button>
      {error && <p className={ style.message }>{message}</p>}
    </form>
  )
}

export default Register;
