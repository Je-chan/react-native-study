import React from 'react'
import {TextInput, TouchableOpacity, View} from "react-native";
import {AntDesign} from '@expo/vector-icons'
import {bottomSpace, ITEM_WIDTH} from "./utils";

export default ({
	value,
	onChangeText,
	placeholder = '',
	onPressAdd,
	onSubmitEditing,
	onFocus
}) => {
	// 수정이 끝났을 떄 동작하는 함수가 onSubmitEditing
	// 수정이 끝났을 때 키보드를 내릴지 말지 결정하는 Props 가 blurOnSubmit
	return (
		<View style={{
			width: ITEM_WIDTH,
			flexDirection: "row",
			alignSelf: "center",
			alignItems: "center",
		}}>
			<TextInput
				value={value}
				onChangeText={onChangeText}
				placeholder={placeholder}
				style={{
					flex: 1,
					padding: 5,
					color: "#595959"
				}}
				onSubmitEditing={onSubmitEditing}
				blurOnSubmit={false}
				onFocus={onFocus}
			/>

			<TouchableOpacity style={{
				padding: 5,
			}}
			onPress={onPressAdd}>
			  <AntDesign name={"plus"} size={18} color="#595959"/>
			</TouchableOpacity>
		</View>
	)
}