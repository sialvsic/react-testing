import React from "react";
import { Container, ToDoList, ToDoListItem, TodoText, TodoRemoveIcon } from "./styles";

import sortTodos from '../../logic/sortTodos';

import TrashCan from '../../../icons/TrashCan';

import { ToDo } from "../../types";

interface Props {
  todos: ToDo[];
  markTodoAsComplete: (todo: ToDo) => void;
  removeTodo: (todo: ToDo) => void;
}

const View = ({ todos, markTodoAsComplete, removeTodo }: Props) => {

  const sortedTodos = todos.sort(sortTodos);

  return (
    <Container>
      <ToDoList aria-label="List of Todos">
        {sortedTodos.map(t => {

          const todoTextLabel = (
            t.completed ? t.task + ' is completed' : t.task
          );

          return (
            <ToDoListItem key={t.id}>
              <TodoText
                onClick={() => markTodoAsComplete(t)}
                completed={t.completed}
                aria-label={ todoTextLabel }
              >
                {t.task}
              </TodoText>
              <TodoRemoveIcon onClick={ () => removeTodo(t) } aria-label={ 'Remove ' + t.task }>
                <TrashCan />
              </TodoRemoveIcon>
            </ToDoListItem>
          );
        })}
      </ToDoList>
    </Container>
  );
};

export default View;
