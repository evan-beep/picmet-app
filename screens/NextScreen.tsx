import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, Button, TouchableOpacity, StyleSheet, TextInput, Image, FlatList, Platform, KeyboardAvoidingView, Appearance } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerMenu, } from './DrawerMenu';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { Modal, Portal, Provider, Text } from 'react-native-paper';

import History from './History'
import Favourites from './Favourites';
import WishNotes from './WishNotes';



import firebase from 'firebase/app'

// Optionally import the services that you want to use
import "firebase/auth";
import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
import "firebase/storage";
import { Alert } from 'react-native';

// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyC4sYfz1pRXlf1AobgQ69aDMzw3F3imGQo",
  authDomain: "picmet-app.firebaseapp.com",
  databaseURL: "https://picmet-app-default-rtdb.firebaseio.com",
  projectId: "picmet-app",
  storageBucket: "picmet-app.appspot.com",
  messagingSenderId: "1040692554774",
  appId: "1:1040692554774:web:ae603f95751b34ae465937",
  measurementId: "G-8RNR9L5QHF"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const Drawer = createDrawerNavigator();

const DATA = [
  { id: 1, name: 'kajhdas', likes: '121', dislikes: '3', comments: '10', imageURL: "https://i.imgur.com/I7zVE7v.jpeg" },
  { id: 2, name: 'bruh', likes: '122', dislikes: '3', comments: '10', imageURL: "https://i.imgur.com/I7zVE7v.jpeg" },
  { id: 3, name: 'kkkk', likes: '125', dislikes: '3', comments: '10', imageURL: "https://i.imgur.com/I7zVE7v.jpeg" },
  { id: 4, name: 'aoskdpa', likes: '212', dislikes: '3', comments: '10', imageURL: "https://i.imgur.com/I7zVE7v.jpeg" },
  { id: 5, name: 'somethign', likes: '94', dislikes: '3', comments: '10', imageURL: "https://i.imgur.com/I7zVE7v.jpeg" },
  { id: 6, name: '已經沒有囉', likes: '10', dislikes: '3', comments: '10', imageURL: "https://i.imgur.com/I7zVE7v.jpeg" },
  { id: 7, name: '已經沒有囉', likes: '10', dislikes: '3', comments: '10', imageURL: "https://i.imgur.com/I7zVE7v.jpeg" },

];


const COMMENTS = [
  { id: 1, userID: 'player1', itemID: 'kke', content: 'kajhdas', likes: '121', dislikes: '3', comments: '10', imageURL: "https://i.imgur.com/I7zVE7v.jpeg" },
  { id: 2, userID: 'player2', itemID: 'kke', content: 'bruh', likes: '122', dislikes: '3', comments: '10', imageURL: '../assets/london.png' },
  { id: 3, userID: 'player3', itemID: 'kke', content: 'kkkk', likes: '125', dislikes: '3', comments: '10', imageURL: '../assets/london.png' },
  { id: 4, userID: 'player4', itemID: 'kke', content: 'aoskdpa', likes: '212', dislikes: '3', comments: '10', imageURL: "https://i.imgur.com/I7zVE7v.jpeg" },
  { id: 5, userID: 'player5', itemID: 'kke', content: 'somethignsakdjfhaslfdjhli ishfiush osah ilshdfliauhfl s diufhalsifdusl sdiufhsiu fhsif sid hdiu shfi', likes: '94', dislikes: '3', comments: '10', imageURL: '../assets/london.png' },
  { id: 6, userID: 'player6', itemID: 'kke', content: '已經沒有囉', likes: '10', dislikes: '3', comments: '10', imageURL: '../assets/london.png' },
];

var itemList: any = []


