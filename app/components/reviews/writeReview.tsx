import { useWriteReview } from "@/app/hooks";
import { MS, S, VS } from "@/app/utils";
import { COLORS, globalStyles } from "@/styles";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, TextInput, Alert } from "react-native";
import { CustomButton } from "..";

const WriteReview = ({ mealId }: { mealId: number }) => {
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const { mutate: writeReview } = useWriteReview();

    const handleSubmitReview = () => {
        if (rating === 0) {
            Alert.alert("Please select a rating");
            return;
        }
        if (!comment.trim()) {
            Alert.alert("Please write a review");
            return;
        }
        writeReview({ mealId, rating, comment }, {
            onSuccess: () => {
                Alert.alert("Review submitted successfully!");
                setComment("");
                setRating(0);
            },
            onError: () => {
                Alert.alert("Failed to submit review");
            }
        });
    }

    return (
        <View>
            <Text style={globalStyles.headingText}>Ostavi svoj komentar!</Text>
            <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity key={star} onPress={() => setRating(star)}>
                        <Ionicons name={star <= rating ? "star" : "star-outline"}
                            size={30}
                            color={COLORS.orange}
                            style={styles.star} />
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Napiši svoj komentar..."
                    value={comment}
                    onChangeText={setComment}
                    multiline
                />
            </View>

            <View style={styles.buttonContainer}>
                <CustomButton
                    onPress={handleSubmitReview}
                    buttonText='Objavi komentar'
                />
            </View>

        </View>
    )

}
export default WriteReview;

const styles = StyleSheet.create({

    starsContainer: {
        flexDirection: "row",
        margin: S(10),
    },
    star: {
        marginHorizontal: S(3),
    },

    inputContainer: {
        backgroundColor: COLORS.dark_grey,
        padding: S(15),
        marginHorizontal: S(5),
        borderRadius: MS(10),
    },
    input: {
        fontSize: MS(16),
        color: COLORS.text,
    },
    buttonContainer: {
        marginTop: VS(20),
        marginBottom: S(30),
    }
})