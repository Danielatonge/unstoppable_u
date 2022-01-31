import { FlatList, View } from "react-native";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { MESSAGES } from "../../mock";

import { MainHeader } from "../../components/MainHeader";
import { MessengerCard } from "../../components/Messenger/MessengerCard";
import { SearchMessages } from "../../components/Search/SearchMessages";
import { stall } from "../../helpers";

export const Messenger = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      await stall(500).then(() => setMessages(MESSAGES));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const MessengerItem = ({ user }) => {
    return (
      <MessengerCard
        id={user.userId}
        name={user.name}
        username={user.username}
        avatar={user.userUri}
        message={user.message}
        lastTimeStamp={user.lastTimeStamp}
      ></MessengerCard>
    );
  };

  return (
    <>
      <MainHeader title="Messages"></MainHeader>
      <SearchMessages />
      <FlatList
        data={messages}
        renderItem={({ item }) => <MessengerItem user={item} />}
        keyExtractor={(item) => item.userId}
        refreshing={loading}
        onRefresh={fetchMessages}
      />
    </>
  );
};
