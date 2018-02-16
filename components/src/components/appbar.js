import React from 'react'
import glamorous from 'glamorous-primitives'

const AppBarContainer = glamorous.view({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#546E7A',
  width: '100%',
  height: 56,
})

const AppBarText = glamorous.text({
  width: 'auto',
  textAlign: 'center',
  fontSize: 24,
  color: 'white',
})

export default (AppBar = () => {
  return (
    <AppBarContainer>
      <AppBarText>HTTL Gia Định</AppBarText>
    </AppBarContainer>
  )
})
