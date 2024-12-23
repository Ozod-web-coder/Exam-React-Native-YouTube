import {FlatList, Image, ScrollView, Text, TouchableOpacity, View, StyleSheet} from "react-native";
import YoutubePlayer from 'react-native-youtube-iframe';
import {Header} from './Header'
import Icon from "react-native-vector-icons/AntDesign";
import {useNavigation} from "expo-router";
import {styles} from "@/app/src/styles/header";
import {Under} from "@/app/src/UI/under";
import {useEffect, useState} from "react";
import axios from "axios";
export function Watch({route}){
    const {Vid, avatar,channel, desc} = route.params;
    const navigation = useNavigation();

    const [comments, setComments] = useState([]);
    const API_KEY = 'AIzaSyAftwfMq_TxL1VtsIzEgsIPJZwqoD87jA4'

    const fetchComments = async () => {
        try {
            const response = await axios.get(
                'https://www.googleapis.com/youtube/v3/commentThreads',
                {
                    params: {
                        part: 'snippet',
                        videoId: Vid.videoId?Vid.videoId:Vid,
                        key: API_KEY,
                        maxResults: 50,
                    },
                }
            );
            setComments(response.data.items);
        } catch (err) {
            console.log('error')
        }
    };
    useEffect(async () =>{
        await fetchComments();
    }, [Vid?.videoId]);
    return (
        <View style={{height:'100%', width:'100%'}}>
            <View style={{backgroundColor:'#252525FF', width:'100%', height:50, display:'flex', flexDirection:'row',alignItems:'center' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name='left' size={24} color={'white'} style={{marginLeft:20}} />
                </TouchableOpacity>
                <View style={styles.left}>
                    <Image style={styles.headerImage} source={{uri: 'https://developers.google.com/static/site-assets/logo-youtube.svg'}}/>
                    <Text style={styles.text}>Real YouTube</Text>
                </View>

            </View>
            <YoutubePlayer
                height={234}
                width={'100%'}
                play={true}
                videoId={Vid.videoId?Vid.videoId:Vid}
                onError={(e) => console.log("Error:", e)}
                onReady={() => console.log('Player is ready')}
                onChangeState={(state) => console.log(state)}
                showFullscreenButton={true}
                showHud={true}
                modestbranding={true}
                controls={1}
                origin={'https://www.youtube.com'}
            />
            <Under avatar={avatar} channel={channel}/>
            <ScrollView style={{width:'100%', height:'auto', padding:10, backgroundColor:'#252525FF'}}>
                <Text style={{color:'white', fontWeight:'bold',}}>
                    {desc}
                </Text>
                <View style={{width:'100%', height:'auto', padding:10, backgroundColor:'#252525FF'}}>
                    <Text style={{color:'white', fontSize:24}}>Comments:</Text>
                    <FlatList
                        data={comments}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.commentContainer}>
                                <Text style={styles.author}>
                                    {item.snippet.topLevelComment.snippet.authorDisplayName}:
                                </Text>
                                <Text style={styles.comment}>
                                    {item.snippet.topLevelComment.snippet.textDisplay}
                                </Text>
                            </View>
                        )}
                    />
                </View>
            </ScrollView>

        </View>
    )
}

