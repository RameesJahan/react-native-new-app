import {Animated, FlatList, StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Styles from '../styles';
import CarouselItem from './CarouselItem';
import CarouselIndicator from './CarouselIndicator';

type Props = {};

const data = [
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1471922694854-ff1b63b20054?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1434725039720-aaad6dd32dfe?q=80&w=1942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1669748161444-953a1fcf8ceb?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
];

const Carousel = (props: Props) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const flatList = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const activeIndexRef = useRef(activeIndex);

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {x: scrollX}}}],
    {useNativeDriver: false}
  );

  const handleViewableChanged = useRef(({viewableItems}: any) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  const getScrollIndex = (index: number) => {
    if(index < 0) {
      return data.length - 1;
    } else if (index > 4) {
      return 0;
    } else {
      return index;
    }
  };

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);
  

  useEffect(() => {
   const interval = setInterval(() => {
     if (flatList.current) {
       const index = getScrollIndex(activeIndexRef.current + 1);
       flatList.current.scrollToIndex({index, animated: true});
       setActiveIndex(index);
     }
   }, 3000); 

   return () => clearInterval(interval);
  },[])

  return (
    <View>
      <Text style={Styles.textH2}>Carousel</Text>
      <View style={styles.container}>
        <FlatList
          ref={flatList}
          horizontal
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <CarouselItem item={item} />}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          snapToAlignment='center'
          onScroll={onScroll}
          viewabilityConfig={viewConfig}
          onViewableItemsChanged={handleViewableChanged}
        />
      </View>
      <CarouselIndicator data={data} scrollX={scrollX} />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    aspectRatio: '16/9',
  },
});
