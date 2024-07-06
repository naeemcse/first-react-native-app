  import { Text, View } from 'react-native'
  import React from 'react'
  import { Link } from 'expo-router'
  import { StatusBar } from 'expo-status-bar'
  import { styled } from 'nativewind';
  const StyledView = styled(View);

  const App = () => {
    return (
      <StyledView className="flex-1 justify-center items-center bg-cyan-500">
        <Text className="text-2xl"> This is Home Page </Text>
        <StatusBar style="auto" />
        <Link href="/profile " >Go to Profile </Link>
        <Link href="/about" > About </Link>
        <Link href="/profile " >Go to Profile </Link>

      </StyledView>
    )
  }

  export default App
