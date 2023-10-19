import React from "react";
import { readJsonFile } from "../domain/json/readJsonFile";

interface LoadJSONScreenProps {
  error: string;
  setError: (error: string) => void;
  jsonFile: TJSON;
  setJsonFile: (jsonFile: TJSON) => void;
  setFileName: (fileName: string) => void;
}
export function LoadJSON({ error, setError, setJsonFile, setFileName }: LoadJSONScreenProps) {
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
              setError("Invalid file. Please load a valid JSON file.");
              return;
            }
            setFileName(currentFile.name);

            readJsonFile(currentFile, setError, setJsonFile);
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
