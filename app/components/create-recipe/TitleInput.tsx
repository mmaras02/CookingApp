import { TitleInputProps } from "@/app/types"
import { COLORS, globalStyles } from "@/styles"
import { TextInput, View, Text, StyleSheet } from "react-native"

const TitleInput = ({ title, setTitle }: TitleInputProps) => {
    return (
        <View>
            <Text style={globalStyles.text}>Ime recepta</Text>
            <TextInput placeholder="Ime recepta"
                style={styles.input}
                value={title}
                onChangeText={setTitle} />
        </View>
    )
}

export default TitleInput;

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: COLORS.dark_grey,
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        marginBottom: 10,
    },
})
