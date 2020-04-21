import React from 'react';
import { useStore } from '../Store';
import {useForm} from '../_lib/hooks'

const initialState = {code: '', phone_number: ''}
const useFormWithStore = (initialState) => {
  const {actions} = useStore()
  const formProps = useForm(initialState)

  return {
    ...formProps,
    actions
  }
}

const Verify = () => {
  const {values, errors, change, actions} = useFormWithStore(initialState)
  const {phone_number, code} = values

  const onSubmit = () => actions.verify(values)
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
