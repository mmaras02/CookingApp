import { StepInputProps } from "@/app/types";
import { COLORS, globalStyles } from "@/styles";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View, Text, TextInput, StyleSheet } from "react-native";

const StepInput = ({steps, setSteps} : StepInputProps) => {
    const handleAddStep = () => {
        setSteps([...steps, '']);
    };

    const handleDeleteStep = (index: number) => {
        if(steps.length > 1){
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

    return(
        <>
        <Text style={globalStyles.text}>Instructions</Text>
            {steps.map((step, index) => (
                <View key={index}
                      style={styles.stepContainer}>
                    <TextInput
                        style={[styles.input, styles.stepInput]}
                        placeholder={`Step ${index + 1}`}
                        onChangeText={(text) => handleStepChange(index, text)}
                        multiline
                    />
                    <TouchableOpacity style={styles.deleteButton}
                                      onPress={() => handleDeleteStep(index)}>
                        <Ionicons name="trash" size={20} color={COLORS.orange} />
                    </TouchableOpacity>
            
            </View>
            ))}
            
            <TouchableOpacity style={styles.addButton}
                              onPress={handleAddStep}>
                <Text style={globalStyles.text}>+ Add step</Text>
            </TouchableOpacity>
        </>
    )
}

export default StepInput;

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: COLORS.dark_grey,
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        marginBottom: 10,
    },
    stepInput: {
        flex: 1,
    },
    stepContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addButton: {
        backgroundColor: COLORS.dark_grey,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    deleteButton: {
        padding: 10,
    },
})