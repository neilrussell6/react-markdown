import SUT, { selectContent } from './selectedContent.reducer'

describe('modules/Content/selectedContent.reducer', () => {
  describe('selectContent', () => {
    it('should set selected content to the provided id', () => {
      // given ... no content is currently selected
      const state = null

      // when ... we select content 3
      const action = selectContent('3')
      const result = SUT(state, action)

      // then ... should set selected content to 3
      expect(result).toEqual(3)
    })
  })
})
