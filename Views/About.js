import React, { useEffect, useState } from 'react'

import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    Text
}from 'react-native'

import {CreditCardInput,LiteCreditCardInput} from 'react-native-credit-card-input'

import EventEmitter from 'react-native-eventemitter';
import { ScrollView } from 'react-native-gesture-handler';

const yearDate = new Date()
const year = yearDate.getFullYear()

const About = ()=>{
    let [viewCard,setViewCard] = useState()
    useEffect(()=>{
      EventEmitter.on('closeAddTarjet',()=>{
          setViewCard()
      })  
    })
    return(
        <View style={styles.container}>
            <View style={styles.header}>
             
             <TouchableOpacity
              onPress={()=>{
                  EventEmitter.emit('close','History')
              }}
             >
                 <Image source={require('../Images/espalda.png')} style={styles.ButonBack}/>
             </TouchableOpacity>
             <View style={{width:'100%',marginHorizontal:30}}>
               <Text style={styles.textHeader}>Acerca de Parking App</Text>
             </View>
            </View>
            <View style={{alignItems:'center',marginVertical:20}}>
            <ScrollView>
                <View style={{alignItems:'center'}}>
                    <Image source={require('../Images/Logo.png')} style={{width:50,height:50}}/>
                </View>          
                <View style={{alignItems:'center'}}>
                 <Text
                  style={{marginVertical:10,fontSize:17,fontWeight:'bold'}}
                 >Parking App para Android</Text>
                </View>
                <View style={{alignItems:'center'}}>
                 <Text
                  style={{marginVertical:5,fontSize:20}}
                 >1.0.0</Text>
                </View>
                <View style={{alignItems:'center'}}>
                 <Text
                  style={{marginVertical:5,fontSize:11}}
                 >Copyright 2020-{year} Parking App Inc</Text>
                </View>
                <View style={{alignItems:'center'}}>
                 <TouchableOpacity style={styles.AddButton}>
                     <Text style={{color:'white',fontSize:18}}>Calificar en play store</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={styles.AddButton}>
                     <Text style={{color:'white',fontSize:18}}>Sugerencias</Text>
                 </TouchableOpacity>
                </View>
            </ScrollView>
            </View>
            {viewCard}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        position:'absolute',
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        top:0,
        left:0,
        backgroundColor:'white'
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
    addTarjet:{
        flexDirection:'row',
        alignItems:'center',
        marginHorizontal:15,
        marginVertical:10
    },
    containerTarjets:{
        width:Dimensions.get('window').width*0.9,
        backgroundColor:'white',
        borderRadius:10,
        elevation:1,
        shadowOffset:{
            width:1,
            height:1
        }
    },
    TextCredit:{
        marginHorizontal:8,
        fontSize:17,
        color:'#696767'
    },
    AddButton:{
        marginVertical:15,
        height:50,
        borderRadius:10,
        backgroundColor:'#770BC2',
        width:Dimensions.get('window').width*0.9,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default About;