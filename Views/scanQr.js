import React from 'react'
import{
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions
}from 'react-native'

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

import EventEmmitter from 'react-native-eventemitter';

const ScanQr = (props)=>{
    return(
        <View style={styles.container}>
            <QRCodeScanner
            topContent={
                <TouchableOpacity
                 onPress={()=>{
                     EventEmmitter.emit('QrClose',true)
                 }}
                >
                    <Text>Volver</Text>
                </TouchableOpacity>
            }
             onRead={(data)=>{
                 EventEmmitter.emit('QrRead',data)
             }}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        position:'absolute',
        top:0,
        backgroundColor:'white',
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height
    }
})

export default ScanQr