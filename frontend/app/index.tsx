import React, { useState } from "react";
import { Button, View, StyleSheet, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";

// import ImageViewwer
// import axios from "axios";

export default function ImagePickerExample() {
  const [image, setImage] = useState<string | null>(null);
  const [diseaseName, setDiseaseName] = useState<string | null>(null);
  const [diseasePrecaution, setDiseasePrecaution] = useState<string | null>(
    null
  );

  // Function to pick an image from the gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log(result);
    } else {
      alert("You did not select any image.");
    }
  };

  // Function to upload image and get insights
  const getInsights = async () => {
    if (!image) {
      alert("Please select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("image", {
      uri: image,
      type: "image/jpeg",
      name: "image.jpg",
    });

    try {
      console.log("Clicked");
      const response = await fetch(
        "http://192.168.100.14:3000/api/v1/image/detectDisease",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        }
      );
      const json = await response.json();
      setDiseaseName(json.data);
      console.log(json);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const precautions = async () => {
    try {
      const response = await fetch(
        "http://192.168.100.14:3000/api/v1/image/diseasePrecautions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            disease: diseaseName,
          }),
        }
      );

      const json = await response.json();
      setDiseasePrecaution(json.data.replaceAll("*", ""));
      console.log(json);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image
        source={{ uri: image }}
        style={styles.image}
      />}
      <Button title="Get Insights" onPress={getInsights} />
      {diseaseName && <Text style={styles.text}>{diseaseName}</Text>}
      {diseaseName && <Button title="Precaution" onPress={precautions} />}
      {diseasePrecaution && <Text>{diseasePrecaution}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    marginBottom: 20,
  },
  text: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
});
