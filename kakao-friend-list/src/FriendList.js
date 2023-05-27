import {ScrollView, View} from "react-native";
import Profile from "./Profile";
import {getBottomSpace} from "react-native-iphone-x-helper";
import Margin from "./Margin";

const bottomSpace = getBottomSpace()

export default (props) => {
	return props.isOpend && (
		<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: bottomSpace}}>
			{props.data.map((item, idx) => (
				<View key={idx}>
					<Profile
						uri={item.uri}
						name={item.name}
						introduction={item.introduction}
					/>
					<Margin height={13}/>
				</View>
			))}
		</ScrollView>
	)
}