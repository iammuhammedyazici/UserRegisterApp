import React, {useCallback, useState} from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isCancel,
  isInProgress,
  types,
} from 'react-native-document-picker';
import {PaperProvider} from 'react-native-paper';
import {IUserProject} from '../types';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import {palette} from '../theme';

const UserCV = () => {
  const {navigate, goBack} = useNavigation() as any;

  const [result, setResult] = useState<
    DocumentPickerResponse[] | DirectoryPickerResponse | undefined | null
  >();

  const handleError = useCallback((err: unknown) => {
    if (isCancel(err)) {
      console.warn('cancelled');
    } else if (isInProgress(err)) {
      console.warn(
        'multiple pickers were opened, only the last will be considered',
      );
    } else {
      throw err;
    }
  }, []);

  const [projects, setProjects] = useState<IUserProject[]>([]);

  const addProject = useCallback(() => {
    const newProject: IUserProject = {title: '', des: ''};
    setProjects(prevProjects => [...prevProjects, newProject]);
  }, []);

  const removeProject = useCallback((index: number) => {
    setProjects(prevProjects => {
      const updatedProjects = [...prevProjects];
      updatedProjects.splice(index, 1);
      return updatedProjects;
    });
  }, []);

  const handleProjectChange = useCallback(
    (value: string, field: 'title' | 'des', index: number) => {
      setProjects(prevProjects => {
        const updatedProjects = [...prevProjects];
        updatedProjects[index][field] = value;
        return updatedProjects;
      });
    },
    [],
  );

  const onGetCVPdf = useCallback(() => {
    DocumentPicker.pick({
      type: types.pdf,
    })
      .then(setResult)
      .catch(handleError);
  }, [handleError]);

  const renderProjectItem = useCallback(
    ({item, index}: {item: IUserProject; index: number}) => (
      <View style={styles.projectItemContainer}>
        <TextInput
          placeholder="Project Title"
          onChangeText={text => handleProjectChange(text, 'title', index)}
          style={styles.projectItemTextInput}
          value={item.title}
          placeholderTextColor="#bbb"
        />
        <View style={styles.projectItemRow}>
          <TextInput
            placeholder="Project Description"
            onChangeText={text => handleProjectChange(text, 'des', index)}
            style={styles.projectItemTextInput}
            value={item.des}
            placeholderTextColor="#bbb"
          />
          <TouchableOpacity onPress={() => removeProject(index)}>
            <AntDesign
              name="delete"
              size={20}
              color="red"
              style={styles.deleteIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    ),
    [handleProjectChange, removeProject],
  );

  const keyExtractor = useCallback(
    (_item: IUserProject, index: number) => index.toString(),
    [],
  );

  const onConfirm = useCallback(async () => {
    await AsyncStorage.setItem(
      'userCv',
      JSON.stringify({
        resume: result,
        projects,
      }),
    );
    navigate('UserLogin');
  }, [navigate, projects, result]);

  const onBack = useCallback(() => {
    goBack();
  }, [goBack]);

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.headerText}>Özgeçmiş & Projeler</Text>

          <Text style={styles.sectionTitle}>Özgeçmiş Yükle</Text>
          <View style={styles.pdfContainer}>
            <Text selectable> {result && result[0]?.name}</Text>
            <Button title="PDF formatında yükleyiniz" onPress={onGetCVPdf} />
          </View>

          <View>
            <Text style={styles.sectionTitle}>Projeler</Text>
            <FlatList
              data={projects}
              keyExtractor={keyExtractor}
              renderItem={renderProjectItem}
            />

            <TouchableOpacity onPress={addProject} style={styles.addButton}>
              <Text style={styles.addButtonLabel}>Ekle</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottomSpace} />
        </ScrollView>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={onBack}
            style={[styles.button, {backgroundColor: palette.mainColor}]}
            activeOpacity={0.5}>
            <Text style={styles.buttonText}>Geri</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onConfirm}
            style={styles.button}
            activeOpacity={0.5}>
            <Text style={styles.buttonText}>İleri</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  scrollView: {
    backgroundColor: 'white',
  },
  headerText: {
    alignSelf: 'center',
    borderBottomColor: palette.secondaryColor,
    borderBottomWidth: 2,
    color: palette.secondaryColor,
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
    maxWidth: '70%',
    paddingBottom: 10,
    textAlign: 'center',
  },
  sectionTitle: {
    alignSelf: 'flex-start',
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  pdfContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
  },
  projectItemContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1,
    marginVertical: 4,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  projectItemTextInput: {
    backgroundColor: '#f5f8fa',
    borderRadius: 5,
    color: '#000',
    marginHorizontal: 8,
    minHeight: 40,
    paddingVertical: 0,
    width: '60%',
  },
  projectItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginVertical: 4,
  },
  deleteIcon: {
    marginLeft: 5,
    marginHorizontal: 8,
  },
  addButton: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: palette.secondaryColor,
    borderRadius: 8,
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    marginVertical: 8,
    width: 120,
  },
  addButtonLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomSpace: {
    height: 30,
  },
  buttonsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
    marginVertical: 8,
    width: '40%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default UserCV;
