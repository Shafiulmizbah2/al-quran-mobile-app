import { StyleSheet, Platform } from "react-native";
import colors from "constants/colors";

const styles = StyleSheet.create({
  wrapper: {
    gap: 22,
    marginTop: Platform.select({ ios: 15, android: 30 }),
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    paddingVertical: 11,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    flexGrow: 1,
  },
  duration: {
    color: "#D6D6D6",
    fontSize: 14,
    marginTop: 5,
    fontFamily: "Satoshi-Regular",
    flexWrap: "no-wrap",
  },
  activeDuration: {
    color: colors.primary,
  },
  title_wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  download_all: {
    fontFamily: "Satoshi-Regular",
    fontWeight: 500,
    fontSize: 14,
    color: colors.primary,
  },
});

export default styles;
