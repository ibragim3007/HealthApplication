import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { View, Text } from './Themed'

type propsAddMedicalNumber = {
    currentNumMedical: number,
    setMore(): void,
    setLow(): void
}

const AddMedicalNumber = ({ currentNumMedical, setMore, setLow }: propsAddMedicalNumber) => {
    return (

            <View style={styles.containerForm}>
                <Text style={styles.howMuchYouNeedText}>Кол-во в день: </Text>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity onPress={setLow}>
                        <Text lightColor="#444" darkColor="#fff" style={styles.buttons}>-0.25</Text>
                    </TouchableOpacity>
                    <Text style={styles.current}>{currentNumMedical}</Text>
                    <TouchableOpacity onPress={setMore}>
                        <Text lightColor="#444" darkColor="#fff" style={styles.buttons}>+0.25</Text>
                    </TouchableOpacity>
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    containerForm: {
        alignItems: 'center',
        marginTop: 10,
        flexDirection: 'row',
        padding: 8,
        justifyContent: 'space-between',
    },
    howMuchYouNeedText: {
        fontSize: 17,
    },
    buttons: {
        fontSize: 15,
        paddingVertical: 4,
        paddingHorizontal: 6,
        backgroundColor: '#0dff6247',
        borderColor: '#007428ba',
        borderWidth: 1,
        borderRadius: 16,
    },
    current: {
        fontSize: 19,
        borderBottomWidth: 1,
        borderColor: '#777',
        width: 55,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    }
});


export default AddMedicalNumber