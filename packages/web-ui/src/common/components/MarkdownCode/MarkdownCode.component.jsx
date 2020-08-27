import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import SyntaxHighlighter from 'react-syntax-highlighter'

// for dark theme
import { codepenEmbed as style } from 'react-syntax-highlighter/dist/esm/styles/hljs'

// // for light theme
// import { idea as style } from 'react-syntax-highlighter/dist/esm/styles/hljs'

class MarkdownCode extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    language: PropTypes.string,
  }

  static defaultProps = {
    language: null,
  }

  render() {
    const { language, value } = this.props
    return (
      <SyntaxHighlighter language={language} style={style}>
        {value}
      </SyntaxHighlighter>
    )
  }
}

export default MarkdownCode
