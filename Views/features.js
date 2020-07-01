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

import BackgroundTimer from 'react-native-background-timer';

import { FloatingAction } from "react-native-floating-action"
import { cos } from 'react-native-reanimated';


function connectedWebSocket(){
  const ws = new WebSocket('ws://192.168.4.1:8999/')
  console.log('Connecting to socket...')
  ws.addEventListener('open',()=>{
        console.log('conected')
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
                                    
                                     setTimeout(()=>{connectedWebSocket() },2000)
                                    const date = new Date()
                                    const parameters= JSON.stringify({status:'[ACTIVE]',hourInit:date.getHours(),minuteInit:date.getMinutes(),tariff:300,lot:'Paqueadero Centro mayor',address:'cra 18 #32-47 sur'}) 
                                    props.Parameters(parameters)
                                    try{
                                      await AsyncStorage.setItem('services',parameters)
                                    }catch(e){
                                      console.log(e)
                                    }
                                    
                                    
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
            <View
             style={styles.Floating}
            >
            
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
                wifi.loadWifiList((WifiList)=>{
                    const ArrayWiFi = JSON.parse(WifiList)
                    ArrayWiFi.map((values)=>{
                        if(values.SSID === "NidooAP"){
                            wifi.findAndConnect(values.SSID,'12345678',async (found)=>{
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
                                }
                            })
                        }
                    })    
                },(err)=>{console.log(err)})
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



const Features = ()=>{
  let [refrehs, setRefresh] = useState()
  useEffect(()=>{
    /* const status = await AsyncStorage.getItem('services')
    console.log(status)
    if(status !== null){
      OpenClokc(status)
    }else{
      openPrymary()
    }
 */
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
          Parameters={(data)=>{
            OpenClokc(data)
          }}
        />)
      
    }


    BackgroundTimer.setInterval(async()=>{
      const parameters = await AsyncStorage.getItem('services')
      const parametersParse = JSON.parse(parameters)
      const dateActual = new Date()
      const hoursActual = dateActual.getHours()
      const minutesActual = dateActual.getMinutes()
      if(parameters !== null){
       const dhB = (hoursActual)-(parametersParse.hourInit)
       const dmB = (minutesActual)-(parametersParse.minuteInit)
       const cB = (dhB*60+dmB)*parametersParse.tariff
      
       setRefresh(<Clocks
        hour={dhB}
        minutes={dmB}
        cost={cB}
        Pay={()=>{
          openPrymary()
          
       }}
       />)
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
    Floating:{
      position:'absolute',
      bottom:65,
      right:0
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