import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const ZarDetails = ({ImageSrc}) =>{
  return (
    <View style={{position:'absolute'}} >
      <Image style={style.imageWeight} source={ImageSrc}/>
    </View>
  )
}

const style = StyleSheet.create({
  imageWeight:{height:150,width:150}

})

export default ZarDetails;