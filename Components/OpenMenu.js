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

export default class OpenMenu extends React.Component{

    animation = new Animated.Value(0)


    render(){

        const opacity= this.animation.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 0 ,1]
        })

        return(
            <View style={[styles.container]}>
                <TouchableWithoutFeedback
                 onPress={()=>{
                 }}
                >
                    <Animated.View style={[styles.Button,styles.secondary]}>
                        <Image source={require('../Images/lista.png')} style={{width:25,height:25}}/>
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