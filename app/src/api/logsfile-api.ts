import ApiClient from '@utils/request'
import { apiURLHandler } from './common-tools'
import { TPaginationResult } from './interfaces/common-types'
const apiBasePath = '/file'

export const fetchList = (curPage: number, pageSize: number): Promise<TPaginationResult> => {
  return ApiClient.get(apiURLHandler(apiBasePath, `/pagin`), {
    curpage: curPage,
    pagesize: pageSize
  })
}

/* export const fetchTotal = (): Promise<TTotalResult> => {
  return ApiClient.get(apiURL(apiBasePath, `/total`))
} */
