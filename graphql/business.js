import gql from 'graphql-tag'

export const CREATE_BUSINESS = gql`
mutation CreateBusinessAccount($name: String!, $username: String!) {
    # remember to pass accessToken in request header
    CreateBusinessAccount(input:
    { 
      name: $name, 
      username: $username
    }) {
        businessDetails{
            businessname
            username
            id
            logo
            description 
            address {
                number
                street
                community
                lga
                state
                country
            }
            contact {
                email
            }
            subscription {
              subscriptionDate
              expiryDate
              subscriptionId
              subscriptionType
            }
        }
        code
        success
        message
    }
}

`;

export const GET_BUSINESS_CATEGORIES_WITH_SUBCATEGORIES = gql` 
    query GetBusinessCategoryListingWithSubcategories ($businessId: String!) {
        GetBusinessCategoriesWithSubcategory (input: { businessId: $businessId}) {
            businessCategory{
                itemId
                categoryId
                categoryName
                hide
                subcategory {
                    itemId
                    subcategoryId
                    subcategoryName
                    subcategoryProductCount
                    hide
                }
            }
            code
            success
            message
        }
  }
  `

export const HIDE_BUSINESS_SUBCATEGORY = gql`
    mutation HideBusinessSubcategory ($subcategoryId: String!, $businessId: String!, $categoryId: String!) {
        HideSelectedBusinessSubcategory(input:{
            subcategoryId: $subcategoryId,
            businessId: $businessId,
            categoryId: $categoryId
        }) {
            code
            success
            message
        }
    }
`;

export const SHOW_BUSINESS_SUBCATEGORY = gql`
    mutation ShowBusinessSubcategory ($subcategoryId: String!, $businessId: String!, $categoryId: String!) {
        ShowSelectedBusinessSubcategory(input:{
            subcategoryId: $subcategoryId,
            businessId: $businessId,
            categoryId: $categoryId
        }) {
            code
            success
            message
        }
    }
`;

export const  DELETE_BUSINESS_SUBCATEGORY = gql`
mutation DeleteSubcategory($subcategoryId: String!, $businessId: String!){
  DeleteSelectedSubcategory(input: {
    subcategoryId: $subcategoryId,
    businessId: $businessId
  }) {
    code
    success
    message
  }
}
`


export const EDIT_BASIC_BUSINESS_DETAILS = gql`
mutation EditBusinessBasicDetails($businessId: String!, $businessName: String, $businessUsername: String, $businessDescription: String) {
  EditBusinessBasicDetails(input:{
    businessId: $businessId,
    businessName: $businessName,
    businessUsername: $businessUsername,
    businessDescription: $businessDescription
  }){
    code
    success
    message
  }
}
`

export const EDIT_BUSINESS_PHONE_NUMBERS = gql`
mutation EditBusinessPhoneNumber($phoneNumbers: [String]!, $businessId: String!){
    EditBusinessPhoneNumber(input: { phoneNumbers: $phoneNumbers, businessId: $businessId }) {
    code
    success
    message
  }
}
`

export const EDIT_BUSINESS_EMAIL = gql`
mutation EditBusinessEmail ($email: String!, $businessId: String!){
  EditBusinessEmailAddress(input:{
    email: $email,
    businessId: $businessId,
  }) {
    code
    success
    message
  }
}
`

export const EDIT_BUSINESS_WHATSAPP_CONTACT = gql`
mutation EditBusinessWhatsapp($phoneNumber: String!, $businessId: String!, $notification: Int!) {
  EditWhatsappContact(input:{
    phoneNumber: $phoneNumber,
    businessId: $businessId,
    notification: $notification,
  }) {
    code
    success
    message
  }
}
`;

export const EDIT_BUSINESS_LOGO = gql`
mutation EditBusinessLogo ($file: Upload!, $businessId: String!) {
  EditBusinesslogo(input: {
    file: $file,
    businessId: $businessId
  }) {
    imagePath
    code
    success
    message
  }
}
`

export const EDIT_BUSINESS_COVERPHOTO = gql`
mutation EditBusinessCoverPhoto ($file: Upload!, $businessId: String!) {
  EditBusinessCoverPhoto(input: {
    file: $file,
    businessId: $businessId
  }) {
    imagePath
    code
    success
    message
  }
}
`

export const EDIT_BUSINESS_ADDRESS = gql`
mutation EditBusinessAddress($streetNumber: String!, $streetId: String!, $closestBusStop: String!, $businessId: String!){
    EditBusinessAddress(input:{
      streetNumber: $streetNumber,
      streetId: $streetId,	
      closestBusStop: $closestBusStop,
      businessId: $businessId
    }) {
      code
      success
      message
    }
}
`

export const GET_BUSINESS_NOTIFICATION = gql `
query GetBusinessNotification ($businessId: String!, $page: Int!) {
  GetBusinessNotification(input:{
    businessId: $businessId,
    page: $page
  }) {
    notification {
      notificationId
      isRead
      owner
      actionId
      type
      message
      header
      timeStamp
    }
    code
    success
    message
  }
}
`;

