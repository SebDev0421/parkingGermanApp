import React,{useState} from 'react'
import{
    View,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    TextInput,
    KeyboardAvoidingView,
    Text,
    Image,
    AsyncStorage,
    ScrollView,
    SafeAreaView
} from 'react-native'
import EventEmmiter from 'react-native-eventemitter'
const signedMoney = '$'

const SetAlert = () =>{
    let [valueMount,setValueMount] =useState(false)
    let [moneyMax,setMoneyMax] = useState('')
    return(
        <View style={styles.container}>
            <View 
            style={styles.PopUpAlert}>
                   <View
                    style={{width:'100%',height:50,alignItems:'center',justifyContent:'center',backgroundColor:'#770BC2',borderRadius:20}}
                   >
                       <Text style={styles.Title}>Maneja tu dinero</Text>
                   </View>
                    <ScrollView
                     style={{width:'100%'}}
                    >
                    <View
                     style={{width:'100%',height:200,alignItems:'center',justifyContent:'center'}}
                    >
                        <TextInput
                         placeholder={'¿Cuanto dinero tienes?'}
                         keyboardType={'number-pad'}
                         onChangeText={(value)=>{
                            
                                
                                if(value.length===0){
                                    
                                    setMoneyMax(value.substr(0))
                                    setValueMount(!valueMount)
                                }else{
                                    setMoneyMax(value.substr(1)) 
                                    console.log(value.substr(1))
                                    setValueMount(true)
                                
                                }
                              
                         }}
                         value={valueMount ? (signedMoney + moneyMax) : ''}
                         style={styles.MoneyText}
                        />
                    </View>
                    </ScrollView>
                    <View
                     style={{width:'100%',alignItems:'center'}}
                    >
                        <TouchableOpacity
                         style={styles.ButtonSet}
                         onPress={async()=>{
                             if(moneyMax){
                             try{
                                 await AsyncStorage.setItem('moneyMax',moneyMax)
                                 EventEmmiter.emit('closeSetAlert',true)

                             }catch(e){
                                 console.log(e)
                             }
                            }else{
                                console.log('create alert')
                            }
                         }}
                        >
                            <Text style={styles.TextBtn}>Crear alerta</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                     style={styles.ButtonBack}
                     onPress={()=>{
                         EventEmmiter.emit('closeSetAlert',true)
                     }}
                    >
                        <Image source={require('../Images/espalda.png')} style={{width:35,height:35}}/>
                    </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        position:'absolute',
        top:0,
        height:Dimensions.get('window').height,
        width:Dimensions.get('window').width,
        backgroundColor:'rgba(0,0,0,0.5)',
        alignItems:'center',
        justifyContent:'center'
    },
    PopUpAlert:{
        width:'80%',
        height:400,
        backgroundColor:'white',
        borderRadius:20
    },
    MoneyText:{
        width:'80%',
        height:50,
        borderWidth:1,
        borderRadius:10
    },
    ButtonSet:{
        marginVertical:15,
        height:50,
        backgroundColor:'#770BC2',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10
    },
    TextBtn:{
        color:'white',
        marginHorizontal:10
    },
    Title:{
        fontSize:17,
        fontWeight:'bold',
        justifyContent:'center',
        marginVertical:10,
        color:'white'
    },
    ButtonBack:{
         position:'absolute',
         top:3,
         left:10
    }
})

export default SetAlert;