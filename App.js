import React,{useEffect,useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import Login from './Views/Login';
import OpenAPP from './Views/OpenAPP';
import Register from './Views/Register';
import Service from './Views/Service';


const App = () => {
  let [view,setView]=useState(<OpenAPP/>)
  useEffect(()=>{
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
    
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        {view}
      </SafeAreaView>
    </>
  );
};

export default App;
