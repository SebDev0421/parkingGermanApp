import React, {useState} from 'react';

import{
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Image

} from 'react-native';


import DrawMaps from './DrawMaps';
import Features from './features';

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
    return (
      <View>
        
        {views}
        <BottomTab
         screen={(data)=>{
          setView(data) 
         }}
        />
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
      elevation:1,
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