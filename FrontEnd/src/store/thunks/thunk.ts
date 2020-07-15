import { Action } from 'redux'

import { ThunkAction } from 'redux-thunk'
import { getTasksAsync, readTasks } from '../actions/task-actions'
import { IAppState } from '../AppStore'

export const thunkSendMessage = (
  message: string
): ThunkAction<void, IAppState, undefined, Action<any>> => async dispatch => {
    console.log("here");
  const asyncResp = await getTasksAsync()
  dispatch(
    readTasks(
      asyncResp,
    )
  )
}