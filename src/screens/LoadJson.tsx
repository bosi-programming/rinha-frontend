import { readJsonFile } from "../domain/json/readJsonFile";
import { Action, State, ActionTypes } from "../App.d";

interface LoadJSONScreenProps {
  state: State;
  dispatch: React.Dispatch<Action>;
}
export function LoadJSON({ state, dispatch }: LoadJSONScreenProps) {
  const { error } = state;
  // TODO: evoluir para um botão de upload ao invés de input -> usar useRef
  return (
    <form>
      <h1>JSON Tree Viewer</h1>
      <p>
        Simple JSON Viewer that runs completely on-client. No data exchange
      </p>
      <div>
        <label
          tabIndex={0}
          htmlFor="json-file-upload"
        >
          Load JSON
        </label>

        <input
          id="json-file-upload"
          name="json-file-upload"
          type="file"
          accept=".json"
          onChange={function jsonInputChangeHandler(e) {
            const currentFile = e.target.files ? e.target.files[0] : null;
            if (!currentFile) {
              dispatch({
                type: ActionTypes.SET_ERROR,
                payload: { error: "Invalid file. Please load a valid JSON file." },
              });
              return;
            }
            dispatch({
              type: ActionTypes.SET_FILE_NAME,
              payload: { fileName: currentFile.name },
            });

            readJsonFile(currentFile, dispatch);
          }}
          aria-invalid={error ? "true" : "false"}
          aria-describedby="json-file-error"
          aria-errormessage="json-file-error"
        />
        <p
          id="json-file-error"
          role="alert"
        >
          {error}
        </p>
      </div>
    </form>
  )
}
