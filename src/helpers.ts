import { Appearance, StatusBarStyle } from "react-native";
import { darkTheme, lightTheme } from "./theme";
import { Themes } from "./types";

const getScheme = Appearance.getColorScheme();
export const getColorScheme = (theme: Themes, scheme: typeof getScheme) => {
    let statusBarStyle:StatusBarStyle = "default"

  if (theme === "AUTOMATIC") {
    if (scheme === "dark") {
        statusBarStyle = "light-content"
      return { theme: darkTheme, statusBarStyle };
    } else {
        statusBarStyle= "dark-content"
      return { theme: lightTheme, statusBarStyle };
    }
  } else if (theme === "LIGHT") {
       statusBarStyle= "dark-content"
    return { theme: lightTheme, statusBarStyle };
  } else if (theme === "DARK") {
       statusBarStyle= "dark-content"
    return { theme: lightTheme, statusBarStyle };
  }
};
