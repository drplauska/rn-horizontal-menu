/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  useWindowDimensions,
  Button,
} from 'react-native';
import Animated, {
  color,
  interpolateColor,
  StretchInX,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
  Transition,
  FadeInRight,
  FadeInLeft,
  withSequence,
  FadeIn,
} from 'react-native-reanimated';

import {items} from '../App';

const IconsList = ({active}: {active: number}) => {
  const [width, setWidth] = useState<number | null>(null);

  const widthStyle = useAnimatedStyle(() => {
    return width
      ? {
          width: withTiming(width, {
            duration: 300,
          }),
        }
      : {};
  });

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View style={{position: 'absolute', right: 0, flexDirection: 'row'}}>
          {items.slice(0, active).map(item => (
            <Animated.View key={item} entering={FadeIn}>
              <Text>{item} </Text>
            </Animated.View>
          ))}
        </View>
      </View>
      <Animated.View
        style={[
          {
            backgroundColor: 'brown',
            height: 30,
            paddingHorizontal: 10,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
          },
          widthStyle,
        ]}>
        <Animated.View
          style={{
            opacity: withSequence(
              withTiming(0, {duration: 100}),
              withTiming(1, {duration: 100}),
            ),
          }}>
          <Text>{items[active]}</Text>
        </Animated.View>
      </Animated.View>
      <Animated.View
        onLayout={({nativeEvent}) => setWidth(nativeEvent.layout.width)}
        style={{
          height: 30,
          paddingHorizontal: 10,
          opacity: 0,
          position: 'absolute',
        }}>
        <Text>{items[active]}</Text>
      </Animated.View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View style={{position: 'absolute', left: 0, flexDirection: 'row'}}>
          {items.slice(active + 1).map(item => (
            <Animated.View
              key={item}
              entering={FadeIn}
              style={{transform: [{translateX: 0}]}}>
              <Text> {item}</Text>
            </Animated.View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default IconsList;
