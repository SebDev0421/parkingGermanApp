import React,{useEffect,useState}from 'react';
import{
    View,
    Text,
    KeyboardAvoidingView,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ScrollView,
    TextInput,
    Image,
    Animated
}from 'react-native'

import {Rating,AirbnbRating} from 'react-native-ratings';

import EventEmmitter from 'react-native-eventemitter';

import jwt from 'react-native-pure-jwt';

const animation = new Animated.Value(0)

const URI = 'http://192.168.1.67:3000/ParkingApp/API/99042101849'
const KEY_API = '99042101849'

const APIvehiculesAdd = (data)=>{
    
    fetch(URI+'/vehicules/save/app',{
        method:'PUT',
        body:JSON.stringify(data),
        headers:{'Content-Type': 'application/json'}
    }).then(res => res.json())
      .then(res => {console.log(res)
        if(res.status === 'ok'){
          alert('Vehiculo Agregado')
          EventEmmitter.emit('addComplete',true)
        }
       }
      )
      .catch(e=>{console.log(e)})
}

const appear = ()=>{
    Animated.timing(
        animation,
        {
            toValue:1,
            duration:700,
        }
    ).start()
}

const PopUpMarker = (props)=>{
    useEffect(()=>{ 
    },[])
    return(
        <View style={styles.container}>
                <View 
                 style={styles.PopUp}>
                   <View style={styles.header}>
                       <View style={{marginTop:10}}>
                       <TouchableOpacity
                        onPress={()=>{
                            EventEmmitter.emit('closePopUpMarker',true)
                        }}
                       >
                         <Image source={require('../Images/cerrar.png')} style={{width:25,height:25}}/>
                       </TouchableOpacity>
                       </View>
                       <View style={{marginHorizontal:20,marginTop:10}}>
                       <Text style={styles.textBtnAdd}>
                           {props.title}
                       </Text>
                       </View>
                   </View>
                   <ScrollView style={styles.ScrollContainer}>
                       
                       <View style={{alignItems:'center'}}>
                       <Text style={styles.TextTitle}>Tarifa</Text>
                    <Text style={styles.TextContainer}>{props.tariff} cop/m</Text>
                       <Text style={styles.TextTitle}>Direccion</Text>
                    <Text style={styles.TextContainer}>{props.address}</Text>
                       <Text style={styles.TextTitle}>Horario</Text>
                    <Text style={styles.TextContainer}>{props.schedule}</Text>
                       <Text style={styles.TextTitle}>Estado</Text>
                    <Text style={styles.TextContainer}>{props.status}</Text>
                           <AirbnbRating
                            isDisabled={true}
                            ratingCount={5}
                            showRating={false}
                            defaultRating={props.rating}
                            ratingBackgroundColor="#00A1C8"
                           
                            
                           />
                       </View>
                   </ScrollView>
                   <TouchableOpacity 
                     style={styles.BtnAdd}
                     onPress={()=>{
                        /* const data = {
                            email:email,
                            idVehicule:placa,
                            type:selectPicker,
                            marca:marca
                        }
                        jwt.sign(data,KEY_API,{alg:'HS256'}).then(token => {
                         const sendApi = {
                             token:token
                         }
                         APIvehiculesAdd(sendApi)
                         
                      })*/
                     }} 
                     >
                       <View>
                           <Text style={styles.textBtnAdd}>Ir al parqueadero</Text>
                       </View>
                   </TouchableOpacity>
                </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        position:'absolute',
        top:0,
        left:0,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        backgroundColor:'rgba(0,0,0,0.4)',
        alignItems:'center',
        justifyContent:'center'
    },
    PopUp:{
        width:Dimensions.get('window').width*0.85,
        height:Dimensions.get('window').height*0.65,
        backgroundColor:'white',
        borderRadius:20,
        alignItems:'center'
    },
    BtnAdd:{
        width:'80%',
        height:50,
        backgroundColor:'#58C800',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        marginVertical:15
    },
    textBtnAdd:{
        color:'white',
        fontSize:18,
        fontWeight:'bold'
    },
    InputAdd:{
        width:'80%',
        height:50,
        marginVertical:15,
        borderWidth:1,
        borderColor:'#770BC2',
        borderRadius:10,
    },
    ScrollContainer:{
        width:'100%'
    },
    header:{
        height:55,
        backgroundColor:'#770BC2',
        width:'100%',
        borderBottomEndRadius:40,
        borderBottomStartRadius:40,
        marginBottom:10,
        flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:'center',
        
    },
    TextTitle:{
        fontSize:20,
        fontWeight:'bold',
        marginTop:5
    },
    TextContainer:{
        fontSize:18
    }

})

export default PopUpMarker