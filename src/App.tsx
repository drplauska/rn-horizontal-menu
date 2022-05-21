/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

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

const colors = {
  bg: '#3b2e2d',
};

const items = ['insurance', 'electricity', 'money'];

const App = () => {
  const [activeCard, setActiveCard] = useState(0);
  const {width} = useWindowDimensions();
  const ref = useRef<FlatList>(null);

  const scrollToCard = (index: number) => {
    ref.current?.scrollToIndex({index, viewOffset: width * 0.1});
    setActiveCard(index);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <FlatList
          ref={ref}
          data={items}
          contentContainerStyle={{paddingHorizontal: width * 0.1}}
          renderItem={({item}) => (
            <View
              style={{
                width: width * 0.8,
                backgroundColor: colors.bg,
              }}>
              <Text>{item}</Text>
            </View>
          )}
          horizontal
          ItemSeparatorComponent={() => <View style={{width: 10}} />}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
        />
      </View>
      <Button title="slide 0" onPress={() => scrollToCard(0)} />
      <Button title="slide 1" onPress={() => scrollToCard(1)} />
      <Button title="slide 2" onPress={() => scrollToCard(2)} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {flex: 1},
  container: {
    marginVertical: 100,
    height: 400,
  },
});

export default App;
