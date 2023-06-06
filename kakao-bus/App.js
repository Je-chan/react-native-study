import { StatusBar } from 'expo-status-bar';
import {SafeAreaView, SectionList, StyleSheet, Text, View} from 'react-native';
import BusInfo from "./src/BusInfo";
import {COLOR} from "./src/color";
import {busStop, getBusNumColorByType, getRemainedTimeText, getSeatStatusText, getSections} from "./src/data";
import {useEffect, useState} from "react";
import dayjs from "dayjs";

export default function App() {
  const sections = getSections(busStop.buses)
  const [now, setNow] = useState(dayjs());

  const renderSectionHeader = ({section: {title}}) => {

    return (
      <View
        style={{
          paddingLeft: 13,
          paddingVertical: 3,
          backgroundColor: COLOR.GRAY_1,
          borderTopWidth: 0.5,
          borderBottomWidth: 0.5,
          borderTopColor: COLOR.GRAY_2,
          borderBottomColor: COLOR.GRAY_2
      }}>
        <Text style={{fontSize: 12, color: COLOR.GRAY_4}}>{title}</Text>
      </View>
    )
  }


  const renderItem = ({item: bus}) => {
    const firstNextBusInfo = bus.nextBusInfos?.[0] ?? null;
    const secondNextBusInfo = bus.nextBusInfos?.[1] ?? null;
    const newNextBusInfos =
      !firstNextBusInfo && !secondNextBusInfo
        ? [null]
        : [firstNextBusInfo, secondNextBusInfo];

    const processedNextBusInfos = newNextBusInfos.map((info) => {
      if (!info)
        return {
          hasInfo: false,
          remainedTimeText: "도착 정보 없음",
        };

      const { arrivalTime, numOfRemainedStops, numOfPassengers } = info;
      const remainedTimeText = getRemainedTimeText(now, arrivalTime);
      const seatStatusText = getSeatStatusText(bus.type, numOfPassengers);
      return {
        hasInfo: true,
        remainedTimeText,
        numOfRemainedStops,
        seatStatusText,
      };
    });

    return (
      <BusInfo
        isBookmarked={true}
        onPressBookmark={() => {}}
        num={bus.num}
        numColor={getBusNumColorByType(bus.type)}
        directionDescription={bus.directionDescription}
        processedNextBusInfo={processedNextBusInfos}
      />
    )
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const newNow = dayjs();
      setNow(newNow)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        style={{flex: 1, width: "100%"}}
        sections={sections}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
