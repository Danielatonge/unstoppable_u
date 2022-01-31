import { Pressable, useColorScheme } from "react-native";
import { getColorScheme } from "../../helpers";
import { Icon } from "../Icon";

export const Settings = () => {
  const scheme = useColorScheme();
  const { theme } = getColorScheme("AUTOMATIC", scheme);
  const colors = theme.colors;
  return (
    <Pressable>
      <Icon name="Settings" size={25} color={colors.text} />
    </Pressable>
  );
};
