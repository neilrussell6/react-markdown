import * as SUT from './contents.selectors'

describe('modules/Content/contents.selector', () => {
  describe('contentsSelector', () => {
    it('should select contents as expected, marking selected content as selected', () => {
      // given ... 3 contents and content 2 is selected
      const state = {
        contents: {
          1: { label: 'content 1' },
          2: { label: 'content 2' },
          3: { label: 'content 3' },
        },
        selectedContent: 2,
      }

      // when ... we select contents
      // then ... should denormalize and return all content, with content 2 marked as selected
      const result = SUT.contentsSelector(state)
      expect(result).toEqual({
        contents: [
          { id: '1', label: 'content 1', isSelected: false },
          { id: '2', label: 'content 2', isSelected: true },
          { id: '3', label: 'content 3', isSelected: false },
        ],
      })
    })
  })

  describe('contentsForSelectedCategorySelector', () => {
    it('should select contents for selected category as expected', () => {
      // given ... 6 contents in 3 categories and content 4 and category 2 are selected
      const state = {
        contents: {
          1: { label: 'content 1', categoryId: 1 },
          2: { label: 'content 2', categoryId: 1 },
          3: { label: 'content 3', categoryId: 1 },
          4: { label: 'content 1', categoryId: 2 },
          5: { label: 'content 2', categoryId: 2 },
          6: { label: 'content 3', categoryId: 3 },
        },
        selectedContent: 4,
        selectedCategory: 2,
      }

      // when ... we select contents for selected category
      // then ... should return only content belonging to category 2
      const result = SUT.contentsForSelectedCategorySelector(state)
      expect(result).toEqual({
        contents: [
          { id: '4', label: 'content 1', categoryId: 2, isSelected: true },
          { id: '5', label: 'content 2', categoryId: 2, isSelected: false },
        ],
      })
    })
  })

  describe('selectedContentMarkdownSelector', () => {
    it('should select selected content markdown as expected', () => {
      // given ... 3 contents all with markdown and content 2 is selected
      const state = {
        contents: {
          1: { label: 'content 1', markdown: 'content 1 markdown' },
          2: { label: 'content 2', markdown: 'content 2 markdown' },
          3: { label: 'content 3', markdown: 'content 3 markdown' },
        },
        selectedContent: 2,
      }

      // when ... we select selected content markdown
      // then ... should return content 2's markdown
      const result = SUT.selectedContentMarkdownSelector(state)
      expect(result).toEqual({ markdown: 'content 2 markdown' })
    })
  })
})
