import React from 'react'
import {Button, Text, View} from 'react-native'

export class ScreenA extends React.Component {
	render() {
		return (
			<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
				<Text>
					이것은 ScreenA 입니다
				</Text>

				<Button
					title={"B 스크린으로 이동하기"}
					onPress={() => {
						console.log("B 스크린으로 이동하기")
						this.props.navigation.navigate('ScreenB', {value: 'fromA'})
					}}
				></Button>

				<Button
					title={"C 스크린으로 이동하기"}
					onPress={() => {
						console.log("C 스크린으로 이동하기")
						this.props.navigation.navigate('NestedNavigator', {screen: 'ScreenC'})
					}}
				></Button>
			</View>
		)
	}
}