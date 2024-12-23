import {Image, Text, TouchableOpacity, View} from "react-native";
import {styles} from "../styles/video";
import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigation} from "expo-router";
const API_KEY = 'AIzaSyAftwfMq_TxL1VtsIzEgsIPJZwqoD87jA4'

export function Video({video}){
    const navigation = useNavigation();
    const [channel, setChannel] = useState([])
    useEffect(() => {
        axios.get('https://www.googleapis.com/youtube/v3/channels', {
                params: {
                    part: 'snippet',
                    id: video.snippet.channelId,
                    key: API_KEY,
                },
            })
            .then((res) => {
                const channelsData = res.data.items.map(item => ({
                    thumbnailUrl: item.snippet.thumbnails.default.url,
                }));
                setChannel(...channelsData);
            })
            .catch((error) => console.error('Error fetching channel data:', error));
    }, []);

    console.log(video)
    return (
        <TouchableOpacity onPress={() => navigation.navigate("Watch", {Vid:video.id, avatar:channel.thumbnailUrl, channel:video.snippet.channelTitle, desc:video.snippet.description})}>
            <View  style={styles.video}>
                <Image style={styles.image} source={{uri: video.snippet.thumbnails.maxres?.url?video.snippet.thumbnails.maxres.url:video.snippet.thumbnails.high.url}} />
                <View style={styles.data}>
                    <View>
                        <Image style={styles.avatar} source={{uri:channel.thumbnailUrl}}/>
                    </View>
                    <View>
                        <Text style={styles.title}>{video.snippet.title}</Text>
                        <View style={styles.mini}>
                            <Text style={styles.text}>{video.snippet.channelTitle}</Text>
                            <Text style={styles.text}>Views {video.statistics?.viewCount}</Text>
                        </View>
                    </View>

                </View>
            </View>
        </TouchableOpacity>


    )
}



