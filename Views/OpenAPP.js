import React from 'react'
import{ 
    View,
    Image,
    Text,
    StyleSheet
}from 'react-native'

const OpenAPP = ()=>{
    return(
        <><View>
         <View
          style={style.Container}
         >
             <Image
              style={style.Image}
              source={require('../Images/Logo.png')}
             />
             <Text
            style={style.Text}
          >Powered by empresa</Text>
            
             
         </View>
         </View>
        </>
    )
}

const style = StyleSheet.create({
    Container:{
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#770BC2',
        width:'100%',
        height:'100%'
    },
    Image:{
        width:200,
        height:200
    },
    Text:{
        color:'white',
        marginBottom:10,
    }
})

export default OpenAPP
