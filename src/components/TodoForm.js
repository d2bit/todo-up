import React from 'react'
import { Query, Mutation } from 'react-apollo'
import styled, { css } from 'react-emotion'

import * as GQL from '../graphql'
import { formatDate } from '../utils'
import Toggle from './Toggle'
import Spinner from '../views/Spinner'

const Frame = styled('div')`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  margin: auto;
  padding: 2rem 1rem;
  background-color: #eee;
`
const Element = styled('div')`
  display: flex;
  flex-basis: 100%;
  flex-flow: row wrap;
`
const Field = styled('div')`
  display: flex;
  flex-basis: 100%;
`
const Title = styled('span')`
  line-height: 1rem;
  font-size: 1.1rem;
  color: #333;
  margin: 0.3rem;
  flex-basis: 30%;
`
const Input = styled('input')`
  border: 1px solid #ccc;
  flex-grow: 1;
`
const Controls = styled('div')`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  flex-basis: 100%;
  margin-top: 1rem;
`
const Button = styled('button')`
  border: 1px solid #adb5bd;
  background-color: #dee2e6;
  color: #212529;
  font-weight: 600;
  padding: 0.5rem 1rem;
  :disabled {
    color: #ccc;
  }
`
const spinnerCSS = css`
  margin: auto;
  width: 50%;
`

class TodoForm extends React.PureComponent {
  state = {
    shouldClose: false,
  }

  titleRef = React.createRef()
  descriptionRef = React.createRef()
  createdAtRef = React.createRef()
  doneRef = React.createRef()

  render() {
    const { id } = this.props
    return (
      <Query query={GQL.GET_TODO} variables={{ id }}>
        {({ loading, error, data: { todo } }) => {
          if (loading) {
            return (
              <Spinner
                className={css`
                  ${spinnerCSS};
                `}
              />
            )
          }

          return (
            <Mutation
              mutation={GQL.UPDATE_TODO}
              update={(cache, { data: { todo } }) => {
                const { todos } = cache.readQuery({ query: GQL.GET_TODOS })
                const updatedTodos = todos.map(cachedTodo => {
                  if (cachedTodo.id === id) {
                    return todo
                  }
                  return cachedTodo
                })
                cache.writeQuery({
                  query: GQL.GET_TODOS,
                  data: { todos: updatedTodos },
                })
              }}
            >
              {updateTodo => (
                <Frame onClick={event => event.stopPropagation()}>
                  <Element>
                    <Field>
                      <Title>Title</Title>
                      <Input
                        innerRef={this.titleRef}
                        defaultValue={todo.text}
                      />
                    </Field>
                    <Field>
                      <Title>Description</Title>
                      <Input
                        innerRef={this.descriptionRef}
                        defaultValue={todo.description}
                      />
                    </Field>
                    <Field>
                      <Title>Created at</Title>
                      <Input
                        disabled
                        innerRef={this.createdAtRef}
                        type="date"
                        defaultValue={formatDate(todo.createdAt)}
                      />
                    </Field>
                  </Element>
                  <Controls>
                    <Field>
                      <Title>Done</Title>
                      <Toggle innerRef={this.doneRef} checked={todo.done} />
                    </Field>
                    <Button
                      onClick={event => {
                        const todoClone = Object.assign({}, todo)
                        const text = this.titleRef.current.value
                        const description = this.descriptionRef.current.value
                        const done = this.doneRef.current.checked
                        if (
                          text === todo.text &&
                          description === (todo.description || '') &&
                          done === todo.done
                        ) {
                          return
                        }
                        const input = { id, text, description, done }
                        updateTodo({
                          variables: { input },
                          optimisticResponse: {
                            __typename: 'Mutation',
                            todo: Object.assign(todoClone, {
                              done,
                              text,
                              description,
                              updatedAt: new Date(),
                            }),
                          },
                        })
                        this.props.closeFn()
                      }}
                    >
                      Save
                    </Button>
                  </Controls>
                </Frame>
              )}
            </Mutation>
          )
        }}
      </Query>
    )
  }
}

export default TodoForm
