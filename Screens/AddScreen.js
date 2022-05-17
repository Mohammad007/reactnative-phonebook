import React, { useEffect, useState } from "react";
import {
  Box,
  Center,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Text,
  Image,
} from "native-base";
import { useDispatch, useSelector } from "react-redux";
import {
  setPhonebooks,
  updatePhonebook,
} from "../redux/reducerslist/PhonebookSlice";
import { TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function AddScreen({ navigation, route }) {
  const data = route.params?.data;

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [image, setImage] = useState(
    "https://wallpaperaccess.com/full/317501.jpg"
  );
  const [error, setError] = useState({
    name: "",
    mobile: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      setName(data.fullName);
      setMobile(data.mobile);
      setImage(data.avatarUrl);
    }
  }, [data]);

  // add data
  const addData = () => {
    if (name === "")
      return setError({ ...error, name: "Name is required" });
    
    if (mobile === "")
      return setError({ ...error, mobile: "Mobile is required" });
    
    const obj = {
      id: Math.floor(Math.random() * 1000 + 1),
      fullName: name,
      mobile: mobile,
      avatarUrl: image,
    };
    dispatch(setPhonebooks(obj));
    setName("");
    setMobile("");
    setError({ name: "", mobile: "" });
    setImage("https://wallpaperaccess.com/full/317501.jpg");
    navigation.navigate("ShowScreen");
  };

  // update data
  const updateData = () => {
    const obj = {
      id: data.id,
      fullName: name,
      mobile: mobile,
      avatarUrl: image,
    };
    dispatch(updatePhonebook(obj));
    setName("");
    setMobile("");
    setError({ name: "", mobile: "" });
    setImage("https://wallpaperaccess.com/full/317501.jpg");
    navigation.navigate("ShowScreen");
  };

  // image picker
  const imageUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <Box alignItems="center" justifyContent="center" flex="0.7">
      <TouchableOpacity onPress={imageUpload}>
        <Image
          size={150}
          resizeMode={"contain"}
          borderRadius={100}
          source={{
            uri: image,
          }}
          alt="Alternate Text"
        />
      </TouchableOpacity>
      <Input
        mx="3"
        placeholder="Name"
        w="100%"
        maxWidth="350px"
        mt="7"
        defaultValue={name}
        onChangeText={(name) => setName(name)}
      />
      <Text color="red">{ error.name }</Text>

      <Input
        mx="3"
        placeholder="Mobile"
        w="100%"
        maxWidth="350px"
        mt="7"
        defaultValue={mobile}
        onChangeText={(mobile) => setMobile(mobile)}
      />
      <Text color="red">{ error.mobile }</Text>

      <Button
        w="100%"
        maxWidth="350px"
        mt="7"
        block
        bg="#A45DE4"
        onPress={data ? updateData : addData}
      >
        <Text color="white">
          {data ? "Update To Phonebook" : "Add To Phonebook"}
        </Text>
      </Button>
    </Box>
  );
}
