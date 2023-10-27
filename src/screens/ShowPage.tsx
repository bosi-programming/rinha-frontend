import { Action, ActionTypes, State } from "../App.d";
import { ShowJson } from '../components/ShowJson';

interface ShowJSONScreenProps {
  state: State;
  dispatch: React.Dispatch<Action>;
}

export function ShowPage({ state, dispatch }: ShowJSONScreenProps) {
  const { jsonFile, fileName } = state;

  if (!jsonFile) {
    return;
  }

  return (
    <div>
      <h1>{fileName}</h1><button onClick={() => dispatch({ type: ActionTypes.CLEAR })}>Back</button>
      <pre>
        <ShowJson jsonFile={jsonFile} startExpanded={true} />
      </pre>
    </div>
  );
}
