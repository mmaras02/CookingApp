import { useState } from "react"
import { Modal, View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { globalStyles, COLORS } from '@/styles';
import { ModalProps, RootParamList } from "@/app/types";
import { CustomButton } from "../common";
import { S, VS } from "@/app/utils";
import { useNavigation } from "expo-router";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const NewListModal = ({ visible, onClose, createList, isLoading }: ModalProps) => {
    const [listTitle, setListTitle] = useState("");
    const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();

    const handleCreateList = async () => {
        try {
            const list = await createList(listTitle);
            navigation.navigate('ListItem', { listId: list.id, title: listTitle });
            setListTitle('');
            onClose();
        } catch (error) {
            console.error('Error creating list:', error);
        }
    }
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}>

            <View style={styles.centeredView}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.closeButton}
                        onPress={onClose}>
                        <Text style={globalStyles.titleText}>X</Text>
                    </TouchableOpacity>
                    <TextInput
                        style={styles.input}
                        placeholder="Naslov liste"
                        value={listTitle}
                        onChangeText={setListTitle}
                    />
                    <CustomButton onPress={handleCreateList}
                        buttonText="Kreiraj listu" />
                </View>
            </View>
        </Modal>
    )

}
export default NewListModal;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    modalContainer: {
        margin: 20,
        width: S(250),
        height: S(200),
        backgroundColor: COLORS.textSecondary,
        borderRadius: 10,
        padding: S(20),
        alignItems: 'center',
        elevation: 8,
    },
    closeButton: {
        alignSelf: 'flex-end',
    },
    input: {
        width: '100%',
        borderWidth: 0,
        marginVertical: 30,
        padding: S(10),
        fontSize: S(18),
    },
})