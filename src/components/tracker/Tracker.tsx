import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core/SvgIcon";
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import React, { Dispatch, useEffect } from "react";
import { Action, updateAction } from "../../store";
import { getNow, humanizeTime, SECOND_MS } from "../../utils";
import * as styles from "./styles.module.css";
import { Task, TaskState } from "./Task";


interface StateChangeButtonProps {
    state: TaskState,
    onClick: VoidFunction,
}

type SvgIcon = OverridableComponent<SvgIconTypeMap>;

const icons: Map<TaskState, SvgIcon> = new Map([
    [TaskState.Paused, PlayCircleOutlineIcon],
    [TaskState.Working, PauseCircleOutlineIcon],
]);

const StateChangeButton = ({ state, onClick }: StateChangeButtonProps) => {
    const Icon = icons.get(state);
    return <Icon className={styles.trackerTaskButton} onClick={onClick} />
}

interface TrackerTaskProps {
    task: Task,
    dispatch: Dispatch<Action>,
}

export const TrackerTask = (
    {
        dispatch,
        task,
    }: TrackerTaskProps) => {

    const {
        id,
        name,
        state,
    } = task;

    useEffect(() => {
        let interval: any;
        if (state === TaskState.Working) {
            interval = setInterval(() => {
                const newTimeElapsed = task.initialTimeElapsed + (getNow() - task.timeStarted);
                dispatch(updateAction({
                    ...task,
                    timeElapsed: newTimeElapsed,
                }))
            }, SECOND_MS);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        }
    }, [task.state, task.timeElapsed])

    const onStateChange = () => {
        const newState = task.state === TaskState.Paused ? TaskState.Working : TaskState.Paused;
        dispatch(updateAction({
            ...task,
            state: newState,
            // We only actually need it, when we transition to Working state
            timeStarted: getNow(),
            initialTimeElapsed: task.timeElapsed,
        }))
    }

    const onNameChange = (name: string) => {
        dispatch(updateAction({
            ...task,
            name,
        }))
    }

    return (
        <div className={styles.trackerTask}>
            <StateChangeButton state={state} onClick={onStateChange} />
            <input
                className={styles.trackerTaskName}
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
            />
            <div className={styles.trackerTime}>
                {humanizeTime(task.timeElapsed)}
            </div>
        </div>
    )
}

export interface TrackerProps {
    tasks: Array<Task>
    dispatch: Dispatch<Action>,
}

export const Tracker = ({ tasks, dispatch }: TrackerProps) => {
    return (
        <div className={styles.tracker}>
            {tasks.map((task) => (
                <TrackerTask
                    key={task.id}
                    dispatch={dispatch}
                    task={task}
                />
            ))}
        </div>
    );
}

export default Tracker;
