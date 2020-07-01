import React from 'react';
import{
    View,
    Text,
    Button,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView
}from 'react-native';



const LoginAPI = ()=>{
    console.log('fetch to API')
}

const Register = (props)=>{
    return(
        <View>
            <KeyboardAvoidingView
             
            >
            <View style={styles.ContainerLogo}>
                <Image 
                style={styles.Logo}
                source={require('../Images/Logo.png')}/>
            </View>
            <View
             style={styles.containerText}> 
            <TextInput
             style={styles.TextInput}
             placeholder="Nombre"
             keyboardType="default"
             onChangeText={(value)=>{
                 console.log(value)
             }}
            />
            <TextInput
             style={styles.TextInput}
             placeholder="Correo"
             keyboardType="default"
             onChangeText={(value)=>{
                 console.log(value)
             }}
            />
            <TextInput
             style={styles.TextInput}
             placeholder="Contraseña"
             keyboardType="default"
             secureTextEntry={true}
             onChangeText={(value)=>{
                console.log(value)
            }}
            />
            <TextInput
             style={styles.TextInput}
             placeholder="Repite tu contraseña"
             keyboardType="default"
             secureTextEntry={true}
             onChangeText={(value)=>{
                console.log(value)
            }}
            />
            </View>
            </KeyboardAvoidingView>
            <View 
             style={styles.ContainerButton}
            >
            <TouchableOpacity
             onPress={()=>{
                 LoginAPI()
             }}
             style={styles.ButtonLogin}
            >
                <Text style={{color:'white'}}>Registrate</Text>
            </TouchableOpacity>
            <TouchableOpacity
             onPress={()=>{
                 props.openLogin()
             }}
             style={styles.ButtonRegister}
            >
                <Text style={{color:'#770BC2'}}>Ya tienes cuenta? Ingresa</Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    ContainerLogo:{
        alignItems:'center'
    },
    Logo:{
        marginVertical:30,
        width:150,
        height:150
    },
    containerText:{
        alignItems:'center'
    },
    TextInput:{
        width:'80%',
        marginVertical:15,
        borderWidth:1,
        borderColor:'gray',
        borderRadius:10
    },
    ContainerButton:{
        alignItems:'center'
    },
    ButtonLogin:{
        width:'80%',
        height:45,
        marginVertical:15,
        borderRadius:10,
        backgroundColor:'#770BC2',
        alignItems:'center',
        justifyContent:'center'
    },
    ButtonRegister:{
        width:'80%',
        height:45,
        marginVertical:5,
        borderRadius:10,
        borderWidth:1,
        borderColor:'#770BC2',
        backgroundColor:'#FFFF',
        alignItems:'center',
        justifyContent:'center'
    }
});

export default Register;