import React from 'react';
import { useStore } from '../Store';
import {useForm} from '../_lib/hooks'

const initialState = {
  email: '',
  family_name: '',
  given_name: '',
  phone_number: '',
  password: ''
}

const useFormWithStore = (initialState) => {
  const {actions} = useStore()
  const formProps = useForm(initialState)

  return {
    ...formProps,
    actions
  }
}

const Signup = () => {
  const {values, errors, change, actions} = useFormWithStore(initialState)
  const {given_name, family_name, phone_number, email, password} = values

  const onSubmit = async () => actions.signup(values)
  const onChange = (e) => change(e.target)

  return (
    <div>
      <label htmlFor="given_name">First name</label>
      <input name='given_name' type='text' onChange={onChange} value={given_name} />
      <label htmlFor="family_name">Surname</label>
      <input name='family_name' type='text' onChange={onChange} value={family_name} />
      <label htmlFor="email">Email</label>
      <input name='email' type='text' onChange={onChange} value={email} />
      <label htmlFor="phone_number">Phone number</label>
      <input name='phone_number' type='text' onChange={onChange} value={phone_number} />
      <label htmlFor="password">Password</label>
      <input name='password' type='password' onChange={onChange} value={password} />
      <button disabled={errors} onClick={onSubmit}>Sumbit</button>
    </div>
  )
};

export default Signup;
