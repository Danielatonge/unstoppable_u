import { View, Image } from "react-native";

export const AppLoader = () => {
  return (
    <View
      style={{
        flex: 1,
        marginTop: -12,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={require("../assets/images/loading-logo.gif")}
        style={{ height: 155, width: 120 }}
      ></Image>
    </View>
  );
};
