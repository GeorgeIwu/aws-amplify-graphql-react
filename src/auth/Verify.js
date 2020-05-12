import React from 'react';
import { useStore, useForm } from '../_lib/hooks';

const Verify = () => {
  const {verify} = useStore().auth

  const {values, errors, change} = useForm({code: '', phone_number: ''})
  const {phone_number, code} = values

  const onSubmit = () => verify(values)
  const onChange = (e) => change(e.target)

  return (
    <div>
      <label htmlFor="phone_number">Phone number</label>
      <input name='phone_number' type='text' onChange={onChange} value={phone_number} />
      <label htmlFor="code">Verification Code</label>
      <input name='code' type='text' onChange={onChange} value={code} />
      <button disabled={errors} onClick={onSubmit}>Sumbit</button>
    </div>
  )
};

export default Verify;
