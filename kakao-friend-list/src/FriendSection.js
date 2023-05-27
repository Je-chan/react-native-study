import {TouchableOpacity, View, Text} from "react-native";
import {MaterialIcons} from '@expo/vector-icons';
export default (props) => {
	return(
			<View style={{flexDirection: "row", justifyContent: "space-between"}}>
				<Text style={{color: "gray"}}>친구 {props.friendCount}</Text>

				<TouchableOpacity onPress={props.onPressArrow}>
					<MaterialIcons name="keyboard-arrow-down" size={24} color="lightgrey"/>
				</TouchableOpacity>
			</View>
	);
}