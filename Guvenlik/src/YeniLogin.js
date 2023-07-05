import { StyleSheet, Text,View,TextInput,TouchableOpacity,SafeAreaView,StatusBar,Image} from 'react-native'
import React,{useState} from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { fonts } from './components/FONTS'
import Icon from 'react-native-vector-icons/dist/FontAwesome';


const YeniLogin = () => {
    
    const [hidePassword,setHidePassword] = useState(false);

  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar translucent backgroundColor={'rgba(0,0,0,0)'}/>
      <LinearGradient colors={['#f3eff4','#f2eff7','#f3f1f4','#eae8f2','#e2e3e8']}useAngle={true} angle={220} angleCenter={{x:0.9,y:0.3}} style={{flex:1,borderWidth:3,borderColor:'#fff',borderTopLeftRadius:37,borderTopRightRadius:37}}>
      <View style={{marginHorizontal:25}}>
        <View style={{alignItems:'center',marginTop:100}}>
        <Text style={{fontSize:35,color:'black',fontWeight:'800'}}>Hello Again!</Text>
        <Text style={{fontSize:18,color:'black',marginTop:10,fontFamily:fonts.homemadeApple}}>Welcome back you've been missed!</Text>
        </View>
        <View style={{marginTop:60}}>
            <TextInput
                style={styles.input}
                placeholder='E-Mail'
                placeholderTextColor={'#ccc'}
                autoCapitalize='none'
                autoCorrect={false} 
                keyboardType='email-address'
                value={email}
                onChangeText={e => setEmail(e)}
            />{errors.email &&( <Text style={{color:'red',opacity:0.5,marginTop:-17}}>{errors.email}</Text>)}
            <View style ={{ 
                flexDirection:'row',
                justifyContent:'flex-end',
              
                
                
                   }}>
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    placeholderTextColor={'#ccc'}
                    secureTextEntry={!hidePassword ? true : false} 
                    autoCapitalize='none' 
                    autoCorrect={false} 
                    value={password}
                    onChangeText={e => setPassword(e)} 
                />{errors.password && (<Text style={{color:'red',opacity:0.6,marginTop:-17}}>{errors.password}</Text>)}
                <TouchableOpacity activeOpacity={.8} style={{paddingHorizontal:20,position:'absolute',marginTop:21}} onPress={()=>setHidePassword(!hidePassword)}>
                            <Icon name={hidePassword ? 'eye' : 'eye-slash'}style={{fontSize:20,color:'#ccc'}}/>
                </TouchableOpacity>
            </View>
        </View>
        <View style={{alignSelf:'flex-end',paddingHorizontal:7}}><Text style={{fontWeight:'bold',color:'#474747'}}>Şifremi Unuttum</Text></View>
        <View style={{marginTop:60,alignItems:'center'}}>
            <TouchableOpacity
                style={styles.button}
                onPress={handleRegister}
            >
                <Text style={{fontWeight:'bold',color:'#fff',fontSize:15}}>Sign In</Text>
            </TouchableOpacity>
        </View>
        <View style={{marginTop:60,flexDirection:'row',marginHorizontal:30,alignItems:'center',justifyContent:'center'}}>
            <View style={{borderWidth:1,width:'30%',height:1,marginRight:'10%',borderColor:'#ccc'}}></View>
            <Text style={{fontSize:15,fontWeight:'bold',color:'#474747'}}>Or Continue With</Text>
            <View style={{borderWidth:1,width:'30%',height:1,marginLeft:'10%',borderColor:'#ccc'}}></View>

        </View>
            <View style={{marginTop:'30%',flexDirection:'row',alignSelf:'center'}}>
                <Text style={{color:'#474747',fontWeight:'800'}}>Not a member?</Text> 
                <TouchableOpacity
                   onPress={()=> navigation.navigate(AdminLogin)}
                >
                        <Text style={{color:'#9dc1f4',fontWeight:'600'}}> Register Now</Text>
                    </TouchableOpacity>
            </View>
        
      </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

export default YeniLogin

const styles = StyleSheet.create({
    input:{
        marginBottom:22,
        width:'100%',
        backgroundColor:'white',
        borderRadius:14,
        height:60,
        paddingLeft:20,
        fontWeight:'bold'},
        button:{
            height:60,
            width:'100%',
            borderRadius:14,
            backgroundColor:'#fd6b68',
            justifyContent:'center',
            alignItems:'center'

        }
})