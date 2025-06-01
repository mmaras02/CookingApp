import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from 'expo-router'
import { List, RootParamList } from '@/app/types'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Ionicons } from '@expo/vector-icons'
import { useDeleteList } from '@/app/hooks'
import { COLORS, globalStyles } from '@/styles'
import { S, VS } from '@/app/utils'

const ListItem = ({ list }: { list: List }) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();
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
        <TouchableOpacity style={styles.listItem}
            onPress={() => navigation.navigate('ListItem', { listId: list.id, title: list.title })}>
            <Text style={globalStyles.headingText}>{list.title}</Text>
            <View style={styles.footer}>
                <Text>
                    {new Date(list.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                </Text>
                <TouchableOpacity onPress={(e) => {
                    e.stopPropagation();
                    handleDelete(list.id);
                }}>
                    <Ionicons name="trash-outline" size={26} color={COLORS.primary} />
                </TouchableOpacity>
            </View>

        </TouchableOpacity>
    )
}

export default ListItem

const styles = StyleSheet.create({
    listItem: {
        height: VS(100),
        width: S(140),
        backgroundColor: COLORS.surfaceSubtle,
        margin: S(10),
        paddingHorizontal: S(5),
        borderRadius: S(5),
        borderStyle: 'solid',
        borderColor: COLORS.surfaceMuted,
        borderWidth: 1,
        justifyContent: 'space-around',
    },
    footer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    }
})