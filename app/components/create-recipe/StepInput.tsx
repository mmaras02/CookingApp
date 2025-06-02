import { StepInputProps } from "@/app/types";
import { MS, S, VS } from "@/app/utils";
import { COLORS, globalStyles, sharedStyles } from "@/styles";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View, Text, TextInput, StyleSheet } from "react-native";

const StepInput = ({ steps, setSteps }: StepInputProps) => {
    const handleAddStep = () => {
        setSteps([...steps, '']);
    };

    const handleDeleteStep = (index: number) => {
        if (steps.length > 1) {
            const updatedSteps = [...steps];
            updatedSteps.splice(index, 1);
            setSteps(updatedSteps);
        }
    }
    const handleStepChange = (index: number, value: string) => {
        const updatedSteps = [...steps];
        updatedSteps[index] = value;
        setSteps(updatedSteps);
    };

    return (
        <>
            <Text style={globalStyles.text}>Priprema:</Text>
            {steps.map((step, index) => (
                <View key={index}
                    style={sharedStyles.inputContainer}>
                    <TextInput
                        style={[sharedStyles.input, styles.stepInput]}
                        placeholder={`Korak ${index + 1}`}
                        onChangeText={(text) => handleStepChange(index, text)}
                        multiline
                    />
                    <TouchableOpacity style={sharedStyles.deleteButton}
                        onPress={() => handleDeleteStep(index)}>
                        <Ionicons name="trash" size={20} color={COLORS.secondary} />
                    </TouchableOpacity>

                </View>
            ))}

            <TouchableOpacity style={sharedStyles.addButton}
                onPress={handleAddStep}>
                <Text style={globalStyles.text}>+ Dodaj korak</Text>
            </TouchableOpacity>
        </>
    )
}

export default StepInput;

const styles = StyleSheet.create({
    stepInput: {
        flex: 1,
    },
})