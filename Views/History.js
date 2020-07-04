import React,{useEffect,} from 'react';
import{
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Dimensions,
    Image
} from 'react-native';

import EventEmitter from "react-native-eventemitter";
import CardHistory from '../Components/CardHistory';

const DataHistory=[{
    ParkName:'Parqueadero Plaza imperial',
    Address:'Cra 97-87',
    Time:'1h 2m',
    tariff:40,
    cost:2000,
    placa:'xlc789'
},{
    ParkName:'Parqueadero Plaza imperial',
    Address:'Cra 97-87',
    Time:'1h 2m',
    tariff:40,
    cost:2000,
    placa:'xlc789'
},
{
    ParkName:'Parqueadero Plaza imperial',
    Address:'Cra 97-87',    
    Time:'1h 2m',
    tariff:40,
    cost:2000,
    placa:'xlc789'
},{
    ParkName:'Parqueadero Plaza imperial',
    Address:'Cra 97-87',
    Time:'1h 2m',
    tariff:40,
    cost:2000,
    placa:'xlc789'
},{
    ParkName:'Parqueadero Plaza imperial',
    Address:'Cra 97-87',
    Time:'1h 2m',
    tariff:40,
    cost:2000,
    placa:'xlc789'
},{
    ParkName:'Parqueadero Plaza imperial',
    Address:'Cra 97-87',
    Time:'1h 2m',
    tariff:40,
    cost:2000,
    placa:'xlc789'
},
{
    ParkName:'Parqueadero Plaza imperial',
    Address:'Cra 97-87',    
    Time:'1h 2m',
    tariff:40,
    cost:2000,
    placa:'xlc789'
},{
    ParkName:'Parqueadero Plaza imperial',
    Address:'Cra 97-87',
    Time:'1h 2m',
    tariff:40,
    cost:2000,
    placa:'xlc789'
}]

const History = ()=>{
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
               <Text style={style.textHeader}>Historial recibos</Text>
             </View>
            </View>
            <View style={style.scrollHistory}>
            <ScrollView >
                {DataHistory.map(data=>{
                    return(
                        <CardHistory
                         nameParking={data.ParkName}
                         address={data.Address}
                         Time = {data.Time}
                         tariff = {data.tariff}
                         cost = {data.cost}
                         placa = {data.placa}
                        />
                    )
                })}
            </ScrollView>
            </View>
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
        height:Dimensions.get('window').height-100
    }
})


export default History