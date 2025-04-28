import COLORS from "@/styles/colors";
import globalStyles from "@/styles/global";
import { useState } from "react"
import { Modal, Pressable, View, Text, StyleSheet, Alert, TextInput } from "react-native";

interface NewListModalProps {
    visible: boolean;
    onClose: () => void;
    createList: (title: string) => void;
    isLoading?: boolean;
}

export const NewListModal =  ({ visible, onClose, createList, isLoading }: NewListModalProps) => {
    const [listTitle, setListTitle] = useState("");

    const handleCreateList = () => {
        createList(listTitle);
        setListTitle('');
        onClose();
    }

    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}>

            <View style={styles.centeredView}>
                <View style={styles.modalContainer}>
                    <Pressable style={styles.closeButton} onPress={onClose}>
                        <Text style={globalStyles.TitleText}>X</Text>
                    </Pressable>
                    <Text style={globalStyles.TitleText}>Enter title: </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter list title"
                        value={listTitle}
                        onChangeText={setListTitle}
                    />
                        <Pressable style={styles.createButton} onPress={handleCreateList}>
                            <Text style={styles.textStyle}>Create</Text>
                        </Pressable>
                        
                </View>
            </View>
        </Modal>
    )

}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    modalContainer: {
        margin: 20,
        width: 300,
        height: 300,
        backgroundColor: COLORS.light,
        borderRadius: 10,
        padding: 30,
        alignItems: 'center',
        elevation: 8,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    closeButton: {
        alignSelf: 'flex-end',
        marginBottom: 10,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        borderWidth: 0,
        marginVertical: 30,
        padding: 10,
        fontSize: 20,
    },
    createButton: {
        backgroundColor: COLORS.transparent_orange,
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        width: '50%',
    },
    textStyle: {
        color: COLORS.light,
        fontSize: 24,
        alignSelf: 'center',
        fontWeight: 600,
    }
})