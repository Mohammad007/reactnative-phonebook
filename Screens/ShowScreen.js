import {
  Box,
  Heading,
  FlatList,
  HStack,
  Avatar,
  Text,
  VStack,
  Spacer,
  Icon,
  IconButton,
  AddIcon,
  DeleteIcon,
  Fab,
} from "native-base";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { deletePhonebook, setPhonebooks } from "../redux/reducerslist/PhonebookSlice";

export default function ShowScreen({ navigation }) {
    const data = useSelector((state) => state.phonebooks.phonebook);
    const dispatch = useDispatch()
    
    // delete data
    const deleteData = (id) => {
        dispatch(deletePhonebook(id));
    }

    const editData = (data) => {
        navigation.navigate("AddScreen", { data: data })
    }

  return (
    <>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Box
            borderBottomWidth="1"
            _dark={{
              borderColor: "gray.600",
            }}
            borderColor="coolGray.200"
            pl="4"
            pr="5"
            py="2"
          >
            <HStack space={3} justifyContent="space-between">
              <Avatar
                size="48px"
                source={{
                  uri: item.avatarUrl,
                }}
              />
              <VStack>
                <Text
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="coolGray.800"
                  bold
                >
                  {item.fullName}
                </Text>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  {item.mobile}
                </Text>
              </VStack>
              <Spacer />

              <IconButton
                icon={<Image source={require("../assets/edit.png")} />}
                onPress={() => editData(item)}
              />
              <IconButton
                icon={<Image source={require("../assets/delete.png")} />}
                onPress={() => deleteData(item.id)}
              />
            </HStack>
          </Box>
        )}
        keyExtractor={(item) => item.id}
      />
      <Fab
        renderInPortal={false}
        shadow={2}
        bg="#00CAA8"
        size="sm"
        icon={<AddIcon />}
        onPress={() => navigation.navigate("AddScreen")}
      />
    </>
  );
}
