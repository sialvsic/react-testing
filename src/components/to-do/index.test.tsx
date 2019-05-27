import React from 'react';
import { render, cleanup, fireEvent, RenderResult, getByLabelText, waitForElement } from 'react-testing-library';
import 'jest-dom/extend-expect';

import Todos from './index';

describe('todos', () => {

  afterEach(()=> {
    cleanup();
  });

  const addTodo = (renderedResult: RenderResult, text: string) => {
    const renderedInput = getByLabelText(renderedResult.container, 'Enter a To Do:');
    fireEvent.change(renderedInput, { target: { value:  text } });
    fireEvent.keyDown(renderedInput, { keyCode: 13 });
  };

  const assertTodoInList = (renderedResult: RenderResult, todoText: string) => {
    const { queryByLabelText } = renderedResult;
    expect(queryByLabelText(todoText)).toBeInTheDocument();
  };

  const assertTodoNotInList = (renderedResult: RenderResult, todoText: string) => {
    const { queryByLabelText } = renderedResult;
    expect(queryByLabelText(todoText)).not.toBeInTheDocument();
  };

  const assertTodoInputIsEmpty = (renderedResult: RenderResult,) => {
    const renderedInput = getByLabelText(renderedResult.container, 'Enter a To Do:') as HTMLInputElement;
    expect(renderedInput.value).toBe('')
  }


  describe('when the component is rendered', () => {

    it('initially shows a loading state', async () => {
      const renderedResult = render(<Todos />);
      const { queryByLabelText } = renderedResult;

      expect(queryByLabelText('Loading')).toBeInTheDocument();
      expect(queryByLabelText('Todos')).not.toBeInTheDocument();
    });

    it('waits for the todos to load and removes the loading state', async () => {
      const renderedResult = render(<Todos />);
      const { queryByLabelText, getByLabelText } = renderedResult;

      await waitForElement(() =>
        getByLabelText('List of Todos'),
      );

      expect(queryByLabelText('Loading')).not.toBeInTheDocument();
    });
  });

  describe('when adding a todo', () => {

    it('does not add it to the list when the todo input is empty', async () => {
      const renderedResult = render(<Todos />);
      const { getByLabelText } = renderedResult;

      await waitForElement(() =>
        getByLabelText('List of Todos'),
      );

      addTodo(renderedResult, '');

      const todoList = getByLabelText('List of Todos');

      expect(todoList.childNodes.length).toBe(0);
    });

    it('adds it to the list and clears the field', async () => {
      const firstTodo = "This is a test TODO!";
      const renderedResult = render(<Todos />);  
      const { getByLabelText } = renderedResult;

      await waitForElement(() =>
        getByLabelText('List of Todos'),
      );

      addTodo(renderedResult, firstTodo);

      assertTodoInList(renderedResult, firstTodo);
      assertTodoInputIsEmpty(renderedResult);
    });

    describe('and when a second todo is added', () => {

      it('is added to the top of the list', async () => {
        const firstTodo = "This is a test TODO!";  
        const secondTodo = "Second Todo";

        const renderedResult = render(<Todos />);
        const { getByLabelText } = renderedResult;
  
        await waitForElement(() =>
          getByLabelText('List of Todos'),
        );

        addTodo(renderedResult, firstTodo);
        addTodo(renderedResult, secondTodo);

        const todoList = getByLabelText('List of Todos');

        expect(todoList.childNodes[0].textContent).toBe(secondTodo);
        expect(todoList.childNodes[1].textContent).toBe(firstTodo);
      });
    });
  });

  describe('when clicking on a todo', () => {
    const todo1 = "Todo number 1";
    const todo2 = "Todo number 2";
    const todo3 = "Todo number 3";

    it('is marked as complete', async () => {
      const renderedResult = render(<Todos />);
      const { getByLabelText } = renderedResult;

      await waitForElement(() =>
        getByLabelText('List of Todos'),
      );

      addTodo(renderedResult, todo1);

      const { getByText } = renderedResult;
      fireEvent.click(getByText(todo1));

      assertTodoInList(renderedResult, `${todo1} is completed`);
    });

    it('moves to the bottom of the list', async () => {
      const renderedResult = render(<Todos />);
      const { getByLabelText } = renderedResult;

      await waitForElement(() =>
        getByLabelText('List of Todos'),
      );

      addTodo(renderedResult, todo1);
      addTodo(renderedResult, todo2);
      addTodo(renderedResult, todo3);

      const todoList = getByLabelText('List of Todos');

      expect(todoList.childNodes[0].textContent).toBe(todo3);
      expect(todoList.childNodes[1].textContent).toBe(todo2);
      expect(todoList.childNodes[2].textContent).toBe(todo1);

      const { getByText } = renderedResult;
      fireEvent.click(getByText(todo3));

      expect(todoList.childNodes[0].textContent).toBe(todo2);
      expect(todoList.childNodes[1].textContent).toBe(todo1);
      expect(todoList.childNodes[2].textContent).toBe(todo3);
    });
  });

  describe('when clicking on the trash can next to a todo', () => {
    const todo1 = "Todo number 1";
    const todo2 = "Todo number 2";

    it('is removed from the list', async () => {
      const renderedResult = render(<Todos />);
      const { getByLabelText } = renderedResult;

      await waitForElement(() =>
        getByLabelText('List of Todos'),
      );

      addTodo(renderedResult, todo1);
      addTodo(renderedResult, todo2);

      assertTodoInList(renderedResult, todo1);
      assertTodoInList(renderedResult, todo2);

      fireEvent.click(getByLabelText('Remove ' + todo2));

      assertTodoInList(renderedResult, todo1);
      assertTodoNotInList(renderedResult, todo2);
    });
  });
});