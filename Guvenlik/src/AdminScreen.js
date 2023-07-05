import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity,StyleSheet } from 'react-native';
import { collection, query, where, getDocs,orderBy } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import {auth, db } from './firebase-config';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { signOut } from 'firebase/auth';

const AdminScreen = () => {
    const [personeller, setPersoneller] = useState([]);

    const exit=()=>{
        signOut(auth).then(() => {
            // Sign-out successful.
            }).catch((error) => {
            // An error happened.
            });
    }
  
    useEffect(() => {
        getPersoneller();
      }, []);
    
     
    
      const getPersoneller = async () => {
        try {
          const personellerQuery = query(collection(db, 'Personel'));
          const personellerSnapshot = await getDocs(personellerQuery);
          const personellerData = [];
    
          personellerSnapshot.forEach((doc) => {
            personellerData.push({
              id: doc.id,
              ad: doc.data().username,
            });
          });
          setPersoneller(personellerData);
        } catch (error) {
          console.log('Personelleri alma hatası:', error);
        }
      };
    
      const getGirisCikisBilgileri = async (personelId) => {
        try {
          const q = query(
            collection(db, 'GirisCikis'),
            where('personelId', '==', personelId)
          );
    
          const querySnapshot = await getDocs(q);
          const gecisBilgileri = [];
    
          querySnapshot.forEach((doc) => {
            const gecis = doc.data();
            gecisBilgileri.push(gecis);
            
        });
          console.log(querySnapshot)
          return gecisBilgileri;
        } catch (error) {
          console.error('GirisCikis bilgileri alınamadı:', error);
          return [];
        }
      };
    
      const handlePersonelPress = async (personelId) => {
        try {
          const gecisler = await getGirisCikisBilgileri(personelId);
          console.log('Gecisler:', gecisler);
        } catch (error) {
          console.log('Kayıtları alırken bir hata oluştu:', error);
        }
      };
    
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Personeller</Text>
            <Icon name="close" size={24} color="black" onPress={exit} />
          </View>
          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Personel Adı</Text>
            </View>
            <FlatList
              data={personeller}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => handlePersonelPress(item.id)}
                  style={[
                    styles.row,
                    index % 2 === 0 ? styles.evenRow : styles.oddRow,
                  ]}
                >
                  <Text style={styles.personelAdi}>{item.ad}</Text>
                  <Text style={styles.personelDetay}>Detay</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
      },
      headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
      },
      tableContainer: {
        flex: 1,
      },
      tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#f0f0f0',
        marginBottom: 8,
        borderRadius: 4,
      },
      tableHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#f0f0f0',
        borderRadius: 4,
      },
      evenRow: {
        backgroundColor: '#f9f9f9',
      },
      oddRow: {
        backgroundColor: '#fff',
      },
      personelAdi: {
        fontSize: 16,
        color: 'black',
      },
      personelDetay: {
        fontSize: 14,
        color: 'blue',
      },
    });
    
    export default AdminScreen;
  

