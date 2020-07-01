import React, { useEffect, useReducer } from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { Task, TaskId } from "../components/tracker/Task";
import { Tracker } from "../components/tracker/Tracker";
import { addAction, initialState, reducer, resetAction, setAction } from "../store";
import { loadState } from "../utils";
import styles from './styles.module.css';

const IndexPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const loadedState = loadState<TaskId, Task>();
    dispatch(setAction(loadedState));
  }, []);

  return (
  <Layout>
    <SEO title="Home" />
      <div>
        <div className={styles.buttonsRow}>
          <button onClick={() => dispatch(addAction)}>Add Task</button>
          <button onClick={() => dispatch(resetAction)}>Remove All</button>
        </div>
        <Tracker
          tasks={Array.from(state.values())}
          dispatch={dispatch}
        />
      </div>
  </Layout>
  )
}

export default IndexPage
