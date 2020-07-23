import React, { useEffect, useState } from 'react'

import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    Text,
    TouchableNativeFeedback,
    TextInput
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
              requiresName={true}
              allowScroll = {true}
              labels={{
                number: "numero de tarjeta",
                expiry:"Expiracion",
                cvc:"CVC"
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

const TargetPay = ()=>{
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
       <Text style={styles.textHeader}>Pagar con tarjeta</Text>
     </View>
    </View>
    <View style={styles.addTarjet}>
    <View style={styles.containerTarjets}>
        <View style={{width:'100%',alignItems:'center'}}>
          <Text style={styles.TextTitleDates}>Confirma los datos</Text>
        </View>

        <Text style={styles.TextSubTitleDates}>Nombre</Text>
        <Text style={styles.TextDatesCard}>JUAN SEBASTIAN GUERRERO</Text>
        <Text style={styles.TextSubTitleDates}>Numero de tarjeta</Text>
        <Text style={styles.TextDatesCard}>400 5689 4723 9873</Text>
        <Text style={styles.TextSubTitleDates}>Fecha de Expiracion</Text>
        <Text style={styles.TextDatesCard}>12/25</Text>
        <Text style={styles.TextSubTitleDates}>confirma CVC</Text>
        <TextInput
         placeholder = {'CVC'}
         keyboardType={'number-pad'}
         style={[styles.TextDatesCard,{borderBottomColor:'gray', borderBottomWidth:1,width:'30%',marginBottom:10, marginHorizontal:15}]}
         onChangeText={(value)=>{

         }}
        />

    </View>
    </View>
    <View style={{alignItems:'center'}}>
    <TouchableOpacity style={styles.AddButton}>
        <Text style={{fontWeight:'bold',color:'white'}}>Pagar parqueadero</Text>
    </TouchableOpacity>
    </View>
    </View>
    )
}

const PayHow = (props)=>{
    let [viewCard,setViewCard] = useState()
    let [viewCardPay,setViewCardPay] = useState()
    useEffect(()=>{
      EventEmitter.on('closeAddTarjet',()=>{
          setViewCard()
          setViewCardPay()
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
                <TouchableOpacity 
                onPress={()=>{
                    setViewCardPay(<TargetPay/>)
                }}
                style={{borderWidth:1,borderBottomColor:'#DBDBDB',borderTopColor:'rgba(255,255,255,0)',borderLeftColor:'rgba(255,255,255,0)',borderRightColor:'rgba(255,255,255,0)'}}>
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
            </View>
            {viewCardPay}
            <View style={styles.footer}>
                <View>
                <TouchableNativeFeedback
                 onPress={()=>{
                     console.log('open cupons')
                 }}
                >
                    <Text style={{color:'blue', fontWeight:'100', marginVertical:9, marginHorizontal:15}}>¿Tienes cupones?</Text>
                </TouchableNativeFeedback>
                <Text style={{color:'gray',fontSize:18, fontWeight:'100', marginVertical:9, marginHorizontal:15}}>
                    Pagas
                </Text>
                </View>
                <View style={{position:'absolute',right:0}}>
                 <Text style={{color:'gray',fontSize:24, fontWeight:'100', marginVertical:9, marginHorizontal:15}}>${props.mount}</Text>
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
       position:'absolute',
       width:'100%',
       backgroundColor:'white',
       bottom:25,
       justifyContent:'center'
    },
    TextIndicator:{
        fontWeight:'bold',
        fontSize:15,
        marginVertical:2
    },
    TextTitleDates:{
        fontWeight:'bold',
        fontSize:20,
        marginVertical:15
    },
    TextSubTitleDates:{
        fontWeight:'bold',
        fontSize:17,
        color:'gray',
        marginHorizontal:10,
        marginVertical:5
    },
    TextDatesCard:{
        marginHorizontal:5,
        marginVertical:2
    }
})

export default PayHow;