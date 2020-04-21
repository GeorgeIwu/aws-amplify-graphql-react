import React from 'react';
import { useStore } from '../Store';
import {useForm} from '../_lib/hooks'

const initialState = {phone_number: '', password: ''}
const useFormWithStore = (initialState) => {
  const {actions} = useStore()
  const formProps = useForm(initialState)

  return {
    ...formProps,
    actions
  }
}

const Login = () => {
  const {values, errors, change, actions} = useFormWithStore(initialState)
  const {phone_number, password} = values

  const onSubmit = () => actions.login(values)
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
