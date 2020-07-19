import { useState } from "react";

export const useInput = (initialState) => {
  const [state, setState] = useState(initialState);

  const onChange = (e) => {
    setState(e.target.value);
  };

  // const clearInput = () => setState("");

  return { value: state, onChange };
};
