import gql from 'graphql-tag';

export default gql`
  quert SongQuery($id: ID!) {
    song(id: $id) {
      id
      title
    }
  }
`;