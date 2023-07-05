import { SafeAreaView, StyleSheet, TextInput, View,Text, TouchableOpacity, StatusBar,ToastAndroid} from 'react-native'
import React,{useState,useEffect} from 'react'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { fonts } from '../components/FONTS';
import { useNavigation } from '@react-navigation/native';
import {  signInWithEmailAndPassword } from "firebase/auth";
import { doc, onSnapshot,getDocs,collection,addDoc,where,query,updateDoc,getDoc} from "firebase/firestore"; 
import { auth,db } from '../firebase-config';
// import SignUpScreen from './SignUpScreen.js';
const {audiowide,gloria,homemadeApple,luckiestGuy,monoton,righteous,rockSalt,rubikWet} = fonts;

const AdminLogin = () => {
    const [kullanıcı,setKullanıcı] = useState('');
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
            if (user.uid === 'bVxDvUOE9cN9qmGFLIdeXyV2TBT2') {
                navigation.navigate('AdminScreen');
              } else {
                ToastAndroid.show('Admin kullanıcısı değilsiniz!', ToastAndroid.SHORT);
                auth.signOut(); // Oturumu kapat
              }
        
            // auth.currentUser.uid === 'bVxDvUOE9cN9qmGFLIdeXyV2TBT2' ? alert('Merhaba') : alert('Yanlış girdin gardaşım')
            
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
    // auth.currentUser.uid === 'bVxDvUOE9cN9qmGFLIdeXyV2TBT2' ? console.log('Merhaba Hüseyin Bey') : console.log('Yanlış Girdin Gardaş') 
    // useEffect(() => {
    //     const unsubscribe = onSnapshot(doc(db, 'Admin', auth.currentUser.uid), (doc) => {
           
            
    //     });
    
    //     return () => unsubscribe(); // Cleanup fonksiyonu, bileşen kaldırıldığında snapshot dinlemeyi durdurur
    //   }, []);
    
    const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex:1}}>
        <View style={styles.headerView}>
            <StatusBar translucent backgroundColor={'rgba(0,0,0,0)'}/>
            <View style={{alignItems:'center',marginTop:'35%',}}>
                <Icon name='calendar-plus-o' style={styles.icon}/>
                <Text style = {styles.headerText}>TimeLog</Text>
            </View>
        </View>
        <View style={styles.loginView}>
            <View style={{position:'absolute',marginTop:12,marginLeft:30}}>
                <Text style={styles.loginText}>Giriş Yap</Text>
            </View>
            <View style={{paddingTop:'40%'}}>
                <TextInput 
                    style={styles.Input}
                    placeholder='E-posta'
                    keyboardType='email-address'
                    value={email}
                    onChangeText={e => setEmail(e)}
                    placeholderTextColor={'black'}
                    autoCapitalize='none'
                    autoCorrect={false} 
                       />{errors.email &&( <Text style={{color:'red',opacity:0.5,marginTop:-17}}>{errors.email}</Text>)}
                  <View style= {{
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'space-between',
                    width:'100%',
                    borderBottomWidth:2,
                    borderBottomRightRadius:10,
                    borderBottomLeftRadius:10,
                    marginBottom:30
                    }}>
                  <TextInput  
                    style={{fontFamily:fonts.righteous, width:'85%',color:'black'}}
                    placeholder='Parola'
                    value={password}
                    onChangeText={e => setPassword(e)} 
                    placeholderTextColor={'black'} 
                    secureTextEntry={!hidePassword ? true : false} 
                    autoCapitalize='none' 
                    autoCorrect={false} />
                    <TouchableOpacity activeOpacity={.8} style={{paddingHorizontal:10}} onPress={()=>setHidePassword(!hidePassword)}>
                        <Icon name={hidePassword? 'eye' : 'eye-slash'}style={{fontSize:20,color:'black'}}/>
                    </TouchableOpacity>
                  </View>  
                {errors.password && (<Text style={{color:'red',opacity:0.6,marginTop:-17}}>{errors.password}</Text>)}
            </View>
            <View style={{alignSelf:'center',marginTop:30}}>
                <TouchableOpacity 
                    style={styles.button}
                    activeOpacity={0.8}>
                    <Text style={{color:'white',fontFamily:fonts.righteous}} onPress={handleSignIn}>Giriş Yap</Text>
                </TouchableOpacity>
               
            </View>

        </View>
    </SafeAreaView>
  )
}

export default AdminLogin



const styles = StyleSheet.create({
 icon:{position:'absolute',fontSize:80,marginTop:-90,},
 headerText:{color:'#fff',fontSize:35,fontFamily:fonts.righteous,textShadowColor:'rgba(0, 0, 0, 0.75)',},
 loginText:{color:'black',fontSize:35,fontFamily:fonts.righteous},
 headerView:{position:'absolute',alignSelf:'center',backgroundColor:'red',width:'100%',height:250},
 loginView:{height:'100%',marginTop:200,backgroundColor:'#fff',borderTopRightRadius:50,borderTopLeftRadius:50,paddingHorizontal:30},
 Input:{
    color:'black',
    borderBottomWidth:2,
    marginBottom:30,
    borderBottomRightRadius:10,
    borderBottomLeftRadius:10,
    fontFamily:fonts.righteous,
    
},
button:{height:40,backgroundColor:'red',justifyContent:'center',alignItems:'center',alignSelf:'center',height:40,width:100,borderRadius:10,}
})