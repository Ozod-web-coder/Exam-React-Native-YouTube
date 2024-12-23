import {ScrollView, SectionList, Text, View} from "react-native";
import {Header} from "../components/Header";
import {LineVideo} from "../components/LineVideo";


export default function MainScreen() {



    return (
        <View style={{width:'100%',height:'100%', backgroundColor:'#131313'}}>
            <Header/>
            <LineVideo/>
        </View>
    )
}