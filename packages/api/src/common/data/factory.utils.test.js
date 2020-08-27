const { factory } = require('factory-girl')
const Faker = require('faker')

const SUT = require('./factory.utils')

describe('data/factories/utils', () => {
  describe('registerFactories', () => {
    it('should register provided factories with factory girl allowing us to build from them as expected', async () => {
      // given ... a factory for the following model
      function ModelA(data) {
        Object.assign(this, data)
      }
      const ModelAFactory = _factory =>
        _factory.define('ModelA', ModelA, {
          id: () => Faker.random.number(),
          name: () => Faker.random.word(),
          message: 'DEFAULT MESSAGE',
        })

      // when
      // ... we register that factory with factory girl
      // ... and build an instance or multiple instances of it through factory girl
      SUT.registerFactories(factory)({ ModelAFactory })
      const instance = await factory.build('ModelA', { message: 'CUSTOM MESSAGE 1' })
      const instances = await factory.buildMany('ModelA', 2, { message: 'CUSTOM MESSAGE 2' })

      // then ... should create an instance as expected
      expect(instance).toBeInstanceOf(ModelA)
      expect(instance).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        message: 'CUSTOM MESSAGE 1',
      })
      expect(instances.length).toBe(2)
      expect(instances[0]).toBeInstanceOf(ModelA)
      expect(instances[1]).toBeInstanceOf(ModelA)
      expect(instances[0]).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        message: 'CUSTOM MESSAGE 2',
      })
      expect(instances[1]).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        message: 'CUSTOM MESSAGE 2',
      })
    })
  })
})
