/* Bad practise! Do not create own  state management tools */

import { createContext, useCallback, useReducer, useContext } from "react";
import { PersonInterface } from "./person";
import produce from "immer";
import personService from "../services/person";

export type State = {
  persons: PersonInterface[];
  counter: number;
  loadingCount: number;
};

type PeduxStore = {
  state: State;
  actions: {
    [key: string]: Function;
  };
};

type Action =
  | { type: "GET_PERSONS_PENDING" }
  | { type: "GET_PERSONS_REJECTED"; error: Error }
  | { type: "GET_PERSONS_FULLFILLED"; payload: PersonInterface[] }
  | { type: "HIRE_PERSON"; payload: PersonInterface }
  | { type: "INCREMENT_COUNTER" }
  | { type: "FIRE_PERSON_PENDING"; payload: string }
  | { type: "FIRE_PERSON_REJECTED"; payload: string }
  | { type: "FIRE_PERSON_FULLFILLED"; payload: string };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "GET_PERSONS_PENDING":
      return produce(state, (draft) => {
        draft.loadingCount = draft.loadingCount + 1;
      });

    case "GET_PERSONS_FULLFILLED":
      return produce(state, (draft) => {
        draft.persons = action.payload;
        draft.loadingCount = draft.loadingCount - 1;
      });

    case "FIRE_PERSON_PENDING":
      return produce(state, (draft) => {
        const index = draft.persons.findIndex((p) => p.id === action.payload);
        draft.persons[index].isBeingFired = true;
        draft.loadingCount = draft.loadingCount + 1;
      });

    case "FIRE_PERSON_FULLFILLED":
      return {
        ...state,
        disable: false,
        persons: state.persons.filter((p) => p.id !== action.payload),
        loadingCount: state.loadingCount - 1
      };

    case "HIRE_PERSON":
      return {
        ...state,
        persons: state.persons.concat(action.payload).reverse()
      };

    case "INCREMENT_COUNTER":
      return {
        ...state,
        counter: state.counter + 1
      };

    default:
      return state;
  }
};

const PeduxContext = createContext<PeduxStore | undefined>(undefined);

export const useSelector = (selector) => {
  const store = useContext(PeduxContext);

  if (store === undefined) {
    throw new Error("Must have store");
  }
  return selector(store.state);
};

export const useAction = (selector) => {
  const store = useContext(PeduxContext);

  if (store === undefined) {
    throw new Error("Must have store");
  }
  return selector(store.actions);
};

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    counter: 0,
    persons: [],
    loadingCount: 0
  });

  const getPersons = useCallback(async () => {
    dispatch({
      type: "GET_PERSONS_PENDING"
    });

    try {
      const persons = await personService.getPersons();
      dispatch({
        type: "GET_PERSONS_FULLFILLED",
        payload: persons
      });
    } catch (e) {
      dispatch({
        type: "GET_PERSONS_REJECTED",
        error: e
      });
    }
  }, [dispatch]);

  const firePerson = useCallback(
    async (id: string) => {
      dispatch({
        type: "FIRE_PERSON_PENDING",
        payload: id
      });

      const fired = await personService.firePerson(id);

      dispatch({
        type: "FIRE_PERSON_FULLFILLED",
        payload: fired.id
      });
      //setPersons((persons) => persons.filter((p) => p.id !== id));
    },
    [dispatch]
  );

  const hirePerson = useCallback(
    (person: PersonInterface) => {
      dispatch({
        type: "HIRE_PERSON",
        payload: person
      });
      //setPersons((persons) => persons.concat(person).reverse());
    },
    [dispatch]
  );

  const store = {
    state,
    actions: {
      firePerson,
      hirePerson,
      getPersons
    }
  };

  return (
    <PeduxContext.Provider value={store}>{children}</PeduxContext.Provider>
  );
};
