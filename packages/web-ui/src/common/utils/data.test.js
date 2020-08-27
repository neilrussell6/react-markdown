import { normalize, denormalize } from './data'

describe('common/utils/data', () => {
  describe('denormalize', () => {
    it('should denormalize provided data as expected, associating as requested', () => {
      const data = {
        123: { label: 'VALUE 1' },
        456: { label: 'VALUE 2' },
        789: { label: 'VALUE 3' },
      }
      const keyProp = 'KEY'
      const result = denormalize(keyProp)(data)
      const expected = [
        { KEY: '123', label: 'VALUE 1' },
        { KEY: '456', label: 'VALUE 2' },
        { KEY: '789', label: 'VALUE 3' },
      ]
      expect(result).toEqual(expected)
    })
  })

  describe('normalize', () => {
    it('should normalize provided data as expected, associating as requested', () => {
      const data = [
        { KEY: 123, label: 'VALUE 1' },
        { KEY: 456, label: 'VALUE 2' },
        { KEY: 789, label: 'VALUE 3' },
      ]
      const keyProp = 'KEY'
      const result = normalize(keyProp)(data)
      const expected = {
        123: { label: 'VALUE 1' },
        456: { label: 'VALUE 2' },
        789: { label: 'VALUE 3' },
      }
      expect(result).toEqual(expected)
    })
  })
})
