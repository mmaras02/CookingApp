import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { useState } from 'react';
import ReturnPage from '../navigation/returnPage';
import { useLists } from '@/app/hooks';
import { ListItem, LoadingSpinner, NewListModal } from '@/app/components';
import { COLORS } from '@/styles';
import { MS, S, VS } from '../utils';

function ListsScreen() {
    const { lists, isLoading, createList } = useLists();
    const [modalVisible, setModalVisible] = useState(false);

    if (isLoading) return <LoadingSpinner />

    return (
        <View style={styles.container}>
            <ReturnPage title='Shopping košarica' />
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
                            columnWrapperStyle={{ justifyContent: 'space-between' }}
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
                    isLoading={isLoading} />
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
        padding: S(15),
        justifyContent: 'center',
    },
    listContainer: {
        flex: 1,
    },
    addButton: {
        position: 'absolute',
        width: S(50),
        height: S(50),
        backgroundColor: COLORS.secondary,
        borderRadius: MS(50),
        alignItems: 'center',
        justifyContent: 'center',
        bottom: VS(30),
        right: S(20),
    },
    plus: {
        fontSize: S(35),
        color: COLORS.textSecondary
    },
})