import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
import {images} from "../../constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import {createUser} from "@/lib/appwrite";
import {useGlobalContext} from "@/contex/GlobalProvider";

const SginUp = () => {
    const { user, setUser,isLogged, setIsLogged } = useGlobalContext();

    const [isSubmitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: "",
        username: "",
    });

    const submit = async () => {
        if (form.username === "" || form.email === "" || form.password === "") {
            Alert.alert("Error", "Please fill in all fields");
        }
        setSubmitting(true);
        try {
            const res = await createUser(form.email, form.password, form.username);
            // setUser(result);
            // setIsLogged(true);
            if(res){
                setIsLogged(true);
                setUser({
                    $id: res.$id,
                    email: res.email,
                    username: res.username,
                    avatar: res.avatar
                });
            router.replace("/home");
                Alert.alert("Sign Up is done successfully")
            }
        } catch (error:any) {
            Alert.alert("Error", error.message);
        } finally {
            setSubmitting(false);
        }

    }
    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View
                    className="w-full flex justify-center h-full px-4 my-6"
                    style={{
                        minHeight: Dimensions.get("window").height - 100,
                    }}
                >
                    <Image
                        source={images.logo}
                        resizeMode="contain"
                        className="w-[115px] h-[34px]"
                    />

                    <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
                      Sign Up to Aora
                    </Text>
                    <FormField
                        title="Username"
                        value={form.username}
                        handleChangeText={(e) => setForm({ ...form, username: e })}
                        otherStyles="mt-10"
                        placeholder="Enter your username"
                    />
                    <FormField  title="Email"
                                value={form.email}
                                handleChangeText={(e) => setForm({ ...form, email: e })}
                                otherStyles="mt-7"
                                keyboardType="email-address"
                                placeholder="Enter your email"
                    />
                    <FormField
                        title="Password"
                        value={form.password}
                        handleChangeText={(e) => setForm({ ...form, password: e })}
                        otherStyles="mt-7"
                        placeholder="Enter your password"
                    />

                    <CustomButton
                        title="Sign Up"
                        handlePress={submit}
                        containerStyles="mt-7"
                        isLoading={isSubmitting}
                    />
                    <View className="flex justify-center pt-5 flex-row gap-2">
                        <Text className="text-lg text-gray-100 font-pregular">
                          Have an account?
                        </Text>
                        <Link
                            href="/signin"
                            className="text-lg font-psemibold text-secondary"
                        >
                            Log In
                        </Link>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default SginUp