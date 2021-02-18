import gql from 'graphql-tag'

export const GET_BUSINESS_ACCOUNITNG_DETAILS = gql`
query getData($businessId: String!) {
    GetBusinessAccounting(input:{
      businessId: $businessId,
    }){
      businessData {
        allProducts
        allOrders
        allProductsInCart
        allFollowers
        totalAmountSold
        allTransactions {
          referenceId
          orderId
          paymentMethod
          customerName
          amount
          date
        }
      }
      code
      success
      message
    }
    
}
`