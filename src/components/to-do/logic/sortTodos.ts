import { ToDo } from "../types";

const sortTodos = (firstTodo: ToDo, secondTodo: ToDo) => {

  if ( !firstTodo.completed && secondTodo.completed ) {
    return -1;
  }

  if ( firstTodo.completed && !secondTodo.completed ) {
    return 1;
  }

  if ( firstTodo.id < secondTodo.id ) {
    return 1;
  }

  return -1;

};

export default sortTodos;