import { View, Text, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native'
import { useRoute } from '@react-navigation/native';
import ReturnPage from '../navigation/returnPage';
import { globalStyles, COLORS } from '@/styles';
import { useState } from 'react';
import Checkbox from 'expo-checkbox';
import { useCreateListItems, useListItems, useUpdateCheckbox } from '@/app/hooks';

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
        if(!input.trim()) return;
        
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
                        { useCheckboxes ?  "☑️ use checkboxes" : "☐ use checkboxes"}
                    </Text>
                </Pressable >

                <Text style={globalStyles.TitleText}>{title}</Text>

                {listItems?.map((item: any) => (
                    <View style={styles.notes}>
                        {item.is_checkbox && (
                            <Checkbox value={item.is_checked || false}
                                      style={styles.checkbox}
                                      onValueChange={() => toggleCheckbox(item.id, item.is_checked)}
                                      color={item.is_checked ? COLORS.light_green : ""}/>
                        )}
                        <Text key={item.id} 
                              style={[ globalStyles.text, item.is_checked && styles.strikethrough]}>
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
        padding: 20,
    },
    checkboxButton: {
        alignSelf: 'flex-end',
        padding: 10,
        backgroundColor: COLORS.light_green,
    },
    boxText: {
        fontSize: 16,
        color: COLORS.light,
    },
    notes: {
        flexDirection: 'row',
        margin: 5,
        
    },
    checkbox: {
        marginRight: 10,
        width: 25,
        height: 25,
    },
    strikethrough: {
        textDecorationLine: 'line-through',
    },
})