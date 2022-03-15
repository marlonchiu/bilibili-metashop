import axios from 'axios'

const request = axios.create({
  baseURL: 'http://api.cpengx.cn/metashop/api'
})

request.interceptors.response.use(
  response => {
    // console.log(response)
    if (response.status == 200) {
      return response.data
    } else {
      return response
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default request
