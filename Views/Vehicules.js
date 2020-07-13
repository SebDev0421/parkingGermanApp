import React,{useEffect,useState} from 'react';
import{
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Dimensions,
    Image,
    AsyncStorage
} from 'react-native';

import jwt from 'react-native-pure-jwt'

import EventEmitter from "react-native-eventemitter";
import PopUpAdd from '../Components/PopUpAdd';
import PopUpEdit from '../Components/PopUpEdit';
import CardVehicule from '../Components/CardVehicule';

const URI = 'http://192.168.1.67:3000/ParkingApp/API/99042101849'
const KEY_API = '99042101849'
let email = ''
const Vehicules = ()=>{
    let [vehiculesObj,setVehiculesObj] = useState([]),
        [openPopUp,setOpenPopUp] = useState()
    useEffect(()=>{
        
        const getDatesUser = async ()=>{
            const dates = await AsyncStorage.getItem('datesUser')
            const datesParse = JSON.parse(dates)
            email = datesParse.email
            jwt.sign({email:datesParse.email},KEY_API,{alg:'HS256'})
                         .then(token=>{
                            fetch(URI+'/vehicules/read/app',{
                                method:'PUT',
                                body:JSON.stringify({token:token}),
                                headers:{
                                    'Content-Type': 'application/json'
                                }
                            }).then(res => res.json())
                              .then(res=>{
                                  
                                  setVehiculesObj(res)
                                  
                              })
                              .catch(e=>{console.log})
                         })
        }
        
        getDatesUser()
        
        EventEmitter.on('closePopUp',()=>{
            setOpenPopUp()
        })
        
        EventEmitter.on('openPopUp',(data)=>{
            const sendApiProps = JSON.parse(data)
            console.log(sendApiProps)
            const type = 1
            if(sendApiProps.type === 'moto'){
                type = 2
            }
            setOpenPopUp(<PopUpEdit
              emailGet={email}
              placa={sendApiProps.placa}
              type={type}
              marca={sendApiProps.marca}
            />) 
        })

        EventEmitter.on('deleteElement',()=>{
            getDatesUser()
        })

        EventEmitter.on('editComplete',()=>{
            setOpenPopUp()
            getDatesUser()
        })
        
        EventEmitter.on('addComplete',()=>{
            setOpenPopUp()
            getDatesUser()
        })
    },[])
    return(
        <View style={style.container}>
            <View style={style.header}>
             
             <TouchableOpacity
              onPress={()=>{
                  EventEmitter.emit('close','History')
              }}
             >
                 <Image source={require('../Images/espalda.png')} style={style.ButonBack}/>
             </TouchableOpacity>
             <View style={{width:'100%',marginHorizontal:30}}>
               <Text style={style.textHeader}>Vehiculos</Text>
             </View>
            </View>
            <View style={style.scrollHistory}>
            <ScrollView >
                {vehiculesObj.map(data=>{
                    const auxType = 'carro'
                    if(data.type ===2){
                        auxType = 'moto'
                    }
                    return(
                        
                        <CardVehicule
                         email={data.email}
                         placa={data.idVehicule}
                         type={auxType}
                         marca = {data.marca}
                        />
                    )
                })}
            </ScrollView>
            </View>
            <View style={style.containerButtonAdd}>
            <TouchableOpacity
             style={style.buttonAdd}
             onPress={()=>{
                setOpenPopUp(<PopUpAdd
                  emailGet={email}
                />)
             }}
            >
                <View style={{flexDirection:'row'}}>
                  <Text style={style.textButtonAdd}>Agregar vehiculo</Text>
                  <Image source={require('../Images/mas.png')} style={{width:20,height:20,marginHorizontal:10}}/>
                </View>
            </TouchableOpacity>
            </View>
            {openPopUp}
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        position:'absolute',
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        top:0,
        left:0,
        backgroundColor:'#FFFF'
    },
    ButonBack:{
        width:30,
        height:30,
        display:'flex',
        marginHorizontal:20
    },
    header:{
        backgroundColor:'#770BC2',
        height:70,
        width:'100%',
        alignItems:'center',
        justifyContent:'flex-start',
        flexDirection:'row',
        borderBottomEndRadius:40,
        borderBottomStartRadius:40
    },
    textHeader:{
        color:'white',
        fontSize:20,
        fontWeight:'bold'
    },
    scrollHistory:{
        alignItems:'center',
        height:Dimensions.get('window').height-170
    },
    containerButtonAdd:{
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
    },
    buttonAdd:{
        width:'80%',
        height:50,
        borderRadius:10,
        backgroundColor:'#770BC2',
        justifyContent:'center',
        alignItems:'center'
    },
    textButtonAdd:{
        fontSize:17,
        fontWeight:'bold',
        color:'white'
    }
})


export default Vehicules