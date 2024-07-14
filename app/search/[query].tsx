// Code: Home screen
import React from 'react'
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import { images } from "@/constants";
import useAppwrite from "@/lib/useAppwrite";
import { searchPosts} from "@/lib/appwrite";
import EmptyState from "@/components/EmptyState";
import SearchInput from "@/components/SearchInput";
import VideoCard from "@/components/VideoCard";
import {useLocalSearchParams} from "expo-router";

const Search =  () => {
    const {query} = useLocalSearchParams();
    const { data: posts, refetch } = useAppwrite({fn:()=>searchPosts(query)});
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };
    return (
        <SafeAreaView className="bg-primary">
            <FlatList
                data={posts}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                    <VideoCard
                        title={item.title}
                        thumbnail={item.url}
                        video={item.video}
                        creator={item.creattor.username}
                        avatar={item.creattor.avatar}
                    />
                )}
                ListHeaderComponent={() => (
                    <View className="flex my-6 px-4 space-y-6">
                        <View className="flex justify-between items-start flex-row mb-6">
                            <View>
                                <Text className="font-pmedium text-sm text-gray-100">
                                    Search Results
                                </Text>
                                <Text className="text-2xl font-psemibold text-white">
                                    {query}
                                </Text>
                            </View>

                            <View className="mt-1.5">
                                <Image
                                    source={images.logoSmall}
                                    className="w-9 h-10"
                                    resizeMode="contain"
                                />
                            </View>
                        </View>
                        <SearchInput initialQuery={query} />
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title="No Videos Found"
                        subtitle="No videos created yet"
                    />
                )}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
        </SafeAreaView>
    )
}

export default Search