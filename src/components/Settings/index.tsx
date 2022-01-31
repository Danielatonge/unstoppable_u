import { useNavigation } from "@react-navigation/native";
import { Pressable, TouchableOpacity, useColorScheme } from "react-native";
import { getColorScheme } from "../../helpers";
import { Icon } from "../Icon";

export const Settings = () => {
  const scheme = useColorScheme();
  const { theme } = getColorScheme("AUTOMATIC", scheme);
  const colors = theme.colors;
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
      <Icon name="Settings" size={25} color={colors.text} />
    </TouchableOpacity>
  );
};
