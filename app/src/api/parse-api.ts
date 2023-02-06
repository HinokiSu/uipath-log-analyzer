import ApiClient from '@utils/request'
import { apiURLHandler } from './common-tools'
import { TBaseResult } from './interfaces/common-types'
const apiBasePath = '/parse'

export const fetchParseSpecifyFile = (id: string): Promise<TBaseResult> =>
  ApiClient.get(apiURLHandler(apiBasePath, `/file/log`), {
    id
  })

export const fetchParseAllLogFileInfo = (): Promise<TBaseResult> =>
  ApiClient.get(apiURLHandler(apiBasePath, `/fileinfo/all`))

// parse all log by all log files
export const fetchParseLogsByAllLogFile = (): Promise<TBaseResult> =>
  ApiClient.get(apiURLHandler(apiBasePath, `/file/all`))
