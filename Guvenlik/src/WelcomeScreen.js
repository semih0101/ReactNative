import { StyleSheet, Text, View,TextInput,TouchableOpacity,SafeAreaView,StatusBar,Image} from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import LoginScreen from './LoginScreen'
import SignUpScreen from './SignUpScreen'



const WelcomeScreen = ({navigation}) => {
  return (
      <SafeAreaView style={{flex:1}}>
        <StatusBar translucent backgroundColor={'rgba(0,0,0,0)'}/>
        <LinearGradient colors={['#f3eff4','#f2eff7','#f3f1f4','#eae8f2','#e2e3e8']}useAngle={true} angle={220} angleCenter={{x:0.9,y:0.3}} style={{flex:1,borderWidth:3,borderColor:'#fff',borderTopLeftRadius:37,borderTopRightRadius:37}}>
        <View style={{height:'48%',margin:8,borderRadius:32}}>
        <LinearGradient colors={['#38fff2','#38fff2','#38fff2','#38fff2','#7bd1f8','#84baee','#b3aafd','#dda2ff']}useAngle={true} angle={220} angleCenter={{x:0.5,y:0.3}} style={{flex:1,borderRadius:27,elevation:6}}>
          <Image style={{alignSelf:'center',marginTop:'15%'}} source={require('./images/4.png')}/>
          </LinearGradient>
        </View>
        
            <View style={{alignItems:'center',marginTop:60,marginHorizontal:'10%'}}>
              <Text style={{marginBottom:-5,fontSize:36,fontWeight:'bold',color:'black'}}>QR Kod İle</Text>
              <Text style={{marginBottom:30,fontSize:36,fontWeight:'bold',color:'black'}}>Hızlı Giriş Yapın!</Text>
              <Text style={{fontWeight:600,color:'gray'}}>QR Kod Giriş Çıkış Uygulamasına hoş geldiniz!</Text>
              <Text style={{fontWeight:600,color:'gray'}}>Sadece QR kodunuzu taratarak hızlı ve pratik bir şekilde giriş yapabilirsiniz. </Text>
              <Text style={{fontWeight:600,color:'gray'}}>Haydi, QR kodunuzu taratın ve işe hızlı bir başlangıç yapın!</Text>
              <View style={{marginTop:'13%',width:'99%',borderWidth:1,height:60,borderRadius:14,borderColor:'#fff'}}>
                <TouchableOpacity 
                    activeOpacity={0.7}
                    style={styles.register}
                    onPress={()=>navigation.navigate(SignUpScreen)}
                    >
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7} 
                  style={styles.signIn}
                  onPress={()=>navigation.navigate(LoginScreen)}
                  >
                  <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
        </LinearGradient>
    </SafeAreaView>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
  signIn:{
    position:'absolute',
    height:58,
    borderColor:'black',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:40,
    alignSelf:'flex-end',
    backgroundColor:'#e2e3e8',
    width:'50%'},
  register:{
    position:'absolute',
    height:58,
    borderColor:'black',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:12,
    backgroundColor:'#fff',
    width:'50%'},
  buttonText:{color:'black',fontWeight:'bold'},
})