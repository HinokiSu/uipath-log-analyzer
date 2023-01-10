import ApiClient from '@utils/request'
import { apiURLHandler } from './common-tools'
import { TStatsOfLogState, TStatsOfLogTime, TStatsOfRecentlyError } from './interfaces/stats-result'
const apiBasePath = '/stats'

export const fetchStatsByLogState = (): Promise<TStatsOfLogState> =>
  ApiClient.get(apiURLHandler(apiBasePath, `/logstate`))

export const fetchStatsByRecentlyError = (qty: number): Promise<TStatsOfRecentlyError> =>
  ApiClient.get(apiURLHandler(apiBasePath, `/recent/error`), {
    qty
  })

export const fetchStatsByLogTime = (): Promise<TStatsOfLogTime> =>
  ApiClient.get(apiURLHandler(apiBasePath, `/logtime`))
