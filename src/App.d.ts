import { TJSON } from './json.d';

export enum ActionTypes {
  SET_ERROR = 'SET_ERROR',
  SET_JSON_FILE = 'SET_JSON_FILE',
  SET_FILE_NAME = 'SET_FILE_NAME',
  CLEAR = 'CLEAR',
}

export interface State {
  error: string;
  jsonFile: TJSON | null;
  fileName: string;
}

export interface Action {
  type: ActionTypes;
  payload?: {
    error?: string;
    jsonFile?: TJSON | null;
    fileName?: string;
  };
}
