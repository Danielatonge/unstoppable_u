import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { stall } from "../helpers";

export default function useCachedResources() {
  const [isReady, setReady] = useState(false);
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    async function prepareForAnimation() {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        setReady(true);
        await SplashScreen.hideAsync();
      }
    }
    prepareForAnimation();
  }, []);

  useEffect(() => {
    async function makeCustomApiCalls() {
      try {
        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          "space-mono": require("../../assets/fonts/SpaceMono-Regular.ttf"),
        });
        await stall(2000);
      } catch (e) {
        console.warn(e);
      } finally {
        setShowSplash(false);
      }
    }
    setShowSplash(true);
    makeCustomApiCalls();
  }, [isReady]);

  return showSplash;
}
