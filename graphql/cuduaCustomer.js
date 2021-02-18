import gql from 'graphql-tag'

export const CREATE_CONTACT = gql`
mutation create ($name: String!, $location: String!, $type: String!, $phone_one: String!, $phone_two: String) {
  createIdealCustomer(input:{
    name: $name,
    location: $location,
    type: $type,
    phone_one: $phone_one,
    phone_two: $phone_two
  }) {
    code
    success
    message
    countData
  }
}
`

export const GET_IDEAL_CUSTOMERS  =  gql`
{
  getIdealCustomers(input:{
    industry: "Beauty",
    page: 1
  }) {
    customers{
      name
      location
      type
      phone_one
      phone_two
    }
    code
    success
    message
  }
}
`