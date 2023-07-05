import { SafeAreaView, StyleSheet, TextInput, View,Text, TouchableOpacity, StatusBar,ToastAndroid} from 'react-native'
import React,{useState} from 'react'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import{ fonts }from './components/FONTS.js'
import { useNavigation } from '@react-navigation/native';
import {  signInWithEmailAndPassword } from "firebase/auth";
import { auth,db } from './firebase-config';
import AdminLogin from './admin/AdminLogin.js';
import WelcomeScreen from './WelcomeScreen.js';
import LinearGradient from 'react-native-linear-gradient'
// import SignUpScreen from './SignUpScreen.js';
const {audiowide,gloria,homemadeApple,luckiestGuy,monoton,righteous,rockSalt,rubikWet} = fonts;

const LoginScreen = () => {
 
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [hidePassword,setHidePassword] = useState();
    const [showErrors,setShowErrors] = useState(false);
    const [errors,setErrors] = useState({});

    const getErrors = (email,password) =>{
        const errors = {};
        if(!email){
            errors.email = 'Lütfen E-Posta Girin!';
        }else if(!email.includes('@') && !email.includes('.com')){
            errors.email = 'Lütfen Geçerli bir E-Posta Girin!';
        }
        if(!password){
            errors.password = 'Lütfen Şifre girin!';
        }else if(password.length<6){
            errors.password = 'Şifre en az 6 karakter olmalı';
        }

        return errors;
    };
    const handleRegister =()=>{
        const errors = getErrors(email,password)
        if(Object.keys(errors).length>0){
            setShowErrors(true)
            setErrors(showErrors && errors)
            console.log(errors)
        }else{
            setErrors({});
            setShowErrors(false)
            handleSignIn()
        }
    
        

    }
    const handleSignIn =async () =>{
        await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
            // Signed in 
            const user = userCredential.user;
            
            console.log('girildi')
            // ...
        })
        .catch(error =>{
            if(error.code === 'auth/user-not-found'){
                setErrors({email:'Böyle bir kullanıcı yok!'})
                console.log(error.code);
                return;
            }
            if(error.code === 'auth/wrong-password'){
                setErrors({password:'Yanlış şifre!'})
                return;
            }
            
        });
            
    }

    const navigation = useNavigation();
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
                        />
                    <TouchableOpacity activeOpacity={.8} style={{paddingHorizontal:20,position:'absolute',marginTop:21}} onPress={()=>setHidePassword(!hidePassword)}>
                                <Icon name={hidePassword ? 'eye' : 'eye-slash'}style={{fontSize:20,color:'#ccc'}}/>
                    </TouchableOpacity>
                </View>{errors.password && (<Text style={{color:'red',opacity:0.6,marginTop:-17}}>{errors.password}</Text>)}
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
                <View style={{marginTop:'31%',flexDirection:'row',alignSelf:'center'}}>
                    <Text style={{color:'#474747',fontWeight:'800'}}>Administrator Account?</Text> 
                    <TouchableOpacity
                       onPress={()=> navigation.navigate(WelcomeScreen)}
                    >
                            <Text style={{color:'#9dc1f4',fontWeight:'600'}}>Login Now</Text>
                        </TouchableOpacity>
                </View>
            
          </View>
          </LinearGradient>
        </SafeAreaView>
      )
}

export default LoginScreen



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