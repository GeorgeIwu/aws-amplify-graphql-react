import React, { useState } from 'react';
import AddTask from './ChatMembers'

const Task = ({task, onEdit, onDelete}) => {
  const [isEditing, setIsEditing] = useState(false)

  const toggleEdit = () => {
    setIsEditing(!isEditing)
  }

  const handleDelete = () => {
    onDelete(task)
  }

  const handleSave = (item) => {
    onEdit(item)
    toggleEdit()
  }

  return (
    <div>
      {isEditing
        ? <AddTask onAdd={handleSave} initialValues={task}/>
        : <div>
            <div>
              {task.name}
            </div>
            <button onClick={handleDelete}>Remove</button>
          </div>}
      <button onClick={toggleEdit}>{isEditing ? 'Cancel' : 'Edit'}</button>
    </div>
  )
};

export default Task;
