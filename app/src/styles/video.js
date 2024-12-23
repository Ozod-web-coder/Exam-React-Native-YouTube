import {StyleSheet} from "react-native";


export const styles = StyleSheet.create({
    video:{
        width: '100%',
        height: 300,
        backgroundColor: '#131313',
        display: 'flex',
        flexDirection: 'column',
    },
    image:{
        width: '100%',
        height:235,
        resizeMode: 'contain',

    },
    data:{
        width: '100%',
        height:50,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop:10
    },
    avatar:{
        width:40,
        height:40,
        // borderRadius:'50%',
        marginLeft:5
    },
    title:{
        fontSize:18,
        color:'white',
        fontWeight:'bold',
        marginLeft:20,
        width:'90%',
        overflow:"hidden"
    },
    mini:{
        display:'flex',
        flexDirection: 'row',
    },
    text:{
        fontSize:12,
        color:'#959595',
        marginLeft:20,
        marginBottom:10
    }
})