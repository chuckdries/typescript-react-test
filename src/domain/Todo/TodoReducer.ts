import {
  append,
  assoc,
  indexBy,
  pipe,
  prop,
} from 'ramda';

import {
  TODO_ACTION,
} from './TodoActions';

interface ITodo {
  id: number;
  text: string;
}

interface ITodoByIdMap {
  [key: string]: ITodo;
}

type TODO_ARRAY = [ITodo] | [];

const TodoDefaultState = {
  todoByIdMap: {} as ITodoByIdMap,
  todos: [] as TODO_ARRAY,
};

export type TODO_STATE = typeof TodoDefaultState;

export const TodoReducer = (state: TODO_STATE, action: TODO_ACTION): TODO_STATE => {
  switch (action.type) {
    case 'TODO_CREATED':
      const { todos } = state;
      const newTodos = append(action.todo, todos) as TODO_ARRAY;
      // @ts-ignore
      return pipe(
        assoc('todos', newTodos),
        assoc('todoByIdMap', indexBy(prop('id'), newTodos)),
      )(state);
    default:
      return { ...TodoDefaultState,  ...state };
  }
};