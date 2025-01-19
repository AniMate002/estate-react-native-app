import { categories } from '@/constants/data'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'

const Filters:React.FC = () => {
    const params = useLocalSearchParams<{fitler?: string}>()
    const [selectetCategory, setSelectetCategory] = useState(params.fitler || "All")
    const handleCategoryPress = (category: string) => {
        if(selectetCategory === category){
            setSelectetCategory("All")
            router.setParams({filter: "All"})
            return;
        }
        setSelectetCategory(category)
        router.setParams({filter: category})
    }

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}
        className='mt-3 mb-2'>
            { categories.map((item, index) => (
                <TouchableOpacity 
                key={index}
                onPress={() => handleCategoryPress(item.category)}
                className={`flex flex-col items-start mr-4 px-4 py-2 rounded-full
                ${selectetCategory === item.category ? "bg-primary-300" : "bg-primary-100 border border-primary-200"}`}>
                    <Text className={`text-sm ${selectetCategory === item.category ? "text-white font-rubik-bold mt-0.5" : "text-black-300 font-rubik"}`}>{ item.title }</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}

export default Filters
