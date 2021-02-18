import gql from 'graphql-tag';

export const GET_ALL_STATES = gql `
query {
    GetAllStates {
        states {
          name
          stateId
        }
        country {
          name
          countryId
        }
        code
        success
        message
    }
}
`

export const FIND_LGA = gql`
query FindLga($keyword: String!){
  GetLga(input:{ keyword: $keyword }) {
    lgaData {
      lga {
        name
        lgaId
      }
      state {
        name
        stateId
      }
    }
    code
    success
    message
    
  }
}
`

export const FIND_COMMUNITY = gql`
query FindCommunity($keyword: String!){
  GetCommunity (input:{
    keyword: $keyword
  }){
    communityData {
      communityName
      communityId
      lga {
        name
        lgaId
      }
      state {
        name
        stateId
      }
    }
    code
    success
    message
  }
}
`

export const ADD_NEW_LOCATION = gql`
mutation AddNewUserLocation ($userId: String!, $state: String!, $lga: String!, $community: String!, $street: String!, $proximity: String) {
    AddNewUserLocation (input: {
        userId: $userId, state: $state, lga: $lga, community: $community, street: $street, proximity: $proximity
    }){
        code
        success
        message
    }
}
`

export const SEARCH_FOR_STREET = gql`
query SearchStreet($keyword: String!) {
  GetStreet(input: {
    keyword: $keyword
  }){
    streetData {
      streetName
      streetId
      community {
        name
        communityId
      }
      state {
        name
        stateId
      }
    }
    code
    success
    message
  }
}
`