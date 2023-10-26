import styles from './ShowJson.module.css';
import { Action, ActionTypes, State } from "../../App.d";
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
      <h1>{fileName}</h1>
      <pre>
        <ShowJson jsonFile={jsonFile}/>
      </pre>
    </div>
  );
}
