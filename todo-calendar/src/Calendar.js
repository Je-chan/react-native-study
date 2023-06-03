import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from "react-native";
import dayjs from "dayjs";
import {getDayColor, getDayText} from "./utils";
import {SimpleLineIcons} from "@expo/vector-icons";

const COLUMN_SIZE = 35;

const Column = ({ text, color, opacity, disabled, onPress, isSelected }) => {
	return (
		<TouchableOpacity
			disabled={disabled}
			onPress={onPress}
			style={{
				width: COLUMN_SIZE,
				height: COLUMN_SIZE,
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: isSelected ? "#c2c2c2" : "transparent",
				borderRadius: COLUMN_SIZE / 2,
			}}
		>
			<Text style={{ color, opacity }}>{text}</Text>
		</TouchableOpacity>
	);
};

const ArrowButton = ({ iconNm, onPress }) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={{ paddingHorizontal: 20, paddingVertical: 10 }}
		>
			<SimpleLineIcons name={iconNm} size={15} color={"#404040"} />
		</TouchableOpacity>
	);
};


export default (
	{
		columns,
		selectedDate,
		onPressLeftArrow,
		onPressRightArrow,
		onPressHeaderDate,
		onPressDate
	}) => {
	const ListHeaderComponent = () => {
		const currentDateText = dayjs(selectedDate).format("YYYY.MM.DD");
		return (
			<View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<ArrowButton iconNm="arrow-left" onPress={onPressLeftArrow} />

					<TouchableOpacity onPress={onPressHeaderDate}>
						<Text style={{ fontSize: 20, color: "#404040" }}>
							{currentDateText}
						</Text>
					</TouchableOpacity>

					<ArrowButton iconNm="arrow-right" onPress={onPressRightArrow} />
				</View>

				<View style={{ flexDirection: "row" }}>
					{new Array(7).fill(null).map((_, day) => {
						const dateText = getDayText(day);
						const color = getDayColor(day);
						return (
							<Column
								key={day}
								text={dateText}
								color={color}
								opacity={1}
								disabled={true}
							/>
						);
					})}
				</View>
			</View>
		);
	};

	const renderItem = ({ item: date }) => {
		const dateText = dayjs(date).get("date");
		const day = dayjs(date).get("day");
		const color = day === 0 ? "#e67639" : day === 6 ? "#5872d1" : "#2b2b2b";
		const isCurrentMonth = dayjs(date).isSame(selectedDate, "month");
		const onPress = () => onPressDate(date)
		const isSelected = dayjs(date).isSame(selectedDate, "date");
		return (
			<Column
				text={dateText}
				color={color}
				opacity={isCurrentMonth ? 1 : 0.4}
				onPress={onPress}
				isSelected={isSelected}
			/>
		);
	};
	return (
			<FlatList
				data={columns}
				keyExtractor={(_, idx) => `column-${idx}`}
				numColumns={7}
				ListHeaderComponent={ListHeaderComponent}
				renderItem={renderItem}
			/>
	)
}