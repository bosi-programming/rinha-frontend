import { useReducer } from "react";
import { LoadJSON } from "./screens/LoadJson";
import { ActionTypes, State, Action } from "./App.d";
import { ShowPage } from "./screens/ShowPage";
import { Loader } from "./components/Loader";

const initialState: State = {
  error: '',
  jsonFile: null,
  fileName: '',
  progress: 0,
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionTypes.SET_ERROR:
      return { ...state, error: action.payload?.error || '', jsonFile: null };
    case ActionTypes.SET_JSON_FILE:
      return { ...state, jsonFile: action.payload?.jsonFile || null, error: '' };
    case ActionTypes.SET_FILE_NAME:
      return { ...state, fileName: action.payload?.fileName || '' };
    case ActionTypes.SET_PROGRESS:
      if (action.payload?.progress === 100) {
        return { ...state, progress: 0 };
      }
      return { ...state, progress: action.payload?.progress || 0 };
    case ActionTypes.CLEAR:
      return { ...initialState };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { jsonFile, progress } = state;

  return (
    <main>
      {!jsonFile && !progress ? <LoadJSON state={state} dispatch={dispatch} /> : null}
      {jsonFile ? <ShowPage state={state} dispatch={dispatch} /> : null}
      {progress && progress !== 0 ? <Loader progress={progress} /> : null}
    </main>
  );
}

export default App;
