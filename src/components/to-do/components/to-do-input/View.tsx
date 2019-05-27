import React, { useState } from 'react';
import { Container, LargeInput, InputLabel } from './styles';

interface Props {
  addTodo: (task: string) => void;
}

const View = ( { addTodo }: Props ) => {
  const [inputValue, setInputValue] = useState('');


  const onKeyPress = (e: React.KeyboardEvent) => {
    if (e.keyCode == 13) {
      const target = e.target as HTMLInputElement;

      if (target.value !== '') {
        addTodo(target.value);
        setInputValue('');
      }
    }
  }

  return (
    <Container>
      <InputLabel htmlFor="todo" >Enter a To Do:</InputLabel>
      <LargeInput
        name="todo"
        id="todo"
        type="text"
        onKeyDown={ onKeyPress } 
        value={ inputValue }
        onChange={ (e) => setInputValue(e.target.value) }
      />
    </Container>
  )
};

export default View;