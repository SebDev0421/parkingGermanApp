import React, {useEffect,useState} from 'react';
import{
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    AsyncStorage,
    Image
} from 'react-native';

import wifi from 'react-native-android-wifi';

import FloatingButton from '../Components/FloatingButton';
import BackgroundTimer from 'react-native-background-timer';
import jwt from "react-native-pure-jwt";
import SetAlert from '../Components/SetAlert'

import { cos } from 'react-native-reanimated';
import ScanQr from './scanQr';


import EventEmmitter from 'react-native-eventemitter';
import {LocalNotification} from '../src/LocalPushNotification';



let flag = 0
const dateNow = new Date()
const HourOpenApp = dateNow.getTime()



async function processData(data){
  const token = JSON.parse(data) 
  console.log(token)
  if(flag === 0){
  jwt.decode(
    token.data.code,
    '12345678',
    {
      skipValidation: true // to skip signature and exp verification
    }
  ).then(async (e)=>{
    const date = new Date()
    const parameters= JSON.stringify({status:'[ACTIVE]',hourInit:date.getHours(),minuteInit:date.getMinutes(),time:date.getTime(),tariff:65,lot:e.building,address:e.address_one})
    try{
        await AsyncStorage.setItem('services',parameters)
    }catch(error){
        console.log(error)
    }
  }) // already an object. read below, exp key note
  .catch(console.error);
  
  }else if(flag === 1){
    console.log(token.data.id)
    try{
      await AsyncStorage.setItem('idPark',token.data.id)
    }catch(e){
      console.log(e)
    }
  }
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
    try{
      processData(data.data)
    }catch(e){
      console.log(e)
    }
    const date = new Date()
    const mytm=date.getTime()/1000;
    if(flag === 0){
      console.log('flag control')
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
     flag ++
    }
    else if(flag === 1){
      ws.close()
      flag++
    }else if(flag === 2){
      EventOutput(ws)
    }
  })
}

async function EventOutput(ws) {
  let date=new Date(), mytm=date.getTime()/1000;
  try{
    await AsyncStorage.setItem('services','')

  }catch(e){
    console.log(e)
  }
  try{
    const id = await AsyncStorage.getItem('idPark')
    console.log(id)
     ws.send(JSON.stringify({
      type: 'salida',
      data: {
              idn: "ece61316a219",
              id: id,
              price: 1000,
              end_date: mytm,
              end_service_type: 100
      }
      }));
      
      ws.close()

  }catch(e){
    console.log(e)
  }

  
  
}

const PrymaryView = (props)=>{
  let [nameUser,setNameUser] = useState()
  useEffect(()=>{
    const getDates = async ()=>{
      const data = await AsyncStorage.getItem('datesUser')
      console.log(data)
     const userData = JSON.parse(data)
     setNameUser(userData.giveName)
    }
    
    getDates()
  },[])
  return(
    <View style={styles.ContainerButton}>
    <View style={styles.RadiusWallp}>
            <Text style={{color:'white',fontSize:14,fontWeight:'bold'}}>Hola {nameUser} Conectate a un parqueadero</Text>
          </View>
            <View>
            <View>
            <TouchableOpacity
             onPress={async()=>{
              wifi.findAndConnect('NidooAP','12345678',async (found)=>{
                if(found){
                     flag = 0
                     setTimeout(()=>{connectedWebSocket()},2000)
      
                }else{
                    console.log('wifi is not in range')
                }})
             }}
             style={styles.ButtonLogin}
            >
                <Text style={{color:'white'}}>Conectate   </Text>
                <Image source={require('../Images/conectate.png')} style={{width:30, height:30}}/>
            </TouchableOpacity>
            <TouchableOpacity
             onPress={()=>{
               props.OpenQr()
             }}
             style={styles.ButtonLogin}
            >
                <Text style={{color:'white'}}>Escanear  </Text>
                <Image source={require('../Images/qr.png')} style={{width:30, height:30}}/>
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
              /*
              wifi.findAndConnect("NidooAP",'12345678',async (found)=>{
                                if(found){
                                    const date = new Date()
                                    console.log('Wifi is in range')
                                    setTimeout(()=>{connectedWebSocket()},2000) 
                                    
                                }else{
                                    console.log('wifi is not in range')
                                    Alert('No te encuentras cerca a ningun parqueadero')
                                    try{
                                      await AsyncStorage.setItem('services','')
                                    }catch(e){
                                      console.log(e)
                                    }
                                }
                            })*/
                            EventEmmitter.emit('openPayForm',true)
             }}
             style={styles.buttonPay}
            >
                <Text style={{color:'white'}}>Pagar</Text>
                <Image source={require('../Images/mano.png')} style={{width:35,height:35,marginHorizontal:10}}/>
            </TouchableOpacity>
            </View>
            </View>
            <View
             style={{
               position:'absolute',
               top:20,
               right:10
             }}
            >
              <TouchableOpacity
               onPress={()=>{
                EventEmmitter.emit('openSetAlert',true)
               }}
              >
                <Image source={require('../Images/notificacion.png')} style={{width:40,height:40}}/>
              </TouchableOpacity>
            </View>
            </View>
)
}



