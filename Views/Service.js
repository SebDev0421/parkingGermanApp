import React, {useState,useEffect} from 'react';

import{
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Image

} from 'react-native';


import MenuDrawer from '../Components/MenuDrawer';
import DrawMaps from './DrawMaps';
import Features from './features';
import OpenMenu from '../Components/OpenMenu';
import History from './History';
import Vehicules from './Vehicules';
import CreditCard from './CreditCard';
import Settings from './Settings';
import About from './About';

import EventEmitter from "react-native-eventemitter";

const BottomTab = (props)=>{
  let [tabBut,setTabBut] = useState(true)
  
  return(
    <View style={styles.BottomTab}>
      <TouchableOpacity
       style={[styles.buttonsTab,tabBut ? styles.lineunselect : styles.lineSelect]}
       onPress={()=>{
        setTabBut(false)
        props.screen(<DrawMaps/>)
      }}
      >
        <Image 
        style={{width:30,height:30}} 
        source={require('../Images/parque.png')}/>
        <Text>Descubre</Text>
      </TouchableOpacity>
      <TouchableOpacity
       style={[styles.buttonsTab,tabBut ? styles.lineSelect : styles.lineunselect]}
       onPress={()=>{
         setTabBut(true)
         props.screen(<Features/>)
       }}
      >
        <Image 
        style={{width:30,height:30}} 

        source={require('../Images/acceso.png')}/>
        <Text>Accede</Text>
      </TouchableOpacity>
  </View>
  )
}

  
const Service=()=> {
  let [views, setView] = useState(<Features/>)
  let [menuDrawer,setMenuDrawer] = useState()
  let [menuOpttions, setMenuOptions] = useState()

  useEffect(()=>{
    EventEmitter.on('CloseMenu',(data)=>{
      setMenuDrawer()
    })

    EventEmitter.on('Open',(data)=>{
      console.log(data)
      switch(data){
        case 'History':
          setMenuOptions(<History/>)
          break;
        case 'Vehicules':
          setMenuOptions(<Vehicules/>)
          break;
        case 'Credit':
          setMenuOptions(<CreditCard/>)
          break;
        case 'Settings':
          setMenuOptions(<Settings/>)
          break;
        case 'About':
          setMenuOptions(<About/>)
          break;
      }
        
      
    })

    EventEmitter.on('close',(data)=>{
      switch(data){
        case 'History':
          setMenuDrawer()
          setMenuOptions()
      }
    })
  },[])
    return (
      <View>
        
        {views}
        <BottomTab
         screen={(data)=>{
          setView(data) 
         }}
        />
        <View style={{position:'absolute',top:15,left:40}}>
             <OpenMenu
               Open={()=>{
                 setMenuDrawer(<MenuDrawer/>)
               }}
             />
            </View>   
        {menuDrawer}
        {menuOpttions}
      </View>
    );
  }

  
const styles = StyleSheet.create({
    ContainerButton:{
        alignItems:'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    ButtonLogin:{
        width:Dimensions.get('window').width*0.8,
        height:45,
        marginVertical:15,
        borderRadius:10,
        backgroundColor:'#770BC2',
        alignItems:'center',
        justifyContent:'center'
    },
    ButtonRegister:{
        width:'80%',
        height:45,
        marginVertical:15,
        borderRadius:10,
        borderWidth:1,
        borderColor:'#770BC2',
        backgroundColor:'#FFFF',
        alignItems:'center',
        justifyContent:'center'
    },
    BottomTab:{
      position:'absolute',
      top:Dimensions.get('window').height-90,
      width:Dimensions.get('window').width,
      height:70,
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      borderWidth:1,
      borderColor:'gray'
    },
    buttonsTab:{
      alignItems:'center',
      marginHorizontal:70,
      height:'90%',
      width:70
    },
    lineSelect:{
      borderTopWidth:1.5,
      borderColor:'#770BC2',
    },
    lineunselect:{
      borderTopWidth:0
    }
});

export default Service