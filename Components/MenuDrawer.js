import React from 'react';
import{
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image,
    Animated,
    ImageBackground,
    TouchableWithoutFeedback
} from 'react-native';

import EventEmitter from "react-native-eventemitter";

export default class MenuDrawer extends React.Component{

    animation = new Animated.Value(0);

    

    toogleMenu = ()=>{
        const toValue = this.open ? 0 : 1;
        Animated.spring(this.animation,{
            toValue,
            friction:5
        }).start()

        this.open = !this.open
    }

    constructor(props){
        super(props)

    }
    
    componentDidMount(){
        this.toogleMenu()
        
    }
    
    render(){
        const pinStyle={
            transform:[
                {scale:this.animation},
                {
                    translateX: this.animation.interpolate({
                        inputRange: [0,0],
                        outputRange: [0,0]
                    })
                }
            ]
        }

        const opacity= this.animation.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 0 ,1]
        })

        return(
            <View
             style={styles.container}
            >
             <TouchableWithoutFeedback
                onPress={()=>{
                    this.toogleMenu()
                    setTimeout(()=>{EventEmitter.emit('CloseMenu','close')},500)
                }}
             >
                 <View
                  style={styles.closeTouch}
                 ></View>
             </TouchableWithoutFeedback>
             <Animated.View
              style={[styles.menu,pinStyle,opacity]}
             >
                 <View style={styles.containerProfile}>
                     <ImageBackground source={require('../Images/chesser.jpg')} style={{flex:1,resizeMode: "cover",justifyContent: "center",alignItems:'center'}}>
                     <Image source={require('../Images/joy.jpg')}
                            style={{width:120,height:120,marginVertical:20,borderRadius:120/2}}
                     />
                     <Text style={styles.textProfile}>Hola</Text>
                     <Text style={styles.textProfile}   >Juan Guerrero</Text>
                     </ImageBackground>
                 </View>
                 <TouchableOpacity
                  style={styles.button}
                  onPress={()=>{
                      this.toogleMenu()
                      setTimeout(()=>{EventEmitter.emit('Open','History')},200)
                  }}
                 >
                   <Text>Historial</Text>  
                 </TouchableOpacity>
                 <TouchableOpacity
                  style={styles.button}
                  onPress={()=>{
                    this.toogleMenu()
                    setTimeout(()=>{EventEmitter.emit('Open','Vehicules')},500)
                }}
                 >
                   <Text>Mis vehiculos</Text>  
                 </TouchableOpacity>
                 <TouchableOpacity
                  style={styles.button}
                  onPress={()=>{
                    this.toogleMenu()
                    setTimeout(()=>{EventEmitter.emit('Open','Settings')},500)
                }}
                 >
                   <Text>Configuracion</Text>  
                 </TouchableOpacity>
                 <TouchableOpacity 
                   style={styles.button}
                   onPress={()=>{
                    this.toogleMenu()
                    setTimeout(()=>{EventEmitter.emit('Open','About')},500)
                }}
                   >
                   <Text>Acerca de</Text>  
                 </TouchableOpacity>
                 <TouchableOpacity 
                  style={styles.button}>
                   <Text>Salir</Text>  
                 </TouchableOpacity>
             </Animated.View>   
            </View>
        )
    }
}

const styles  = StyleSheet.create({
    container:{
        position:'absolute',
        backgroundColor:'rgba(0,0,0,0.5)',
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        left:0,
        top:0
    },
    menu:{
        position:'absolute',
        height:'100%',
        left:0,
        width:'70%',
        backgroundColor:'#ffff',
        elevation:10,
        shadowOpacity:0.3,
        shadowOffset: {height:10},
        marginVertical:2,
        alignItems:'center'
    },
    containerProfile:{
    height:220,
    width:'100%'
    },
    button:{
        height:50,
        borderWidth:1,
        width:'100%',
        borderTopColor:'white',
        borderBottomColor:'gray',
        alignItems:'center',
        justifyContent:'center',
        borderLeftColor:'white',
        borderRightColor:'white'
    },
    textProfile:{
        color:'white',
        fontWeight:'bold'
    },
    closeTouch:{
       position:'absolute',
       width:'30%',
       height:'100%',
       right:0
    }
})
