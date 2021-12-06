import { graphql } from 'react-relay';

export const UserRegister = graphql`
  mutation UserRegisterMutation(
    $username: String!
    $displayName: String
    $email: String!
    $password: String!
  ) {
    userRegisterMutation(
      input: {
        username: $username
        displayName: $displayName
        email: $email
        password: $password
      }
    ) {
      token
      me {
        id
        username
        email
      }
    }
  }
`;
