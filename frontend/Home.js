import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "./AuthContext";

// const data = [
//   {
//     title: "1 Hello World",
//     description: "This is the description 1",
//     created_at: "2023-09-13 01:10:00",
//   },
//   {
//     title: "2 Hello World",
//     description: "This is the description 2",
//     created_at: "2023-09-13 02:25:00",
//   },
//   {
//     title: "3 Hello World",
//     description: "This is the description 3",
//     created_at: "2023-09-13 03:46:00",
//   },
// ];

export default function Home({ navigation }) {
  const [getUser, setUser] = useState({});
  const { signOut } = React.useContext(AuthContext);
  const [getData, setData] = useState([]);

  const getUserData = async () => {
    try {
      const userJSON = await AsyncStorage.getItem("user");
      const user = JSON.parse(userJSON);
      setUser(user);

      // Check if user.mobile exists before making the fetch request
      if (user && user.mobile) {
        const response = await fetch(
          `http://localhost/mynote/notes.php?mobile=${user.mobile}`,
          {
            method: "GET",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setData(data.notes);
        } else {
          console.error("Fetch request failed");
        }
      }
    } catch (error) {
      console.error("Error while fetching user data or notes:", error);
    }
  };

  useEffect(() => {
    // Call the async function within useEffect
    getUserData();
  },[]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view1}>
        <View style={styles.view2}>
          <Image style={styles.img1} source={require("./assets/book.png")} />
          <Text style={styles.mainTitle}>MyNotes</Text>
        </View>
        <View style={styles.view3}>
          {/* <Button title="Logout" onPress={() => signOut()}></Button> */}
          <TouchableOpacity onPress={getUserData}><Image source={require("./assets/refresh.png")} /></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("AddNote")}><Image source={require("./assets/add.png")} /></TouchableOpacity>
          <TouchableOpacity onPress={() => signOut()}><Image source={require("./assets/logout.png")} /></TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={getData}
        renderItem={ListItemUI}
        style={{ width: "100%" }}
        contentContainerStyle={{ alignItems: "stretch" }}
      />
    </SafeAreaView>
  );
}

function ListItemUI({ item }) {
  const images = {
    study: require("./assets/study.png"),
    work: require("./assets/work.png")
  }

  return (
    <TouchableOpacity style={styles.listView1}>
      <View style={styles.listView2}>
        <Image source={item.category == 'Study' ? images.study : images.work} />
        <View>
          <Text style={styles.listTitle}>{item.title}</Text>
          <Text>{item.description}</Text>
        </View>
      </View>
      <Text style={styles.listTime}>{item.created_at}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "start",
  },
  view1: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  view2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30,
    marginBottom: 15,
    gap: 5,
  },
  view3: {
    flexDirection:"row",
    alignItems: 'center',
    gap: 20
  },
  mainTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#053B50",
  },
  listView1: {
    height: 80,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listView2: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  listTime: {
    fontSize: 10,
    color: "gray",
  },
  img1: {
      height: 50,
      width: 50,
      objectFit: 'contain'
  }
});
