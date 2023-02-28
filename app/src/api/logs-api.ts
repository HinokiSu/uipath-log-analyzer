import ApiClient from '@utils/request'
import { apiURLHandler } from './common-tools'
import { TPaginLogInfoResult, TResultOfLogData } from './interfaces/logs-result'
const apiBasePath = '/logs'

export const fetchAllLogsToList = (
  curPage: number,
  pageSize: number
): Promise<TPaginLogInfoResult> =>
  ApiClient.get(apiURLHandler(apiBasePath, `/all`), {
    curpage: curPage,
    pagesize: pageSize
  })

// according to log_time
export const fetchListByLogTime = (
  logTime: string,
  curPage: number,
  pageSize: number
): Promise<TPaginLogInfoResult> =>
  ApiClient.get(apiURLHandler(apiBasePath, `/logtime`), {
    logtime: logTime,
    pagesize: pageSize,
    curpage: curPage
  })

export const fetchLogsByProcessName = (
  pn: string,
  curPage: number,
  pageSize: number
): Promise<TPaginLogInfoResult> =>
  ApiClient.get(apiURLHandler(apiBasePath, `/pn/all`), {
    pn,
    curpage: curPage,
    pagesize: pageSize
  })

export const fetchRecentlyErrorByProcessName = (pn: string): Promise<TResultOfLogData> =>
  ApiClient.get(apiURLHandler(apiBasePath, `/pn/recent/error`), {
    pn
  })
