import {
  FlatList,
  Pressable,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { NOTIFICATIONS, POSTS, USER } from "../../mock";
import { MainHeader } from "../../components/MainHeader";
import { getColorScheme, stall } from "../../helpers";
import { useNavigation } from "@react-navigation/native";
import { NotificationCard } from "../../components/Notification/NotificationCard";

export const Notification = () => {
  const scheme = useColorScheme();
  const { theme } = getColorScheme("AUTOMATIC", scheme);
  const colors = theme.colors;
  const navigation = useNavigation();

  const [notification, setNotification] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      await stall(500).then(() => setNotification(NOTIFICATIONS));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const NotificationItem = ({ user }) => {
    return (
      <NotificationCard
        id={user.userId}
        avatar={user.userUri}
        message={user.message}
      ></NotificationCard>
    );
  };

  return (
    <>
      <MainHeader title="Notifications"></MainHeader>

      <FlatList
        data={NOTIFICATIONS}
        renderItem={({ item }) => <NotificationItem user={item} />}
        keyExtractor={(item) => item.userId}
        refreshing={loading}
        onRefresh={fetchNotifications}
      />
    </>
  );
};
