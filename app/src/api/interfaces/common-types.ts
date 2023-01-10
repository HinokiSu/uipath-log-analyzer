import { TLogInfo, TPNOfLogState } from '@/interface/log-info'

export type TBaseResult = {
  message: string
  status: string
  data: object
}

export type TPaginationResult = Omit<TBaseResult, 'data'> & {
  data: {
    total: number
    list: any[]
  }
}

