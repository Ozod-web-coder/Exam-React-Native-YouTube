import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    header:{
        backgroundColor:'#252525FF',
        flexDirection:'row',
        width:'100%',
        height:50,
        fontFamily:'Roboto',
        justifyContent:"space-between",
        alignItems:'center',
        position:'fixed',
        zIndex:1,
    },
    headerImage:{
        width:50,
        height:25,
        resizeMode:'contain',
    },
    text:{
        fontSize:20,
        color:'white',
        fontFamily:'Verdana',
    },
    left:{
        flexDirection:'row',
        marginLeft:1,
    },
    right:{
        marginRight:10
    },
    commentContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',

    },
    author: {
        fontWeight: 'bold',
        color:'white',
    },
    comment: {
        marginTop: 5,
        color:'white',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
    },
})
