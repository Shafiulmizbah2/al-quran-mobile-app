import { createContext, useState, useEffect, useCallback, useMemo } from "react"
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import { getRandomTrackId, getNextTrackId, getPreviousTrackId } from "@/helpers/utils";
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as FileSystem from 'expo-file-system';


const ASSET_FOLDER = FileSystem.documentDirectory + 'offline-assets/';
export const StoreContext = createContext()
export const StoreProvider = ({ children }) => {

    const [data, setData] = useState([])
    const [downloading, setDownloading] = useState({
        state: false,
        progress: null,
    })
    /**
     * currently playing track  
     */ 
    const [currentAudio, setCurrentAudio] = useState(null)
    const [sound, _setSound] = useState({
        id: null,
        title: null,
        audio: null,
        artwork: null,
        duration: null,
    });
    /**
     * player state 
     */ 
    const [player, _setPlayer] = useState({
        isPlaying: false,
        isBuffering: false,
        isRepeating: false,
        isShuffling: false,
    })
    const [currentTime, setCurrentTime] = useState(0)
    const [favorite, _setFavorite] = useState([])
    const [_recent, _setRecent] = useState([])
    const [search, setSearch] = useState({
        query: '',
        isFocused: false,
    })

    /**
     * restore favorite, player, and recent state from async storage
     */ 
    const fetchRemoteData = async () => {
        setDownloading({
            state: true,
            progress: {
                id: 0,
                title: 'Finding...',
            },
        })

        await FileSystem.makeDirectoryAsync(ASSET_FOLDER, { intermediates: true });
        const rawResponse = await fetch('https://quran.flexlab.studio')
        const response = await rawResponse.json()

        for (const asset of response.data) {
            const audioPath = ASSET_FOLDER + asset.id + '.mp3';
            const thumbnailPath = ASSET_FOLDER + asset.id + '.png';
            
            const audioInfo = await FileSystem.getInfoAsync(audioPath);
            const thumbnailInfo = await FileSystem.getInfoAsync(thumbnailPath);
            
            if (!audioInfo.exists || !thumbnailInfo.exists) {
                setDownloading({
                    state: true,
                    progress: asset,
                })
                await FileSystem.downloadAsync(asset.audio, audioPath);
                await FileSystem.downloadAsync(asset.artwork, thumbnailPath);
            }
        }
        await AsyncStorage.setItem('audio_meta', JSON.stringify(response.data))
    }

    const prepareAudio = async () => {
        const audioRawMeta = await AsyncStorage.getItem('audio_meta');
        const audioMeta = JSON.parse(audioRawMeta)

        const result = [];
        for (const asset of audioMeta) {
            const audioPath = ASSET_FOLDER + asset.id + '.mp3';
            const thumbnailPath = ASSET_FOLDER + asset.id + '.png';
            
            result.push({
                ...asset,
                audio: audioPath,
                artwork: thumbnailPath,
            });
        }

        setData(result)
        setDownloading({
            state: false,
        })
    }

    const init = async () => {
        const audioRawMeta = await AsyncStorage.getItem('audio_meta');
        const audioMeta = JSON.parse(audioRawMeta)

        if (!audioMeta || (audioMeta || []).length !== 114) {
            setDownloading({
                state: true,
            })
        }

        await prepareAudio()
        await Audio.setAudioModeAsync({
            staysActiveInBackground: true,
            playsInSilentModeIOS: true,
            interruptionModeIOS: InterruptionModeIOS.DuckOthers,
            interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
            shouldDuckAndroid: true,
            playThroughEarpieceAndroid: true,
        });
    }

    useEffect(() => {
        init()

        // restore favorite tracks ID list
        AsyncStorage.getItem('favorite').then((data) => {
            if (data) {
                _setFavorite(JSON.parse(data))
            }
        })
        // restore last played track
        AsyncStorage.getItem('player').then((data) => {
            if (data) {
                const parsedData = JSON.parse(data)
                _setPlayer( prev => ({
                    ...prev, 
                    ...parsedData,
                    isPlaying: false,
                    isBuffering: false,
                }))
            }
        })
        // restore recent tracks ID list
        AsyncStorage.getItem('recent').then((data) => {
            if (data) {
                _setRecent(JSON.parse(data))
            }
        })

        return currentAudio ? () => {
            currentAudio.unloadAsync();
        } : undefined;
    }, [])

    useEffect(() => {
        if( currentAudio ) {
            currentAudio.setIsLoopingAsync(player.isRepeating)
        }
    }, [player])

    useEffect(() => {
        if( currentAudio) {
            currentAudio.setOnPlaybackStatusUpdate((status) => {
                setPlayer({ 
                    isPlaying: status.isPlaying,
                    isBuffering: false
                })
                
                setCurrentTime(status.positionMillis)

                if (status.didJustFinish && !status.isLooping) {
                    playNext(sound.id)
                }
            });
        }
    }, [currentAudio])

    /**
     * set recent track
     */ 
    const setRecent = useCallback((trackId) => {
        _setRecent((prev) => {
            // check if track id already exists in recent, move this to first index
            const state = Array.from(prev)
            const index = state.indexOf(trackId)
            
            if (index === -1) {
                state.unshift(trackId)
            } else {
                state.splice(index, 1)
                state.unshift(trackId)
            }
            
            if (state.length > 10) {
                state.pop()
            }

            AsyncStorage.setItem('recent', JSON.stringify(state))
            return state
        })
    }, [data])

    /**
     * toggle favorite track 
     */ 
    const toggleFavorite =  useCallback((trackId) => {
        _setFavorite((prev) => {
            let list = Array.from(prev)
            if (list.includes(trackId)) {
                list = list.filter((item) => item !== trackId)
            } else {
                list.push(trackId)
            }
            AsyncStorage.setItem('favorite', JSON.stringify(list))
            return list
        })
    }, [data])

    /**
     * check if track is favorite
     */
    const isFavoriteById = useCallback((trackId) => {
        return favorite.includes(trackId)
    }, [favorite, data])

    /**
     * set player state
     */ 
    const setPlayer = (data) => {
        _setPlayer(prev => {
            const newState = {...prev, ...data}
            AsyncStorage.setItem('player', JSON.stringify(newState))
            return newState
        })
    }

    // get track by id
    const _getTrackById = useCallback((trackId) => {
        return data.find((item) => item.id === trackId)
    }, [data])

    /**
     * set sound and update recent 
     */ 
    const setSound = async (trackId) => {

        setSearch({
            query: '',
            isFocused: false,
        });

        if( !trackId ) return;
        if( sound.id === trackId ) return;
        if( player.isBuffering ) return;
        
        setPlayer({ isBuffering: true })

        if( currentAudio ) {
            await currentAudio.unloadAsync()
        }

        const track = _getTrackById(trackId)
        _setSound(track);
        
        const { sound: audio } = await Audio.Sound.createAsync(
            { uri: track.audio },
            { shouldPlay: true }
        );

        setCurrentAudio(prev => {
            if( prev ) {
                prev.unloadAsync()
            }
            _setSound(track)
            setRecent(trackId)
            setPlayer({ isBuffering: false })
            return audio
        });
    }

    // play next track
    const playNext = async (trackId) => {
        if (player.isShuffling) {
            trackId = getRandomTrackId(trackId)
        } else {
            trackId = getNextTrackId(trackId)
        }
        setSound(trackId)
    }

    // play previous track
    const playPrevious = async (trackId) => {
        if (player.isShuffling) {
            trackId = getRandomTrackId(trackId)
        } else {
            trackId = getPreviousTrackId(trackId)
        }
        setSound(trackId)
    }

    // get recent tracks
    const recentTracks = useMemo(() => {
        return _recent.map((id) => _getTrackById(id))
    }, [_recent, data])
    
    const toggleSound = async () => {
        if( !currentAudio ) return;

        if (player.isPlaying) {
            await currentAudio.pauseAsync();
        } else {
            await currentAudio.playAsync();
            setRecent(sound.id)
        }
    }

    return (
        <StoreContext.Provider value={{
            data,
            downloading,
            fetchRemoteData,
            player,
            recentTracks,
            currentAudio,
            setPlayer,
            toggleFavorite,
            isFavoriteById,
            setCurrentTime,
            sound,
            setSound,
            toggleSound,
            currentTime,
            favorite,
            search,
            setSearch,
            playNext,
            playPrevious,
        }}>
            {children}
        </StoreContext.Provider>
    )
}