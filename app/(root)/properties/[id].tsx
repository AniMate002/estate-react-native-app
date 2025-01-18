import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { View, Text } from 'react-native'

const Property:React.FC = () => {
    const { id } = useLocalSearchParams()
    return (
        <View>
            <Text>Property {id}</Text>
        </View>
    )
}

export default Property
