import React from 'react';
import{
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity, 
    TouchableWithoutFeedback,
    Animated,
    Dimensions
} from 'react-native';

export default class FloatingButton extends React.Component{

    animation = new Animated.Value(0)

    toggleMenu = ()=>{
        const toValue = this.open ? 0 : 1;

        Animated.spring(this.animation,{
            toValue,
            friction:5
        }).start();

        this.open = !this.open;
    }


    render(){

        const pinStyle={
            transform:[
                {scale:this.animation},
                {
                    translateY: this.animation.interpolate({
                        inputRange: [0,1],
                        outputRange: [0,-80]
                    })
                }
            ]
        }

        const thomStyle={
            transform:[
                {scale:this.animation},
                {
                    translateY: this.animation.interpolate({
                        inputRange: [0,1],
                        outputRange: [0,-140]
                    })
                }
            ]
        }


        const rotation = {
            transform:[
                {
                    rotate: this.animation.interpolate({
                        inputRange: [0,1],
                        outputRange:["0deg","45deg"]
                    })
                }
            ]
            
        }

        const opacity= this.animation.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 0 ,1]
        })

        return(
            <View style={[styles.container,this.props.styles]}>
                <TouchableWithoutFeedback
                 onPress={()=>{
                 }}
                >
                    <Animated.View style={[styles.Button,styles.secondary,thomStyle,opacity]}>
                        <Image source={require('../Images/3d.png')} style={{width:10,height:10}}/>
                    </Animated.View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback
                 onPress={()=>{}}
                >
                    <Animated.View style={[styles.Button,styles.secondary,pinStyle,opacity]}>
                        <Image source={require('../Images/vehiculo.png')} style={{width:25,height:25}}/>
                    </Animated.View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                 onPress={this.toggleMenu}
                >
                    <Animated.View style={[styles.Button,styles.menu,rotation]}>
                        <Image source={require('../Images/mas.png')} style={{width:20,height:20}}/>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center'
    },
    Button:{
        position:'absolute',
        width:60,
        height:60,
        borderRadius: 60/2,
        alignItems:'center',
        justifyContent:'center',
        shadowRadius:10,
        shadowColor:'#F02A4B',
        shadowOpacity:0.3,
        shadowOffset: {height:10},
        marginVertical:2
    },
    menu:{
        backgroundColor:'#770BC2'
    },
    secondary:{
        width:48,
        height:48,
        borderRadius:48/2,
        backgroundColor:'#FFFF',
        borderWidth:1,
        borderColor:'#770BC2'
    }
})