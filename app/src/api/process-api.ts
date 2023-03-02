import ApiClient from '@utils/request'
import { apiURLHandler } from './common-tools'
import { TBaseResult, TPaginationResult } from './interfaces/common-types'
import { TPaginationOfProcessNameStats } from './interfaces/process-result'
const apiBasePath = '/process'

export const fetchExecutionAllInfo = (
  pn: string,
  curPage: number,
  pageSize: number
): Promise<TBaseResult> =>
  ApiClient.get(apiURLHandler(apiBasePath, `/exec/info/all`), {
    pn,
    curpage: curPage,
    pagesize: pageSize
  })

/* only process name, all */
export const fetchExecutionTimeline = (
  pn: string,
  curPage: number,
  pageSize: number
): Promise<TPaginationResult> =>
  ApiClient.get(apiURLHandler(apiBasePath, `/exec/timeline`), {
    pn,
    curpage: curPage,
    pagesize: pageSize
  })

/* range date and process name */
export const fetchExecTimelineByRangeDate = (
  pn: string,
  start: string,
  end: string,
  curPage: number,
  pageSize: number
): Promise<TPaginationResult> =>
  ApiClient.get(apiURLHandler(apiBasePath, `/exec/timeline/date`), {
    pn,
    start,
    end,
    curpage: curPage,
    pagesize: pageSize
  })

// get all process and it's logs stats
export const fetchProcessesLogStats = (
  curPage: number,
  pageSize: number
): Promise<TPaginationOfProcessNameStats> => {
  return ApiClient.get(apiURLHandler(apiBasePath, `/all`), {
    curpage: curPage,
    pagesize: pageSize
  })
}
