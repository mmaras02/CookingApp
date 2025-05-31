import Checkbox from 'expo-checkbox';
import ReturnPage from '../navigation/returnPage';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native'
import { useRoute } from '@react-navigation/native';
import { globalStyles, COLORS } from '@/styles';
import { useState } from 'react';
import { useCreateListItems, useListItems, useUpdateCheckbox } from '@/app/hooks';
import { S } from '../utils';

const ListItemScreen = () => {
    const route = useRoute();
    const { listId, title } = route.params as { listId: number, title: string };
    const { data: listItems } = useListItems(listId);
    const { mutate: createListItem } = useCreateListItems();
    const { mutate: updateCheckbox } = useUpdateCheckbox();

    const [useCheckboxes, setUseCheckboxes] = useState(false);
    const [input, setInput] = useState('');

    const handleUseCheckboxes = () => {
        setUseCheckboxes(prev => !prev);
    };

    const handleInput = () => {
        if (!input.trim()) return;

        createListItem({
            list_id: listId,
            content: input.trim(),
            is_checked: useCheckboxes ? false : null,
            is_checkbox: useCheckboxes,
        });

        setInput('');
    }

    const toggleCheckbox = async (itemId: number, currentChecked: boolean) => {
        updateCheckbox({
            id: itemId,
            is_checked: !currentChecked,
        });
    };

    return (
        <ScrollView>
            <ReturnPage />
            <View style={styles.container}>
                <Pressable style={styles.checkboxButton} onPress={handleUseCheckboxes}>
                    <Text style={styles.boxText}>
                        {useCheckboxes ? "☑️ use checkboxes" : "☐ use checkboxes"}
                    </Text>
                </Pressable >

                <Text style={globalStyles.titleText}>{title}</Text>

                {listItems?.map((item: any) => (
                    <View key={item.id} style={styles.notes}>
                        {item.is_checkbox && (
                            <Checkbox value={item.is_checked || false}
                                style={styles.checkbox}
                                onValueChange={() => toggleCheckbox(item.id, item.is_checked)}
                                color={item.is_checked ? COLORS.primary : ""} />
                        )}

                        <Text key={item.id}
                            style={[globalStyles.text, item.is_checked && styles.strikethrough]}>
                            {item?.content}
                        </Text>
                    </View>

                ))}
                <TextInput
                    placeholder={useCheckboxes ? "Add new item..." : "Write your notes..."}
                    value={input}
                    onChangeText={setInput}
                    onSubmitEditing={handleInput}
                    returnKeyType="done"
                />
            </View>

        </ScrollView>
    );
}

export default ListItemScreen;

const styles = StyleSheet.create({
    container: {
        padding: S(15),
    },
    checkboxButton: {
        alignSelf: 'flex-end',
        padding: S(10),
        backgroundColor: COLORS.primary,
    },
    boxText: {
        fontSize: S(14),
        color: COLORS.textSecondary,
    },
    notes: {
        flexDirection: 'row',
        margin: S(5),

    },
    checkbox: {
        marginRight: 10,
        width: S(20),
        height: (20),
    },
    strikethrough: {
        textDecorationLine: 'line-through',
    },
})