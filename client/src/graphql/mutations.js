import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation login(
    $username: String!, 
    $password: String!
    ) {
    login(
      username: $username, 
      password: $password
      ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADDUSER_MUTATION = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADDDISC_MUTATION = gql`
  mutation addDisc(
    $brand: String!
    $name: String!
    $speed: String!
    $glide: String!
    $turn: String!
    $fade: String!
    $inBag: Boolean!  
    $flightPath: String!
    $flightType: String!
  ) {
    addDisc(
      brand: $brand
      name: $name
      speed: $speed
      glide: $glide
      turn: $turn
      fade: $fade
      inBag: $inBag  
      flightPath: $flightPath
      flightType: $flightType
    ) {
        _id
        username
        email
        discs {
          brand
          name
          speed
          glide
          turn
          fade
          inBag
          flightPath
          flightType
        }
    }
  }
`;

export const REMOVEDISC_MUTATION = gql`
  mutation removeDisc(
    $name: String!
  ) {
    removeDisc(
      name: $name
    ) {
        _id
        username
        email
        discs {
          brand
          name
          speed
          glide
          turn
          fade
          inBag
          flightPath
          flightType
        }
    }
  }
`;

export const TOGGLEINBAG_MUTATION = gql`
  mutation toggleInBag(
    $name: String!
  ) {
    toggleInBag(
      name: $name
    ) {
        _id
        username
        email
        discs {
          brand
          name
          speed
          glide
          turn
          fade
          inBag
          flightPath
          flightType
        }
      
    }
  }
`;
