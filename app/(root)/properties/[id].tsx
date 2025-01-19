import { facilities } from '@/constants/data'
import icons from '@/constants/icons'
import images from '@/constants/images'
import { getPropertyById } from '@/lib/appwrite'
import { useAppwrite } from '@/lib/useAppwrite'
import { router, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { View, Text, ActivityIndicator, SafeAreaView, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native'

const Property: React.FC = () => {
    const { id } = useLocalSearchParams<{ id?: string }>()
    const { data: property, loading } = useAppwrite({
        fn: getPropertyById,
        params: {
            id: id!,
        },
    });

    if (loading) {
        return (
            <SafeAreaView className='h-full w-full flex items-center justify-center'>
                <ActivityIndicator size={"large"} className='text-primary-300' />
            </SafeAreaView>
        )
    }
    return (
        <View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName='pb-40 bg-white' className='bg-white'>
                <View className='relative w-full h-[460px]'>
                    <Image source={{ uri: property?.image }} className='w-full h-full' resizeMode='cover' />
                    <Image className='absolute top-0 left-0 w-full' source={images.whiteGradient} />
                    <View className='absolute top-20 left-0 w-full flex items-center flex-row  px-4'>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={icons.backArrow} className='size-8' />
                        </TouchableOpacity>
                        <TouchableOpacity className='ml-auto mr-4'>
                            <Image source={icons.heart} className='size-8' />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={icons.send} className='size-8' />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className='px-4'>
                    <Text className='mt-5 text-2xl font-rubik-extrabold'>{property?.name}</Text>

                    <View className='flex flex-row mt-4 items-center'>
                        <Text className='py-1 px-2 bg-primary-100 text-primary-300 uppercase font-rubik-bold text-xs'>{property?.type}</Text>
                        <Image source={icons.star} className='ml-4' />
                        <Text className='font-rubik-medium text-black-100'>{property?.rating}   ({property?.reviews.length} reviews)</Text>
                    </View>

                    <View className="flex flex-row items-center mt-5">
                        <View className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-10">
                            <Image source={icons.bed} className="size-4" />
                        </View>
                        <Text className="text-black-300 text-sm font-rubik-medium ml-2">
                            {property?.bedrooms} Beds
                        </Text>
                        <View className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-10 ml-7">
                            <Image source={icons.bath} className="size-4" />
                        </View>
                        <Text className="text-black-300 text-sm font-rubik-medium ml-2">
                            {property?.bathrooms} Baths
                        </Text>
                        <View className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-10 ml-7">
                            <Image source={icons.area} className="size-4" />
                        </View>
                        <Text className="text-black-300 text-sm font-rubik-medium ml-2">
                            {property?.area} sqft
                        </Text>
                    </View>

                    <View className='border-t mt-6 pt-6 border-primary-200'>
                        <Text className='text-xl font-rubik-bold'>Agent</Text>
                        <View className='flex items-center flex-row'>
                            <Image
                                source={{ uri: property?.agent.avatar }}
                                className="size-16 rounded-full mt-2" resizeMode='cover'
                            />
                            <View className='ml-4'>
                                <Text className='text-xl font-rubik-bold'>{property?.agent.name}</Text>
                                <Text className='font-rubik-light text-black-100'>{property?.agent.email}</Text>
                            </View>
                            <Image source={icons.chat} className='size-8 ml-auto mr-4' />
                            <Image source={icons.phone} className='size-8' />
                        </View>
                    </View>

                    <View className='pt-6'>
                        <Text className='text-xl font-rubik-bold'>Overview</Text>
                        <Text className='text-black-100 mt-4'>{property?.description}</Text>
                    </View>

                    <View className='pt-6'>
                        <Text className='text-xl font-rubik-bold'>Facilities</Text>
                        <View className='flex flex-row flex-wrap gap-4 mt-4'>
                            {
                                property?.facilities.map((itemFacility: string, index: number) => {
                                    const facility = facilities.find(singleFacility => singleFacility.title === itemFacility)
                                    return (
                                        <View key={index} className='flex items-center justify-center flex-row bg-primary-100 rounded-full size-14'>
                                            <Image source={facility?.icon || icons.info} className='size-8' />
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>

                    <View className='pt-6'>
                        <Text className='text-xl font-rubik-bold'>Gallery</Text>
                        <FlatList
                            data={property?.gallery}
                            keyExtractor={(item) => item.$id}
                            contentContainerClassName='mt-4 flex flex-row gap-2'
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <Image source={{ uri: item.image }} resizeMode='cover' className='size-40 rounded-xl' />
                            )}
                        />
                    </View>
                    <View className='pt-6'>
                        <Text className='text-xl font-rubik-bold'>Location</Text>
                        <View className="flex flex-row items-center justify-start mt-4 gap-2">
                            <Image source={icons.location} className="w-8 h-8" />
                            <Text className="text-black-200 ">
                                {property?.address}
                            </Text>
                        </View>
                        <Image source={images.map} className='rounded-xl w-full mt-4 h-52' resizeMode='cover' />
                    </View>
                </View>
            </ScrollView>

            <View className='absolute bottom-0 left-0 w-full px-7 pt-7 pb-10 rounded-t-2xl border-t border-r border-l border-primary-200 bg-white z-50'>
                <View className='flex flex-row justify-between items-center'>
                    <View>
                        <Text className='uppercase font-medium text-black-100 tracking-widest'>price</Text>
                        <Text className='font-rubik-extrabold text-primary-300 text-3xl'>${property?.price}</Text>
                    </View>
                    <TouchableOpacity className=" w-[60%] flex flex-row items-center justify-center bg-primary-300 py-3 rounded-full shadow-md shadow-zinc-400">
                        <Text className="text-white text-lg text-center font-rubik-bold">
                            Book Now
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Property
