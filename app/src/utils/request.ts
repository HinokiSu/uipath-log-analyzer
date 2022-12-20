import axios, { AxiosInstance } from 'axios'
import NProgress from '@/plugins/nprogress-plugin'
import { useRouter } from 'vue-router'

type HttpHeaders = {
  [key: string]: string
}

type RequestConfig = {
  headers: HttpHeaders
}

const handleServiceError = (error: any) => {
  console.log(error)
}

const apiBaseURL = `/api`
//  import.meta.env.VITE_API_URL as string,

interface IApiClient {
  get<TResponse>(path: string, params?: object): Promise<TResponse>
  post<TRequest, TResponse>(
    path: string,
    object: TRequest,
    config?: RequestConfig
  ): Promise<TResponse>
  patch<TRequest, TResponse>(path: string, object: TRequest): Promise<TResponse>
  put<TRequest, TResponse>(path: string, object: TRequest): Promise<TResponse>
}

class ApiClient implements IApiClient {
  private client: AxiosInstance

  protected createAxiosClient(): AxiosInstance {
    return axios.create({
      baseURL: apiBaseURL,
      responseType: 'json' as const,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      timeout: 10 * 1000
    })
  }

  constructor() {
    this.client = this.createAxiosClient()
    this.client.interceptors.request.use(
      (config) => {
        NProgress.start()
        return config
      },
      (err) => {
        this.handleError(err)
      }
    )
    this.client.interceptors.response.use((response) => {
      NProgress.done()
      if (response.status === 200) {
        return Promise.resolve(response)
      } else {
        return Promise.reject(response)
      }
    })
  }

  handleError = (error: any) => {
    const router = useRouter()
    switch (error.response.status) {
      case 401:
        router.push('/')
        break
      case 404:
        router.push('/404')
        break
      default:
        router.push('/500')
        break
    }
    return Promise.reject(error)
  }

  async get<TResponse>(path: string, params: object = {}): Promise<TResponse> {
    try {
      const response = await this.client.get<TResponse>(path, { params: params })
      return response.data
    } catch (error) {
      handleServiceError(error)
    }
    return {} as TResponse
  }

  async post<TRequest, TResponse>(
    path: string,
    payload: TRequest,
    config?: RequestConfig
  ): Promise<TResponse> {
    try {
      const response = config
        ? await this.client.post<TResponse>(path, payload, config)
        : await this.client.post<TResponse>(path, payload)
      return response.data
    } catch (error) {
      handleServiceError(error)
    }
    return {} as TResponse
  }

  async patch<TRequest, TResponse>(path: string, payload: TRequest): Promise<TResponse> {
    try {
      const response = await this.client.patch<TResponse>(path, payload)
      return response.data
    } catch (error) {
      handleServiceError(error)
    }
    return {} as TResponse
  }

  async put<TRequest, TResponse>(path: string, payload: TRequest): Promise<TResponse> {
    try {
      const response = await this.client.put<TResponse>(path, payload)
      return response.data
    } catch (error) {
      handleServiceError(error)
    }
    return {} as TResponse
  }
}

export default new ApiClient()
