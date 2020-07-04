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


const CardVehicule = (props)=>{
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