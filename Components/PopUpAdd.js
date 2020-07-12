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
    Image
}from 'react-native'

import RNPickerSelect from 'react-native-picker-select';

const PopUpAdd = ()=>{
    let [selectPicker,setSelectPicker] = useState(1),
        [placa,setPlaca] = useState(''),
        [marca,setMarca] = useState(''),
        [photo,setPhoto] = useState(),
        [email,setEmail] = useState('')
    
    return(
        <View 
         style={styles.container}
        >
            <KeyboardAvoidingView>
                <View 
                 style={styles.PopUp}>
                   <View style={styles.header}>
                       <View style={{marginTop:10}}>
                       <TouchableOpacity>
                         <Image source={require('../Images/cerrar.png')} style={{width:25,height:25}}/>
                       </TouchableOpacity>
                       </View>
                       <View style={{marginHorizontal:20,marginTop:10}}>
                       <Text style={styles.textBtnAdd}>
                           Nuevo vehiculo
                       </Text>
                       </View>
                   </View>
                   <ScrollView style={styles.ScrollContainer}>
                       <View style={{alignItems:'center'}}>
                   <TextInput 
            autoFocus={true}
            autoCapitalize={'characters'}
            onChangeText={(value)=>{
                if(value.length<7){
                    setPlaca(value)
                }
            }}
            value={placa}
            style={styles.InputAdd}
             placeholder='Placa de tu vehiculo'/>
            <Text>Selecciona el tipo de vehiculo</Text>
            <View
             style={styles.InputAdd}
            >
            <RNPickerSelect
              
              onValueChange={(value)=>{
                  setSelectPicker(value)
              }}
              

              items={[
                  {label:'carro',value:1},
                  {label:'moto',value:2}
              ]}
              
            />
            </View>
            <Text>Marca de vehiculo</Text>
             <TextInput 
             onChangeText={(value)=>{
                 setMarca(value)
             }}
            style={styles.InputAdd}
             placeholder='Marca'/>
                       </View>
                   </ScrollView>
                   <TouchableOpacity style={styles.BtnAdd} >
                       <View>
                           <Text style={styles.textBtnAdd}>Agregar vehiculo</Text>
                       </View>
                   </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
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
        
    }

})

export default PopUpAdd