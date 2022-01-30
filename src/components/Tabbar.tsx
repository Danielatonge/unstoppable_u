import { Animated, Dimensions, useColorScheme, View } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { TABBAR_HEIGHT } from "../constants";
import { Icon } from "./Icon";
import { getColorScheme } from "../helpers";

const Wrapper = styled.View<{ insetBottom: number }>`
  height: ${TABBAR_HEIGHT}px;
  align-items: center;
  flex-direction: row;
  margin-left: 16px;
  margin-right: 16px;
  margin-bottom: ${({ insetBottom }) => insetBottom}px;
`;

const PressableWrapper = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
`;

const TabIndicatorWrapper = styled(Animated.View)<{ insetBottom: number }>`
  align-items: center;
  position: absolute;
  bottom: 10px;
`;

const TabIndicator = styled.View`
  height: 4px;
  width: 4px;
  background: ${({ theme }) => theme.accent};
`;

interface Props {
  props: BottomTabBarProps;
}

const TabbarComponent = ({ props }: Props) => {
  const insets = useSafeAreaInsets();
  //   console.log(props);

  const scheme = useColorScheme();
  const { theme } = getColorScheme("AUTOMATIC", scheme);
  const colors = theme.colors;

  const [switchAnim] = useState(new Animated.Value(0));

  const tabbarWidth = Dimensions.get("window").width - 32;
  const indicatorPosition = switchAnim.interpolate({
    inputRange: [0, props.state.routeNames.length - 1],
    outputRange: [0, tabbarWidth - tabbarWidth / 4],
  });

  useEffect(() => {
    Animated.spring(switchAnim, {
      toValue: props.state.index,
      bounciness: 10,
      useNativeDriver: false,
    }).start();
  }, [props.state.index]);

  // console.log(colors);
  return (
    <View style={{ backgroundColor: colors.secondary }}>
      <Wrapper insetBottom={insets.bottom}>
        {props.state.routeNames.map((route, index) => (
          <PressableWrapper
            key={route}
            onPress={() => {
              const isFocused = props.state.index === index;
              const event = props.navigation.emit({
                type: "tabPress",
                target: route,
                canPreventDefault: true,
              });
              if (!isFocused && !event.defaultPrevented) {
                props.navigation.navigate(route);
              }
            }}
          >
            <Icon name={route} size={24} color={colors.text} />
          </PressableWrapper>
        ))}
        <TabIndicatorWrapper
          style={{
            left: indicatorPosition,
            width: tabbarWidth / 4,
          }}
          insetBottom={insets.bottom}
        >
          <TabIndicator />
        </TabIndicatorWrapper>
      </Wrapper>
    </View>
  );
};

export const Tabbar: React.FC<BottomTabBarProps> = (routeProps) => (
  <TabbarComponent props={routeProps} />
);
