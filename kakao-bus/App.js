import {RefreshControl, SafeAreaView, SectionList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import BusInfo from "./src/BusInfo";
import {COLOR} from "./src/color";
import {busStop, getBusNumColorByType, getRemainedTimeText, getSeatStatusText, getSections} from "./src/data";
import {useEffect, useState} from "react";
import dayjs from "dayjs";
import {SimpleLineIcons} from '@expo/vector-icons'
import Margin from "./src/Margin";
import BookmarkBtn from "./src/BookmarkBtn";

const busStopBookmarkSize = 20
const busStopBookmarkPadding = 6

export default function App() {
  const sections = getSections(busStop.buses)
  const [now, setNow] = useState(dayjs());
  const [refreshing, setRefreshing] = useState(false)

  const ListHeaderComponent = () => {
    const onPressBusStopBookmark = () => {
      console.log("here")
    }
    return (
      <View style={{backgroundColor: COLOR.GRAY_3, height: 170, justifyContent: "center", alignItems: "center"}}>
        {/* 정류소 번호, 이름, 방향*/}

          <Margin height={10}/>
          <Text style={{color: COLOR.WHITE, fontSize: 11}}>{busStop.id}</Text>
          <Margin height={4} />

          <Text style={{color: COLOR.WHITE, fontSize: 20}}>{busStop.name}</Text>
          <Margin height={4} />

          <Text style={{color: COLOR.GRAY_1, fontSize: 14}}>{busStop.directionDescription}</Text>
          <Margin height={20} />

          {/*  북마크 */}
          <BookmarkBtn
            size={busStopBookmarkSize}
            isBookmarked={busStop.isBookmarked}
            onPress={onPressBusStopBookmark}
            style={{
              borderWidth: 0.3,
              borderColor: COLOR.GRAY_1,
              borderRadius: (busStopBookmarkSize + busStopBookmarkPadding * 2) / 2,
              padding: busStopBookmarkPadding
            }}
          />
      </View>
    )
  }
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

  const ItemSeparatorComponent = () => {
    return (
      <View style={{width: "100%", height: 1, backgroundColor: COLOR.GRAY_1}}></View>
    )
  }

  const ListFooterComponent = () => {
    return (
      <Margin height={30}/>
    )
  }

  const onRefresh = () => {
    setRefreshing(true)
  }

  useEffect(() => {
    if(refreshing) {
      // API Refetch 가 완료되는 시점
      setTimeout(() => {
        setRefreshing(false)
        setNow(dayjs())
      }, 300)
    }
  }, [refreshing]);


  useEffect(()  => {
    const interval = setInterval(() => {
      const newNow = dayjs()
      setNow(newNow)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, []);



  return (
    <View style={styles.container}>
      {/* 뒤로 가기, 홈 아이콘*/}
      <View style={{backgroundColor: COLOR.GRAY_3, width: '100%'}}>
        <SafeAreaView style={{flexDirection: "row", justifyContent: "space-between"}}>
          <TouchableOpacity style={{padding: 10}}>
            <SimpleLineIcons name={"arrow-left"} size={20} color={COLOR.WHITE} />
          </TouchableOpacity>
          <TouchableOpacity style={{padding: 10}}>
            <SimpleLineIcons name={"home"} size={20} color={COLOR.WHITE} />
          </TouchableOpacity>
        </SafeAreaView>
        <View style={{
          position: "absolute",
          width: "100%",
          height: 500,
          backgroundColor: COLOR.GRAY_3,
          zIndex: -1
        }}></View>

      </View>

      <SectionList
        style={{flex: 1, width: "100%"}}
        sections={sections}
        ListHeaderComponent={ListHeaderComponent}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListFooterComponent={ListFooterComponent}
        refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
        }
      />

    </View>
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
