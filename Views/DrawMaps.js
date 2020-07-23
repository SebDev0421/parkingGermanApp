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

import EventEmmitter from 'react-native-eventemitter';
import Geolocation from '@react-native-community/geolocation';
import PopUpMarker from '../Components/PopUpMarker'
import MapView,{PROVIDER_GOOGLE, Marker} from 'react-native-maps' 
import jwt from 'react-native-pure-jwt';
const Parkings = [[-74.1110915,4.5780739],[-74.112752,4.5795639],[-74.1153929,4.5782252]]

const URI = 'http://181.54.182.7:3000/ParkingApp/API/99042101849'
const KEY_API = '99042101849'

const DrawMaps = ()=>{
  let [lat,setLat] = useState(4.577)
  let [lng,setLng] = useState(-74.11)
  let [popUp,setPopUp] = useState()
  let [parkings,setParkings] = useState([])
    useState(()=>{
      Geolocation.getCurrentPosition((info)=>{
        console.log(info)
        setLat(info.coords.latitude)
        setLng(info.coords.longitude)
      })
      jwt.sign({city:'Bogota'},KEY_API,{alg:'HS256'})
          .then(token=>{
            fetch(URI+'/parkings/read/app',{
              method:'PUT',
              body:JSON.stringify({token:token}),
              headers:{'Content-Type': 'application/json'}
          }).then(res => res.json())
            .then(res => {console.log(res)
              setParkings(res)
             }
            )
            .catch(e=>{console.log(e)})
          })

          EventEmmitter.on('closePopUpMarker',()=>{
            setPopUp()
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
            latitudeDelta: 0.00050,
            longitudeDelta : 0.0090,
            
          }}
          showsUserLocation={true}
          >
          {parkings.map((dates)=>{
            
            return(
              <Marker
             title={dates.name}
             description={'Oprima para mas info'}
             coordinate={{
               latitude:parseFloat(dates.lat),
               longitude:parseFloat(dates.lng)
             }}
             onCalloutPress={()=>{
               setPopUp(<PopUpMarker
                title={dates.name}
                tariff = {dates.tariff}
                address = {dates.address}
                schedule = {dates.schedule}
                status = {'cerrado'}
                rating = {parseFloat(dates.rating)}
               />)
             }}
             icon={require('../Images/LogoIcon.png')}
             style={{width:25,height:25}}
            />
            )
          })}
            
          </MapView>
          {popUp}
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