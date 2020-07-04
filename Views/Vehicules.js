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
import CardVehicule from '../Components/CardVehicule';

const DataHistory=[{
    Placa:'xlc789',
    Tipo:'Carro',
    marca:'Chevrolet'
},{
    Placa:'dfc761',
    Tipo:'Carro',
    marca:'Renult'
},
{
    Placa:'tye65t',
    Tipo:'Moto',
    marca:'Honda'
}]

const Vehicules = ()=>{
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
                {DataHistory.map(data=>{
                    return(
                        <CardVehicule
                         placa={data.Placa}
                         type={data.Tipo}
                         marca = {data.marca}
                        />
                    )
                })}
            </ScrollView>
            </View>
            <View style={style.containerButtonAdd}>
            <TouchableOpacity
             style={style.buttonAdd}
            >
                <View style={{flexDirection:'row'}}>
                  <Text style={style.textButtonAdd}>Agregar vehiculo</Text>
                  <Image source={require('../Images/mas.png')} style={{width:20,height:20,marginHorizontal:10}}/>
                </View>
            </TouchableOpacity>
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