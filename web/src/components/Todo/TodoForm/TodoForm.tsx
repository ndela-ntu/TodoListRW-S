import type { EditTodoById, UpdateTodoInput } from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  CheckboxField,
  Submit,
} from '@redwoodjs/forms'

type FormTodo = NonNullable<EditTodoById['todo']>

interface TodoFormProps {
  todo?: EditTodoById['todo']
  onSave: (data: UpdateTodoInput, id?: FormTodo['id']) => void
  error: RWGqlError
  loading: boolean
}

const TodoForm = (props: TodoFormProps) => {
  const onSubmit = (data: FormTodo) => {
    props.onSave(data, props?.todo?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormTodo> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.todo?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="description"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Description
        </Label>

        <TextField
          name="description"
          defaultValue={props.todo?.description}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="description" className="rw-field-error" />

        <Label
          name="isComplete"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Is complete
        </Label>

        <CheckboxField
          name="isComplete"
          defaultChecked={props.todo?.isComplete}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="isComplete" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default TodoForm
