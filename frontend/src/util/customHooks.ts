import { useState } from "react";

export const useInput = (initialState: string) => {
  const [state, setState] = useState(initialState);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  return { value: state, onChange };
};
