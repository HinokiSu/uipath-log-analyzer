import ApiClient from '@utils/request'
import { apiURLHandler } from './common-tools'
import { TPaginLogInfoResult, TPaginOfPNStats, TResultOfLogData } from './interfaces/logs-result'
const apiBasePath = '/logs'

export const fetchAllLogsToList = (
  curPage: number,
  pageSize: number
): Promise<TPaginLogInfoResult> => {
  return ApiClient.get(apiURLHandler(apiBasePath, `/all`), {
    curpage: curPage,
    pagesize: pageSize
  })
}

// according to log_time
export const fetchListByLogTime = (
  logTime: string,
  curPage: number,
  pageSize: number
): Promise<TPaginLogInfoResult> => {
  return ApiClient.get(apiURLHandler(apiBasePath, `/logtime`), {
    logtime: logTime,
    pagesize: pageSize,
    curpage: curPage
  })
}

export const fetchListByProcessName = (
  pn: string,
  curPage: number,
  pageSize: number
): Promise<TPaginLogInfoResult> => {
  return ApiClient.get(apiURLHandler(apiBasePath, `/pn`), {
    pn,
    curpage: curPage,
    pagesize: pageSize
  })
}

export const fetchPNCountLogState = (
  curPage: number,
  pageSize: number
): Promise<TPaginOfPNStats> => {
  return ApiClient.get(apiURLHandler(apiBasePath, `/pn/stats`), {
    curpage: curPage,
    pagesize: pageSize
  })
}

export const fetchRecentlyErrorByPN = (pn: string): Promise<TResultOfLogData> => {
  return ApiClient.get(apiURLHandler(apiBasePath, `/pn/recent/error`), {
    pn
  })
}

