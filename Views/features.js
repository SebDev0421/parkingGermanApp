import React from 'react';
import{
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native';



import wifi from 'react-native-android-wifi';



const connectAP = (socket)=>{
    socket.on('open', function() {
        console.log('connected');
    })


}

const Features = ()=>{
    return(
        <View style={styles.ContainerButton}>
            <Text>Hola Juan conectate a un parqueadero</Text>
            <View>
            <View>
            <TouchableOpacity
             onPress={async()=>{
                wifi.loadWifiList((WifiList)=>{
                    const ArrayWiFi = JSON.parse(WifiList)                    
                    ArrayWiFi.map((values)=>{
                        if(values.SSID === "FAMILIA PEREZ"){
                            wifi.findAndConnect(values.SSID,'Carlos160510',(found)=>{
                                if(found){
                                    console.log('Wifi is in range')
                                    const socket = new WebSocket('ws://192.168.0.12:8000/', "protocolOne")
                                    connectAP(socket)
                                }else{
                                    console.log('wifi is not in range')
                                }
                            })
                        }
                    })    
                },(err)=>{console.log(err)})
             }}
             style={styles.ButtonLogin}
            >
                <Text style={{color:'white'}}>Conectate</Text>
            </TouchableOpacity>
            </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    ContainerButton:{
        alignItems:'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    ButtonLogin:{
        width:Dimensions.get('window').width*0.8,
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
        marginVertical:15,
        borderRadius:10,
        borderWidth:1,
        borderColor:'#770BC2',
        backgroundColor:'#FFFF',
        alignItems:'center',
        justifyContent:'center'
    }
});

export default Features