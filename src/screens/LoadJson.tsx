import { readJsonFile } from "../domain/json/readJsonFile";
import { Action, State, ActionTypes } from "../App.d";
import { useRef } from "react";

interface LoadJSONScreenProps {
  state: State;
  dispatch: React.Dispatch<Action>;
}
export function LoadJSON({ state, dispatch }: LoadJSONScreenProps) {
  const ref = useRef<HTMLInputElement>(null);
  const { error } = state;
  // TODO: evoluir para um botão de upload ao invés de input -> usar useRef
  return (
    <form>
      <h1>JSON Tree Viewer</h1>
      <p>
        Simple JSON Viewer that runs completely on-client. No data exchange
      </p>
      <div>
        <button
          type="button"
          onClick={() => ref.current?.click()}
          aria-label="Load JSON file"
        >
          Load JSON
        </button>

        <input
          ref={ref}
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
          style={{ display: 'none' }}
          aria-hidden="true"
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
