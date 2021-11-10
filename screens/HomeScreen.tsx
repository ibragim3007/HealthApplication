import { conditionalExpression } from '@babel/types'
import React, { useState } from 'react'
import { StyleSheet, StatusBar, FlatList, Animated, Image, ImageBackground, View as DefaultView, Text as DefaultText, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'

import { Text, View } from '../components/Themed'
import { RootTabScreenProps } from '../types'


import { GenerateDays } from '../components/GenerateDays'

import GetNameMounth from '../constants/Mounth'
import Colors from '../constants/Colors'

import { IDateForGenerateWeek, IMedical } from '../interfaces'
import { State } from '../Redux'
import Separator from '../components/Separator'

const source = require('../src/stacked-waves-haikei.png')

const STATUS_BAR = StatusBar.currentHeight || 24

const time = new Date()
const mounth = time.getMonth() + 1;

const date = time.getDate()

const HomeScreen = ({ navigation }: RootTabScreenProps<'TabHome'>) => {

    let days:Array<IDateForGenerateWeek> = GenerateDays(date, mounth)

    const [currentCheckDay, setCurrentCheckDay] = React.useState(days[0])
    const [currentCheckMounth, setCurrentCheckMounth] = React.useState(days[0])
    console.log(State.medical)
    const todayMedicals = State.medical.filter(med =>
        med.whichDayNeedUse === currentCheckDay.date &&
        med.whichMounthNeedUse === currentCheckMounth.mounth
    )

    

    const [refFlatList, setRefFlatList] = useState<Animated.FlatList<IDateForGenerateWeek> | null>()
    const [currentIndex, setCurrentIndex] = useState(0)

    const getItemLayout = (data: IDateForGenerateWeek[] | null | undefined, index: number) => {
        return {length: Colors.day.width, offset: Colors.day.width * index, index}
    }

    const onClickHandler = (item:IDateForGenerateWeek, index:number):void => {
        setCurrentCheckDay(days[index])
        setCurrentCheckMounth(days[index])
        setCurrentIndex(index)
        
        refFlatList.scrollToIndex({animated: true, index: currentIndex})
    }

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
                        getItemLayout={getItemLayout}
                        ref={(ref) => setRefFlatList(ref)}
                        onScroll={Animated.event( 
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                            { useNativeDriver: true }
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
                                <TouchableOpacity 
                                    onPress={() => onClickHandler(item, index)}
                                    style={styles.day}
                                >
                                    <Animated.Text
                                        style={[styles.dayText, {
                                            opacity,
                                            transform: [{
                                                scale
                                            }]
                                        }]}>
                                        <Text>{item.date}</Text>
                                    </Animated.Text>
                                </TouchableOpacity>
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
                                {item ?
                                    <View style={styles.medicalItem}>
                                        <View style={styles.wrapperInfo} darkColor="rgba(0,0,0,0)">
                                            <Text style={styles.name}>{item.name}</Text>
                                            <View style={styles.wrapperHowMuch} darkColor="rgba(0,0,0,0)">
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
                <Separator />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    backgroundContainer: {
        flex: 1,

        width: '100%', // applied to Image
        height: '100%',

    },
    container: {
        flex: 1,
        width: '100%',
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
        backgroundColor: 'rgba(255,255,255, 0.1)',
        borderColor: 'rgba(215, 219, 221, 1)',
        marginHorizontal: 20,
        paddingHorizontal: 25,
        paddingBottom: 15,
        marginBottom: 15,
        borderRadius: 10,
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

