import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useDebounce } from 'use-debounce';
import RepositoryItem from '../RepositoryItem/RepositoryItem';
import useRepositories from '../../hooks/useRepositories';
import RepositoryListHeader from './RepositoryListHeader';
import Text from '../Text';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState('createdAt');
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const { repositories, loading } = useRepositories(order, debouncedSearch);

  return (
    <RepositoryListContainer
      repositories={repositories}
      loading={loading}
      order={order}
      setOrder={setOrder}
      search={search}
      setSearch={setSearch}
      navigate={navigate}
    />
  );
};

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { order, setOrder, search, setSearch } = this.props;

    return (
      <RepositoryListHeader
        order={order}
        setOrder={setOrder}
        search={search}
        setSearch={setSearch}
      />
    );
  };

  render() {
    const { repositories, loading, navigate } = this.props;

    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <Text fontWeight="bold">Loading...</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={repositories}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
            <RepositoryItem repository={item} />
          </Pressable>
        )}
        ListHeaderComponent={this.renderHeader}
      />
    );
  }
}

RepositoryListContainer.defaultProps = {
  navigate: () => {},
  setOrder: () => {},
  search: '',
  setSearch: () => {},
  order: 'createdAt',
  repositories: [],
  loading: false,
};

export default RepositoryList;
