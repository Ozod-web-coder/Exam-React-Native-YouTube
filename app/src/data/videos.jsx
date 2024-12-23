import axios from "axios";
import {useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
const API_KEY = 'AIzaSyAftwfMq_TxL1VtsIzEgsIPJZwqoD87jA4'

useEffect(async () => {
    await AsyncStorage.removeItem('token')
}, []);
export async function GetVideos(){




    const next = await AsyncStorage.getItem('token')



    const result = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
        params: {
            part: 'snippet,statistics',
            chart: 'mostPopular',
            regionCode: 'US',
            maxResults: 5,
            pageToken: next || '',
            key: API_KEY,


        }
    })


    await AsyncStorage.setItem(
        'token',
        result.data.nextPageToken
    );






    return result.data.items;

}
