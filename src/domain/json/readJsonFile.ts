import React from "react";
import { progressHandler } from "./progressHandler";
import { Action, ActionTypes } from "../../App.d";

export function readJsonFile(file: File, dispatch: React.Dispatch<Action>) {
  const jsonFileReader = new FileReader();

  function readerLoadHandler(e: ProgressEvent<FileReader>) {
    if (!e.target) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: { error: "Invalid JSON file. Please load a valid JSON file." } });
      return;
    }

    const fileContent = e.target.result as string;
    try {
      const fileContentObject = JSON.parse(fileContent);
      dispatch({ type: ActionTypes.SET_JSON_FILE, payload: { jsonFile: fileContentObject } });
    } catch (err) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: { error: "Invalid JSON file. Please load a valid JSON file." } });
    }
  }

  jsonFileReader.addEventListener("progress", progressHandler);
  jsonFileReader.addEventListener("load", readerLoadHandler);
  jsonFileReader.readAsText(file, "UTF-8");
}
