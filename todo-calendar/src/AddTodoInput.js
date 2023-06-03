import React from 'react'
import {TextInput, TouchableOpacity, View} from "react-native";
import {AntDesign} from '@expo/vector-icons'
import {bottomSpace, ITEM_WIDTH} from "./utils";

export default ({
	value,
	onChangeText,
	placeholder = '',
	onPressAdd
}) => {
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