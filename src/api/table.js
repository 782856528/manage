import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/manage/search',
    method: 'get',
    params
  })
}
export function add(params) {
  return request({
    url: '/manage/add',
    method: 'post',
    data
  })
}
export function del(params) {
  return request({
    url: '/manage/del',
    method: 'post',
    data
  })
}
