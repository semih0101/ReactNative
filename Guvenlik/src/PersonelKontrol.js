import { doc, onSnapshot,getDocs,collection,addDoc,where,query,updateDoc,getDoc} from "firebase/firestore";
import { auth,db } from './firebase-config.js';

const currentDate = new Date


export const personelİçKoleksiyon = async () => {
   
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
              cikis: currentDate
            });
          console.log('Personel çıkış yaptı.')
  
            
          } 
          else if (!sonGiris) {
            // Giriş yapılmamış, giriş yap
            await updateDoc(girisCikisRef, {
              giris: currentDate
            });
            console.log('Personel giriş yaptı.');
  
          }
          
        }
      
          
           else {
          // İlk giriş
          await addDoc(girisCikisCollectionRef, {
            tarih: today,
            giris: currentDate,
            cikis: false
          });
  
          console.log('Personel giriş yaptı.');
        }
      } else {
        // Personel bulunamadı
        console.log('Personel bulunamadı.');
      }
        console.log('Giriş tarihi:', updatedGirisTarih);
        console.log('Çıkış tarihi:', updatedCikisTarih);
    } catch (error) {
      console.log('Giriş/çıkış işlemi hatası:', error);
    }
  };
  export default personelİçKoleksiyon;