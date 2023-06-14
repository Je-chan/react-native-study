import {TouchableOpacity} from "react-native";
import {Ionicons} from '@expo/vector-icons'
import {COLOR} from "./color";
import {useState} from "react";

export default ({
	size = 24,
	isBookmarked: isBookmarkedProp,
	onPres: onPressProp,
	style
}) => {
	const [isBookmarked, setIsBookmarked] = useState(isBookmarkedProp);

	const onPress = () => {
		setIsBookmarked(!isBookmarked)
		onPressProp()
	}

	return (
		<TouchableOpacity style={style} onPress={onPress}>
			<Ionicons name={"star"} size={size} color={isBookmarked ? COLOR.YELLOW : COLOR.GRAY_1}/>
		</TouchableOpacity>
	)
}