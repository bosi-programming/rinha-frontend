import { Action, ActionTypes, State } from "../App.d";
import { ShowJson } from '../components/ShowJson';
import styles from "./ShowPage.module.css";

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
    <div className={styles['show-page']}>
      <div className={styles.header}>
        <h1 className={styles.title}>{fileName}</h1><button onClick={() => dispatch({ type: ActionTypes.CLEAR })}>Back</button>
      </div>
      <ShowJson jsonFile={jsonFile} startExpanded={true} />
    </div>
  );
}
