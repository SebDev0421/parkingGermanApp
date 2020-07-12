import React,{useEffect,useState} from 'react';
import{
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Dimensions,
    Image
} from 'react-native';

import jwt from 'react-native-pure-jwt'

const URI = 'http://192.168.1.67:3000/ParkingApp/API/99042101849'
const KEY_API = '99042101849'



const APIdeleteVehicule = (data)=>{
    fetch(URI+'/vehicules/delete/app',{
        method:'PUT',
        body:JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res=>{res.json()})
      .then(res=>{console.log(res)})
      .catch(e=>{console.log(e)})
}

const CardVehicule = (props)=>{
    let [email,setEmail] = useState('')
    useEffect(()=>{
        setEmail(props.email)
    },[])
    return(
        <View style={styles.container}>
            <View style={styles.TitleContainer}>
             <Text style={styles.Title}>{props.placa}</Text>
            </View>
            <View style={styles.datesView}>
             <Text>Tipo de vehiculo: {props.type}</Text>
             <Text>Marca: {props.marca}</Text>
            </View>
            <TouchableOpacity
             style={{width:30,height:30,position:'absolute',bottom:50,right:4}}
            >
                <Image source={require('../Images/editar.png')} style={styles.delete}/>
            </TouchableOpacity>
            <TouchableOpacity
             onPress={()=>{
                 jwt.sign({email:email,idVehicule:props.placa},KEY_API,{alg:'HS256'})
                    .then(token=>{
                        APIdeleteVehicule({token:token})
                    })
             }}
             style={{width:30,height:30,position:'absolute',bottom:8,right:4}}
            >
                <Image source={require('../Images/basura.png')} style={styles.delete}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:Dimensions.get('window').width*0.9,
        borderRadius:10,
        borderColor:'#770BC2',
        borderWidth:2,
        marginVertical:7,
        backgroundColor:'white'
    },
    TitleContainer:{
        width:'100%',
        marginVertical:7,
        alignItems:'center'
    },
    Title:{
        fontSize:18,
        fontWeight:'bold'
    },
    delete:{
        width:30,
        height:30,
    },
    costView:{
        width:'80%',
        marginVertical:8,
        flexDirection:'row',
        alignItems:'center'
    },
    costText:{
        fontSize:15,
        marginHorizontal:5
    },
    datesView:{
        width:'80%',
        marginVertical:8,
        alignItems:'center'
    }
})

export default CardVehicule