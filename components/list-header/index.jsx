import { StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '@/constants/colors';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import QuranIcon from './quran-icon';


export default function ListHeader(props) {
    const { navigation } = props;

    return (
        <SafeAreaView style={styles.container}>
            <Pressable style={({pressed}) => pressed ? styles.button : {}} onPress={() => navigation.navigate('Search')}>
                <AntDesign name="search1" size={28} color="#DDDDDD" />
            </Pressable>
            <QuranIcon />
            <Pressable style={({pressed}) => pressed ? styles.button : {}}>
                <Entypo name="dots-three-vertical" size={22} color="#DDDDDD" />
            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.dark,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20
    },
    button: {
        opacity: 0.6
    }
});