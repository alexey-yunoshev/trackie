import { TaskId, Task, generateNewTask } from "../components/tracker/Task";
import { saveState } from "../utils";

export type State = Map<TaskId, Task>;
export enum ActionType {
  Add = 'Add',
  Reset = 'Reset',
  Set = 'Set',
  Update = 'Update',
}

export interface AddAction {
  type: ActionType.Add,
}

export const addAction: AddAction = {
  type: ActionType.Add,
}

export interface ResetAction {
  type: ActionType.Reset,
}

export const resetAction: ResetAction = {
  type: ActionType.Reset,
}

export interface SetAction {
  type: ActionType.Set,
  payload: State,
}

export const setAction = (state: State): SetAction => ({
  type: ActionType.Set,
  payload: state,
});

export interface UpdateAction {
  type: ActionType.Update,
  payload: Task,
}

export const updateAction = (task: Task): UpdateAction => ({
  type: ActionType.Update,
  payload: task,
});

export type Action =
  | AddAction
  | ResetAction
  | SetAction
  | UpdateAction

export const initialState: State = new Map();

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.Add: {
      const newTask = generateNewTask();
      const newState = new Map(state.entries());
      newState.set(newTask.id, newTask);
      saveState(newState);
      return newState;
    }
    case ActionType.Reset: {
      const newState = new Map();
      saveState(newState);
      return newState;
    }
    case ActionType.Set: {
      return action.payload;
    }
    case ActionType.Update: {
      const newState = new Map(state.entries());

      newState.set(action.payload.id, action.payload);
      saveState(newState);
      return newState;
    }
    default:
      throw new Error(`Action is not a valid action`);
  }
}
