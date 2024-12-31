import { useContext } from 'react';
import { StyleSheet, Pressable, Text, View, SafeAreaView, StatusBar, Platform } from 'react-native';
import colors from '@/constants/colors';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { heading } from '@/constants/styles';
import { StoreContext } from 'services/store';

export default function DetailsHeader(props) {
    const { navigation } = props;
    const { player } = useContext(StoreContext);

    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.container}>
                <Pressable style={({pressed}) => pressed ? styles.button : {}} onPress={() => navigation.goBack()}>
                    <View style={styles.backBtn}>
                        <MaterialCommunityIcons name="chevron-left" size={26} color="#DDDDDD" />
                    </View>
                </Pressable>
                <Text style={heading.md}>Now {player.isPlaying ? 'playing': 'paused'}</Text>
                <Pressable style={({pressed}) => pressed ? styles.button : {}}>
                    <Entypo name="dots-three-vertical" size={22} color="#DDDDDD" />
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        backgroundColor: colors.dark,
        paddingTop: Platform.select({
            ios: 0,
            android: StatusBar.currentHeight,
        }),
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        alignItems: 'center',
        paddingVertical: 24,
        paddingHorizontal: 20
    },
    backBtn: {
        width: 34,
        height: 34,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF0A',
        borderRadius: 32
    },
    button: {
        opacity: 0.6
    }
});