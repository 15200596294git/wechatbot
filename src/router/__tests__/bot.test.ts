import app from '../index'
import request from 'supertest'


describe('获取微信登录二维码', () => {

  // it('获取二维码测试', ()=> {
  //   request(app)
  //   .get('/startBot')
  //   .then(response=> {
  //     expect(response.body.data).toBe(1)
  //   })
  // })

  it('response with json', () => {
    return request(app)
      .get('api/startBot')
      .then(response => {
        expect(response.body.data.includes('data:image/png')).toBeTruthy()
      })
  })

})
