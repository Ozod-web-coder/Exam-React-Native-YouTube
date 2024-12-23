import React, { useState, useEffect } from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    Text,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';

export default function ShortsScreen(){
    const [shorts, setShorts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [nextPageToken, setNextPageToken] = useState(null);
    const [error, setError] = useState(null);
    const [currentVideo, setCurrentVideo] = useState(null); // Хранит ID текущего видео

    const API_KEY = 'AIzaSyAftwfMq_TxL1VtsIzEgsIPJZwqoD87jA4'
    const MAX_RESULTS = 10;

    const fetchShorts = async (pageToken = null) => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await axios.get(
                'https://www.googleapis.com/youtube/v3/search',
                {
                    params: {
                        part: 'snippet',
                        type: 'video',
                        q: 'shorts', // Поиск по запросу "shorts"
                        videoDuration: 'short', // Только короткие видео
                        maxResults: MAX_RESULTS,
                        key: API_KEY,
                        pageToken: pageToken,
                    },
                }
            );

            const newShorts = response.data.items;
            setShorts((prevShorts) => [...prevShorts, ...newShorts]);
            setNextPageToken(response.data.nextPageToken || null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchShorts();
    }, []);

    const loadMore = () => {
        if (nextPageToken) {
            fetchShorts(nextPageToken);
        }
    };

    const onViewableItemsChanged = ({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setCurrentVideo(viewableItems[0].item.id.videoId); // Установить ID текущего видео
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
        <FlatList
            data={shorts}
            keyExtractor={(item) => item.id.videoId}
            renderItem={({ item }) => (
                <View style={[styles.videoContainer, { width: screenWidth }]}>
                    <WebView
                        style={{
                            width: screenWidth,
                            height: screenWidth * 16 / 9,
                        }}
                        source={{
                            html: `
                <html>
                  <body style="margin: 0; padding: 0;">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/${item.id.videoId}?autoplay=${
                                item.id.videoId === currentVideo ? 1 : 0
                            }&playsinline=1&modestbranding=1&rel=0&mute=1"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  </body>
                </html>
              `,
                        }}
                    />
                    <Text style={styles.title}>{item.snippet.title}</Text>
                </View>
            )}
            ListFooterComponent={
                loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
            }
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
        />
    );
};

const styles = StyleSheet.create({
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