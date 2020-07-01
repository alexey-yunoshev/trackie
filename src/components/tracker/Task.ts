import { Milliseconds, getNow } from "../../utils";

export enum TaskState {
    Paused = 'Paused',
    Working = 'Working',
}

export type TaskId = number;

export interface Task {
    id: TaskId,
    name: string,
    timeElapsed: Milliseconds,
    initialTimeElapsed: Milliseconds,
    timeStarted: Milliseconds,
    state: TaskState,
}

let id = getNow();
export function generateNewTask(): Task {
    id++;

    return {
        id,
        name: `Task`,
        timeElapsed: 0,
        initialTimeElapsed: 0,
        timeStarted: getNow(),
        state: TaskState.Paused,
    }
}
