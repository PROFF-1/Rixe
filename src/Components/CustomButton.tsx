import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'



type props = {
  onPress: ()=>void,
  btnText: string,
  btnStyle: object,
  btnTextStyle: object
}



export default function CustomButton({onPress,btnText,btnStyle,btnTextStyle} : props) {

  
  return (
    <TouchableOpacity style={btnStyle} onPress={onPress}>
      <Text style={btnTextStyle}>{btnText}</Text>
    </TouchableOpacity>
  )
}
