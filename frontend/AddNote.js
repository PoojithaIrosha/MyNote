import React, { useEffect, useState } from "react";
import {
    Alert,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddNote({ navigation }) {



    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("1");
    const [items, setItems] = useState([]);

    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [user, setUser] = useState();

    useEffect(() => {

        const getUserData = async () => {
            const userJSON = await AsyncStorage.getItem("user");
            const u = JSON.parse(userJSON);
            setUser(u);

        }
        // Call the async function within useEffect
        getUserData();

        fetch("http://localhost/mynote/get-categories.php", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                if (data.msg == "success") {
                    setItems(data.categories);
                }
            });
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Image source={require("./assets/book.png")} style={styles.logo1} />
            <Text style={styles.mainTitle}>My Note</Text>
            <Text style={styles.loginTitle}>Add New Note</Text>

            <View style={styles.view1}>
                <TextInput style={styles.textInput} placeholder="Title" value={title} onChangeText={setTitle} />

                <TextInput style={styles.textInput} placeholder="Description" value={description} onChangeText={setDescription} />

                <DropDownPicker
                    style={styles.dropdown}
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                />

                <TouchableOpacity style={styles.loginBtn} onPress={addNewNoteAction}>
                    <Text style={styles.loginBtnTxt}>Add New Note</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );

    function addNewNoteAction() {

        const data = {
            title: title,
            description: description,
            mobile: user.mobile,
            category: value
        }

        fetch("http://localhost/mynote/add-note.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(resp => resp.json()).then(data => {
            if(data.msg == "success") {
                Alert.alert("Success", "New note added successfully");

                setTitle("");
                setDescription("");
                setValue(1);

                navigation.push("Home");
            }else {
                Alert.alert("Error", data.msg)
            }
        })
      
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    logo1: {
        height: 150,
        width: 150,
        objectFit: "contain",
    },
    view1: {
        marginTop: 30,
        marginBottom: 15,
    },
    mainTitle: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#053B50",
    },
    loginTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#053B50",
    },
    textInput: {
        height: 40,
        width: 300,
        marginBottom: 10,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: "#053B50",
        borderWidth: 2,
        fontSize: 15,
    },
    dropdown: {
        width: 300,
        marginBottom: 10,
        borderColor: "#053B50",
        borderWidth: 2,
    },
    loginBtn: {
        height: 40,
        width: 300,
        borderRadius: 10,
        backgroundColor: "#053B50",
        color: "white",
        justifyContent: "center",
        alignItems: "center",
    },
    loginBtnTxt: {
        fontSize: 18,
        color: "white",
        fontWeight: "bold",
    },
});
