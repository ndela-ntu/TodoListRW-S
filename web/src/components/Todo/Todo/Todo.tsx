import type {
  DeleteTodoMutation,
  DeleteTodoMutationVariables,
  FindTodoById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { checkboxInputTag, timeTag } from 'src/lib/formatters'

const DELETE_TODO_MUTATION: TypedDocumentNode<
  DeleteTodoMutation,
  DeleteTodoMutationVariables
> = gql`
  mutation DeleteTodoMutation($id: Int!) {
    deleteTodo(id: $id) {
      id
    }
  }
`

interface Props {
  todo: NonNullable<FindTodoById['todo']>
}

const Todo = ({ todo }: Props) => {
  const [deleteTodo] = useMutation(DELETE_TODO_MUTATION, {
    onCompleted: () => {
      toast.success('Todo deleted')
      navigate(routes.todos())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteTodoMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete todo ' + id + '?')) {
      deleteTodo({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Todo {todo.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{todo.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{todo.name}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{todo.description}</td>
            </tr>
            <tr>
              <th>Is complete</th>
              <td>{checkboxInputTag(todo.isComplete)}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(todo.createdAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editTodo({ id: todo.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(todo.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Todo
