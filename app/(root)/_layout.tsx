import { useGlobalContext } from "@/lib/global-provider";
import { Redirect, Slot } from "expo-router";
import { ActivityIndicator, SafeAreaView } from "react-native";

export default function AppLayout() {
    const { loading, isLoggedin } = useGlobalContext()
    if(loading){
        return (
            <SafeAreaView className="bg-white h-full flex items-center justify-center">
                <ActivityIndicator className="text-primary-300" size={"large"}/>
            </SafeAreaView>
        )
    }

    if(!isLoggedin) return <Redirect href={"/sign-in"}/>

    return <Slot />
}