import * as React from 'react';
import { useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, TextInput, Image, FlatList } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerMenu } from './DrawerMenu';

const Drawer = createDrawerNavigator();

const DATA = [
  { id: 1, name: 'kajhdas', likes: '121', dislikes: '3', comments: '10', imageURL: '../assets/london.png' },
  { id: 2, name: 'bruh', likes: '122', dislikes: '3', comments: '10', imageURL: '../assets/london.png' },
  { id: 3, name: 'kkkk', likes: '125', dislikes: '3', comments: '10', imageURL: '../assets/london.png' },
  { id: 4, name: 'aoskdpa', likes: '212', dislikes: '3', comments: '10', imageURL: '../assets/london.png' },
  { id: 5, name: 'somethign', likes: '94', dislikes: '3', comments: '10', imageURL: '../assets/london.png' },
  { id: 6, name: '已經沒有囉', likes: '10', dislikes: '3', comments: '10', imageURL: '../assets/london.png' },
];


function HotMain({ navigation }: { navigation: any }) {

  const [searchQuery, setSearchQuery] = useState<string>('');

  const renderItem = (item: any) => {
    return (
      <TouchableOpacity style={styles.itemBlock}>
        <View style={styles.itemTouch}>
          <Image
            source={{ uri: "https://i.imgur.com/I7zVE7v.jpeg" }}
            style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
          />
        </View>
        <View style={{ width: '100%', height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
          <Text style={{ maxWidth: '90%', fontSize: 20, color: 'white', fontWeight: '600' }}>
            {item.item.name}
          </Text>
        </View>
        <View style={styles.likeDis}>
          <View style={styles.likes}>
            <Image
              source={require('../assets/like.png')}
              style={{ marginRight: 5, width: 20, height: 20, resizeMode: 'contain' }}
            />
            <Text style={styles.likeTXT}>
              {item.item.likes}
            </Text>
          </View>
          <View style={styles.likes}>
            <Image
              source={require('../assets/dislike.png')}
              style={{ marginRight: 5, width: 20, height: 20, resizeMode: 'contain' }}
            />
            <Text style={styles.likeTXT}>
              {item.item.dislikes}
            </Text>
          </View>
          <View style={styles.likes}>
            <Image
              source={require('../assets/commentsIcon.png')}
              style={{ marginRight: 5, width: 20, height: 20, resizeMode: 'contain' }}
            />
            <Text style={styles.likeTXT}>
              {item.item.comments}
            </Text>
          </View>

        </View>

      </TouchableOpacity>
    )

  }


  return (
    <View style={{ backgroundColor: '#71D0DA', flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
      <View style={styles.topBlock}>
        <TouchableOpacity
          onPress={() => { navigation.openDrawer() }}
          style={styles.topButton}>
          <Image
            style={[{
              height: 40,
              width: 40,
              resizeMode: 'contain',
              opacity: 1
            }]}
            source={require('../assets/openmenu.png')}
          />
        </TouchableOpacity>
        <View style={styles.textInputBG}>
          <TextInput
            style={styles.input}
            onChangeText={setSearchQuery}
            value={searchQuery}
            placeholder="搜尋"
          />
        </View>
        <TouchableOpacity
          onPress={() => { }}
          style={styles.topButton}>
          <Image
            style={[{
              height: 40,
              width: 40,
              resizeMode: 'contain',
              opacity: 1
            }]}
            source={require('../assets/search.png')}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.flatList}>
        <FlatList
          data={DATA}
          columnWrapperStyle={styles.row}
          renderItem={renderItem}
          horizontal={false}
          numColumns={2}
          contentContainerStyle={{
            paddingBottom: 120
          }}
        />
      </View>

      <Button title="Hotmain" onPress={() => navigation.goBack()}></Button>
    </View>
  )
}

function Favourites({ navigation }: { navigation: any }) {

  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <View style={{ backgroundColor: '#71D0DA', flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
      <View style={styles.topBlock}>
        <TouchableOpacity
          onPress={() => { navigation.openDrawer() }}
          style={styles.topButton}>
          <Image
            style={[{
              height: 40,
              width: 40,
              resizeMode: 'contain',
              opacity: 1
            }]}
            source={require('../assets/openmenu.png')}
          />
        </TouchableOpacity>
        <View style={styles.textInputBG}>
          <TextInput
            style={styles.input}
            onChangeText={setSearchQuery}
            value={searchQuery}
            placeholder="搜尋"
          />
        </View>
        <TouchableOpacity
          onPress={() => { }}
          style={styles.topButton}>
          <Image
            style={[{
              height: 40,
              width: 40,
              resizeMode: 'contain',
              opacity: 1
            }]}
            source={require('../assets/search.png')}
          />
        </TouchableOpacity>
      </View>



      <Button title="Favourites" onPress={() => navigation.goBack()}></Button>
    </View>
  )
}

function History({ navigation }: { navigation: any }) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  return (
    <View style={{ backgroundColor: '#71D0DA', flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
      <View style={styles.topBlock}>
        <TouchableOpacity
          onPress={() => { navigation.openDrawer() }}
          style={styles.topButton}>
          <Image
            style={[{
              height: 40,
              width: 40,
              resizeMode: 'contain',
              opacity: 1
            }]}
            source={require('../assets/openmenu.png')}
          />
        </TouchableOpacity>
        <View style={styles.textInputBG}>
          <TextInput
            style={styles.input}
            onChangeText={setSearchQuery}
            value={searchQuery}
            placeholder="搜尋"
          />
        </View>
        <TouchableOpacity
          onPress={() => { }}
          style={styles.topButton}>
          <Image
            style={[{
              height: 40,
              width: 40,
              resizeMode: 'contain',
              opacity: 1
            }]}
            source={require('../assets/search.png')}
          />
        </TouchableOpacity>
      </View>

      <Button title="History" onPress={() => navigation.goBack()}></Button>
    </View>
  )
}

function WishList({ navigation }: { navigation: any }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Wish" onPress={() => navigation.openDrawer()}></Button>
    </View>
  )
}

export default function MainProductPage({ navigation }: { navigation: any }) {
  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerMenu {...props} />}>
      <Drawer.Screen name="Home" component={HotMain} />
      <Drawer.Screen name="History" component={History} />
      <Drawer.Screen name="Fav" component={Favourites} />
      <Drawer.Screen name="Wish" component={WishList} />
    </Drawer.Navigator>
  )
}


const styles = StyleSheet.create({
  itemBlock: {
    width: '47%',
    display: 'flex',
    height: 260,
    backgroundColor: '#DE75BE',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 8
  },
  itemTouch: {
    width: '90%',
    height: 170,
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 8
  },
  itemIMG: {

  },
  topBlock: {
    width: '100%',
    height: 80,
    //backgroundColor: 'red',
    marginTop: 60,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
  },
  input: {
    width: '60%',
    height: 50,
    marginLeft: 20,
    fontSize: 20,
    borderRadius: 25,
    backgroundColor: 'white',
  },
  textInputBG: {
    width: '60%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 25,
    display: 'flex',
    justifyContent: 'center'
  },
  topButton: {
    width: 50,
    height: 50,
    //backgroundColor: 'blue',
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  flatList: {
    height: '90%',
    width: '100%',
  },
  row: {
    justifyContent: 'space-around'
  },
  likeDis: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  likes: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },

  likeTXT: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  }

})
