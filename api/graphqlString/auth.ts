import { gql } from "@apollo/client"

export const GENERATE_CUSTOMER_TOKEN = gql`
  mutation GenerateCustomerToken($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
    }
  }
`
export const CREATE_CUSTOMER_MUTATION = gql`
  mutation CreateCustomer(
    $firstname: String!
    $lastname: String!
    $email: String!
    $password: String!
    $gender: Int!
    $date_of_birth: String!
  ) {
    createCustomerV2(
      input: {
        firstname: $firstname
        lastname: $lastname
        email: $email
        password: $password
        gender: $gender
        date_of_birth: $date_of_birth
      }
    ) {
      customer {
        firstname
        lastname
        email
        gender
        date_of_birth
      }
    }
  }
`

export const GET_CUSTOMER_INFORMATION = gql`
  query GetCustomerInformation {
    customer {
      firstname
      lastname
      email
      gender
      date_of_birth
    }
  }
`

export const UPDATE_CUSTOMER_INFORMATION = gql`
  mutation UpdateCustomerInformation(
    $firstname: String!
    $lastname: String!
    $gender: Int!
    $date_of_birth: String!
  ) {
    updateCustomerV2(
      input: {
        firstname: $firstname
        lastname: $lastname
        gender: $gender
        date_of_birth: $date_of_birth
      }
    ) {
      customer {
        firstname
        lastname
        email
        gender
        date_of_birth
      }
    }
  }
`
