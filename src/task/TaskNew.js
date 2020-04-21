import React from 'react';
import { v4 as uuid } from 'uuid';
import {useForm} from '../vlib/hooks'

const AddTask = ({ onAdd, initialValues = {name: ''} }) => {
  const {values, errors, onChange, onReset} = useForm(initialValues)
  const id = values.id

  const handleAdd = () => {
    const todo = {...values, id: id || uuid()}
    onAdd(todo)
    onReset()
  }

  const handleChange = (e) => {
    onChange({
      id: e.target.id,
      value: e.target.value
    })
  }

  return (
    <div>
      <div>
        <input id='name' type='text' onChange={handleChange} value={values.name}></input>
        <button onClick={handleAdd}>{id ? 'Save' : 'Add'}</button>
      </div>
    </div>
  )
};

export default AddTask;
