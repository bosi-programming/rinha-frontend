import { Action, ActionTypes } from "../../App.d";

export function progressHandler(e: ProgressEvent<FileReader>, dispatch: React.Dispatch<Action>) {
  // TODO: use to show progress bar
  if (e.lengthComputable) {
    const percentLoaded = Math.round((e.loaded / e.total) * 100);
    dispatch({ type: ActionTypes.SET_PROGRESS, payload: { progress: percentLoaded } });
  }
}

