import { useContext, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { heading } from "constants/styles";
import Heart from "@/components/heart";
import { StoreContext } from "@/services/store";
import styles from "./style";
import Play from "../play";
import { convertMilliseconds } from "helpers/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "constants/colors";
import * as FileSystem from "expo-file-system";

const ASSET_FOLDER = FileSystem.documentDirectory + "audio/";

export default function AudioList(props) {
  const navigation = useNavigation();
  const { title, isFavoriteOnly, screenName } = props;
  const {
    data,
    isFavoriteById,
    toggleFavorite,
    player,
    sound,
    currentTime,
    favorite,
    search,
    setSound,
    currentAudio,
    downloadAudio,
    downloadAllAudios,
    downloadingItem,
    downloadingAll,
    setDownloadingItem,
  } = useContext(StoreContext);
  const [downloadedTracks, setDownloadedTracks] = useState([]);

  useEffect(() => {
    const fetchDownloadedTracks = async () => {
      const storedTracks = await AsyncStorage.getItem("audio_meta");
      const downloadedTracks = storedTracks ? JSON.parse(storedTracks) : [];

      const downloadedTrackIds = [];
      for (const track of downloadedTracks) {
        const audioPath = ASSET_FOLDER + track.id + ".mp3";

        const fileInfo = await FileSystem.getInfoAsync(audioPath);

        if (fileInfo.exists) {
          downloadedTrackIds.push(track.id);
        }
      }

      setDownloadedTracks(downloadedTrackIds);
    };
    fetchDownloadedTracks();
  }, [downloadingItem]);

  const onPress = async (id) => {
    if (sound.id == id && currentAudio) {
      return navigation.navigate("Details");
    }

    setSound(id);
    navigation.navigate("Details");
  };

  const beforeFilter = useMemo(() => {
    if (isFavoriteOnly) {
      return data.filter((item) => (favorite || []).includes(item.id));
    } else {
      return data;
    }
  }, [data, favorite, isFavoriteOnly]);

  const filteredData = useMemo(() => {
    return beforeFilter.filter((item) =>
      item?.title?.toLowerCase()?.includes(search?.query?.toLowerCase())
    );
  }, [data, search.query, favorite]);

  const isLastIndex = (index) => index === filteredData.length - 1;
  const isCurrentTrack = (id) => sound.id === id && player.isPlaying;
  const isDownloaded = (id) => downloadedTracks.includes(id);
  const isDownloading = (id) => downloadingItem === id;
  const isAllDownloaded = !data.some(
    (track) => track.audio.startsWith("http") || track.audio.startsWith("https")
  );

  const showDownloadALlBtn = screenName === "Home" && !isAllDownloaded;

  return (
    <View style={styles.wrapper}>
      <View style={styles.title_wrapper}>
        <Text style={heading.lg}>
          {search.isFocused ? "Search result" : title}
        </Text>
        {downloadingAll ? (
          <ActivityIndicator size="small" color={colors.primary} />
        ) : (
          showDownloadALlBtn && (
            <Pressable onPress={downloadAllAudios}>
              <Text style={styles.download_all}>Download all</Text>
            </Pressable>
          )
        )}
      </View>

      <View style={styles.list}>
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <View
              key={`${item.id}${item.title.split(" ").join("")}`}
              style={{
                ...styles.item,
                marginBottom: isLastIndex(index) ? 15 : 0,
              }}
            >
              <Pressable style={styles.button} onPress={() => onPress(item.id)}>
                <Play isActive={isCurrentTrack(item.id)} />
                <View>
                  <Text style={heading.sm}>{item.title}</Text>
                  <View style={{ flexDirection: "row" }}>
                    {isCurrentTrack(item.id) && (
                      <>
                        <Text style={[styles.duration, styles.activeDuration]}>
                          {convertMilliseconds(currentTime)}
                        </Text>
                        <Text style={styles.duration}> / </Text>
                      </>
                    )}
                    <Text style={styles.duration}>
                      {convertMilliseconds(item.duration)}
                    </Text>
                  </View>
                </View>
              </Pressable>

              {isDownloading(item.id) ? (
                <ActivityIndicator size="small" color={colors.primary} />
              ) : item?.downloaded ? (
                <Pressable onPress={() => toggleFavorite(item.id)}>
                  <Heart
                    size={24}
                    isActive={isFavoriteById(item.id)}
                    isFill={true}
                  />
                </Pressable>
              ) : (
                <Pressable
                  onPress={async () => {
                    setDownloadingItem(item.id);
                    await downloadAudio(item);
                    setDownloadingItem(null);
                  }}
                >
                  <AntDesign name="download" size={24} color={colors.primary} />
                </Pressable>
              )}
            </View>
          ))
        ) : (
          <Text
            style={{
              textAlign: "center",
              marginTop: Dimensions.get("window").height / 4,
              color: "#D6D6D6",
              fontSize: 16,
              fontFamily: "Satoshi-Bold",
            }}
          >
            No result found :(
          </Text>
        )}
      </View>
    </View>
  );
}
