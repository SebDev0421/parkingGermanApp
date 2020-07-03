import React, {useEffect,useState} from 'react';
import{
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    AsyncStorage
} from 'react-native';

import wifi from 'react-native-android-wifi';

import FloatingButton from '../Components/FloatingButton';
import BackgroundTimer from 'react-native-background-timer';
import jwt from "react-native-pure-jwt";

import { cos } from 'react-native-reanimated';



function processData(data){
  const token = JSON.parse(data) 
  console.log(token)
  jwt.decode(
    token.data.code,
    '12345678',
    {
      skipValidation: true // to skip signature and exp verification
    }
  ).then(async (e)=>{
    const date = new Date()
    const parameters= JSON.stringify({status:'[ACTIVE]',hourInit:date.getHours(),minuteInit:date.getMinutes(),tariff:65,lot:e.building,address:e.address_one})
    try{
        await AsyncStorage.setItem('services',parameters)
    }catch(error){
        console.log(error)
    }
  }) // already an object. read below, exp key note
  .catch(console.error);
}

function connectedWebSocket(){
  const ws = new WebSocket('ws://192.168.4.1:8900/')
  console.log('Connecting to socket...')
  ws.addEventListener('open',()=>{
        console.log('conected')
        ws.send(JSON.stringify({
          type: 'init_connect_static',
          data: { idn: 'ece61316a220' }
      }))
  })

  ws.addEventListener('message',(data)=>{
    processData(data.data)
    const date = new Date()
    const mytm=date.getTime()/1000;
    ws.send(JSON.stringify({
	    type: 'entrada',
	    data: {
		   idn: "ece61316a219",
		   plate: 'XLK789',
		   start_date: mytm,
	     user_id: "ece61316-a219-48d2-b0e4-61e1fce25f4d",
	     start_service_type: 100
	}
  }))
    
  })
}

const PrymaryView = (props)=>{
  return(
    <View style={styles.ContainerButton}>
    <View style={styles.RadiusWallp}>
            <Text style={{color:'white',fontSize:14,fontWeight:'bold'}}>Hola Juan Conectate a un parqueadero</Text>
          </View>
            <View>
            <View>
            <TouchableOpacity
             onPress={async()=>{
                wifi.loadWifiList((WifiList)=>{
                    const ArrayWiFi = JSON.parse(WifiList)
                    ArrayWiFi.map((values)=>{
                        if(values.SSID === "NidooAP"){
                            wifi.findAndConnect(values.SSID,'12345678',async (found)=>{
                                if(found){
                                    
                                     setTimeout(()=>{connectedWebSocket()},2000)
                      
                                }else{
                                    console.log('wifi is not in range')
                                }
                            })
                        }
                    })    
                },(err)=>{console.log(err)})
             }}
             style={styles.ButtonLogin}
            >
                <Text style={{color:'white'}}>Conectate</Text>
            </TouchableOpacity>
            </View>
            </View>
            <View style={styles.Floating}>
             <FloatingButton/>
            </View>
             
            </View>
  )
}

const Clocks = (props)=>{
  return(
    
<View style={styles.ContainerButton}>
<View style={styles.RadiusWallp}>
 <Text style={{color:'white',fontSize:14,fontWeight:'bold'}}>Tiempo transcurrido</Text>
  <Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{props.hour}H y {props.minutes}M</Text>
  <Text style={{color:'white',fontSize:14,fontWeight:'bold'}}>Costo</Text>
  <Text style={{color:'white',fontSize:25,fontWeight:'bold'}}>${props.cost}</Text>
</View>
            <View>
            <View
             style={styles.DatesShow}
            >
              <Text style={styles.datesTitle}>Nombre parqueadero</Text>
              <Text style={styles.datesPass}>{props.nameLot}</Text>
              <Text style={styles.datesTitle}>Direccion</Text>
              <Text style={styles.datesPass}>{props.address}</Text>
              <Text style={styles.datesTitle}>Tarifa</Text>
              <Text style={styles.datesPass}>${props.tariff} peso /minuto</Text>
            </View>
            <View>
            <TouchableOpacity
             onPress={async()=>{
             
              wifi.findAndConnect("NidooAP",'12345678',async (found)=>{
                                if(found){
                                    const date = new Date()
                                    try{
                                      await AsyncStorage.setItem('services','')
                                    }catch(e){
                                      console.log(e)
                                    }
                                    console.log('Wifi is in range')
                                    props.Pay()
                                    
                                }else{
                                    console.log('wifi is not in range')
                                    try{
                                      await AsyncStorage.setItem('services','')
                                    }catch(e){
                                      console.log(e)
                                    }
                                    props.Pay()
                                }
                            })
             }}
             style={styles.buttonPay}
            >
                <Text style={{color:'white'}}>Pagar</Text>
            </TouchableOpacity>
            </View>
            </View>
            </View>
)
}



const Features = (props)=>{
  let [refrehs, setRefresh] = useState()
  useEffect(()=>{
    function OpenClokc(data){
      
    if(data !== null){
      const dates = JSON.parse(data)
      const dateActully = new Date()
      const hoursActually = dateActully.getHours()
      const minutesActually = dateActully.getMinutes()
      const dh = (hoursActually)-(dates.hourInit)
      const dm = (minutesActually)-(dates.minuteInit)
      const c = (dh*60+dm)*dates.tariff
      setRefresh(<Clocks
        hour={dh}
        minutes={dm}
        cost={c}
        Pay={()=>{
          openPrymary()
       }}
      />)
    }else{
      openPrymary()
    }
    }

    function openPrymary(){
        setRefresh(<PrymaryView/>)
      
    }


    BackgroundTimer.setInterval(async()=>{
      
      const parameters = await AsyncStorage.getItem('services')
      const parametersParse = JSON.parse(parameters)
      const dateActual = new Date()
      const hoursActual = dateActual.getHours()
      const minutesActual = dateActual.getMinutes()
      if(parameters !== null){
       const dhB = (hoursActual*100+minutesActual)-(parametersParse.hourInit*100+parametersParse.minuteInit)
       const hourTime = parseInt(dhB/100)
       const minutesTime = parseInt(((dhB/100)-hourTime)*100)
       const cB = parseInt((hourTime*60+minutesTime)*parametersParse.tariff)
       setRefresh(<Clocks
        hour={hourTime}
        minutes={minutesTime}
        cost={cB}
        Pay={()=>{
          openPrymary()
          
       }}
       />)
      }else{
        openPrymary()
      }
    },1000)
  },[])
    return(
        <View>
          
          {refrehs}
        </View>
    )
}

const styles = StyleSheet.create({
    ContainerButton:{
        alignItems:'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
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
    Floating:{
      position:'absolute',
      bottom:170,
      right:55,
    },
    RadiusWallp:{
      width:Dimensions.get('window').width,
      backgroundColor:'#770BC2',
      height:Dimensions.get('window').height*0.4,
      borderBottomEndRadius:200,
      justifyContent:'center',
      alignItems:'center'
    },
    buttonPay:{
      width:Dimensions.get('window').width*0.8,
      height:45,
      marginVertical:15,
      borderRadius:10,
      backgroundColor:'#1E6093',
      alignItems:'center',
      justifyContent:'center'
    },
    DatesShow:{
      marginVertical:20,
      width:Dimensions.get('window').width*0.8,
      borderWidth:1,
      borderColor:'#770BC2',
      borderRadius:10,
      alignItems:'center',
      justifyContent:'center'
    },
    datesTitle:{
      marginVertical:5
    },
    datesPass:{
      marginVertical:5
    }
});

export default Features