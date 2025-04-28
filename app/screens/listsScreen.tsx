import { StyleSheet, Text, TouchableOpacity, View, FlatList, Alert } from 'react-native'
import React, { useState } from 'react'
import ReturnPage from '../navigation/returnPage';
import { globalStyles, COLORS } from '@/styles';
import { useNavigation } from 'expo-router';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamsList } from '@/app/types';
import { Ionicons } from '@expo/vector-icons';
import { useDeleteList, useLists } from '@/app/hooks';
import { NewListModal } from '@/app/components';

function ListsScreen() {
    const { lists, isLoading, createList } = useLists();
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<ParamsList>>();
    const { deleteList } = useDeleteList();
    
    const handleDelete = (itemId: number) => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this item?",
            [
                {
                    text: "Cancel",
                    style: "cancel" 
                },
                {
                    text: "Delete",
                    style: "destructive", 
                    onPress: () => deleteList(itemId)  
                }
            ],
            { cancelable: true } 
        );
    }
    return (
        <View style={styles.container}>
            <ReturnPage title={"Notes"}/>
            <View style={styles.content}>
            
                <View style={styles.listContainer}>
                    {lists?.length === 0 ? (
                        <View>
                            <Text>No lists yet</Text>
                        </View>
                    ) : (
                    <FlatList
                        data={lists}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.listItem}
                                            onPress={() => navigation.navigate('ListItem', {listId: item.id, title: item.title})}>
                                <Text style={globalStyles.TitleText}>{item.title}</Text>
                                <View style={styles.footer}>
                                    <Text>
                                        {new Date(item.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                                    </Text>
                                    <TouchableOpacity onPress={(e) => {
                                        e.stopPropagation();
                                        handleDelete(item.id);
                                    }}>
                                        <Ionicons name="trash-outline" size={26} color={COLORS.light_green} />
                                    </TouchableOpacity>
                                </View>
                                
                            </TouchableOpacity>
                        )}
                    />
                )}
                </View>

                <TouchableOpacity 
                    style={styles.addButton} 
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.plus}>+</Text>
                </TouchableOpacity>

                <NewListModal 
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    createList={createList}
                    isLoading={isLoading} 
                />
            </View>
        </View>
    )
}

export default ListsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 16,
    },
    listContainer: {
        flex: 1,
    },
    listItem: {
        height: 130,
        width: 170,
        backgroundColor: COLORS.grey,
        margin: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        elevation: 5,
        justifyContent: 'space-around',
    },
    addButton: {
        position: 'absolute',
        width: 60,
        height: 60,
        backgroundColor: COLORS.orange,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 30,
        right: 20,
    },
    plus: {
        fontSize: 40,
        color: COLORS.light
    },
    footer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    }
})