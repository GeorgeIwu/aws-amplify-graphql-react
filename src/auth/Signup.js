import React from 'react';
import { useStore, useForm } from '../_lib/hooks';

const Signup = () => {
  const {signup} = useStore().auth

  const {values, errors, change} = useForm({email: '', family_name: '', given_name: '', phone_number: '', password: ''})
  const {given_name, family_name, phone_number, email, password, nickname} = values

  const onSubmit = async () => signup(values)
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
      <label htmlFor="nickname">Type</label>
      <input name='nickname' type='text' onChange={onChange} value={nickname} />
      <label htmlFor="password">Password</label>
      <input name='password' type='password' onChange={onChange} value={password} />
      <button disabled={errors} onClick={onSubmit}>Sumbit</button>
    </div>
  )
};

export default Signup;
