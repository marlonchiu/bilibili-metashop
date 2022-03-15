import request from '@/libs/request'

export const getHomepage = params => {
  return request({
    method: 'GET',
    url: '/homepage',
    params
  })
}

export const getProducts = () => {
  return request({
    method: 'GET',
    url: '/products'
  })
}
