import React from 'react'
import glamorous from 'glamorous-primitives'
import { render, Artboard } from 'react-sketchapp'

import AppBar from './components/appbar'

const Container = glamorous.view({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

const Image = glamorous.image({
  width: 400,
  height: 400,
})

const Description = glamorous.text({
  fontSize: 35,
  padding: 40,
  color: '#a4a4c1',
})

class App extends React.Component {
  render() {
    return (
      <Artboard name="Login Screen" style={{width: 320, height: 1024}}>
        <Container>
          <AppBar />
          <Image
            source={{
              uri:
                'https://github.com/paypal/glamorous/raw/master/other/logo/full.png',
            }}
          />
          <Description>Maintainable CSS with React</Description>
        </Container>
      </Artboard>
    )
  }
}

export default () => {
  render(<App />, context.document.currentPage())
}
