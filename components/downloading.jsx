import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useContext } from 'react';
import { StoreContext } from '@/services/store';
import PageWrapper from './page-wrapper';
import { convertMilliseconds } from 'helpers/utils';

export default function Downloading() {
    const { downloading, fetchRemoteData } = useContext(StoreContext);

    if( !downloading.progress ) return (
        <PageWrapper style={{ backgroundColor: '#0c0c0c', flex: 1, justifyContent: 'center' }}>
            <View style={{ paddingHorizontal: 10, maxWidth: 400, marginHorizontal: 'auto' }}>
                <Text style={[styles.heading, {marginBottom: 20}]}>Thank you for installing our app! To enjoy <Text style={{color: '#42C83C'}}>seamless offline playback of Surahs</Text>, please download the media files first.</Text>
                <Text style={styles.title}>The media files include both the audio and a thumbnail image for each Surah.</Text>
                <Pressable style={{ marginTop: 32, padding: 14, backgroundColor: '#42C83C', borderRadius: 50, width: 250, marginHorizontal: 'auto' }} onPress={fetchRemoteData}>
                    <Text style={{ color: '#FFF', textAlign: 'center', fontSize: 16 }}>Download Now</Text>
                </Pressable>
            </View>
        </PageWrapper>
    );

    return (
        <PageWrapper style={{ backgroundColor: '#0c0c0c' }}>
            <Image
                source={require('@/assets/splash-icon.png')}
                style={styles.branding}
            />
            <View>
                <Text style={styles.heading}>Downloading... {downloading.progress.id}/114</Text>
                <Image
                    source={{
                        uri: downloading.progress.artwork
                    }}
                    style={styles.artwork}
                />
                <Text style={styles.title}>{downloading.progress.title}</Text>
                <Text style={styles.duration}>{convertMilliseconds(downloading.progress.duration)}</Text>

                <View style={styles.progressWrapper}>
                    <View style={[styles.progressLine, { width: `${(downloading.progress.id/114) * 100}%` }]}></View>
                </View>
            </View>
        </PageWrapper>
    )
}

const styles = StyleSheet.create({
    branding: {
        width: 130,
        height: 130,
        alignSelf: 'center',
        marginTop: 100,
    },
    heading: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 40,
        color: '#DFDFDF',
        lineHeight: 30,
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        color: '#DFDFDF',
        fontWeight: 700,
        lineHeight: 28
    },
    artwork: {
        width: 270,
        height: 180,
        borderRadius: 8,
        alignSelf: 'center',
        marginVertical: 16,
        backgroundColor: '#333',
    },
    duration: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 5,
        color: '#D6D6D6',
    },
    progressWrapper: {
        width: 270,
        height: 24,
        borderRadius: 120,
        alignSelf: 'center',
        marginTop: 32,
        backgroundColor: '#42C83C33',
        overflow: 'hidden',
        position: 'relative',
    },
    progressLine: {
        height: '100%',
        backgroundColor: '#42C83C',
        position: 'absolute',
        left: 0,
    }
});