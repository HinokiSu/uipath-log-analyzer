import ApiClient from '@utils/request'
const apiBasePath = '/file'

type TResult = {
  message: string
  status: string
  data: any[]
}

type TTotalResult = Omit<TResult, 'data'> & {
  data: Partial<{
    total: number
  }>
}

const apiURL = (root: string, url: string) => root.concat(url)

export const fetchList = (curPage: number, pageSize: number): Promise<TResult> => {
  return ApiClient.get(apiURL(apiBasePath, `/pagin`), {
    curpage: curPage,
    pagesize: pageSize
  })
}

export const fetchTotal = (): Promise<TTotalResult> => {
  return ApiClient.get(apiURL(apiBasePath, `/total`))
}
