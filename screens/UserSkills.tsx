import React, { useCallback } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { IUserSkill } from '../types';
import { useUserContext } from '../navigation/Routes';
import { palette } from '../theme';

const UserSkills = () => {
  const { userCareerInfo } = useUserContext();

  const renderItem = useCallback(({ item }: { item: IUserSkill }) => {
    return (
      <View style={styles.flatView}>
        <Text style={styles.flatTitle}>{item.skillName}</Text>
        <Text style={{ fontSize: 14 }}>{item.skillLevel}</Text>
      </View>
    );
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ padding: 20 }}>
        <Text style={styles.headerText}>Yetenek Listesi</Text>
        <FlatList data={userCareerInfo?.skills} renderItem={renderItem} keyExtractor={item => item.skillName} />
      </View>
    </SafeAreaView>
  );
};

export default UserSkills;

const styles = StyleSheet.create({
  flatView: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    minHeight: 50,
    padding: 10,
  },
  headerText: {
    color: palette.secondaryColor,
    fontSize: 20,
    marginBottom: 20,
  },
  flatTitle: {
    fontSize: 16,
  },
});

; 
