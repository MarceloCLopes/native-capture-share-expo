import * as Sharing from "expo-sharing";
import { useRef, useState } from "react";
import * as FileSystem from 'expo-file-system';
import { Alert, Platform, Share } from "react-native";
import ViewShot, { captureRef } from 'react-native-view-shot';
import {
  AspectRatio,
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Image,
  NativeBaseProvider,
  Stack,
  Text
} from "native-base";

export default function App() {
  const [load, setLoad] = useState(false);

  const viewRef = useRef();

  async function handleSharing() {
    try {
      setLoad(true)
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 0.5
      })

      // Para ios
      if (Platform.OS === 'ios') {
        const fileBase64 = await FileSystem.readAsStringAsync(
          uri,
          { encoding: 'base64' }
        );

        await Share.share({
          url: `data:image/png;base64, ${fileBase64}`
        })
        return
      }

      await Sharing.shareAsync(uri)

    } catch (error) {
      Alert.alert('erro')
    } finally {
      setLoad(false)
    }
  }

  return (
    <NativeBaseProvider>
      <ViewShot ref={viewRef}>
        <Box alignItems={"center"} mt={10} px={2} >
          <Box
            rounded={'lg'}
            overflow={'hidden'}
            borderColor={"coolGray.200"}
            borderWidth={'1'}
          >
            <Box>
              <AspectRatio w={'100%'} ratio={16 / 9} >
                <Image
                  source={{ uri: 'https://www.holidify.com/images/cmsuploads/compressed/BangalorePalace16_20190904100428_20190904100439.jpg' }}
                  alt='image'
                />
              </AspectRatio>

              <Center
                bg={'violet.500'}
                _text={{ color: 'warmGray.50', fontWeight: '700', fontSize: 'xs' }}
                position={'absolute'}
                bottom={'0'}
                px={'3'}
                py={'1.5'}
              >
                PHOTOS
              </Center>

            </Box>

            <Stack p={'4'} space={3} >
              <Stack space={2} >
                <Heading size={"md"} marginLeft={'-1'} >
                  Bangalore Palace
                </Heading>
                <Text
                  fontSize={'xs'}
                  _light={{ color: 'violet.500' }}
                  _dark={{ color: 'violet.400' }}
                  fontWeight={'500'}
                  ml={'-0.5'}
                  mt={'-1'}
                >
                  The Majestic Bangalore Palace India.
                </Text>
              </Stack>

              <Text fontWeight={'400'} >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis deleniti corporis incidunt dolores voluptates id ea dolore sed repellat asperiores excepturi quisquam natus eum vitae, consequuntur soluta tenetur enim obcaecati?
              </Text>

              <HStack
                alignItems={'center'}
                justifyContent={'space-between'}
              >
                <HStack alignItems={'center'}>
                  <Text
                    color={'coolGray.600'}
                    _dark={{ color: 'warmGray.200' }}
                    fontWeight={'400'}
                  >
                    6 min ago
                  </Text>
                </HStack>

                <Center>
                  <Button
                    size={'sm'}
                    variant={'ghost'}
                    onPress={handleSharing}
                    isLoadingText='Comparilhado'
                    isLoading={load}
                  >
                    COMPARTILHAR
                  </Button>
                </Center>
              </HStack>
            </Stack>
          </Box>
        </Box>
      </ViewShot>
    </NativeBaseProvider>
  );
}