import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Row, Table } from 'react-native-reanimated-table';

const UserDashboard = () => {
  const [state] = useState({
    tableHead: ['Sütun 1', 'Sütun 2', 'Sütun 3', 'Sütun 4', 'Sütun 5'],
  });

  const generateTableData = () => {
    const tableData = [];
    for (let i = 0; i < 30; i += 1) {
      const rowData = [];
      for (let j = 0; j < 5; j += 1) {
        rowData.push(`${i}${j}`);
      }
      tableData.push(rowData);
    }
    return tableData;
  };

  const renderHeader = () => (
    <Row
      data={state.tableHead}
      style={styles.header}
      textStyle={styles.headerText}
    />
  );

  const renderRows = () => {
    const tableData = generateTableData();
    return tableData.map((rowData, index) => (
      <Row
        key={index}
        data={rowData}
        style={[
          styles.row,
          index % 2
            ? { backgroundColor: '' }
            : { backgroundColor: '#F7F6E7' },
        ]}
        textStyle={styles.text}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>User Data Tables</Text>

      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={styles.tableBorderStyle}>
            {renderHeader()}
          </Table>
          <ScrollView style={styles.dataWrapper}>
            <Table borderStyle={styles.tableBorderStyle}>
              {renderRows()}
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 16,
    paddingTop: 30,
  },
  dataWrapper: { marginTop: -1 },
  header: { backgroundColor: '#537791', height: 50 },
  headerText: {
    color: '#000',
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  row: { backgroundColor: '#E7E6E1', height: 40 },
  text: { fontWeight: '100', textAlign: 'center' },
  tableBorderStyle: { borderWidth: 1, borderColor: '#C1C0B9' },
});

export default UserDashboard;
