import {Button, View,StyleSheet} from "react-native";
import {useRouter} from "expo-router";
import {Checkbox} from "react-native-paper";

export default function register() {
    const navigation = useRouter()

    async function createGroup(){
        console.log("coucou")
    }

    return (
        <View style={styles.container}>
            <Checkbox
                status={"unchecked"}

            />
            <Button onPress={createGroup} title="Create Channel" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input:{
        fontSize: 25,
        borderStyle: "solid",
        borderColor: "gray",
        padding: 5,
        margin: 15,
        borderWidth: 1
    },

});
