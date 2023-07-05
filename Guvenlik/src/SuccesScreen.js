import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React ,{useState,useEffect}  from 'react'
import { useRoute,useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { signOut } from "firebase/auth";
import { auth,db } from './firebase-config';
import { doc, onSnapshot,getDocs,collection,addDoc,where,query,updateDoc,getDoc} from "firebase/firestore"; 


const SuccesScreen = () => {
  
  const [state,setState] = useState('');
  const [giris,setGiris] = useState();
  const [cikis,setCikis] = useState();

  const navigation = useNavigation();
  
  const exit=()=>{
    signOut(auth).then(() => {
        // Sign-out successful.
        }).catch((error) => {
        // An error happened.
        });
}
const convertToTimeString = (date) => {
  if (date instanceof Date) {
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    return `${hour}:${minute}`;
  }
  return '';
};
  
const personelİçKoleksiyon = async () => {
  try {
    // Personelin belgesini almak için sorgu 
    const personelQuery = query(
      collection(db, 'Personel'),
      where('personelId', '==', auth.currentUser.uid)
    );
    const personelSnapshot = await getDocs(personelQuery);

    if (!personelSnapshot.empty) {
      const personelDoc = personelSnapshot.docs[0];
      const personelRef = personelDoc.ref;

      // Bugünün tarihini al
      const tarih = new Date();
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Giriş çıkış koleksiyonunu al veya oluştur
      const girisCikisCollectionRef = collection(personelRef, 'GirisCikis');

      // Bugün için giriş çıkış belgesini kontrol et
      const girisCikisQuery = query(girisCikisCollectionRef, where('tarih', '==', today));
      const girisCikisSnapshot = await getDocs(girisCikisQuery);

      if (!girisCikisSnapshot.empty) {
        // Bugün için giriş çıkış belgesi zaten var
        const girisCikisDoc = girisCikisSnapshot.docs[0];
        const girisCikisRef = girisCikisDoc.ref;

        const girisCikisData = girisCikisDoc.data();
        const sonGiris = girisCikisData.giris;
        const sonCikis = girisCikisData.cikis;

        const updatedGirisCikisSnapshot = await getDoc(girisCikisRef);
        const updatedGirisCikisData = updatedGirisCikisSnapshot.data();
        const updatedGirisTarih = updatedGirisCikisData.giris;
        const updatedCikisTarih = updatedGirisCikisData.cikis;

        // Giriş ve çıkış tarihlerini ekranda gösterebilirsiniz
       
      
        
        if (sonGiris && !sonCikis) {
          // Zaten giriş yapılmış, çıkış yap
          await updateDoc(girisCikisRef, {
            cikis: tarih
          });
          setState('Personel çıkış yaptı.')

          
        } 
        else if (!sonGiris) {
          // Zaten giriş yapılmış, çıkış yap
          await updateDoc(girisCikisRef, {
            giris: tarih
          });
          setState('Personel giriş yaptı.')

          
        } 
        else if (sonGiris && sonCikis) {
          // Zaten giriş yapılmış, çıkış yap
          
          setState('Personel zaten giriş ve çıkışlarını yapmış!.')

          
        } 
        setGiris(updatedGirisTarih.toTimeString().slice(0, 5));
        setCikis(updatedCikisTarih.toTimeString().slice(0, 5));
      }
        else {
        // İlk giriş
          setState('Personel giriş yaptı.');
        await addDoc(girisCikisCollectionRef, {
          tarih: today,
          giris: tarih,
          cikis: false
        });

        
      }
    } else {
      // Personel bulunamadı
      console.log('Personel bulunamadı.');
    }
  } catch (error) {
    console.log('Giriş/çıkış işlemi hatası:', error);
  }
};

  useEffect(()=>{
  personelİçKoleksiyon();
},[])

   return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" style={styles.backIcon} />
      </TouchableOpacity>
      <View style={styles.contentContainer}>
        <Icon name="calendar-check-o" style={styles.checkIcon} />
        <Text style={styles.stateText}>{state}</Text>
        <Text style={styles.timeText}>Giriş Saati: {giris}</Text>
        <Text style={styles.timeText}>Çıkış Saati: {cikis}</Text>
        <TouchableOpacity style={styles.signOutButton} onPress={exit}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  backButton: {
    position: 'absolute',
    top: 15,
    left: 15,
  },
  backIcon: {
    color: '#333',
    fontSize: 25,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  checkIcon: {
    fontSize: 100,
    marginBottom: 50,
    color: '#666',
  },
  stateText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 50,
    color: '#333',
    textAlign: 'center',
  },
  timeText: {
    fontSize: 19,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  signOutButton: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default SuccesScreen;