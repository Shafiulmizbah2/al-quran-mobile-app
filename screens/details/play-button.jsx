import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { View, StyleSheet, Pressable } from "react-native";
import colors from "@/constants/colors";
import { useEffect } from "react";

export default function PlayButton(props) {
  const { isActive, onPress, style } = props;
  const color = "white";

  return (
    <Pressable onPress={onPress} style={style}>
      <View style={styles.container}>
        {isActive ? (
          <Ionicons name="pause-outline" size={28} color={color} />
        ) : (
          <FontAwesome5 name="play" size={22} color={color} />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 72,
    height: 72,
    backgroundColor: colors.primary,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
