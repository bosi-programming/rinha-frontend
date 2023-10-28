import { useReducer } from "react";
import { LoadJSON } from "./screens/LoadJson";
import { ActionTypes, State, Action } from "./App.d";
import { ShowPage } from "./screens/ShowPage";

const initialState: State = {
  error: '',
  jsonFile: null,
  fileName: '',
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionTypes.SET_ERROR:
      return { ...state, error: action.payload?.error || '', jsonFile: null };
    case ActionTypes.SET_JSON_FILE:
      return { ...state, jsonFile: action.payload?.jsonFile || null, error: '' };
    case ActionTypes.SET_FILE_NAME:
      return { ...state, fileName: action.payload?.fileName || '' };
    case ActionTypes.CLEAR:
      return { ...initialState };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { jsonFile } = state;

  return (
    <main>
      {!jsonFile && <LoadJSON state={state} dispatch={dispatch} />}
      {jsonFile && <ShowPage state={state} dispatch={dispatch} />}
    </main>
  );
}

export default App;
