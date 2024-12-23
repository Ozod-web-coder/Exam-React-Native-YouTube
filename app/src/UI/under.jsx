import {Image, Text, View} from "react-native";


export function Under({avatar,channel}){

    return (
        <View style={{width:'100%', height:60, backgroundColor:'#252525FF', display:'flex', flexDirection:'row', alignItems:'center'}}>
            <Image source={{uri: avatar}} style={{width:40, height:40, margin:10}}/>
            <Text style={{color:'white'}}>{channel}</Text>
        </View>
    )
}