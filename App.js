import React,{useEffect,useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  PermissionsAndroid,
  Button,
  AsyncStorage
} from 'react-native';

import EventEmmitter from 'react-native-eventemitter'
import jwt from 'react-native-pure-jwt'

import Login from './Views/Login';
import OpenAPP from './Views/OpenAPP';
import Register from './Views/Register';
import Service from './Views/Service';
import Steps from './Views/Steps'

let count = 0

const URI = 'http://192.168.1.67:3000/ParkingApp/API/99042101849'
const KEY_API = '99042101849'

const App = () => {
  let [view,setView]=useState(<OpenAPP/>)
  useEffect(async ()=>{
    console.disableYellowBox = true
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location permission is required for WiFi connections',
        message:
          'This app needs location permission as this is required  ' +
          'to scan for wifi networks.',
        buttonNegative: 'DENY',
        buttonPositive: 'ALLOW',
      },
);
if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    // You can now use react-native-wifi-reborn
} else {
    // Permission denied
}
    setTimeout(()=>{
      passStep()
      },2000)


    EventEmmitter.on('closeService',()=>{
      login()
    })

    async function passStep(){
      try{
        const datesUser = await AsyncStorage.getItem('datesUser')
        
        if(datesUser === null){
          login()
        }else{
          const jumpStep = await AsyncStorage.getItem('flagStep')
          if(jumpStep === null){
            const datesParse = JSON.parse(datesUser)
            jwt.sign({email:datesParse.email},KEY_API,{alg:'HS256'})
            .then(token=>{
              fetch(URI+'/vehicules/read/app',{
                method:'PUT',
                body:JSON.stringify({token:token}),
                headers:{
                  'Content-Type':'Application/json'
                }
              }).then(res => res.json())
                .then(async (res)=>{
                   if(res.length > 0){
                    console.log('pass')
                    try{
                      await AsyncStorage.setItem('flagStep','pass')
                      service()
                    }catch(e){
                      console.log(e)
                    }
                   }else{
                     steps()
                   }
                })
                .catch(e => {console.log(e)})
            })
       }else{
         service()
       }
        }
      }catch(e){
      }
    }
    
    
    function login(){
      setView(<Login
        openRegister={()=>{
         register()
        }}
        openService={()=>{
          passStep()
        }}
      />)
    }

    function register(){
      setView(<Register
       openLogin={()=>{
         login()
       }}
      />)
    }

    function service(){
      setView(<Service/>)
    }

    function steps(){
      setView(<Steps
       OpenService={()=>{
         service()
       }}
      />)
    }

    
  },[])

  return (
    
     <View>
       {view}
     </View>
  );
};

export default App;
