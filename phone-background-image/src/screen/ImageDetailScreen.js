/** @format */

import React, { useCallback, useState } from 'react';
import { ActivityIndicator, useWindowDimensions, View } from 'react-native';
import Header from '../components/Header';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RemoteImage } from '../components/RemoteImage';
import { Button } from '../components/Button';
import { Typography } from '../components/Typography';
import { Icon } from '../components/Icons';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { useDispatch } from 'react-redux';

export default function ImageDetailScreen(props) {
  const navigation = useNavigation();
  const route = useRoute();
  const [downloading, setDownloading] = useState(false);

  // const dispatch = useDispatch();

  // const onPressFavorite = useCallback(() => {
  //   console.log('ON PRESS FAVORITE');
  // }, []);

  const onPressDownload = useCallback(async () => {
    setDownloading(true);

    const downloadResumable = FileSystem.createDownloadResumable(
      route.params.url,
      `${FileSystem.documentDirectory}${new Date().getMilliseconds()}.jpg`
    );

    try {
      const { uri } = await downloadResumable.downloadAsync();
      console.log('FINISHED');

      // 현재 허가 받은 것인지에 대해서 알 수 있음
      const permissionResult = await MediaLibrary.getPermissionsAsync(true);
      console.log(permissionResult);
      if (permissionResult.status === 'denied') {
        // 아예 못 쓰는 상태
        return;
      }

      if (permissionResult.status === 'undetermined') {
        // 권한이 부여되지 않았을 떄 한 번, 권한 부여해주시겠는지 Request 하는 건
        const requestResult = await MediaLibrary.requestPermissionsAsync();
        console.log(requestResult);
        if (requestResult.status === 'denied') {
          return;
        }
      }

      const asset = await MediaLibrary.createAssetAsync(uri);
      const album = await MediaLibrary.createAlbumAsync(
        'TestFolder',
        asset,
        false
      );

      console.log(album);
    } catch (err) {
      console.log(err);
    } finally {
      setDownloading(false);
    }
  }, []);

  const onPressBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const { width } = useWindowDimensions();

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Group>
          <Header.Icon iconName={'arrow-back'} onPress={onPressBack} />
          <Header.Title title={'IMAGE DETAIL'} />
        </Header.Group>

        <Header.Icon iconName="heart" onPress={onPressFavorite}></Header.Icon>
      </Header>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <RemoteImage
          url={route.params.url}
          width={width}
          height={width * 1.5}
        />
      </View>

      <Button onPress={onPressDownload}>
        <View style={{ paddingBottom: 24, backgroundColor: 'black' }}>
          {downloading ? (
            <View
              style={{
                height: 52,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ActivityIndicator />
            </View>
          ) : (
            <View
              style={{
                height: 52,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography fontSize={14} color={'white'}>
                DOWNLOAD
              </Typography>
              <Icon name={'download'} size={24} color={'white'}></Icon>
            </View>
          )}
        </View>
      </Button>
    </View>
  );
}
