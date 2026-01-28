import { StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#decfe8',
    padding: 10,
  },
  picker: {
    marginTop: 10, 
  },
  searchInput: {
    borderRadius: 4, 
    marginBottom: 10,
  },
});

const RepositoryListHeader = ({ order, setOrder, search, setSearch }) => (
  <View style={styles.container}>
    <Searchbar
      placeholder="Search repositories..."
      value={search}
      onChangeText={(text) => setSearch(text)}
      style={styles.searchInput}
      icon="magnify"                  
      clearIcon="close"               
      onIconPress={() => setSearch('')}
    />
    <Picker
      selectedValue={order}
      onValueChange={(value) => setOrder(value)}
    >
      <Picker.Item label="Latest repositories" value="createdAt" />
      <Picker.Item label="Highest rated repositories" value="ratingDesc" />
      <Picker.Item label="Lowest rated repositories" value="ratingAsc" />
    </Picker>
  </View>
);

export default RepositoryListHeader