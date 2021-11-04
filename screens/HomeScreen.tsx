import { conditionalExpression } from '@babel/types'
import React, { useState } from 'react'
import { StyleSheet, StatusBar, FlatList, Animated } from 'react-native'
import { Surface } from 'react-native-paper';

import { Text, View } from '../components/Themed'
import { RootTabScreenProps } from '../types'

import { GenerateDays } from '../components/GenerateDays'

import GetNameMounth from '../constants/Mounth'
import Colors from '../constants/Colors'

import { IMedical } from '../interfaces'
import { State } from '../Redux'

const STATUS_BAR = StatusBar.currentHeight || 24

const time = new Date()
const mounth = time.getMonth() + 1;

const date = time.getDate()

const HomeScreen = ({ navigation }: RootTabScreenProps<'TabHome'>) => {

    let days = GenerateDays(date, mounth)

    const [currentCheckDay, setCurrentCheckDay] = React.useState(days[0])
    const [currentCheckMounth, setCurrentCheckMounth] = React.useState(days[0])

    const todayMedicals = State.medical.filter(med =>
        med.whichDayNeedUse === currentCheckDay.date &&
        med.whichMounthNeedUse === currentCheckMounth.mounth
    )


    const scrollX = React.useRef(new Animated.Value(0)).current;
    

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.mounthName}>
                    <Text style={styles.mounthNameText}>
                        <GetNameMounth mounth={mounth} />
                    </Text>
                    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.2)" />
                </View>
                <View>
                    <Animated.FlatList
                        data={days}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        bounces={false}
                        initialNumToRender={20}
                        maxToRenderPerBatch={20}
                        snapToInterval={Colors.day.width}
                        onScroll={Animated.event(
                            [{nativeEvent: {contentOffset: {x: scrollX}}}],
                            {useNativeDriver: true}
                        )}
                        onMomentumScrollEnd={ev => {
                            const index = Math.round(ev.nativeEvent.contentOffset.x / Colors.day.width)
                            setCurrentCheckDay(days[index])
                        }}
                        style={{ flexGrow: 0, borderRadius: 10 }}
                        contentContainerStyle={{
                            paddingHorizontal: Colors.day.itemSpacing
                        }}
                        renderItem={({ item, index }) => {
                            const inputRange = [
                                (index - 1) * Colors.day.width,
                                index * Colors.day.width,
                                (index + 1) * Colors.day.width
                            ]
                            const opacity = scrollX.interpolate({
                                inputRange,
                                outputRange: [.4, 1, 0.4]
                            })
                            const scale = scrollX.interpolate({
                                inputRange,
                                outputRange: [0.7, 1, 0.7]
                            })
                            return (
                                <View style={styles.day}>
                                    <Animated.Text
                                        style={[styles.dayText, {
                                            opacity,
                                            transform: [{
                                                scale
                                            }]
                                        }]}>
                                        {item.date}
                                    </Animated.Text>
                                </View>
                            )
                        }}
                    />
                </View>
                <View style={styles.listMedical}>
                    <FlatList
                        data={todayMedicals}
                        initialNumToRender={20}
                        maxToRenderPerBatch={20}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <View>
                                {item.whichDayNeedUse ?
                                    <View style={styles.medicalItem}>
                                        <View lightColor={"rgba(255,255,255,1)"} darkColor={"rgba(255,255,255,0.0)"} style={styles.wrapperInfo}>
                                            <Text style={styles.name}>{item.name}</Text>
                                            <View style={styles.wrapperHowMuch} lightColor={"rgba(255,255,255,1)"} darkColor={"rgba(255,255,255,0.0)"}>
                                                <Text style={styles.howMuchAsk} lightColor={"rgba(255,255,255,0)"} darkColor={"rgba(255,255,255,1)"}>Кол-во:</Text>
                                                <Text style={styles.howMuch}>{item.howMuchNeedUse}</Text>
                                            </View>
                                        </View>
                                        {item.transcription ? <Text style={styles.transcription}>{item.transcription}</Text> : null}
                                    </View> : <Text>fafksmg</Text>}
                            </View>
                        )}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: STATUS_BAR,
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    mounthName: {
        alignItems: 'center',
    },
    separator: {
        marginVertical: 5,
        height: 1,
        width: '80%',
    },
    mounthNameText: {
        fontSize: 24,
    },
    day: {
        width: Colors.day.width,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dayText: {
        fontSize: Colors.day.fontSize,
    },
    listMedical: {
        marginTop: 10,
    },
    medicalItem: {

        borderBottomWidth: 1,
        borderColor: 'rgba(215, 219, 221, 1)',
        marginHorizontal: 20,
        paddingHorizontal: 25,
        paddingBottom: 15,
        marginBottom: 15,

    },
    wrapperInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    name: {
        fontSize: 19,

    },
    wrapperHowMuch: {
        flexDirection: 'row'
    },
    howMuchAsk: {
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 10,
        color: '#666',
    },
    howMuch: {
        fontWeight: 'bold',
        backgroundColor: 'rgba(214, 234, 248, 1)',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 10,
        color: '#444',
    },
    transcription: {
        fontSize: 15,
        marginTop: 5,
        color: '#444',
        backgroundColor: 'rgba(232, 248, 245, 1)',
        borderRadius: 10,
        paddingVertical: 2,
        paddingHorizontal: 10,
    }

})

export default HomeScreen

