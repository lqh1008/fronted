import axios from 'axios'
import type {
  AxiosInstance,
  CreateAxiosDefaults,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosRequestTransformer
} from 'axios'

class Request {
  instance: AxiosInstance
  instanceRequestInterceptor?: AxiosRequestTransformer | AxiosRequestTransformer[]
  constructor(config: CreateAxiosDefaults) {
    this.instance = axios.create(config)
    this.instanceRequestInterceptor = config?.transformRequest
    // this.interceptorsObj = config.interceptors
    this.instance.interceptors.request.use(
      (requestConfig: InternalAxiosRequestConfig) => {
        if (requestConfig.method === 'get') {
          //  给data赋值以绕过if判断
          requestConfig.data = true
        }
        requestConfig.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        console.log('全局拦截器===>', requestConfig)
        return requestConfig
      },
      (err: any) => err
    )

    this.instance.interceptors.response.use(
      // 因为我们接口的数据都在res.data下，所以我们直接返回res.data
      (res: AxiosResponse) => {
        console.log('全局响应拦截器')
        return res.data
      },
      (err: any) => err
    )
  }

  request(config: AxiosRequestConfig) {
    return this.instance.request(config)
  }

  post(config: any) {
    return this.request(Object.assign({ method: 'post' }, config))
  }
}

const baseConfig = {
  baseURL: '/api',
  timeout: 3 * 1000
}

export default new Request(baseConfig)

export { Request }
