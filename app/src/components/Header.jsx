import {Image, Text, TouchableOpacity, View} from "react-native";
import {styles} from '../styles/header'
import Icon from "react-native-vector-icons/AntDesign";
import {useNavigation} from "expo-router";

export function Header(){
    const navigation = useNavigation();
    return (
        <View style={styles.header}>
            <View style={styles.left}>
                <Image style={styles.headerImage} source={{uri: 'https://developers.google.com/static/site-assets/logo-youtube.svg'}}/>
                <Text style={styles.text}>Real YouTube</Text>
            </View>
            <View style={styles.right}>
                <TouchableOpacity onPress={()=>navigation.navigate("Search")}>
                    <Icon name='search1' size={25} color="white"/>
                </TouchableOpacity>

            </View>
        </View>
    )
}