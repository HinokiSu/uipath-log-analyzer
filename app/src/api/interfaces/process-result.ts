import { TProcessLogStats } from "@/interface/process"
import { TBaseResult } from "./common-types"

export type TPaginationOfProcessNameStats = Omit<TBaseResult, 'data'> & {
  data: {
    total: number
    list: TProcessLogStats[]
  }
}
