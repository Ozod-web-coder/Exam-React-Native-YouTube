import React, { useState, useEffect } from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    Button,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import {Video} from "./Video";
import axios from 'axios';

export function Search(){
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [nextPageToken, setNextPageToken] = useState(null);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState(''); // Поисковый запрос
    const [currentVideo, setCurrentVideo] = useState(null); // Текущий видимый ID видео

    const API_KEY = 'AIzaSyAftwfMq_TxL1VtsIzEgsIPJZwqoD87jA4'
    const MAX_RESULTS = 5;

    const fetchVideos = async (query = '', pageToken = null) => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await axios.get(
                'https://www.googleapis.com/youtube/v3/search',
                {
                    params: {
                        part: 'snippet',
                        type: 'video', // Получаем только видео
                        q: query, // Поисковый запрос
                        maxResults: MAX_RESULTS,
                        key: API_KEY,
                        pageToken: pageToken,
                    },
                }
            );

            const newVideos = response.data.items;
            setVideos(pageToken ? [...videos, ...newVideos] : newVideos); // Если новый запрос, заменяем данные
            setNextPageToken(response.data.nextPageToken || null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideos(searchQuery);
    }, []);

    const handleSearch = () => {
        fetchVideos(searchQuery);
    };

    const loadMore = () => {
        if (nextPageToken) {
            fetchVideos(searchQuery, nextPageToken);
        }
    };



    const viewabilityConfig = {
        itemVisiblePercentThreshold: 80, // Запуск видео, если видно более 80%
    };

    const screenWidth = Dimensions.get('window').width;

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Error: {error}</Text>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Поиск..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <Button color={'#e61f1f'} title="Искать" onPress={handleSearch} />
            </View>

            {/* Лента видео */}
            <FlatList
                data={videos}
                keyExtractor={(item) => item.id.videoId}
                renderItem={({ item }) => (
                    <Video video={item} key={item.id.videoId} />
                )}
                ListFooterComponent={
                    loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
                }
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                viewabilityConfig={viewabilityConfig}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#252525FF',
    },
    searchContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#252525FF',
        borderBottomWidth: 1,
        borderBottomColor: '#e61f1f',
    },
    searchInput: {
        flex: 1,
        padding: 10,
        borderColor: '#df2424',
        borderWidth: 1,
        borderRadius: 5,
        marginRight: 10,
    },
    videoContainer: {
        marginVertical: 10,
        alignSelf: 'center',
        backgroundColor: '#000',
        borderRadius: 10,
        overflow: 'hidden',
    },
    title: {
        padding: 10,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
    },
});
