import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { View, StyleSheet } from 'react-native';
import colors from '@/constants/colors';

export default function Play( props ) {
    const { isActive, style } = props;

    return (
        <View style={[isActive ? styles.active : styles.inActive, styles.btn, style]}>
            <FontAwesome5 name="play" size={14} color={isActive ? 'white' : `#959595`} />
        </View>
    )
}

const styles = StyleSheet.create({
    btn: {
        width: 37,
        height: 37,
        borderRadius: 37,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inActive: {
        backgroundColor: '#2C2C2C',
    },
    active: {
        backgroundColor: colors.primary,
    }
})