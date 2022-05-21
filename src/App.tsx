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
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import IconsList from './components/IconsList';

const colors = {
  bg: '#755b59',
};

export const items = [
  'insurance',
  'electricity',
  'money',
  'dance',
  'iodinum',
  'vienna',
];

const Card = ({label, isActive}: {label: string; isActive: boolean}) => {
  const {width} = useWindowDimensions();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(isActive ? 370 : 350, {duration: 350}),
      marginTop: withTiming(isActive ? 0 : 10, {duration: 350}),
    };
  }, [isActive]);
  return (
    <Animated.View
      style={[
        {
          width: width * 0.8,
          backgroundColor: colors.bg,
          borderRadius: 7,
        },
        animatedStyle,
      ]}>
      <Text>{label}</Text>
    </Animated.View>
  );
};

const Separator = () => <View style={{width: 10}} />;

const App = () => {
  const [activeCard, setActiveCard] = useState(0);
  const {width} = useWindowDimensions();
  const bigCardRef = useRef<FlatList>(null);
  const smallCardRef = useRef<FlatList>(null);

  const scrollToCard = (direction: 'left' | 'right') => {
    const index =
      direction === 'left'
        ? Math.max(activeCard - 1, 0)
        : Math.min(activeCard + 1, items.length - 1);
    bigCardRef.current?.scrollToIndex({index, viewOffset: width * 0.1});
    smallCardRef.current?.scrollToIndex({index, viewOffset: width * 0.42});
    setActiveCard(index);
  };

  return (
    <View style={styles.screen}>
      <View>
        <IconsList active={activeCard} />
        {/* <FlatList
          ref={smallCardRef}
          data={items}
          horizontal
          contentContainerStyle={{paddingHorizontal: '50%'}}
          renderItem={({item, index}) => (
            <>
              <SmallCard label={item} isActive={activeCard === index} />
            </>
          )}
          ItemSeparatorComponent={Separator}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
        /> */}
      </View>
      <View style={styles.container}>
        <FlatList
          ref={bigCardRef}
          data={items}
          contentContainerStyle={{paddingHorizontal: width * 0.1}}
          renderItem={({item, index}) => (
            <Card label={item} isActive={activeCard === index} />
          )}
          horizontal
          ItemSeparatorComponent={Separator}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          style={{marginTop: 10}}
        />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Button title="go left" onPress={() => scrollToCard('left')} />
        <Button title="go right" onPress={() => scrollToCard('right')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {flex: 1, paddingVertical: 100},
  container: {
    height: 450,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
