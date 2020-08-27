import SUT, { deselectContent, INITIAL_STATE, selectContent } from './selectedContent.reducer'

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

  describe('deselectContent', () => {
    it('should reset selected content to initial state', () => {
      // given ... content 3 is currently selected
      const state = 3

      // when ... we deselect content
      const action = deselectContent()
      const result = SUT(state, action)

      // then ... should set selected content to initial state
      expect(result).toEqual(INITIAL_STATE)
    })
  })
})
