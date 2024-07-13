import React, { useState } from "react";
import { ResizeMode, Video, AVPlaybackStatus } from "expo-av";
import * as Animatable from "react-native-animatable";
import {
    FlatList,
    Image,
    ImageBackground,
    TouchableOpacity,
    ListRenderItemInfo,
    ViewToken,
    ViewabilityConfig,
} from "react-native";

import { icons } from "@/constants";

interface Post {
    $id: string;
    video: string;
    url: string;
}

interface TrendingItemProps {
    activeItem: string;
    item: Post;
}

interface TrendingProps {
    posts: Post[];
}

const zoomIn = {
    0: {
        scale: 0.9,
    },
    1: {
        scale: 1,
    },
};

const zoomOut = {
    0: {
        scale: 1,
    },
    1: {
        scale: 0.9,
    },
};

const TrendingItem: React.FC<TrendingItemProps> = ({ activeItem, item }) => {
    const [play, setPlay] = useState(false);

    return (
        <Animatable.View
            style={{ marginRight: 5 }}
            // @ts-ignore
            animation={activeItem === item.$id ? zoomIn : zoomOut}
            duration={500}
        >
            {play ? (
                <Video
                    source={{ uri: item.video }}
                    style={{ width: 208, height: 288, borderRadius: 33, marginTop: 12, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                    resizeMode={ResizeMode.CONTAIN}
                    useNativeControls
                    shouldPlay
                    onPlaybackStatusUpdate={(status: AVPlaybackStatus) => {
                        if (status.isLoaded && status.didJustFinish) {
                            setPlay(false);
                        }
                    }}
                />
            ) : (
                <TouchableOpacity
                    style={{ width: 208, height: 288, borderRadius: 33, marginTop: 12, justifyContent: 'center', alignItems: 'center', position: 'relative' }}
                    activeOpacity={0.7}
                    onPress={() => setPlay(true)}
                >
                    <ImageBackground
                        source={{ uri: item.url }}
                        style={{ width: 208, height: 288, borderRadius: 33, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 3.84 }}
                        resizeMode="cover"
                    />
                    <Image
                        source={icons.play}
                        style={{ width: 48, height: 48, position: 'absolute' }}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            )}
        </Animatable.View>
    );
};

const Trending: React.FC<TrendingProps> = ({ posts }) => {
    const [activeItem, setActiveItem] = useState(posts[0]?.$id || '');

    const viewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
        if (viewableItems.length > 0 && viewableItems[0].item.$id) {
            setActiveItem(viewableItems[0].item.$id);
        }
    };

    const viewabilityConfig: ViewabilityConfig = {
        itemVisiblePercentThreshold: 70,
    };

    return (
        <FlatList
            data={posts}
            horizontal
            keyExtractor={(item) => item.$id}
            renderItem={({ item }: ListRenderItemInfo<Post>) => (
                <TrendingItem activeItem={activeItem} item={item} />
            )}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            contentOffset={{ x: 170, y: 0 }}
        />
    );
};

export default Trending;
