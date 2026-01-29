import { useQuery } from '@apollo/client';
import RepositoryItem from '../RepositoryItem/RepositoryItem';
import { GET_REPOSITORY } from '../../graphql/queries';
import Text from '../BaseComponents/Text';

const RepositoryInfo = ({ id }) => {
  const { data, loading } = useQuery(GET_REPOSITORY, {
    variables: { id },
  });

  if (loading) return <Text fontWeight="bold">Loading...</Text>;

  return <RepositoryItem repository={data.repository} single={true} />;
};

export default RepositoryInfo;
