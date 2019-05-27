import sortTodos from "./sortTodos";
import { ToDo } from "../types";

describe('sort todos', () => {

  const assertThatFirstTodoIsPriotised = (result: number) => {
    expect(result).toBe(-1);
  };

  const assertThatSecondTodoIsPriotised = (result: number) => {
    expect(result).toBe(1);
  }

  describe('when the first todo is not completed', () => {

    describe('and the second todo is completed', () => {

      it('should priotise the first todo', () => {
        const firstTodo: ToDo = {
          id: 1, 
          task: 'TEST',
          completed: false,
        };

        const secondTodo: ToDo = {
          id: 2, 
          task: 'TEST',
          completed: true,
        };


        const result = sortTodos(firstTodo, secondTodo);

        assertThatFirstTodoIsPriotised(result);
      });
    });
  });

  describe('when the second todo is not completed', () => {

    describe('and the first todo is completed', () => {

      it('should priotise the second todo', () => {
        const firstTodo: ToDo = {
          id: 1, 
          task: 'TEST',
          completed: true,
        };

        const secondTodo: ToDo = {
          id: 2, 
          task: 'TEST',
          completed: false,
        };


        const result = sortTodos(firstTodo, secondTodo);

        assertThatSecondTodoIsPriotised(result);
      });
    });
  });

  describe('when both todos are completed', () => {

    describe('and the first todo has a higher id', () => {

      it('should priotise the first todo', () => {
        const firstTodo: ToDo = {
          id: 2, 
          task: 'TEST',
          completed: true,
        };

        const secondTodo: ToDo = {
          id: 1, 
          task: 'TEST',
          completed: true,
        };

        const result = sortTodos(firstTodo, secondTodo);

        assertThatFirstTodoIsPriotised(result);
      });
    });

    describe('and the second todo has a higher id', () => {

      it('should priotise the second todo', () => {
        const firstTodo: ToDo = {
          id: 1, 
          task: 'TEST',
          completed: true,
        };

        const secondTodo: ToDo = {
          id: 2, 
          task: 'TEST',
          completed: true,
        };

        const result = sortTodos(firstTodo, secondTodo);

        assertThatSecondTodoIsPriotised(result);
      });
    });
  });

  describe('when both todos are not completed', () => {

    describe('and the first todo has a higher id', () => {

      it('should priotise the first todo', () => {
        const firstTodo: ToDo = {
          id: 2, 
          task: 'TEST',
          completed: false,
        };

        const secondTodo: ToDo = {
          id: 1, 
          task: 'TEST',
          completed: false,
        };

        const result = sortTodos(firstTodo, secondTodo);

        assertThatFirstTodoIsPriotised(result);
      });
    });

    describe('and the second todo has a higher id', () => {

      it('should priotise the first todo', () => {
        const firstTodo: ToDo = {
          id: 1, 
          task: 'TEST',
          completed: false,
        };

        const secondTodo: ToDo = {
          id: 2, 
          task: 'TEST',
          completed: false,
        };

        const result = sortTodos(firstTodo, secondTodo);

        assertThatSecondTodoIsPriotised(result);
      });
    });
  });
});