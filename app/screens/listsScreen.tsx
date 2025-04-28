import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import React, { useState } from 'react'
import ReturnPage from '../navigation/returnPage';
import COLORS from '@/styles/colors';
import { useLists } from '../hooks/useLists';
import { NewListModal } from '../components/modals/newListModal';
import globalStyles from '@/styles/global';
import { useNavigation } from 'expo-router';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamsList } from '../types/ParamsList';

function ListsScreen() {
    const { lists, isLoading, createList } = useLists();
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<ParamsList>>();
    
  return (
    <View style={styles.container}>
        <ReturnPage />
        <View style={styles.content}>
            <Text style={globalStyles.TitleText}>Your notes</Text>
        
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
                            <Text>
                                {new Date(item.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                            </Text>
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
        flex: 1,
        height: 100,
        backgroundColor: COLORS.grey,
        marginHorizontal: 10,
        marginVertical: 10,
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
})