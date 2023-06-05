import { StatusBar } from 'expo-status-bar';
import {SafeAreaView, SectionList, StyleSheet, Text, View} from 'react-native';
import BusInfo from "./src/BusInfo";
import {COLOR} from "./src/color";
import {busStop, getBusNumColorByType, getRemainedTimeText, getSeatStatusText, getSections} from "./src/data";
import {useState} from "react";
import dayjs from "dayjs";

export default function App() {
  const sections = getSections(busStop.buses)
  const [now, setNow] = useState(dayjs());

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
  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        style={{flex: 1, width: "100%"}}
        sections={sections}
        renderSectionHeader={({section: {title}}) => <Text>{title}</Text>}
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
