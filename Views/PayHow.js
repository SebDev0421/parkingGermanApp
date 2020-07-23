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

const AddTargetPay = ()=>{
    return(
        <View style={styles.container}>
    <View style={styles.header}>
     
     <TouchableOpacity
      onPress={()=>{
          EventEmitter.emit('closeAddTarjet',true)
      }}
     >
         <Image source={require('../Images/espalda.png')} style={styles.ButonBack}/>
     </TouchableOpacity>
     <View style={{width:'100%',marginHorizontal:30}}>
       <Text style={styles.textHeader}>Agregar tarjeta</Text>
     </View>
    </View>
    
    <CreditCardInput
              onChange={(data)=>{
                  console.log(data)
              }}
            />
    <View style={{alignItems:'center'}}>
    <TouchableOpacity style={styles.AddButton}>
        <Text style={{fontWeight:'bold',color:'white'}}>Agregar Tarjeta</Text>
    </TouchableOpacity>
    </View>
    </View>
    )
}

const PayHow = ()=>{
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
                  EventEmitter.emit('closePayForm',true)
              }}
             >
                 <Image source={require('../Images/espalda.png')} style={styles.ButonBack}/>
             </TouchableOpacity>
             <View style={{width:'100%',marginHorizontal:30}}>
               <Text style={styles.textHeader}>¿Como quieres pagar?</Text>
             </View>
            </View>
            <View style={{alignItems:'center',marginVertical:20}}>
            <ScrollView
             style={{height:Dimensions.get('window').height-175}}
            >
                <Text style={styles.TextIndicator}>Con tarjeta</Text>
                <View style={styles.containerTarjets}>
                <TouchableOpacity style={{borderWidth:1,borderBottomColor:'#DBDBDB',borderTopColor:'rgba(255,255,255,0)',borderLeftColor:'rgba(255,255,255,0)',borderRightColor:'rgba(255,255,255,0)'}}>
                    <View style={styles.addTarjet}>
                    <Image source={require('../Images/money.png')} style={{width:45,height:45}}/>   
                    <Text style={styles.TextCredit}>Davienda  ****04658</Text>
                    </View>
                 </TouchableOpacity>
                 <TouchableOpacity
                  onPress={()=>{
                      setViewCard(<AddTargetPay/>)
                  }}
                 >
                    <View style={styles.addTarjet}>
                    <Image source={require('../Images/tarjeta-de-credito.png')} style={{width:45,height:45}}/>   
                    <Text style={styles.TextCredit}>Nueva tarjeta</Text>
                    </View>
                 </TouchableOpacity>
                </View>       
                <Text style={styles.TextIndicator}>Con Efectivo</Text>
                <View style={styles.containerTarjets}>
                <TouchableOpacity style={{borderWidth:1,borderBottomColor:'#DBDBDB',borderTopColor:'rgba(255,255,255,0)',borderLeftColor:'rgba(255,255,255,0)',borderRightColor:'rgba(255,255,255,0)'}}>
                    <View style={styles.addTarjet}>
                    <Image source={require('../Images/efectivo.png')} style={{width:45,height:45}}/>   
                    <Text style={styles.TextCredit}>Efectivo en punto de pago</Text>
                    </View>
                 </TouchableOpacity>
                </View>         
                <Text style={styles.TextIndicator}>Con parking saldo</Text>
                <View style={styles.containerTarjets}>
                <TouchableOpacity style={{borderWidth:1,borderBottomColor:'#DBDBDB',borderTopColor:'rgba(255,255,255,0)',borderLeftColor:'rgba(255,255,255,0)',borderRightColor:'rgba(255,255,255,0)'}}>
                    <View style={styles.addTarjet}>
                    <Image source={require('../Images/saldo.png')} style={{width:45,height:45}}/>   
                    <Text style={styles.TextCredit}>Parking saldo</Text>
                    </View>
                 </TouchableOpacity>
                </View>  
            </ScrollView>
            <View style={styles.footer}>
                
            </View>
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
        backgroundColor:'#DBDBDB'
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
        },
        marginVertical:15
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
    },
    footer:{
       height:60,
       width:'100%',
       backgroundColor:'white'
    },
    TextIndicator:{
        fontWeight:'bold',
        fontSize:15,
        marginVertical:2
    }
})

export default PayHow;