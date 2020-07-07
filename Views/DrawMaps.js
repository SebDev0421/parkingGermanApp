import React ,{useEffect,useState}from 'react';
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


import Geolocation from '@react-native-community/geolocation';
 
import MapView,{PROVIDER_GOOGLE} from 'react-native-maps' 
 
const Parkings = [[-74.1110915,4.5780739],[-74.112752,4.5795639],[-74.1153929,4.5782252]]


const DrawMaps = ()=>{
  let [lat,setLat] = useState(4.577)
  let [lng,setLng] = useState(-74.11)
    useState(()=>{
      Geolocation.getCurrentPosition((info)=>{
        console.log(info)
        setLat(info.coords.latitude)
        setLng(info.coords.longitude)
      })
    },[])

    return(
        <View style={styles.page}>
          <MapView
           provider={PROVIDER_GOOGLE}
           style={styles.map}
           region={{
            latitude: lat,
            longitude : lng,
            latitudeDelta: 0.000050,
            longitudeDelta : 0.00090,
            
          }}
          showsUserLocation={true}
          >

          </MapView>
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