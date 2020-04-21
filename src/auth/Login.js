import React from 'react';
import {useForm, useStore} from '../vlib/hooks'

const initialState = {phone_number: '', password: ''}
const Login = () => {
  const {auth} = useStore()
  const {values, errors, change} = useForm(initialState)
  const {phone_number, password} = values

  const onSubmit = () => auth.login(values)
  const onChange = (e) => change(e.target)

  return (
    <div>
      <label htmlFor="phone_number">Phone number</label>
      <input name='phone_number' type='text' onChange={onChange} value={phone_number} />
      <label htmlFor="password">Password</label>
      <input name='password' type='password' onChange={onChange} value={password} />
      <button disabled={errors} onClick={onSubmit}>Sumbit</button>
    </div>
  )
};

export default Login;
