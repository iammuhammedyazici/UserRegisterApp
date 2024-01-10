import React, { useCallback } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useUserContext } from '../navigation/Routes';
import { IUserProject } from '../types';
import { palette } from '../theme';

export default function UserProjects() {
  const { userCv } = useUserContext();

  const renderItem = useCallback(({ item }: { item: IUserProject }) => {
    return (
      <View style={styles.itemView}>
        <Text style={styles.textTitle}>{item.title}</Text>
        <Text style={{ fontSize: 14 }}>{item.des}</Text>
      </View>
    );
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FF4433' }}>
      <View style={{ padding: 20 }}>
        <Text style={styles.textHeader}>Projelerim</Text>
        <FlatList data={userCv?.projects} renderItem={renderItem} keyExtractor={item => item.title} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemView: {
    backgroundColor: '#FF4433',
    elevation: 5,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 10,
    minHeight: 40,
    borderRadius: 20,
    padding: 10,
  },
  textHeader: {
    color: palette.secondaryColor,
    fontSize: 21,
    marginBottom: 20,
  },
  textTitle: {
    color: palette.mainColor,
    fontSize: 16,
  },
});
