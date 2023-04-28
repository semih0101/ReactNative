import { View,StyleSheet,TouchableHighlight, Text } from 'react-native'
import React,{useState} from 'react'
import ZarDetails from '../components/ZarDetails'


const ZarAtis =()=>{
  const [zarnumber ,setZarnumber] = useState(1)
  
  const images= [
    {image :require('../imagess/1.png')},
    {image :require('../imagess/2.png')},
    {image :require('../imagess/3.png')},
    {image :require('../imagess/4.png')},
    {image :require('../imagess/5.png')},
    {image :require('../imagess/6.png')},
    
  ];
  console.log(zarnumber)
  
  return (
      <View>
        <View>
          <TouchableHighlight onPress={()=>{
              setZarnumber(Math.floor(Math.random()*6))
              }}> 
            <ZarDetails ImageSrc={images[zarnumber].image}/>
          </TouchableHighlight>
        </View>
        <View style={{position:'absolute',marginTop:200,marginLeft:45}}>
          <TouchableHighlight style={style.button} onPress={()=>{setZarnumber(Math.floor(Math.random()*6))}}>
            <Text style={style.buttonText}>Throw</Text>
          </TouchableHighlight>
        </View>
       </View> 
  )
}




const style = StyleSheet.create({

  button:{
  backgroundColor:'#00a8ff',
  paddingVertical:5,
  paddingHorizontal:10,
  borderRadius:5},

  buttonText:{
  color:'#fff',
  fontFamily:'Kanit-BoldItalic'}

})

export default ZarAtis;