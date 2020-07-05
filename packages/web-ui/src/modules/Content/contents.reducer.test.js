import SUT, {
  setContents,
} from './contents.reducer'

describe('modules/Content/contents.reducer', () => {
  describe('overwriteContents', () => {
    it('should overwrite contents using provided list of contents', () => {
      // given ... no existing contents
      const state = {}

      // when ... we set contents from the following list of contents
      const contents = [
        { id: 1, label: 'CONTENT 1' },
        { id: 2, label: 'CONTENT 2' },
        { id: 3, label: 'CONTENT 3' },
      ]
      const action = setContents(contents)
      const result = SUT(state, action)

      // then ... should normalize and set contents as expected
      expect(result).toEqual({
        1: { label: 'CONTENT 1' },
        2: { label: 'CONTENT 2' },
        3: { label: 'CONTENT 3' },
      })
    })
  })
})
