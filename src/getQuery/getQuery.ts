/**
 * 获取url上？后面的参数
 * @param name queryKey
 */
export default function getQueryString(name: string): string | null {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  const search = window.location.href.substr(window.location.href.indexOf('?'))
  let r = search.substr(1).match(reg)
  if (r != null) {
    return unescape(r[2])
  }
  return null
}
