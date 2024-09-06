import app from '../index'
import request from 'supertest'


describe('test jg', () => {

  it('response with json', () => {
    request(app)
      .get('/')
      .then(response => {
        expect(response.body.msg).toBe('雷猴')
      })
  })


})