export const MARK_BUSINESS_NOTIFICATION_AS_READ = gql`
mutation MarkNotification ($notificationId: String!, $type: String!) {
  MarkNotificationAsRead (input: {
    notificationId: $notificationId,
    type: $type
  }) {
    code
    success
    message
  }
}
`
export const GET_NEW_NOTIFICATION_COUNT = gql`
query GetNewNotificationCount ($businessId: String!) {
  GetBusinessNotificationCount (input: {
    businessId: $businessId
  }){
    count
    code
    success
    message
  }
}
` 

export const GET_NEW_ORDER_COUNT = gql`
query GetNewOrderCount ($businessId: String!) {
  GetNewOrderCount (input: {
    businessId: $businessId
  }){
    count
    code
    success
    message
  }
}
` 

export const GET_BUSINESS_REVIEW = gql`
query GetReviewForBusiness ($businessId: String!) {
  GetBusinessReview (input: {
    businessId: $businessId,
  })
  {
    score
    reviews{
      author {
        fullname
        userId
        displayPicture
      }
      description
      rating
      timeStamp
    }
    code
    success
    message
  }
}
`

export const GET_BUSINESS_FOLLOWERS = gql`
query GetBusinessFollowers($page: Int!, $businessId: String!) {
  GetFollowers(input:{
    page: $page,
    businessId: $businessId
  })
  {
    customerData {
      name
      profilePhoto
      reviewScore
      userId
    }
    code
    success
    message
  }
}
`

export const HIDE_CATEGORY = gql`
mutation HideCategory ($categoryId: String!, $businessId: String!) {
  HideSelectedBusinessCategory(input:{
    categoryId: $categoryId,
    businessId: $businessId
  }) {
    code
    success
    message
  }
}
`

export const SHOW_CATEGORY = gql`
mutation ShowCategory ($categoryId: String!, $businessId: String!) {
  ShowSelectedBusinessCategory(input:{
    categoryId: $categoryId,
    businessId: $businessId
  }) {
    code
    success
    message
  }
}
`

export const DELETE_CATEGORY = gql`
mutation DeleteCategory($categoryId: String!, $businessId: String!){
  DeleteSelectedCategory(input:{
    categoryId: $categoryId,
    businessId: $businessId
  }) {
    code
    success
    message
  }
}
`

export const DEACTIVATE_SUBSCRIPTION = gql`
mutation deactivate($businessId: String!){
  disableSubscription(input: {
    businessId: $businessId
  }) {
    code
    success
    message
  }
}
`
export const ACTIVATE_SUBSCRIPTION = gql`
mutation activate ($businessId: String!, $referenceId: String!, $subType: String!) {
  createSubscription(input: {
    businessId: $businessId,
    referenceId: $referenceId,
    subType: $subType
  }) {
    subscriptionData {
      start
      end
    }
    code
    success
    message
  }
}
`

export const GET_BUSINESS_VIRAL_ID = gql`
query getId ($businessId: String!) {
  GetViralId(input:{
    businessId: $businessId
  }) {
    viralId
    code
    success
    message
  }
}
`
export const GET_VIRAL_DOWNLINERS = gql`
query GetDownliners ($businessId: String!){
  GetDownLiners(input:{
    businessId: $businessId
  }) {
    businessData {
      businessname
      logo
      id
    	username
    }
    redeemPrice
    code
    success
    message
  }
}
`

export const GET_BUSINESS_DETAILS_BY_USERNAME = gql`
query getdata($username: String!){
  GetSingleBusinessDetailsByUsername(input:{
    username: $username
  }) {
    businessData {
      id
      businessname
      username
      description
      subscriptionStatus
      address {
        number
        street
        community
        lga
        state
        country
        busStop
      }
      contact {
        email
        phone
        whatsapp {
          status
          number
        }
      }
      businessCategories {
        itemId
        categoryId
        categoryName
        hide
        subcategories {
          itemId
          subcategoryId
          subcategoryName
          hide
        }
      }
      logo
      coverPhoto
      review
      reviews {
        author {
          fullname
          displayPicture
          userId
        }
        description
        rating
        timeStamp
      }
    }
    code
    success
    message
  }
}
`

export const GET_VIRAL_REDEMPTION = gql`
query getViralIdRedemption($businessId: String!){
  GetViralRedemptionStatus(input: {
    businessId: $businessId
  }) {
    status
    code
    status
    message
  }
}
`

export const ACTIVATE_VIRAL_INVITATION_GIFT = gql`
mutation activateGift($businessId: String!, $viralId: String!){
  ActivateViralInvitationGift(input:{
    businessId: $businessId,
    viralId: $viralId,
  }) {
    subscriptionData {
      start
      end
    }
    code
    success
    message
  }
}
`

export const CREATE_BUSINESS_REVIEW = gql`
mutation create ($description: String, $score: Int!, $businessId: String!) {
  CreateBusinessReview(input:{
    description: $description,
    score: $score,
    businessId: $businessId
  }) {
    code
    success
    message
  }
}
`

export const UPDATE_PAYSTACK_PUBLIC_ID = gql`
mutation publicKey ($key: String!, $businessId: String!) {
  UpdatePaystackPublicKey(input:{
    key: $key,
    businessId: $businessId
  }) {
    code
    success
    message
  }
}
`