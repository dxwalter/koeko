import gql from 'graphql-tag'

export const GET_FOLLOWING_FOR_HOME_PAGE = gql`
query {
    getHomePageFollowing{
        following {
            logo
            businessName
            username
            address {
                number
                street
                community
                lga
                state
                country
            }
            businessId
        }
        code
        success
        message
    }
}
`

export const GET_PRODUCTS_FOR_HOME_PAGE = gql`
query {
  getHomePageProducts{
    products {
      image
      productId
      name
      price
      businessId
    }
    code
    success
    message
  }
}
`

export const GET_BUSINESS_FOR_HOME_PAGE = gql`
query {
  getNewBusinessListing{
    business {
      logo
      reviewScore
      username
      businessName
      categoryString
      businessId
    }
    code
    success
    message
  }
}
`