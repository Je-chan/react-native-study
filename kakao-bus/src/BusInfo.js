import {Text, View} from "react-native";
import BookmarkBtn from "./BookmarkBtn";
import {COLOR} from "./color";
import AlarmBtn from "./AlarmBtn";
import NextBusInfo from "./NextBusInfo";

export default ({
	isBookmarked,
	onPressBookmark,
	num,
  numColor,
  directionDescription,
	processedNextBusInfo
}) => {
	return (
		<View style={{flexDirection: "row"}}>
			<View style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
				{/* 북마크 */}
				<BookmarkBtn
					isBookmarked={isBookmarked}
					onPress={onPressBookmark}
					style={{paddingHorizontal: 10}}
				/>
				{/*	버스 번호, 방향*/}
				<View style={{flex: 1}}>
					<Text style={{color: numColor, fontSize: 20}}>{num}</Text>
					<Text style={{fontSize: 13, color: COLOR.GRAY_3}}>{directionDescription}</Text>
				</View>
			</View>

			<View style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
				{/* M분 S초 / N번째 전 / 여유 */}
				<View style={{flex: 1}}>
					{processedNextBusInfo.map((info, idx) => {
						return (
							<NextBusInfo
								key={idx}
								hasInfo={info.hasInfo}
								remainedTimeText={info.remainedTimeText}
								numOfRemainedStops={info.numOfRemainedStops}
								seatStatusText={info.seatStatusText}
							/>
						)
					})}
					{/*<NextBusInfo*/}
					{/*	hasInfo={true}*/}
					{/*	remainedTimeText={"8분 0초"}*/}
					{/*	numOfRemainedStops={5}*/}
					{/*	seatStatusText={"여유"}*/}
					{/*/>*/}
					{/*<NextBusInfo*/}
					{/*	hasInfo={false}*/}
					{/*	remainedTimeText={"도착 정보 없음"}*/}
					{/*/>*/}
				</View>
				{/*	알람 아이콘 */}
				<AlarmBtn onPress={() => {}} style={{paddingHorizontal: 15}}/>
			</View>
		</View>
	)
}