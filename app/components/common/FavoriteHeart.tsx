import { TouchableOpacity, StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "@/styles";
import { useFavoriteStatus } from "@/app/hooks";
import { MS, S } from "@/app/utils";

interface FavoriteHeartProps {
    mealId: number,
    disabled?: boolean;
    style?: object;
    size?: number;
    color?: string;
}

const FavoriteHeart = ({ mealId, disabled }: FavoriteHeartProps) => {
    const { isFavorited, toggleFavorite } = useFavoriteStatus(mealId!);

    return (
        <>
            <View style={styles.roundedOverlay} />
            <TouchableOpacity
                onPress={toggleFavorite}
                disabled={disabled}
                style={styles.heartIcon}>
                <AntDesign
                    name={isFavorited ? "heart" : "hearto"}
                    size={32}
                    color={COLORS.primaryTransparent}
                />
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    heartIcon: {
        position: "absolute",
        borderColor: COLORS.textPrimary,
        top: S(10),
        right: S(15),
        zIndex: 10,
        backgroundColor: COLORS.textSecondary,
        padding: S(7),
        borderRadius: MS(50),

    },
    roundedOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 20,
        backgroundColor: COLORS.textSecondary,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        zIndex: 2,
    }
});

export default FavoriteHeart;
