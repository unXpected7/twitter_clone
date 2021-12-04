import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Alert, RefreshControl, Platform, Pressable } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons"
import {NewTweet} from './App/Screen'

const gambar1 = "https://th.bing.com/th/id/OIP.rRHSWX6aTkYTYWWg5BZwAAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7"
const gambar2 = "https://picsum.photos/id/237/536/354";
const gambar3 = "https://picsum.photos/seed/picsum/536/354";
const gambar4 = "https://picsum.photos/id/1084/536/354?grayscale";
const gambar5 = "https://picsum.photos/id/1060/536/354?blur=2";
const gambar6 = "https://picsum.photos/id/870/536/354?grayscale&blur=2";

export default function App() {

  const [refresh,setrefresh] = useState(false);

  const data = [{
    gambar: gambar1,
    nama: "Sholahudin d. yusuf",
    tweet: "Bacot kupyor"
  },
  {
    gambar: gambar2,
    nama: "Ery",
    tweet: "asu kupyor"
  }, {
    gambar: gambar3,
    nama: "gembus",
    tweet: "remu pyor asu"
  }, {
    gambar: gambar4,
    nama: "Ondol",
    tweet: "kupyor bab"
  }, {
    gambar: gambar5,
    nama: "Ucup",
    tweet: "Kalian kok jahat ama @kupyor"
  }, {
    gambar: gambar6,
    nama: "Kupyor",
    tweet: "Aku ganteng kaya monyet"
  }];

  const [state,setState] = useState(data);


  function Header() {
    return (
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop:30,
        paddingVertical:20,
        paddingHorizontal:10,
        borderColor:"#ffffffaa",
        borderBottomWidth:1
      }}>
        <Image
          source={{ uri: gambar1 }}
          style={{
            width: 30,
            height: 30,
            borderRadius: 100
          }}
        />
        <TouchableOpacity onPress={()=>TekanTombol("Logo Tweet")}>
          <Icon name="logo-twitter" size={30} color={"#1DA1F2"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>TekanTombol("Logo React")}>
          <Icon name="logo-react" size={30} color={"#1DA1F2"} />
        </TouchableOpacity>
      </View>
    )
  }


  function Footer() {
    return (
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical:20,
        paddingHorizontal:10,
        borderColor:"#ffffffaa",
        borderTopWidth:1
      }}>
        <TouchableOpacity onPress={()=>TekanTombol("Home")}>
          <Icon name="home" size={30} color={"#1DA1F2"} />
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>TekanTombol("Pencarian")}>
          <Icon name="search" size={30} color={"#1DA1F2"} />
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>TekanTombol("Notifikasi")}>
          <Icon name="notifications" size={30} color={"#1DA1F2"} />
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>TekanTombol("Pesan")}>
          <Icon name="mail" size={30} color={"#1DA1F2"} />
        </TouchableOpacity>
      </View>
    )
  }


  function Tweet({ gambar, nama, tweet }: { tweet: string, nama: string, gambar: string }) {
    return (
      <View
        style={{
          flexDirection: "row",
          borderBottomWidth: 1,
          borderColor: "#ffffffaa",
          paddingBottom: 10,
          marginBottom: 10,
          paddingTop:5
        }}
      >
        <Image
          source={{
            uri: gambar
          }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 100,
            marginRight: 10
          }}
        />
        <View style={{
          flex: 1,
        }}>
          <Text style={{
            color: "white",
            fontWeight: "bold",
            marginBottom: 10
          }}>{nama}</Text>

          <Text style={{
            color: "white"
          }}>
            {tweet}
          </Text>
        </View>
      </View>
    )
  }

  const FloatingActionButton = ()=>{
    return (
      <Pressable style={{
          backgroundColor:"#1DA1F2",
          position:'absolute',
          bottom:100,
          right:30,
          borderRadius:100,
          width:55,
          height:55,
          justifyContent:'center',
          alignItems: 'center',
      }}
      onPress={()=>{
        setModalVisible(true)
      }}
      >
        <Icon name="add" size={40} color="white" />
      </Pressable>
    )
  }

  //state modal
  const [modalVisible,setModalVisible] = useState(false);


  //ini tampilan utama
  return (
    <View style={{
      flex: 1,
      backgroundColor: 'black',
      justifyContent: 'space-between'
    }}>
      <StatusBar style="light" />
      <NewTweet 
      isVisible={modalVisible}
       onRequestClose={()=>{
        setModalVisible(false)
      }}
      onPress={(tweet:string)=>{
        setState((previous:any[])=>{
          const newData = previous;
          const newTweet = {
            gambar:gambar1,
            nama:"Faiz",
            tweet:tweet
          };
          newData.unshift(newTweet)
          return [...newData]
        })
      }}
      />
      <Header />
      <ScrollView 
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refresh} onRefresh={()=>{}} />}
      >
        {
          state.map(({ gambar, nama, tweet }, key) => {
            return (
              <Tweet
                key={key}
                gambar={gambar}
                nama={nama}
                tweet={tweet}
              />
            )
          })
        }
      </ScrollView>
      <Footer />
      <FloatingActionButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    paddingHorizontal: 20
  },
  faiz: { color: "white" }
});


let sdsd = (c:any,b:any)=> c+b

function anyar(c:any,b:any){ //function
  return c+b;
}

const hasil = sdsd(1,2);

const TekanTombol = (nama:string)=>{
  if(Platform.OS === "web"){
    return alert(`Kamu Menekan Tombol ${nama}`);
  } 
  Alert.alert("Info",`Kamu Menekan Tombol ${nama}`);
}