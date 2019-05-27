import React, {useState, useEffect} from 'react';
import { Container } from './styles';

import ToDoInput from './components/to-do-input';
import ToDoList from './components/to-do-list';
import Loading from '../../components/loading';

import { ToDo } from './types';

const View = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [lastTodoId, setLastTodoId] = useState(0);
  
  let timeoutId: number;

  useEffect(()=> {
    timeoutId = setTimeout(()=> {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    }
  },[]);

  const getNextTodoId = () => {
    const nextTodoId = lastTodoId + 1;
    setLastTodoId(nextTodoId);

    return nextTodoId;
  }

  const addTodo = (task: string) => {
    const newTodo = {
      id: getNextTodoId(),
      task,
      completed: false
    }
    setTodos([
      ...todos,
      newTodo,
    ]);
  };

  const markTodoAsComplete = (todo: ToDo) => {
    const updatedTodos = todos.map( (t) => {
      let completed = t.completed;

      if(t.id === todo.id) {
        completed = true;
      }

      return {
        id: t.id,
        task: t.task,
        completed,
      };
    });

    setTodos(updatedTodos);
  };

  const removeTodo = (todo: ToDo) => {
    const filteredTodos = todos.filter((t)=> t.id !== todo.id);

    const updatedTodos = filteredTodos.map( (t) => {
      return {
        id: t.id,
        task: t.task,
        completed: t.completed,
      };
    });

    setTodos(updatedTodos);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <ToDoInput addTodo={ addTodo } />
      <ToDoList todos={todos} markTodoAsComplete={ markTodoAsComplete } removeTodo={ removeTodo } />
    </Container>      
  )
};

export default View;