const Features = (props)=>{
  let [refrehs, setRefresh] = useState()
  let [QrView, setQrView] = useState()
  let [alertView, setAlertView] = useState()
  
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
        setRefresh(<PrymaryView
         OpenQr = {()=>{
           openQr()
         }}
        />)
    }

    function openQr(){
      setQrView(<ScanQr/>)
    }

    EventEmmitter.on('openSetAlert',()=>{
      console.log('open')
      setAlertView(<SetAlert/>)
    })

    EventEmmitter.on('QrClose',()=>{
      setQrView()
    })
    EventEmmitter.on('QrRead',(data)=>{
    try{
      jwt.decode(data.data,'1234567890',{skipValidation:true}).then(e=>{
        console.log(e.payload.data.ssid)
        
             
        wifi.findAndConnect("NidooAP",'12345678',async (found)=>{
                            if(found){
                                const date = new Date()
                                console.log('Wifi is in range')
                                setTimeout(()=>{connectedWebSocket()},2000) 
                                
                            }else{
                                console.log('wifi is not in range')
                                //alert('No hay ningun parqueadero cerca')
                                const date = new Date()
                                const parameters= JSON.stringify({status:'[ACTIVE]',hourInit:date.getHours(),minuteInit:date.getMinutes(),time:date.getTime(),tariff:65,lot:'',address:''})
                                try{
                                  await AsyncStorage.setItem('services',parameters)
                                }catch(error){
                                  console.log(error)
                                }
                                /* try{
                                  await AsyncStorage.setItem('services','')
                                }catch(e){
                                  console.log(e)
                                } */
                            }
        })
         
      })
    }catch(e){
      console.log(e)
    }
      setQrView()
    })
    
    EventEmmitter.on('closeSetAlert',()=>{
      setAlertView()
    })


    BackgroundTimer.setInterval(async()=>{
      
      const parameters = await AsyncStorage.getItem('services')
      const parametersParse = JSON.parse(parameters)
      const moneyMax = await AsyncStorage.getItem('moneyMax')
      
      if(parameters !== null){
        const dateActual = new Date()
        const opDate = parseInt((dateActual.getTime()-parametersParse.time)/60000)
        const hourClock = parseInt(opDate/60)
        const minutesClock = opDate - (hourClock*60)
        const cB = parseInt(opDate*parametersParse.tariff)
        if(parseInt(moneyMax) !== NaN){
          if((cB) > parseInt(moneyMax)*0.9){
            const deltaMoney =  parseInt(moneyMax) - (cB)
            LocalNotification(deltaMoney.toString())
            try{
              await AsyncStorage.setItem('moneyMax','')
            }catch(e){
              console.log(e)
            }
          }
        }
       setRefresh(<Clocks
        hour={hourClock}
        minutes={minutesClock}
        cost={cB}
       />)
      }else{
        openPrymary()
      }

    },1000)
  },[])
    return(
        <View>
          {refrehs}
          {QrView}
          {alertView}
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
        justifyContent:'center',
        flexDirection:'row'
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
      justifyContent:'center',
      flexDirection:'row'
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