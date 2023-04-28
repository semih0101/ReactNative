import { View, Text,StyleSheet } from 'react-native';
import React from 'react';
import ZarAtis from './ZarAtis';
import LinearGradient from 'react-native-linear-gradient';


const BackGround = () => {
  return (
    <View style={style.background}>     
      <LinearGradient colors={['#50c7ff','#00a8ff', '#008ade']}  style={{flex:1}}> 
      <View style={{alignItems:'center',marginTop:50}}> 
        <Text style={style.headerText}>Dice Thrower</Text>
      </View>
      <View style={style.zarOzellik}>
          <ZarAtis />    
      </View>
      </LinearGradient>
    </View>
  ) 
}

const style = StyleSheet.create({
    background:{flex:1,position:'relative'},
    zarOzellik:{
      flex:1,
      alignItems:'center',
      justifyContent:'center',
      marginRight:155,
      marginBottom:250},

    headerText:{
      fontSize:30,
      color:'#000',
      fontFamily:'Kanit-ExtraBoldItalic'
    },

})

export default BackGround;