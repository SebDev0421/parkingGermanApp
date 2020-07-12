import React,{useRef,useState, useEffect} from 'react';
import{
    View,
    Text,
    Button,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    ScrollView,
    Animated,
    AsyncStorage,
    ToastAndroid
}from 'react-native';

import EventEmmitter from 'react-native-eventemitter';

import jwt from 'react-native-pure-jwt';

import {
    GoogleSignin, statusCodes
} from '@react-native-community/google-signin';

GoogleSignin.configure();


const signIn = async ()=>{
    try{
        await GoogleSignin.hasPlayServices()
        const userInfo = await GoogleSignin.signIn()
        console.log(userInfo)
        EventEmmitter.emit('google',userInfo)
    }catch(e){
        if(e.code === statusCodes.SIGN_IN_CANCELLED){
            //user cancelled
        }else if(e.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE){
            //pay service not available
        }else if(e.code === statusCodes.IN_PROGRESS){
            //in progress service
        }else{
            //anithing happened
        }
    }
}

let valueHide = 1,
    valueRadius = 1,
    valueLogin = 0

const {width,height} = Dimensions.get('window')

const fadeAnim = new Animated.Value(1)
const fadeLogin = new Animated.Value(1)
const upPersian = new Animated.Value(0)
const loginWindow = new Animated.Value(0)

const hide = ()=>{
    Animated.timing(
        fadeAnim,
        {
          toValue: valueHide,
          duration: 500,
        }
      ).start();

      Animated.timing(
        fadeLogin,
        {
            toValue:valueRadius,
            duration:900
        }
    ).start();

    Animated.spring(
        upPersian,
        {
           toValue:-600,
           friction:30
        }
    ).start()

    Animated.timing(
        loginWindow,
        {
            toValue:valueLogin,
            duration:900
        }
    ).start();
    
}

const pinStyle={
    transform:[
        {
            translateY:upPersian 
        }
    ]
}

