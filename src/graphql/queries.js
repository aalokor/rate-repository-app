import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query GetRepositories{
    repositories {
    	edges {
      	node {
					id
        	fullName
        	description
        	ownerAvatarUrl
        	language
        	stargazersCount
        	forksCount
        	reviewCount
        	ratingAverage
      	}
    	}
  	}
	}
`; 

export const SIGN_IN = gql`
  mutation Authenticate($username: String!, $password: String!) {
    authenticate(
      credentials: {
        username: $username
        password: $password
      }
    ) {
      accessToken
    }
  }
`;

export const USER = gql`
  query Me{
    me {
      id
      username
    }
  }
`