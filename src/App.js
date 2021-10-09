import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, FlatList, Image} from 'react-native';

export default function App() {
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      let response = await fetch('https://reqres.in/api/users?page=1');
      let json = await response.json();
      setData(json.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          marginVertical: 5,
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          padding: 5,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            style={{width: 50, height: 50, borderRadius: 20}}
            source={{
              uri: item.avatar,
            }}
          />
          <View style={{marginHorizontal: 10}}>
            <Text>{item.first_name}</Text>
            <Text>{item.last_name}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text>Data API</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
