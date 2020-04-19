import { createRequestTypes, createRequestActions } from '../../utils/createRequestActions'
import { createAction } from 'redux-actions'
import { NEWS_LIST_DETAIL } from './homeActionTypes'
//reducer
export const newsListDetailTypes = createRequestTypes(NEWS_LIST_DETAIL)
//ui--->action
export const newlists = createAction(NEWS_LIST_DETAIL, data => data)
//saga
export const newsListDetailRequestAction = createRequestActions(newsListDetailTypes)
