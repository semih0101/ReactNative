import React, { useState,useEffect } from 'react';
import { View,Text,SafeAreaView,StyleSheet,TouchableOpacity,} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { doc, onSnapshot,getDocs,collection,addDoc,where,query,updateDoc,getDoc} from "firebase/firestore"; 
import { useNavigation } from '@react-navigation/native';
import{ fonts }from './components/FONTS.js'
import { auth,db } from './firebase-config.js';

const {audiowide,gloria,homemadeApple,luckiestGuy,monoton,righteous,rockSalt,rubikWet} = fonts;

function QRCodeScannerScreen(){
  console.log(12231232)
 //tarih
  // const [currentDate, setCurrentDate] = useState('');
  const [user,setUser] = useState('');
  const [state,setState] = useState('');
  // useEffect(() => {
  //   var date = new Date().getDate(); //Current Date
  //   var month = new Date().getMonth() + 1; //Current Month
  //   var year = new Date().getFullYear(); //Current Year
  //   var hours = new Date().getHours(); //Current Hours
  //   var min = new Date().getMinutes(); //Current Minutes
  //   var sec = new Date().getSeconds(); //Current Seconds
  //   setCurrentDate(
  //     date + '/' + month + '/' + year 
  //     + ' ' + hours + ':' + min + ':' + sec
  //   );
  // }, [currentDate,navigation]);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'Personel', auth.currentUser.uid), (doc) => {
      setUser(doc.data().username);
    });

    return () => unsubscribe(); // Cleanup fonksiyonu, bileşen kaldırıldığında snapshot dinlemeyi durdurur
  }, []);
 
  const navigation = useNavigation();
  onSuccess = async e =>  {
      
        if(e.data == "https://www.youtube.com/" )
      {   
        navigation.navigate('SuccesScreen',{durum:state})    
      }
      else{
        alert('başka bir id')
        reactivateTimeout=2000  
      }
    };
  
    
      return (
        <QRCodeScanner
        onRead={this.onSuccess}
        permissionDialogTitle='Gripenguen ekibi olarak Kamera kullanımı için izninize ihtiyacımız var :)'
        reactivate={true}
        reactivateTimeout={5000}
        showMarker={true}
        ref={(node) => { this.scanner = node }}
        zoom ='1'
        // onBarcodeRead={onSuccess}
        topContent={
          <View style={{marginBottom:'13%'}}>
           
              <Text style={styles.centerText}>
                Merhaba {user}
              <Text >  </Text> 
              
            </Text>
            <Text style={styles.normalText}>Lütfen Şirket girişindeki QR kodunu okut !</Text>
          </View>
          
          }
          bottomContent={
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity style={styles.buttonTouchable} >
              <Text style={styles.buttonText}>loglama</Text>
            </TouchableOpacity>    
            </View>
          }
        />
      );
  
}
  
  const styles = StyleSheet.create({
    centerText: {
      
      fontSize: 18,
      color: '#000',
      fontFamily:fonts.luckiestGuy
    },
    textBold: {
      fontWeight: '500',
      color: '#000',
      fontFamily:fonts.luckiestGuy
    },
    normalText:{
      fontSize:16,
      color: '#000',
    },
    buttonText: {
      fontSize: 21,
      color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
      padding: 16
    }
  });

  export default QRCodeScannerScreen;
