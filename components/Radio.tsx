import React from "react";
import { Text, View } from './Themed';
import { TouchableOpacity, FlatList } from 'react-native'


type RadioProps = {
    options: Array<string | number>;
    horizontal?: boolean;
    onChangeSelect(opt: string | number): void;
    selected: number | null;
}

const Radio = ({ options = [], horizontal = false, onChangeSelect, selected }: RadioProps) => {
    return (
        <View style={{
            flexDirection: horizontal ? 'column' : 'row',
            
        }}>
            <FlatList
                data={options}
                keyExtractor={item => `key-${item}`}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => onChangeSelect(index)}
                            style={{
                                flexDirection: horizontal ? 'column' : 'row',
                                alignItems: 'center',
                                paddingVertical: 4,
                            }}
                        >
                            <View style={{
                                width: 18,
                                height: 18,
                                borderRadius: 20,
                                borderColor: '#007428ba',
                                borderWidth: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                {index === selected && <View style={{
                                    backgroundColor: '#007428ba',
                                    width: 9,
                                    height: 9,
                                    borderRadius: 20,
                                }} />}
                            </View>
                            <Text style={{
                                marginLeft: 9,
                                fontSize: 15
                            }}>{item}</Text>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

export default Radio