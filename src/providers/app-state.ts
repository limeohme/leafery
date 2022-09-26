import { createContext, Dispatch, SetStateAction } from 'react';

type ContextType = {
  context: {
    theme: string,
    user: string
  };
  setContext: Dispatch<SetStateAction<{ user: string; theme: string; }>>
}
const AppState = createContext<ContextType>({
  context: {
    user: '',
    theme: ''
  },
  setContext: () => {}
});

export default AppState;
