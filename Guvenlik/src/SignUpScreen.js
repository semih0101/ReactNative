import {StyleSheet, Text, TextInput, View ,SafeAreaView,StatusBar,TouchableOpacity} from 'react-native'
import React,{useState}from 'react'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import{ fonts }from './components/FONTS.js'
import { doc, setDoc,addDoc,collection, updateDoc, Timestamp,deleteDoc,onSnapshot,getDocs} from "firebase/firestore"; 
import { auth,db } from './firebase-config';
import { createUserWithEmailAndPassword } from "firebase/auth";
import LoginScreen from './LoginScreen.js';
import { useNavigation } from '@react-navigation/native';



const SignUpScreen = () => {
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [errors,setErrors] = useState({});
    const [hidePassword,setHidePassword] = useState();
    const [showErrors,setShowErrors] = useState(false);

    const registerUser = async () => {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          
        
          console.log('Kullanıcı kaydedildi:', user.uid);
          const userRef = doc(db,'Personel',user.uid)
          const userData = {
            username: username,
            email: email,
            password: password,
            personelId:user.uid,
            register: Timestamp.fromDate(new Date())
          }
          setDoc(userRef,userData,user.uid)
            .then(()=>{
              console.log('Kullanıcı başarıyla kaydedildi')
            })
            .catch((error) => {
              console.log('Firestore kayıt hatası:', error);
              // Firestore kayıt hatası
            });

          }).then(()=>{
            console.log('data eklendi')
          }).catch((error)=>{console.log(error)
  
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error)
          // ..
        });
        
      } 
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
    const handleRegister = ()=>{
      const errors = getErrors(email,password)
      if(Object.keys(errors).length>0){
          setShowErrors(true)
          setErrors(showErrors && errors)
          console.log(errors)
      }else{
          setErrors({});
          setShowErrors(false)
          registerUser;
      }
    }
  
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
                    <Text style={styles.loginText}>Kaydol</Text>
                </View>
                <View style={{paddingTop:'20%'}}>
                  <TextInput 
                        style={styles.Input}
                        placeholder='İsim'
                        value={username}
                        onChangeText={e => setUsername(e)}
                        placeholderTextColor={'black'}
                        autoCapitalize='none'
                        autoCorrect={false} 
                           />
                    <TextInput 
                        style={styles.Input}
                        placeholder='E-posta'
                        keyboardType='email-address'
                        value={email}
                        onChangeText={e => setEmail(e)}
                        placeholderTextColor={'black'}
                        autoCapitalize='none'
                        autoCorrect={false} 
                           />{errors.email &&( <Text style={{color:'red',opacity:0.6,marginTop:-10}}>{errors.email}</Text>)}
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
                    {errors.password && (<Text style={{color:'red',opacity:0.6,marginTop:-10}}>{errors.password}</Text>)}
                </View>
                <View style={{alignSelf:'center',marginTop:30}}>
                    <TouchableOpacity 
                        style={styles.button}
                        activeOpacity={0.8}>
                        <Text style={{color:'white',fontFamily:fonts.righteous}} onPress={registerUser}>Kaydol</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      
                      style={{marginTop:50}}
                      activeOpacity={0.8}>
                       <Text style={{color:'black',fontFamily:fonts.righteous}} onPress={()=> navigation.navigate(LoginScreen)}>Giriş Sayfasına git</Text> 
                    </TouchableOpacity>
                </View>
    
            </View>
        </SafeAreaView>
      )
    }

export default SignUpScreen

const styles = StyleSheet.create({
  icon:{position:'absolute',fontSize:80,marginTop:-90,},
  headerText:{color:'#fff',fontSize:35,fontFamily:fonts.righteous,textShadowColor:'rgba(0, 0, 0, 0.75)',},
  loginText:{color:'black',fontSize:35,fontFamily:fonts.righteous},
  headerView:{position:'absolute',alignSelf:'center',backgroundColor:'#3bc5fc',width:'100%',height:250},
  loginView:{height:'100%',marginTop:200,backgroundColor:'#fff',borderTopRightRadius:50,borderTopLeftRadius:50,paddingHorizontal:30},
  Input:{
     color:'black',
     borderBottomWidth:2,
     marginBottom:30,
     borderBottomRightRadius:10,
     borderBottomLeftRadius:10,
     fontFamily:fonts.righteous,
     
 },
 button:{height:40,backgroundColor:'#3bc5fc',justifyContent:'center',alignItems:'center',alignSelf:'center',height:40,width:100,borderRadius:10,}
 })