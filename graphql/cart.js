
import gql from 'graphql-tag'

export const GET_SIGNED_CART_ITEMS = gql`
query {
  GetCartItems{
    cart {
      itemId
      customer
    	color
      quantity
      size
      product{
        productId
        name
        price
        image
        review
      }
      business {
        businessId
        name
        username
        address {
          number
          street
          community
          lga
          state
          country
          busStop
        }
      }
    }
    code
    success
    message
  }
}
`

export const GET_ANONYMOUS_CART_ITEMS = gql`
query cart ($anonymousId: String!) {
  AnonymousGetCartItems(input:{
    anonymousId: $anonymousId
  }) {

    cart {
      itemId
      customer
    	color
      quantity
      size
      product{
        productId
        name
        price
        image
        review
      }
      business {
        businessId
        name
        username
        address {
          number
          street
          community
          lga
          state
          country
          busStop
        }
      }
    }
    code
    success
    message
  }
}

`

export const ANONYMOUS_EDIT_PRODUCT_QUANTITY_IN_CART = gql`
mutation editQuantity($quantity: Int!, $itemId: String!){
  AnonymousEditProductQuanityInCart(input:{
    quantity: $quantity,
    itemId: $itemId
  }) {
    code
    success
    message
  }
}
`

export const ANONYMOUS_EDIT_PRODUCT_COLOR_AND_SIZE = gql`
mutation editColorAndSize($sizeId: String, $colorId: String, $itemId: String!){
  AnonymousEditProductSizeAndColorInCart(input:{
    sizeId: $sizeId,
    colorId: $colorId,
    itemId: $itemId
  }) {
    code
    success
    message
  }
}
`

export const ANONYMOUS_DELETE_ITEM_FROM_CART = gql`
mutation deleteItem($itemId: String!, $anonymousId: String!){
  AnonymousDeleteItemFromCart(input:{
    itemId: $itemId,
    anonymousId: $anonymousId
  }) {
    code
    success
    message
  }
}
`

// signed in user
export const SIGNED_USER_UPDATE_PRODUCT_QUANTITY_IN_CART = gql`
mutation updateCartQuantity($itemId: String!, $quantity: Int!){
  UpdateItemQuantity(input:{
    itemId: $itemId,
    quantity: $quantity
  }) {
    code
    success
    message
  }
}
`

// signed in user
export const SIGNED_USER_UPDATE_PRODUCT_SIZE_AND_COLOR = gql`
mutation updateSizeAndColor($itemId: String!, $sizeId: String, $colorId: String){
  UpdateItemColorAndSize(input:{
    sizeId: $sizeId,
    colorId: $colorId,
    itemId: $itemId
  }) {
    code
    success
    message
  }
}
`

// signed in user
export const SIGNED_DELETE_ITEM_IN_CART = gql`
mutation deleteItem($itemId: String!){
  DeleteItemFromCart(input:{
    itemId: $itemId,
  }){
    code
    success
    message
  }
}
`