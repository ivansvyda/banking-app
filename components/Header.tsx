import {Text, View} from "react-native";

export const Header = () => {
    return <View style={{
        display: 'flex',
        justifyContent: 'space-between',
    }}>
        <View>RL</View>
        <Text>Home</Text>
        <View></View>
    </View>
}