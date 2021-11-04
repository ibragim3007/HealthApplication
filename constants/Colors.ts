import { Dimensions } from "react-native";


const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

const {width, height} = Dimensions.get('window') || 70

const DayWidthItem = width * 0.28

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
  day: {
    fontSize: 35,
    width: DayWidthItem,
    borderRadius: DayWidthItem,
    lightBackgroundColor: 'rgba(30, 132, 73 ,0.5)',
    darkBackgroundColor: 'rgba(39, 174, 96,0.5)',
    lightChoiceDayColor: 'red',
    darkChoiceDayColor: 'blue',
    itemSpacing: (width - DayWidthItem) / 2,  
  }
};
