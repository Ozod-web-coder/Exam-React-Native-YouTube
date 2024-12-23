import {ScrollView, View, StyleSheet} from "react-native";
import {Video} from "./Video";
import {useEffect, useMemo, useState} from "react";
import {GetVideos} from "../data/videos";


export function LineVideo(){
    const [video, setVideo] = useState([]);

    const [count,setcount] = useState(1)

    useEffect(()=>{
        GetVideos().then((res) => {
            setVideo(res);
        })
    },[])

    useEffect(()=>{
        GetVideos().then((res) => {
            setVideo([...video,...res]);
        })
    },[count])


    return (
        <View style={{width:'100%', height:'100%'}}>
            <ScrollView onScroll={()=>{setcount(count+1)}} style={styles.scroll}>
                {video.map((item) => (
                    <Video key={item.id} video={item} />
                ))}
            </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    scroll:{
        zIndex:2,
        height:880,
        width:'100%'
    }
})