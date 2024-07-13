import {Image, ScrollView, Text, View} from 'react-native'
import React from 'react'
import {Link, router} from "expo-router";
import {images} from '../constants';
import {SafeAreaView} from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";


const App = () => {
    return (
     <SafeAreaView className="bg-primary h-full">
         <ScrollView
             contentContainerStyle={{
             height: "100%",
         }}>
             <View className="w-full flex justify-center items-center h-full px-4">
                 <Image
                 source={images.logo}
                 className="w-[130px] h-[84px]"
                 resizeMode="contain"
                 />
                 <Image
                     source={images.cards}
                     className="max-w-[380px] w-full h-[298px]"
                     resizeMode="contain"
                 />


            <View className="relative mt-5">
                <Text className="text-3xl text-white font-bold text-center">
                    Discover Endless{"\n"}
                    Possibilities with{" "}
                    <Text className="text-secondary-200">Aora</Text>
                </Text>
                <Image
                    source={images.path}
                    className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
                    resizeMode="contain"
                />

            </View>
                 <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
                     Where Creativity Meets Innovation: Embark on a Journey of Limitless
                     Exploration with Aora
                 </Text>
                 <Link className={"text-red-600"} href={"/home"}> Home </Link>
                 <CustomButton title="Continue with Email"
                                 handlePress={() => router.push("/signin")}
                                 containerStyles="w-full mt-7"/>
             </View>
         </ScrollView>
     </SafeAreaView>
    )
  }

  export default App
