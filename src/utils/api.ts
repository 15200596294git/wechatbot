/**
 * 成功 code为0，失败就小于0，并且需要message
 */
export const responseJson = {
  success(data: any) {
    return {
      code: 0,
      data,
      message: ''
    }
  },
  fail(data: any, message: string) {
    return {
      code: -1,
      data,
      message,
    }
  }
}