function HotMain({ navigation }: { navigation: any }) {
  useEffect(getItem, []);
  const showModal = (item: any) => {
    setCurrItem(item.item)
    setVisible(true);
    firebase.database().ref("item_list/" + item.item.id + "/click").get().then(function (e) {
      e.val();
      firebase.database().ref("item_list/" + item.item.id + "/click").set(e.val() + 1);
    });
    getComment(item.item);
  };
  const hideModal = () => setVisible(false);
  const [visible, setVisible] = React.useState(false);
  const [is_favorite, setIs_favorite] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currItem, setCurrItem] = React.useState(null);

  const [hotMainItems, setHotMainItems] = useState<any>([]);

  const [hasBirthday, setHasBirthday] = useState(true);

  const [myComment, setMyComment] = useState('');
  const [itemComments, setItemComments] = useState<any[]>([]);

  const [bday, setBday] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const [likeOrDis, setLikeOrDis] = useState('None');

  useEffect(() => {
    setDarkMode(Appearance.getColorScheme() === 'dark');
  }, [])


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    setBday(date);
    hideDatePicker();
  };

  function getComment(item: any) {
    let comment_list: any = [];
    let current_item_comment = firebase.database().ref("item_list/" + item.id + "/comment_list");
    current_item_comment.once('value').then(
      function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          var childData = childSnapshot.val();
          firebase.database().ref("comment_list/" + childData).get().then(
            function (e) {
              comment_list.push({ comment_id: e.key, ...e.val() });
            }
          );
        })

      }).then(() => {
        setItemComments(comment_list);
      }
      )
  }

  function fixLayout(somelist: any[]) {
    let temp: any = [];
    temp = somelist;
    if (somelist.length % 2 !== 0) {
      temp.push({ id: 'yobros', name: 'empty', likes: '', dislikes: '', comments: '', imageURL: "" });
      setHotMainItems(temp);
    } else {
      setHotMainItems(temp);
    }
  }

  function commentLike(comment: any) {
  }

  function commentDislike() {
  }

  function sendMyComment() {
    firebase.auth().onAuthStateChanged(async function (user) {
      if (user) {
        let user_email = user.email;
        let comment_list = firebase.database().ref('comment_list');
        comment_list.push({
          user_email: user_email,
          itemID: currItem.id,
          content: myComment
        }).then(async function (e) {
          let comment_id = e.path.pieces_[1];
          let user_list = firebase.database().ref('user_list');
          await user_list.once('value').then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
              var childData = childSnapshot.val();
              if (childData.email == user_email) {
                firebase.database().ref("user_list/" + childSnapshot.key + "/comment_list").push(comment_id)
              }
            })
          })
          firebase.database().ref('item_list/' + currItem.id + "/comment_list").push(comment_id);
          firebase.database().ref('item_list/' + currItem.id + "/commentNum").get().then(function (e) {
            firebase.database().ref('item_list/' + currItem.id + "/commentNum").set(e.val() + 1);
          })
        }).then(function () {
          setMyComment("");
        })
      }
      else {
        Alert.alert("錯誤", "請先登入才可使用此功能");
        setMyComment("");
      }
    })
  }

  function itemLike() {
    if (likeOrDis === 'Like') {
      setLikeOrDis('None');
    } else {
      setLikeOrDis('Like');
    }


    firebase.auth().onAuthStateChanged(async function (user) {
      if (user) {
        let user_email = user.email;
        let is_liked = false;
        let user_list = firebase.database().ref("user_list");
        let like_userlist = firebase.database().ref("item_list" + currItem.id + "/like_userlist");
        like_userlist.once('value').then(function (snapshot) {
          snapshot.forEach(function (childSnapshot) {
            let email = childSnapshot.val();
            if (email == user_email)
              is_liked = true;
          })
        }).then(function () {
          if (is_liked == false) {
            firebase.database().ref("item_list/" + currItem.id + "/likeNum").get().then(function (e) {
              firebase.database().ref("item_list/" + currItem.id + "/likeNum").update(e.val() + 1);
            })
            //detect the dislike
            let dislike_userlist = firebase.database().ref("item_list" + currItem.id + "/dislike_userlist");
            dislike_userlist.once('value').then(function (snapshot) {
              snapshot.forEach(function (childSnapshot) {
                let email = childSnapshot.val();
                if (email == user_email) {
                  firebase.database().ref("item_list" + currItem.id + "/dislike_userlist" + childSnapshot.key).remove();
                  firebase.database().ref("item_list/" + currItem.id + "/dislikeNum").get().then(function (e) {
                    firebase.database().ref("item_list/" + currItem.id + "/dislikeNum").update(e.val() - 1);
                  })
                  // user_list.once('value').then(function (s) {
                  //   s.forEach(function (c) {
                  //     let childData = c.val();
                  //     if(childData.email == user_email){
                  //       firebase.database().ref("user_list/" + c.key + "/dislike_list/" + currItem.id).remove();
                  //     }
                  //   })
                  // })
                }
              })
            })


          }
          else {
            Alert.alert("", "您已經按過贊了喔！");
          }
        })
      }
      else {
        Alert.alert("錯誤", "請先登入才可使用此功能");
      }
    })
  }

  function itemDislike() {
    if (likeOrDis === 'Dislike') {
      setLikeOrDis('None');
    } else {
      setLikeOrDis('Dislike');
    }
  }

  function getItem() {
    firebase.database().ref("item_list").once('value').then(
      function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          var itemkey = childSnapshot.val();
          itemList.push({ id: childSnapshot.key, ...itemkey });
        })
      }).then(
        () => {
          fixLayout(itemList);
          itemList = [];
        }
      )
  }

  function addToFavourite() {
    firebase.auth().onAuthStateChanged(async function (user) {
      if (user) {
        let user_email = user.email;
        let user_list = firebase.database().ref('user_list');
        await user_list.once('value').then(function (snapshot) {
          snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            if (childData.email == user_email) {
              let user_favorite_list = firebase.database().ref('user_list/' + childSnapshot.key + "/favorite_list");
              user_favorite_list.once('value').then(function (s) {
                s.forEach(function (c) {
                  let itemID = c.val().itemID;
                  if (itemID == currItem.id) {
                    firebase.database().ref('user_list/' + childSnapshot.key + "/favorite_list/" + c.key).remove();
                  }
                })
              }).then(function () {
                user_favorite_list.push({
                  itemID: currItem.id
                })
                Alert.alert("添加成功", "成功添加至我的最愛");
              })
            }
          })
        })

      }
      else {
        Alert.alert("添加失敗", "請先等入才可添加商品至最愛！");
      }
    })
    currItem.id
  }

  const renderItem = (item: any) => {
    return (
      item.item.name !== 'empty'
        ?
        <TouchableOpacity
          onPress={() => {
            firebase.auth().onAuthStateChanged(async function (user) {
              if (user) {
                await firebase.database().ref("item_list/" + currItem.id + "/click");
                let user_email = user.email;
                let user_list = firebase.database().ref('user_list');
                await user_list.once('value').then(function (snapshot) {
                  snapshot.forEach(function (childSnapshot) {
                    var childData = childSnapshot.val();
                    if (childData.email == user_email) {
                      let user_favorite_list = firebase.database().ref('user_list/' + childSnapshot.key + "/favorite_list");
                      user_favorite_list.once('value').then(function (s) {
                        s.forEach(function (c) {
                          let itemID = c.val().itemID;
                          if (itemID == item.item.id) {
                            setIs_favorite(true);
                          }
                        })
                      })
                      let user_history_list = firebase.database().ref('user_list/' + childSnapshot.key + "/history_list");
                      user_history_list.once('value').then(function (s) {
                        s.forEach(function (c) {
                          let itemID = c.val().itemID;
                          if (itemID == item.item.id) {
                            firebase.database().ref('user_list/' + childSnapshot.key + "/history_list/" + c.key).remove();
                          }
                        })
                      }).then(function () {
                        user_history_list.push({
                          itemID: item.item.id
                        })
                      })
                    }
                  })
                })
              }
            })
            showModal(item)
          }
          }
          style={styles.itemBlock}>
          <View style={styles.itemTouch}>
            <Image
              source={{ uri: item.item.photourl }}
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
                {item.item.likes ? item.item.likes : 0}
              </Text>
            </View>
            <View style={styles.likes}>
              <Image
                source={require('../assets/dislike.png')}
                style={{ marginRight: 5, width: 20, height: 20, resizeMode: 'contain' }}
              />
              <Text style={styles.likeTXT}>
                {item.item.dislikes ? item.item.dislikes : 0}
              </Text>
            </View>
            <View style={styles.likes}>
              <Image
                source={require('../assets/commentsIcon.png')}
                style={{ marginRight: 5, width: 20, height: 20, resizeMode: 'contain' }}
              />
              <Text style={styles.likeTXT}>
                {item.item.comments ? item.item.comments : 0}
              </Text>
            </View>

          </View>

        </TouchableOpacity>
        :
        <View style={styles.itemBlock}>
          <View style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>
              沒有更多囉
            </Text>
          </View>


        </View>

    )

  }

  const ListHeader = () => {
    return (
      <View style={styles.flatlistHeaderContainer}>
        <View style={{ backgroundColor: 'white', width: '90%', height: 350, borderRadius: 20 }}>
          <Image source={{ uri: currItem.photourl }} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
        </View>
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 40, color: 'white', fontWeight: '700', marginTop: 15, maxWidth: '80%', overflow: 'scroll' }}>
            {currItem.name}
          </Text>
        </View>
        <View style={{ marginTop: 15, width: '80%', height: 60, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={itemLike}
            style={likeOrDis === 'Dislike' ? { display: 'none' } : { width: '40%', height: 50, alignItems: 'center', justifyContent: 'center' }}>
            <Image
              style={{ width: 50, height: 50, resizeMode: 'contain' }}
              source={require('../assets/like.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={itemDislike}
            style={likeOrDis === 'Like' ? { display: 'none' } : { width: '40%', height: 50, alignItems: 'center', justifyContent: 'center' }}>
            <Image
              style={{ width: 50, height: 50, resizeMode: 'contain' }}
              source={require('../assets/dislike.png')}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={addToFavourite} style={{ marginTop: 15, width: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '100%', height: 50, backgroundColor: '#7CAEDE', borderRadius: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
            <View style={{ width: 50, height: 30 }}></View>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>{is_favorite ? '已添加至我的最愛' : '添加至我的最愛'}</Text>
            <Image source={require('../assets/star_outline.png')} style={is_favorite ? { display: 'none' } : { marginLeft: 20, width: 30, height: 30, resizeMode: 'contain' }} />
            <Image source={require('../assets/star_filled.png')} style={is_favorite ? { marginLeft: 20, width: 30, height: 30, resizeMode: 'contain' } : { display: 'none' }} />
          </View>

        </TouchableOpacity>
        <View style={{ width: '100%', height: 50, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>
            留言
          </Text>
        </View>
      </View>
    )
  }


  const CommentContainer = (item: any) => {
    return (
      <View style={styles.commentContainer}>
        <View style={{ height: 90, display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
          <View style={{ height: 50, width: 50, marginLeft: 10 }}>
            <Image
              style={{ width: 50, height: 50, resizeMode: 'contain', flex: 1 }}
              source={require('../assets/account_default.png')}
            />
          </View>

        </View>
        <View style={{ display: 'flex', flexGrow: 6, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ minHeight: 80, width: '90%', backgroundColor: '#00C7DC', borderRadius: 10, alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ height: 30, width: '90%', marginTop: 10 }}>
              <Text style={{ fontSize: 18, color: 'white', fontWeight: '500' }}>
                {item.item.userID} 說：
              </Text>
            </View>
            <View style={{ width: '90%' }}>
              <Text style={{ fontSize: 18, color: 'white', fontWeight: '500' }}>{item.item.content}</Text>
            </View>
            <View style={{ height: 30, width: '100%', justifyContent: 'flex-end', marginBottom: 5 }}>
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                <View style={{ flex: 2 }}>

                </View>
                <TouchableOpacity
                  onPress={() => { commentLike(item.item.id) }}
                  style={styles.likes}>
                  <View style={{ marginRight: 5, width: 20, height: 20 }}>
                    <Image
                      source={require('../assets/like.png')}
                      style={{ width: 20, height: 20, resizeMode: 'contain' }}
                    />
                  </View>
                  <Text style={styles.likeTXT}>
                    {item.item.likes}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={commentDislike}
                  style={styles.likes}>
                  <View style={{ marginRight: 5, width: 20, height: 20 }}>
                    <Image
                      source={require('../assets/dislike.png')}
                      style={{ width: 20, height: 20, resizeMode: 'contain' }}
                    />
                  </View>

                  <Text style={styles.likeTXT}>
                    {item.item.dislikes}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }

  const mainHeader = () => {
    return (
      <Text style={{ fontSize: 30, color: 'white', fontWeight: '800', width: '50%' }}>
        熱門商品
      </Text>
    )
  }

  function updateDNameBDay() {
    setHasBirthday(true);
  }

  const GetBdayModal = () => {
    return (

      <View style={styles.container}>
        <View style={styles.topContainer}>

        </View>
        <View style={{ width: '100%', height: '100%', justifyContent: 'flex-start', alignItems: 'center' }}>
          <View style={{ width: '100%', height: 100, alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 25, width: '60%', lineHeight: 30 }}>
              {
                `在開始之前\n麻煩您選擇顯示名稱並提供您的生日`
              }

            </Text>
          </View>
          <View style={[styles.textInputBG, styles.midCol]}>
            <TextInput
              style={styles.input}
              onChangeText={setDisplayName}
              value={displayName}
              placeholder="使用者名稱"
              blurOnSubmit={false}
            />
          </View>
          <TouchableOpacity
            onPress={showDatePicker}
            style={[styles.midCol, styles.textInputBG, {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#7CAEDE'
            }]}>
            <Text style={{
              fontSize: 20,
              color: 'white',
              fontWeight: '700'
            }}>
              選擇生日{bday ? '：' + bday.toISOString().substring(0, 10) : ''}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            isDarkModeEnabled={darkMode}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />


          <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => { updateDNameBDay() }}
              style={[styles.midCol, styles.textInputBG, {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#71D0DA'
              }]}>
              <Text style={{
                fontSize: 20,
                color: 'white',
                fontWeight: '700'
              }}>
                完成
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.midCol, {
            height: 80,
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center'
          }]}>
          </View>
        </View>
      </View>)
  }


  return (
    <Provider>
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

        <View style={styles.commentList}>
          <FlatList
            data={hotMainItems}
            keyExtractor={item => item.id.toString()}
            ListHeaderComponent={mainHeader}
            ListHeaderComponentStyle={{ width: '90%', height: 60, alignItems: 'flex-start', justifyContent: 'center' }}
            columnWrapperStyle={styles.row}
            renderItem={renderItem}
            horizontal={false}
            numColumns={2}
            contentContainerStyle={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: 120
            }}
          />
        </View>

        <Portal>
          <Modal style={{ marginTop: 0, marginBottom: 0 }} visible={visible} onDismiss={hideModal}>
            <KeyboardAvoidingView
              behavior={(Platform.OS === 'ios') ? "padding" : undefined} style={{ backgroundColor: '#DE75BE' }}>
              <View style={{ height: '100%', width: '100%', backgroundColor: '#DE75BE', alignItems: 'center', justifyContent: 'flex-start' }}>
                <View style={[styles.topContainer,]}>
                  <TouchableOpacity style={styles.backButton} onPress={hideModal}>
                    <Image
                      style={[styles.backButton, { resizeMode: 'contain' }]}
                      source={require('../assets/backarrow.png')} />
                  </TouchableOpacity>
                </View>
                <View style={styles.flatList}>
                  <FlatList
                    data={itemComments}
                    keyExtractor={item => item.comment_id.toString()}
                    renderItem={CommentContainer}
                    ListHeaderComponent={ListHeader}
                    horizontal={false}
                    contentContainerStyle={{
                      paddingBottom: 200
                    }}
                  />
                </View>
                <View style={{ position: 'absolute', bottom: 0, height: 100, width: '100%', backgroundColor: '#7CAEDE', display: 'flex', flexDirection: 'row' }}>
                  <View style={{ width: '80%', height: 40, backgroundColor: 'white', borderRadius: 10, display: 'flex', justifyContent: 'center', margin: 10, marginTop: 20 }}>
                    <TextInput
                      value={myComment}
                      onChangeText={setMyComment}
                      style={{ marginLeft: 10, width: '95%', height: '90%', fontSize: 20, fontWeight: '500' }}
                      placeholder="我想說⋯⋯"
                    />
                  </View>
                  <TouchableOpacity
                    onPress={sendMyComment}
                    style={{ width: 40, height: 40, marginTop: 20 }}>
                    <Image
                      style={{ width: 40, height: 40, resizeMode: 'contain' }}
                      source={require('../assets/send.png')} />

                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </Modal>
        </Portal>

        <Portal>
          <Modal style={{ marginTop: 0, marginBottom: 0 }} visible={!hasBirthday}>
            {GetBdayModal()}
          </Modal>
        </Portal>
      </View>
    </Provider>
  )
}

export default function MainProductPage({ navigation }: { navigation: any }) {
  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerMenu {...props} />}>
      <Drawer.Screen name="Home" component={HotMain} />
      <Drawer.Screen name="History" component={History} />
      <Drawer.Screen name="Fav" component={Favourites} />
      <Drawer.Screen name="Wish" component={WishNotes} />

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
    marginTop: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
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
  },
  topContainer: {
    width: '90%',
    height: '10%',
    marginTop: '10%',
    display: 'flex',
    justifyContent: 'center',
    //backgroundColor: 'red'
  },
  backButton: {
    width: 50,
    height: 50,
    //resizeMode: 'contain',
    display: 'flex'
  },
  commentList: {
    height: '90%',
    width: '100%',
  },
  itemModal: {
    backgroundColor: '#DE75BE',
    width: '100%',
    height: '100%'
  },
  flatlistHeaderContainer: {
    width: '100%',
    //backgroundColor: 'blue',
    alignItems: 'center',
    //justifyContent: 'center'
  },
  commentContainer: {
    minHeight: 90,
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
    flexDirection: 'row',
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#B184CF',
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center'
    //justifyContent: 'center'
  },

  midContainer: {
    width: '80%',
    height: '50%',
    display: 'flex',
    //backgroundColor: 'red',
    flexDirection: 'column',
  },

  loginTXT: {
    width: '100%',
    height: 50
  },


  midCol: {
    marginTop: 25
  },
  socialMediaButton: {
    width: '40%',
    height: 60,
    backgroundColor: 'white',
    borderRadius: 20
  },
  visibility: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    position: 'absolute',
    right: 15
  }


})
