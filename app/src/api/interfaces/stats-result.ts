import { TLogStateObj, TLogTimeObj } from '@/interface/dashboard'
import { TLogInfo } from '@/interface/log-info'
import { TBaseResult } from './common-types'

export type TStatsOfLogState = Omit<TBaseResult, 'data'> & {
  data: {
    total: number
    list: TLogStateObj[]
  }
}

export type TStatsOfLogTime = Omit<TBaseResult, 'data'> & {
  data: {
    total: number
    list: TLogTimeObj[]
  }
}

export type TStatsOfRecentlyError = Omit<TBaseResult, 'data'> & {
  data: {
    total: number
    list: TLogInfo[]
  }
}
