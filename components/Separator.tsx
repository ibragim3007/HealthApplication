import React from "react";

import { View } from './Themed'

type PropsSeparator = {
    height?: number;
    width?: string | number;
    darkColor?: string;
    lightColor?: string;
    marginVertical?: number;
}

const Separator = ({ height = 1, width = '100%', darkColor, lightColor, marginVertical }: PropsSeparator) => {
    return (
        <View
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: marginVertical
            }}>
            <View
                style={{
                    height: height,
                    width: width,
                }}
                darkColor={darkColor || "rgba(255,255,255, 0.2)"}
                lightColor={lightColor || "rgba(0,0,0,0.2)"}
            />
        </View>
    )
}

export default Separator