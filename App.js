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


import Login from './Views/Login';
import OpenAPP from './Views/OpenAPP';
import Register from './Views/Register';
import Service from './Views/Service';
import Steps from './Views/Steps'

let count = 0



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
    setTimeout(async ()=>{
      try{
        const datesUser = await AsyncStorage.getItem('datesUser')
        console.log(datesUser)
        if(datesUser === null){
          login()
        }else{
          steps()
        }
      }catch(e){
  
      }
      },2000)
    
    function login(){
      setView(<Login
        openRegister={()=>{
         register()
        }}
        openService={()=>{
          steps()
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
         setView(<Service/>)
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
