import React, { useEffect } from "react";

const INIT_STATE = {
  city: undefined,
  dates: [],
  options: {
    adult: undefined,
    children: undefined,
    room: undefined,
  },
};

export const SearchContext = React.createContext(INIT_STATE);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;
    case "RESET_SEARCH":
      return INIT_STATE;
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const getLocalState = () => {
    const stored = localStorage.getItem("search");
    return stored ? JSON.parse(stored) : INIT_STATE;
  };

  const [state, dispatch] = React.useReducer(SearchReducer, getLocalState());

  useEffect(() => {
    localStorage.setItem("search", JSON.stringify(state));
  }, [state]);

  return (
    <SearchContext.Provider
      value={{
        city: state.city,
        dates: state.dates,
        options: state.options,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
