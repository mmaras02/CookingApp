import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import React, { useState } from 'react'
import ReturnPage from '../navigation/returnPage';
import { useLists } from '@/app/hooks';
import { ListItem, LoadingSpinner, NewListModal } from '@/app/components';
import { COLORS } from '@/styles';

function ListsScreen() {
    const { lists, isLoading, createList } = useLists();
    const [modalVisible, setModalVisible] = useState(false);

    if (isLoading) return <LoadingSpinner />
    
    return (
        <View style={styles.container}>
            <ReturnPage title={"Bilješke"}/>
            <View style={styles.content}>
            
                <View style={styles.listContainer}>
                    {lists?.length === 0 ? (
                        <View>
                            <Text>Nemaš još bilješaka!</Text>
                        </View>
                    ) : (
                    <FlatList
                        data={lists}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2}
                        renderItem={({ item }) => (
                            <ListItem list={item} />
                        )}
                    />
                )}
                </View>

                <TouchableOpacity style={styles.addButton} 
                                  onPress={() => setModalVisible(true)}>
                    <Text style={styles.plus}>+</Text>
                </TouchableOpacity>

                <NewListModal visible={modalVisible}
                              onClose={() => setModalVisible(false)}
                              createList={createList}
                              isLoading={isLoading}  />
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