import inlineStyles from '../inline-styles'

describe('Test inline styles function', () => {
  it('inline styles return value', () => {
    const testVal = {
      'border-radius': '20px',
      'color': 'red'
    }
    const res = inlineStyles(testVal)

  })
})
