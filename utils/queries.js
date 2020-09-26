import gql from 'graphql-tag';
export const GET_ALL_COUNTRIES_QUERY = gql`
  query GET_ALL_COUNTRIES_QUERY {
    countries {
      name
    }
  }
`;
