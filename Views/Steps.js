import React,{useState,useEffect} from 'react';
import{
    View,
    Text,
    TextInput,
    Dimensions,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Image,
    AsyncStorage
} from 'react-native';

import { ProgressStep,ProgressSteps} from 'react-native-progress-steps';

import jwt from 'react-native-pure-jwt'

import RNPickerSelect from 'react-native-picker-select';
import EventEmitter from 'react-native-eventemitter';


const URI = 'http://192.168.1.103:3000/ParkingApp/API/99042101849'
const KEY_API = '99042101849'

const APIvehiculesAdd = (data)=>{
    
    fetch(URI+'/vehicules/save/app',{
        method:'PUT',
        body:JSON.stringify(data),
        headers:{'Content-Type': 'application/json'}
    }).then(res => res.json())
      .then(res => {console.log(res)
        if(res.status === 'ok')
        EventEmitter.emit('passViewStep',true)
       }
      )
      .catch(e=>{console.log(e)})
}

const Steps = (props)=>{

    let [selectPicker,setSelectPicker] = useState(1),
        [placa,setPlaca] = useState(''),
        [marca,setMarca] = useState(''),
        [photo,setPhoto] = useState(),
        [email,setEmail] = useState(''),
        [giveName,setGiveName] = useState(''),
        [nit,setNit] = useState('')

    
    useEffect(()=>{
        const getDatesUser = async ()=>{
            const dates = await AsyncStorage.getItem('datesUser')
            const datesParse = JSON.parse(dates)
            setPhoto(<Image source={{uri:datesParse.photo}} style={{marginVertical:20,width:150,height:150,borderRadius:150/2}}/>)
            setEmail(datesParse.email)
            setGiveName(datesParse.giveName)
        }
        
        getDatesUser()

        EventEmitter.on('passViewStep',()=>{
            props.OpenService()
        })
    },[])


    return(
        <View>
        <ScrollView style={{position:'absolute',width:'100%'}}>
         <ProgressSteps progressBarColor = '#770BC2' activeStepIconBorderColor='#770BC2' activeLabelColor='#770BC2' completedProgressBarColor='#770BC2'  completedStepIconColor='#770BC2'>
           <ProgressStep nextBtnText={'Siguiente'} nextBtnTextStyle={{color:'#770BC2'}} label="Bienvenido">
           <View style={{alignItems:'center',justifyContent:'center'}}>
               <Text>Bienvenido</Text>
               <View style={Styles.WelcomeText}>
               <Text>Empieza a tener el control cuando estaciones tu vehiculo,
                   Conoce mas servicios aqui </Text>
               </View>
           </View>
           </ProgressStep>
           <ProgressStep previousBtnText={'Atras'} nextBtnText={'Siguiente'} onNext={()=>{}} nextBtnTextStyle={{color:'#770BC2'}} label="Agregar vehiculo">
           <ScrollView style={{height:Dimensions.get('window').height*0.6,width:'100%'}}>
            <KeyboardAvoidingView 
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={{flex:1}}> 

            <View style={{alignItems:'center'}}>
            <Text>Agrega tu primer vehiculo</Text>
            <TextInput 
            onChangeText={(value)=>{
                if(value.length<7)
                setPlaca(value)
            }}
            autoFocus={true}
            autoCapitalize={'characters'}
            value={placa}
            style={Styles.InputAdd}
             placeholder='Placa de tu vehiculo'/>
            <Text>Selecciona el tipo de vehiculo</Text>
            <View
             style={Styles.InputAdd}
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
            style={Styles.InputAdd}
             placeholder='Marca'/>
             </View>
             </KeyboardAvoidingView>
             </ScrollView>
           </ProgressStep>
           <ProgressStep 
           onSubmit={()=>{
               const data = {
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
                
            })
           }}
           previousBtnText={'Atras'} finishBtnText={'Empieza'}  label="Confirmar perfil">
               <ScrollView style={{height:Dimensions.get('window').height*0.6,width:'100%'}}>
            <KeyboardAvoidingView 
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={{flex:1}}> 

            <View style={{alignItems:'center'}}>
            {photo}
            <Text>Correo</Text>
            <TextInput 
            onChangeText={(value)=>{
                
            }}
            value={email}
            style={Styles.InputAdd}
             placeholder='Correo'/>
             <Text>Nombre</Text>
            <TextInput 
            onChangeText={(value)=>{
                
            }}
            value={giveName}
            style={Styles.InputAdd}
             placeholder='Nombre'/>
             <Text>Cedula</Text>
            <TextInput 
            onChangeText={(value)=>{
                setNit(value)
            }}
            value={nit}
            style={Styles.InputAdd}
            keyboardType='number-pad'
             placeholder='Cedula'/>
             </View>
             </KeyboardAvoidingView>
             </ScrollView>
           </ProgressStep>
          </ProgressSteps>
          </ScrollView>
        </View>
    )
}

const Styles = StyleSheet.create({
    AddVehicule:{
        alignItems: 'center',
        justifyContent:'center',
    },
    InputAdd:{
        width:'80%',
        height:50,
        marginVertical:15,
        borderWidth:1,
        borderColor:'#770BC2',
        borderRadius:10,
    },
    WelcomeText:{
        width:'80%',
    }
})

export default Steps;