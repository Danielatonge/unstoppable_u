import { Appearance, StatusBarStyle } from "react-native";
import { darkTheme, lightTheme } from "./theme";
import { Themes } from "./types";

const getScheme = Appearance.getColorScheme();
export const getColorScheme = (theme: Themes, scheme: typeof getScheme) => {
  let statusBarStyle: StatusBarStyle = "default";

  if (theme === "AUTOMATIC") {
    if (scheme === "dark") {
      statusBarStyle = "light-content";
      return { theme: darkTheme, statusBarStyle };
    } else {
      statusBarStyle = "dark-content";
      return { theme: lightTheme, statusBarStyle };
    }
  } else if (theme === "LIGHT") {
    statusBarStyle = "dark-content";
    return { theme: lightTheme, statusBarStyle };
  } else if (theme === "DARK") {
    statusBarStyle = "dark-content";
    return { theme: lightTheme, statusBarStyle };
  }
};

export const abbreviateNumber = (value) => {
  let newValue = value;
  if (value >= 1000) {
    let suffixes = ["", "K", "M", "B", "T"];
    let suffixNum = Math.floor(("" + value).length / 3);
    let shortValue = "";
    for (var precision = 2; precision >= 1; precision--) {
      shortValue = parseFloat(
        (suffixNum != 0
          ? value / Math.pow(1000, suffixNum)
          : value
        ).toPrecision(precision)
      );
      var dotLessShortValue = (shortValue + "").replace(/[^a-zA-Z 0-9]+/g, "");
      if (dotLessShortValue.length <= 2) {
        break;
      }
    }
    if (shortValue % 1 != 0) shortValue = shortValue.toFixed(1);
    newValue = shortValue + suffixes[suffixNum];
  }
  return newValue;
};
