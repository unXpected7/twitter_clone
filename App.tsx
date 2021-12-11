import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
  Platform,
  Pressable,
  Dimensions,
  Share,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import { NewTweet } from "./App/Screen";
import { Database } from "./App/Database";

const { Account } = Database;

const gambar1 = "https://picsum.photos/536/354";
const gambar2 = "https://picsum.photos/id/237/536/354";
const gambar3 = "https://picsum.photos/seed/picsum/536/354";
const gambar4 = "https://picsum.photos/id/1084/536/354?grayscale";
const gambar5 = "https://picsum.photos/id/1060/536/354?blur=2";
const gambar6 = "https://picsum.photos/id/870/536/354?grayscale&blur=2";

interface Istate {
  gambar: string;
  nama: string;
  tweet: string;
  like: number;
  retweet: number;
  isLike: boolean;
  isRetweet: boolean;
}

export default function App() {
  //state refresh control
  const [refresh, setrefresh] = useState(false);
  //state tweets
  const [state, setState] = useState<Istate[]>([]);
  //state modal
  const [modalVisible, setModalVisible] = useState(false);

  const dummy = [
    {
      gambar: gambar1,
      nama: "Sholahudin d. yusuf",
      like: 10,
      retweet: 3,
    },
    {
      gambar: gambar2,
      nama: "Ery",
      like: 15,
      retweet: 2,
    },
    {
      gambar: gambar3,
      nama: "gembus",
      like: 20,
      retweet: 0,
    },
    {
      gambar: gambar4,
      nama: "Ondol",
      like: 8,
      retweet: 15,
    },
    {
      gambar: gambar5,
      nama: "Ucup",
      like: 250,
      retweet: 99,
    },
    {
      gambar: gambar6,
      nama: "Kupyor",
      like: 998,
      retweet: 998,
    },
  ];

  const generateTweet = async (): Promise<string> => {
    try {
      const url = "http://whatthecommit.com/index.txt";
      const text: string = await fetch(url).then((res) => res.text());
      return text.toString();
    } catch (error: any) {
      return error?.message;
    }
  };

  const hydrateTweet = async (force: boolean = false) => {
    if (force == true || state.length == 0) {
      dummy.forEach(async (item) => {
        const tweet = await generateTweet();
        setState((prev) => {
          return [
            {
              ...item,
              tweet,
              isLike: false,
              isRetweet: false,
            },
            ...prev,
          ];
        });
      });
    }
  };

  useEffect(() => {
    hydrateTweet();
  }, []);

  function Header() {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 30,
          paddingVertical: 20,
          paddingHorizontal: 10,
          borderColor: "#333333aa",
          borderBottomWidth: 1,
        }}
      >
        <Image
          source={{ uri: Account.image }}
          style={{
            width: 30,
            height: 30,
            borderRadius: 100,
          }}
        />
        <TouchableOpacity onPress={() => TekanTombol("Logo Tweet")}>
          <Icon name="logo-twitter" size={30} color={"#1DA1F2"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => TekanTombol("Logo React")}>
          <Icon name="logo-react" size={30} color={"#1DA1F2"} />
        </TouchableOpacity>
      </View>
    );
  }

  function Footer() {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 20,
          paddingHorizontal: 40,
          borderColor: "#333333aa",
          borderTopWidth: 1,
        }}
      >
        <TouchableOpacity onPress={() => hydrateTweet(true)}>
          <Icon name="home" size={25} color={"#1DA1F2"} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => TekanTombol("Pencarian")}>
          <Icon name="search" size={25} color={"#777"} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => TekanTombol("Notifikasi")}>
          <Icon name="notifications" size={25} color={"#777"} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => TekanTombol("Pesan")}>
          <Icon name="mail" size={25} color={"#777"} />
        </TouchableOpacity>
      </View>
    );
  }

  const Separator = () => {
    return (
      <View
        style={{
          width: Dimensions.get("window").width,
          borderBottomWidth: 1,
          borderColor: "#333333aa",
          marginVertical: 5,
        }}
      />
    );
  };

  const TweetButton = ({
    icon,
    total = 0,
    color = "#eaeaeaaa",
    onPress = function () {},
  }: {
    icon: string;
    total: string | number;
    color?: string;
    onPress?: Function;
  }) => {
    return (
      <TouchableOpacity
        onPress={() => onPress()}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginRight: 10,
          marginVertical: 5,
        }}
      >
        <Icon2
          name={icon}
          size={icon.includes("retweet") ? 22 : 18}
          color={color}
        />
        {total !== 0 && (
          <Text style={{ marginLeft: 5, fontSize: 12, color }}>{total}</Text>
        )}
      </TouchableOpacity>
    );
  };

  function RenderTweet({ item, index }: { item: Istate; index: number }) {
    const { gambar, nama, tweet, like, retweet, isLike, isRetweet } = item;
    const LikeMe = () => {
      setState((prev) => {
        prev[index].like = isLike ? prev[index].like - 1 : prev[index].like + 1;
        prev[index].isLike = isLike ? false : true;
        return [...prev];
      });
    };

    const ReTweetMe = () => {
      if (!isRetweet) {
        setState((prev) => {
          prev[index].retweet += 1;
          prev[index].isRetweet = true;
          return [
            {
              gambar: Account.image,
              nama: Account.name,
              tweet: `RT @${prev[index].nama} :\n${prev[index].tweet}`,
              like: 0,
              retweet: 0,
              isRetweet: false,
              isLike: false,
            },
            ...prev,
          ];
        });
      }
    };

    const shareMe = async () => {
      Share.share(
        {
          title: nama,
          message: `(@${nama})\n${tweet}\nhttps://twitter.com/${nama}?s=08`,
          url: "https://twitter.com",
        },
        {
          dialogTitle: `Do You Want To Share ${nama}'s Tweet ?`,
        }
      );
    };

    return (
      <View
        style={{
          marginTop: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
          }}
        >
          <Image
            source={{
              uri: gambar,
            }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 100,
              marginRight: 10,
            }}
          />
          <View
            style={{
              flex: 1,
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              {nama}
            </Text>
            <Text
              style={{
                color: "white",
              }}
            >
              {tweet}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <TweetButton icon="chat-outline" total={0} />
          <TweetButton
            icon="twitter-retweet"
            total={retweet}
            onPress={ReTweetMe}
            color={isRetweet ? "#77D970" : "#777777aa"}
          />
          <TweetButton
            icon={isLike ? "heart" : "heart-outline"}
            total={like}
            onPress={LikeMe}
            color={isLike ? "#FF2442" : "#777777aa"}
          />
          <TweetButton icon="share-variant" total={0} onPress={shareMe} />
        </View>
        <Separator />
      </View>
    );
  }

  const FloatingActionButton = () => {
    return (
      <Pressable
        style={{
          backgroundColor: "#1DA1F2",
          position: "absolute",
          bottom: 100,
          right: 30,
          borderRadius: 100,
          width: 50,
          height: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Icon name="add" size={38} color="white" />
      </Pressable>
    );
  };

  //ini tampilan utama
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
        justifyContent: "space-between",
      }}
    >
      <StatusBar style="light" />
      <NewTweet
        isVisible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
        onPress={(tweet: string) => {
          setState((previous: Istate[]) => {
            const newData = previous;
            const newTweet = {
              gambar: Account.image,
              nama: Account.name,
              tweet: tweet,
              like: 0,
              retweet: 0,
              isLike: false,
              isRetweet: false,
            };
            newData.unshift(newTweet);
            return [...newData];
          });
        }}
      />
      <Header />
      <FlatList
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => {
              hydrateTweet(true);
            }}
          />
        }
        renderItem={RenderTweet}
        data={state}
        keyExtractor={(item, index) => index.toString()}
      />
      <Footer />
      <FloatingActionButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
  white: {
    color: "#fff",
  },
});

const TekanTombol = (nama: string) => {
  if (Platform.OS === "web") {
    return alert(`Kamu Menekan Tombol ${nama}`);
  }
  Alert.alert("Info", `Kamu Menekan Tombol ${nama}`);
};
