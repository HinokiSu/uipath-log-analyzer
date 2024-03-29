import { TLogInfo } from '@/interface/log-info'
import { TBaseResult } from './common-types'

export type TPaginLogInfoResult = Omit<TBaseResult, 'data'> & {
  data: {
    total: number
    list: TLogInfo[]
  }
}


export type TResultOfLogData = Omit<TBaseResult, 'data'> & {
  data: {
    log_data: TLogInfo
  }
}
