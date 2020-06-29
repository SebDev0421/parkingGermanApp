import React,{useEffect,useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  PermissionsAndroid
} from 'react-native';


import Login from './Views/Login';
import OpenAPP from './Views/OpenAPP';
import Register from './Views/Register';
import Service from './Views/Service';


const App = () => {
  let [view,setView]=useState(<OpenAPP/>)
  useEffect(async ()=>{
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
    setTimeout(()=>{setView(<Login
      openRegister={()=>{
        register()
      }}

      openService={()=>{
        service()
      }}
    />)},2000)

    function login(){
      setView(<Login
        openRegister={()=>{
         register()
        }}
        openService={()=>{
          service()
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

    
  },[])

  return (
    
     <View>
       {view}
     </View>
  );
};

export default App;
