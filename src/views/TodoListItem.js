import React from 'react'
import styled, { css } from 'react-emotion'

import { formatDate } from '../utils'
import EditIcon from './EditIcon'

const Frame = styled('div')`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
  flex-basis: 100%;
  margin: 0.3rem;
`
const Element = styled('div')`
  display: flex;
  flex-basis: 90%;
  flex-flow: row nowrap;
`
const Controls = styled('div')``
const Checkbox = styled('div')`
  display: inline-block;
  flex-shrink: 0;
  align-self: center;
  width: 1rem;
  height: 1rem;
  border: 1px solid #555;
  margin-right: 0.3rem;
  ::before {
    ${props =>
      props.checked
        ? `
        content: '\\2714';
        font-weight: bold;
        color: green;
        margin: auto;
      `
        : ''};
  }
`
const Title = styled('span')`
  line-height: 1rem;
  font-size: 1.1rem;
  color: #333;
  margin: 0.3rem;
  flex-grow: 1;
`
const Subtitle = styled('span')`
  font-size: 0.7rem;
  margin: 0.3rem;
  color: rgb(100, 150, 200);
  align-self: flex-end;
`
const iconCSS = css`
  align-self: right;
  width: 1rem;
`

function TodoListItem({ id, text, done, createdAt, toggleFn = () => {} }) {
  return (
    <Frame>
      <Element>
        <Checkbox
          checked={done}
          onClick={() => {
            toggleFn(id)
          }}
        />
        <Title>
          {text}
          <Subtitle>{formatDate(createdAt)}</Subtitle>
        </Title>
      </Element>
      <Controls>
        <EditIcon
          className={css`
            ${iconCSS};
          `}
        />
      </Controls>
    </Frame>
  )
}

export default TodoListItem
