import React, { useState } from "react";
import { View, Text, Modal, TextInput, Button, Pressable } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const index = ({
  isVisible,
  onRequestClose,
  onPress,
}: {
  isVisible: boolean;
  onRequestClose: Function;
  onPress: Function;
}) => {
  const [input, setInput] = useState("");

  return (
    <Modal visible={isVisible} onRequestClose={() => onRequestClose()}>
      <View style={{ flex: 1, backgroundColor: "black", paddingTop: 50 }}>
        <View style={{
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
            paddingHorizontal:20
        }}>
            <Pressable onPress={()=>onRequestClose()}>
                <Icon name="close" size={30} color={"#1DA1F2"} />
            </Pressable>
          <Pressable
            onPress={() => {
              onPress(input);
              onRequestClose();
              setInput("")
            }}
            style={{
              backgroundColor: "#1DA1F2",
              alignSelf: "flex-end",
              paddingVertical: 5,
              paddingHorizontal: 10,
              borderRadius: 12,
            }}
          >
            <Text
              style={{
                color: "white",
              }}
            >
              tweet
            </Text>
          </Pressable>
        </View>

        <TextInput
          value={input}
          autoFocus
          style={{
            color: "white",
            paddingHorizontal: 20,
            paddingVertical: 10,
            marginBottom: 10,
          }}
          placeholderTextColor={"grey"}
          placeholder="masukan tweet"
          onChangeText={(text) => {
            setInput(text);
          }}
        />
      </View>
    </Modal>
  );
};

export default index;
