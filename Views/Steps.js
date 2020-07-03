import React from 'react';
import{
    View,
    Text,
    TextInput,
    Dimensions,
    StyleSheet
} from 'react-native';

import { ProgressStep,ProgressSteps} from 'react-native-progress-steps';


const Steps = (props)=>{
    return(
        <View >
        <View style={{position:'absolute',width:'100%'}}>
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
           <ProgressStep previousBtnText={'Atras'} nextBtnText={'Siguiente'} nextBtnTextStyle={{color:'#770BC2'}} label="Agregar vehiculo">
           <View style={{alignItems:'center',justifyContent:'center'}}>
            <Text>Agrega tu vehiculo</Text>
            <TextInput 
            style={Styles.InputAdd}
             placeholder='Agregar vehiculo'/>
          </View>
           </ProgressStep>
           <ProgressStep 
           onSubmit={()=>{
               props.OpenService()
           }}
           previousBtnText={'Atras'} finishBtnText={'Empieza'}  label="Confirmar perfil">
           <View style={{alignItems:'center',justifyContent:'center'}}>
            <Text>Nombre</Text>
            <TextInput 
            style={Styles.InputAdd}
             placeholder='Nombre'/>
             <Text>Correo</Text>
            <TextInput 
            style={Styles.InputAdd}
             placeholder='Correo'/>
             <Text>Telefono</Text>
            <TextInput 
            style={Styles.InputAdd}
             placeholder='Telefono'/>
          </View>
          
           </ProgressStep>
          </ProgressSteps>
          </View>
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