const URI = 'http://192.168.1.67:3000/ParkingApp/API/99042101849'
const KEY_API = '99042101849'
const ApiRegister = async (token,photo,data)=>{
    try{
        await AsyncStorage.setItem('datesUser',JSON.stringify({email:data.email,photo:photo,giveName:data.giveName}))
      }catch(e){
          console.log(e)
      }
    
    fetch(URI+'/registre/app',{
        method:'PUT',
        body:JSON.stringify(token),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
      .then(res =>{
          console.log(res)
          jwt.decode(res.token,KEY_API,{
            skipValidation: true // to skip signature and exp verification
          }).then(async (e)=>{
              console.log(e)
              if(e.payload.status === 'user created'){
                  // user created first time
                  console.log(data.email)
                  try{
                   await AsyncStorage.setItem('datesUser',JSON.stringify({email:data.email,photo:photo,giveName:data.giveName}))
                  }catch(e){
                      console.log(e)
                  }
                  EventEmmitter.emit('logIn',true)
              }else if( e.payload.status === 'error'){
                  console.log('err')
              }else{
                try{
                    await AsyncStorage.setItem('datesUser',JSON.stringify({email:data.email,photo:photo,giveName:data.giveName}))
                  }catch(e){
                      console.log(e)
                  }
                  EventEmmitter.emit('logIn',true)
              }
          })
      })
      .catch(e => {
          if(e) throw e
          return 'error connection'
      })

}

const LoginPrimary = (props)=> {
    return(
        <View style={{position:'absolute',width:width,height:height}}>
            <Animated.View
             style={{...pinStyle,opacity:fadeLogin}}
            >
                <Image
                  source={require('../Images/loginWall.jpg')}
                  style={{height:height,width:width}}
                />
            </Animated.View>
            <View style={{position:'absolute',width:width,height:height,top:20,alignItems:'center'}}>
                <View style={{position:'absolute',bottom:70,width:width}}>
                <Animated.View style={{
                    opacity:fadeAnim
                }}>
                <TouchableOpacity
                 onPress={()=>{
                     valueHide = 0
                     valueRadius=0
                     valueLogin=1
                     hide()
                     EventEmmitter.emit('loginChange',true)
                 }}
                >
                <View style={styles.Button}>
                    <Text style={{fontSize:17,fontWeight:'bold'}}>Ingresar</Text>
                </View>
                </TouchableOpacity>
                </Animated.View>
                <Animated.View style={{
                    opacity:fadeAnim
                }}>
                    <TouchableOpacity
                 onPress={()=>{
                     signIn()
                 }}
                >
                <View style={{...styles.Button}}>
                    <Text style={{fontSize:17,fontWeight:'bold'}}>Ingresar con Google</Text>
                    <Image source={require('../Images/google.png')} style={{width:30,height:30,marginHorizontal:10}}/>
                </View>
                </TouchableOpacity>
                </Animated.View>
                </View>
            </View>
        </View>
    )
}


const Login = (props)=>{
    let [viewLog,setViewLog] = useState(<LoginPrimary/>)

    useEffect(()=>{

        EventEmmitter.on('loginChange',()=>{
            console.log('here')
            setTimeout(()=>{
                setViewLog()
            },1000)
        })

        EventEmmitter.on('google',async (data)=>{
            /*props.openService()*/
            const APIdates = {
                email: data.user.email,
                giveName: data.user.givenName,
                platform:'google',
                password: data.user.id
            }
            jwt.sign(APIdates,'99042101849',{alg:"HS256"}).then((token=>{
                ApiRegister({token:token},data.user.photo,APIdates)        
               })).catch(console.error)
        })

        EventEmmitter.on('logIn',()=>{
            props.openService()
        })

    },[])
    return(
        <ScrollView>
            <View>
               <View
                style={{
                    width:width,
                    height:height,
                    alignItems:'center',
                }}
               >
                   <Image
                    source={require('../Images/Logo.png')}
                    style={{width:200,height:200,marginVertical:25}}
                   />
                   <TextInput
                    placeholder={'Correo'}
                    keyboardType={'email-address'}
                    style={{borderWidth:1,borderRadius:15,height:50,width:width*0.8,alignItems:'center',justifyContent:'center',marginVertical:15,borderColor:'#770BC2'}}
                   />
                   <View
                    style={{borderRadius:15,borderWidth:1,height:50,width:width*0.8,marginVertical:15,borderColor:'#770BC2'}}
                   >
                   <TextInput
                    placeholder={'Contraseña'}
                    keyboardType={'default'}
                    secureTextEntry={true}
                    style={{height:50,width:'90%',alignItems:'center',justifyContent:'center'}}
                   />
                   </View>
                   <TouchableOpacity
                    style={[styles.ButtonLogin,{backgroundColor:'#770BC2'}]}
                    onPress={()=>{
                        props.openService()
                    }}
                   >
                       <Text
                        style={{color:'white',fontWeight:'bold'}}
                       >Entrar</Text>
                   </TouchableOpacity>
                   <TouchableOpacity
                     onPress={()=>{
                         props.openRegister()
                     }}
                    style={[styles.ButtonLogin,{backgroundColor:'#770BC2'}]}
                   >
                       <Text
                         style={{color:'white',fontWeight:'bold'}}
                       >Registrate</Text>
                   </TouchableOpacity>
               </View> 
            </View>
            {viewLog}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    Button:{
        backgroundColor:'rgba(255,255,255,0.8)',
        height: 60,
        marginHorizontal:20,
        borderRadius:35,
        alignItems:'center',
        justifyContent:'center',
        marginVertical:5,
        flexDirection:'row'
    },
    ButtonLogin:{
       height:50,
       width:width*0.8,
       alignItems:'center',
       justifyContent:'center',
       borderRadius:10,
       marginVertical:15
    }
})


export default Login;

/* props.openService() */
