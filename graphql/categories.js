import gql from 'graphql-tag'

export const GET_ALL_CATEGORIES = gql`
query {
  GetAllCategories{
    category{
      id
      categoryName
      industry
      icon
      subcategories {
        subcategoryId
        subcategoryName
      }
    }
    code
    success
    message
  }
}
`

export const CREATE_BUSINESS_CATEGORY = gql `
mutation Create($businessId: String!, $categoryId: String!, $subcategories: [String]!){
	CreateBusinessCategory(input:{
    businessId: $businessId,
    categoryId: $categoryId,
    subcategories: $subcategories
  }) {
    code
    success
    message 
  }
}
`;


export const CREATE_NEW_CATEGORIES = gql`
mutation create($categoryName: String!, $subcategories: String!) {
  createCategory(input:{
    categoryName: $categoryName,
    subcategories: $subcategories,
  }) {
    code
    success
    message
  }
}
`

export const CREATE_NEW_SUBCATEGORIES = gql`
mutation create ($subcategories: String!, $categoryId: String!) {
  createSubCategory(input:{
    subcategories: $subcategories,
    categoryId: $categoryId
  }) {
    code
    success
    message
  }
}
`