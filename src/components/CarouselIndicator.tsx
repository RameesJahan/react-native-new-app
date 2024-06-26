import {Animated, Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';

type CarouselIndicatorProps = {
  data: string[];
  scrollX: Animated.Value;
};

const { width } = Dimensions.get('window');

const CarouselIndicator = ({data, scrollX}: CarouselIndicatorProps) => {
  return (
    <View style={styles.container}>
      {data.map((item: string, index: number) => {
        const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: 'clamp',
        });
        return <Animated.View key={index} style={[styles.indicator, {transform: [{scale}]}]} />;
      })}
    </View>
  );
};

export default CarouselIndicator;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#000',
    marginHorizontal: 4,
  },
});
