import React from 'react';
import{
    View,
    Text,
    Button,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions
}from 'react-native';

import MapboxGL from '@react-native-mapbox-gl/maps';

MapboxGL.setAccessToken('pk.eyJ1Ijoic2Via2lsbGVyMDQyMSIsImEiOiJjanppdmd3cjEwM2pzM2NwcDl5eDhybjkzIn0.gnjw9ThqB1MPnxSYeMXojg')

 

const DrawMaps = ()=>{
    return(
        <View style={styles.page}>
          <MapboxGL.MapView 
           style={styles.map} 
          />
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height-90
      },
      map: {
        width:'100%',
        height:'100%'
      }
});

export default DrawMaps;