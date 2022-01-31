import React, { useState, useCallback, useEffect } from "react";
import { View } from "react-native";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { SafeAreaView } from "react-native-safe-area-context";

export const Chat = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello Dear, \nIts my honor to be using this application.\nThanks for making it possible.",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Chris Tom",
          avatar: "https://robohash.org/chrisTom?bgset=bg2",
        },
      },
      {
        _id: 2,
        text: "Its my honor to be using this application.\nThanks for making it possible.",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Chris Tom",
          avatar: "https://robohash.org/chrisTom?bgset=bg2",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      bottomOffset={100}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderBubble={renderBubble}
      keyboardShouldPersistTaps="never"
      renderAvatarOnTop={true}
    />
  );
};

const renderBubble = (props) => {
  return (
    <Bubble
      {...props}
      textStyle={{
        right: {
          color: "white",
        },
        left: {
          color: "white",
        },
      }}
      wrapperStyle={{
        left: {
          backgroundColor: "#777",
        },
      }}
    />
  );
};
