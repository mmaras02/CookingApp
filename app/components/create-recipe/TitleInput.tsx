import { TitleInputProps } from "@/app/types"
import { globalStyles, sharedStyles } from "@/styles"
import { TextInput, View, Text } from "react-native"

const TitleInput = ({ title, setTitle }: TitleInputProps) => {
    return (
        <View>
            <Text style={globalStyles.text}>Ime recepta</Text>
            <TextInput placeholder="Ime recepta"
                style={sharedStyles.input}
                value={title}
                onChangeText={setTitle} />
        </View>
    )
}

export default TitleInput;
