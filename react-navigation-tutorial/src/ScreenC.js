import React from 'react'
import {Text, View} from 'react-native'

export class ScreenC extends React.Component {
	render() {
		return (
			<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
				<Text>
					이것은 ScreenC 입니다
				</Text>
			</View>
		)
	}
}