import React, { useState } from 'react';
import { Platform, StyleSheet, TouchableOpacity, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';


import { Text, View, TextInput } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import Radio from '../components/Radio';
import AddMedicalNumber from '../components/AddMedicalNumber'
import { IDateForGenerateWeek, IMedical } from '../interfaces';
import Separator from '../components/Separator';

import { GenerateDays } from '../components/GenerateDays'

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

    const [currentNumMedical, setCurrentNumMedical] = useState<number>(0)
    const [name, setName] = useState<any>("")
    const [days, setDays] = useState<number | null | string>(null)
    const [selected, setSelected] = useState<number | null>(null)
    const [dis, setDis] = useState<string | null>("")


    const setMore = () => {
        if (currentNumMedical >= 10) { setCurrentNumMedical(currentNumMedical) }
        else { setCurrentNumMedical(currentNumMedical + 0.25); }
    }
    const setLow = () => {
        if (currentNumMedical > 0) { setCurrentNumMedical(currentNumMedical - 0.25); }
        else { setCurrentNumMedical(0); }
    }


    const onChangeSelect = (index: number) => {
        if (index === selected) { setSelected(null) }
        else { setSelected(index) }
    }


    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode: any) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const createNewMedical = async () => {
        const dateRightNow = new Date();
        let dayComeBack: Array<IDateForGenerateWeek>
        if (typeof days !== "object") {
            dayComeBack = GenerateDays(dateRightNow.getDate(), dateRightNow.getMonth() + 1, days);
        }
        else {
            dayComeBack = GenerateDays(dateRightNow.getDate(), dateRightNow.getMonth() + 1);
        }

        if (dis === "") setDis(null)

        const newMedical: IMedical = {
            name,
            selected,
            howMuchNeedUse: currentNumMedical,
            timeWhenAdded: dateRightNow,
            transcription: dis,
            timeWhenNeedUse: date,
            daysNeedUse: dayComeBack,
        }

        console.log(newMedical)
        
        // try {
        //     const res = await fetch('http://x96153lr.beget.tech/try.php', {
        //         method: 'POST',
        //         headers: {
        //             'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        //             'Content-Type': 'application/json'
        //         },
        //     })
        //         .then((response) => response.text())
        //         .then((response) => {
        //             console.log(response)
        //         })
        //         .catch((error) => {
        //             console.log("Error", error)
        //         })
        //     console.log(res)
        // }
        // catch (err) { }
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={{ marginLeft: 30 }}>Название препарата:</Text>
                <TextInput darkColor="#eee" lightColor="#333" value={name} onChangeText={setName} style={styles.inputs} placeholder="Название препарата" maxLength={100} />
                <Separator width="90%" marginVertical={3} />
                <AddMedicalNumber currentNumMedical={currentNumMedical} setMore={setMore} setLow={setLow} />
                <Separator width="90%" marginVertical={3} />
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: 9,
                    }}>
                    <View style={{ flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0)' }}>
                        <Text style={{ fontSize: 17 }}>Кол-во дней: </Text>
                        <TextInput
                            style={{
                                fontSize: 17,
                                borderBottomWidth: 1,
                                borderColor: 'rgba(0,0,0,0.6)',
                                width: 50,
                            }}
                            darkColor="#eee"
                            lightColor="#333"
                            placeholder="0"
                            keyboardType="numeric"
                            maxLength={3}
                            value={days?.toString()}
                            onChangeText={setDays}
                        />
                    </View>
                    <Radio
                        selected={selected}
                        options={['Каждый день', 'Через день']}
                        horizontal={false}
                        onChangeSelect={onChangeSelect}
                    />
                </View>
                <Separator width="90%" marginVertical={3} />
            </View>
            <View>
                <Text style={{ marginLeft: 30 }}>Описание:</Text>
                <TextInput
                    darkColor="#eee"
                    lightColor="#333"
                    value={dis}
                    onChangeText={setDis}
                    style={styles.inputs}
                    placeholderTextColor="#645f8b"
                    placeholder="Небольшая рекомендация"
                    maxLength={100}

                />
                <Separator width="90%" marginVertical={3} />
            </View>
            <View>
                <TouchableOpacity onPress={showTimepicker}>
                    <Text
                        style={{
                            fontSize: 16,
                            padding: 15,
                            borderWidth: 1,
                            borderRadius: 10,
                            marginVertical: 10,
                            textAlign: 'center',
                            borderColor: '#1c5a32e8',
                        }}
                    >Выбрать время приема</Text>
                </TouchableOpacity>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}
            </View>
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        paddingVertical: 10,
                        backgroundColor: '#0dff6247',
                        borderColor: '#007428ba',
                        borderWidth: 1,
                        borderRadius: 10,
                        width: '60%',
                    }}
                    onPress={createNewMedical}
                >
                    <Text lightColor="#444" darkColor="#eee" style={{ fontSize: 19 }}>Добавить</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 18,
    },
    title: {
        fontSize: 19,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 28,
        height: 1,
        width: '80%',
    },
    form: {

    },
    inputs: {
        paddingVertical: 8,
        paddingHorizontal: 13,
        marginHorizontal: 18,
        marginTop: 13,
        fontSize: 17,
    }
});
