import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flex: 1,
        gap: 40,
        justifyContent: 'space-between',
        paddingBottom: 70,
        position: 'relative',
    },

    artwork: {
        borderRadius: 12,
        width: '100%',
        height: height / 2.3,
        objectFit: 'cover',
        position: 'relative',
    },

    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    controlWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30,
        gap: 10,
        maxWidth: 290,
        marginHorizontal: 'auto',
        width: '100%',
    },
    playButtonWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 24,
    },
    loading: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    }
});

export default styles;