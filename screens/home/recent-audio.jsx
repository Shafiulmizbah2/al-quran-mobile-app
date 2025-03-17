import { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StoreContext } from "@/services/store";
import { convertMilliseconds } from "@/helpers/utils";
import { heading } from "@/constants/styles";
import Play from "@/components/play";

export default function RecentAudio() {
  const { setSound, recentTracks, sound, player, currentAudio } =
    useContext(StoreContext);
  const navigation = useNavigation();
  if (!recentTracks.length) return null;

  return (
    <View>
      <Text style={[heading.lg, styles.heading]}>Recently Played</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {recentTracks.map((track, index) => {
          if (!track) return null;

          return (
            <Pressable
              style={styles.card}
              key={index}
              onPress={async () => {
                if (sound.id == track.id && currentAudio) {
                  return navigation.navigate("Details");
                }

                setSound(track.id);
                navigation.navigate("Details");
              }}
            >
              <View>
                <Image source={{ uri: track.artwork }} style={styles.image} />
                <Play
                  style={styles.play}
                  isActive={track.id == sound.id && player.isPlaying}
                />
              </View>
              <Text style={[styles.text, styles.title]}>{track.title}</Text>
              <Text style={[styles.text, styles.duration]}>
                {convertMilliseconds(track.duration)}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    marginTop: 20,
    marginBottom: 15,
    marginLeft: 20,
  },
  card: {
    marginLeft: 20,
  },
  text: {
    color: "#FBFBFB",
  },
  title: {
    flexWrap: "wrap",
    maxWidth: 147,
    fontSize: 16,
    marginTop: 7,
    fontFamily: "Satoshi-Bold",
  },
  duration: {
    fontSize: 12,
    fontFamily: "Satoshi-Regular",
    marginTop: 7,
  },
  imageWrapper: {
    position: "relative",
  },
  play: {
    position: "absolute",
    right: 10,
    bottom: 10,
  },
  image: {
    width: 147,
    height: 185,
    objectFit: "cover",
    borderRadius: 12,
  },
});
