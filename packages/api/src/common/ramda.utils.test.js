const SUT = require('./ramda.utils')

describe('common/ramda.utils', () => {
  describe('pickAll', () => {
    it('should pick provided keys from object return null for those not found', () => {
      const source = { a: 'A', b: 'B', c: 'C' }
      const result = SUT.pickAll(['a', 'b', 'd'], source)
      expect(result).toEqual({ a: 'A', b: 'B', d: null })
    })
  })

  describe('renameKeys', () => {
    it('should rename obj keys using provided key map retaining unmentioned keys', () => {
      const source = { a: 'A', b: 'B', c: 'C' }
      const result = SUT.renameKeys({ a: 'aa', b: 'bb', d: 'dd' }, source)
      expect(result).toEqual({ aa: 'A', bb: 'B', c: 'C' })
    })
  })
})
