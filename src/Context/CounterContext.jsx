import { createContext,useState } from "react";

export let CounterContext = createContext();
export default function CounterContextProvider(props) {
  const [counter, setcounter] = useState(10);

  return (
    <CounterContext.Provider value={{ counter, setcounter }}>
      {props.children}
    </CounterContext.Provider>
  );
}
