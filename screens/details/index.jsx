import { useContext, useEffect } from "react";
import { Text, Image, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PageWrapper from "@/components/page-wrapper";
import { StoreContext } from "@/services/store";
import styles from "./style";
import { heading } from "constants/styles";
import Heart from "@/components/heart";
import Ionicons from "@expo/vector-icons/Ionicons";
import PlayButton from "./play-button";
import RepeatButton from "./repeat-button";
import ShuffleButton from "./shuffle-button";
import Slider from "./slider";

export default function DetailsScreen() {
  const {
    toggleFavorite,
    isFavoriteById,
    setPlayer,
    player,
    toggleSound,
    sound,
    playNext,
    playPrevious,
  } = useContext(StoreContext);

  const navigation = useNavigation();
  const isFavorite = isFavoriteById(sound.id);

  useEffect(() => {
    if (!sound.id) {
      navigation.navigate("Home");
    }
  }, [sound]);

  const isLoading = !sound.id || player.isBuffering;

  const playNextTrack = (id) => {
    if (isLoading) return;
    playNext(id);
  };

  const playPreviousTrack = (id) => {
    if (isLoading) return;
    playPrevious(id);
  };

  return (
    <PageWrapper>
      <View style={styles.container}>
        <View>
          <View style={styles.artwork}>
            <Image
              style={styles.artwork}
              source={{
                uri: sound.artwork,
              }}
            />
            {isLoading && (
              <View style={styles.loading}>
                <Text style={heading.lg}>Loading...</Text>
              </View>
            )}
          </View>

          <View style={styles.titleContainer}>
            <Text style={heading.lg}>{sound.title}</Text>
            <Pressable onPress={() => toggleFavorite(sound.id)}>
              <Heart isActive={isFavorite} size={24} />
            </Pressable>
          </View>
        </View>
        <View>
          <Slider />
          <View style={styles.controlWrapper}>
            <RepeatButton
              onPress={() => {
                if (isLoading) return;
                setPlayer({ isRepeating: !player.isRepeating });
              }}
              isActive={player.isRepeating}
              style={{
                opacity: isLoading ? 0.4 : 1,
              }}
            />
            <View style={styles.playButtonWrapper}>
              <Pressable
                onPress={() => {
                  if (isLoading) return;
                  playPreviousTrack(sound.id);
                }}
              >
                <Ionicons
                  name="play-skip-back"
                  size={24}
                  color="#A7A7A7"
                  style={{
                    opacity: isLoading ? 0.4 : 1,
                  }}
                />
              </Pressable>
              <PlayButton
                onPress={() => {
                  if (isLoading) return;
                  toggleSound();
                }}
                isActive={!isLoading && player.isPlaying}
                style={{
                  opacity: isLoading ? 0.4 : 1,
                }}
              />
              <Pressable onPress={() => playNextTrack(sound.id)}>
                <Ionicons
                  name="play-skip-forward"
                  size={24}
                  color="#A7A7A7"
                  style={{
                    opacity: isLoading ? 0.4 : 1,
                  }}
                />
              </Pressable>
            </View>
            <ShuffleButton
              onPress={() => {
                if (player.isRepeating || isLoading) return;
                setPlayer({ isShuffling: !player.isShuffling });
              }}
              isActive={player.isShuffling}
              style={{
                opacity: player.isRepeating || isLoading ? 0.4 : 1,
              }}
            />
          </View>
        </View>
      </View>
    </PageWrapper>
  );
}
