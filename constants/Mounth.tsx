import * as React from 'react'
import { StyleSheet, View, Text } from 'react-native'


const MOUNTH = {
    1: "Январь",
    2: "Февраль",
    3: "Март",
    4: "Апрель",
    5: "Май",
    6: "Июнь",
    7: "Июль",
    8: "Август",
    9: "Сентябрь",
    10: "Октябрь",
    11: "Ноябрь",
    12: "Декабрь"
}


export type PropsGetNameMounth = {
    mounth: number
}

const GetNameMounth: React.FC<PropsGetNameMounth> = ({mounth}) => {
    
    return (
        <Text>{MOUNTH[mounth]}</Text>
    );
}

const styles = StyleSheet.create({
    container: {

    }
})

export default GetNameMounth