import gql from 'graphql-tag'

export const CREATE_NEW_PRODUCT = gql`
mutation CreateProduct($file: String!, $name: String!, $price: Int!, $category: String!, $subcategory: String!, $businessId: String!) {
  CreateProduct(input:{
    name: $name,
    price: $price,
    category: $category,
    subcategory: $subcategory,
    businessId: $businessId,
    file: $file
  }) {
    productId
    code
    success
    message
  }
}
`

export const CREATE_NEW_PRODUCTS_WITH_INSTAGRAM = gql`
mutation createProduct($name: String!, $price: Int!, $category: String!, $subcategory: String!, $businessId: String!, $imagePath: String!, $description: String) {
  CreateProductFromInstagram(input:{
    name: $name,
    price: $price,
    category: $category,
    subcategory: $subcategory,
    imagePath: $imagePath,
    businessId: $businessId,
    description: $description
  }) {
    productId
    code
    success
    message
  }
}
`

export const GET_PRODUCT_BY_BUSINESS_ID = gql`
query getProduct($businessId: String!, $page: Int!){
  GetProductsUsingBusinessId(input:{
    businessId: $businessId,
    page: $page
  }) {
    products {
      id
      name
      price
      primaryImage
      images
      hide
    }
    code
    success
    message
    
  }
}
`

export const GET_ALL_PRODUCTS_IN_CATEGORY = gql`
query getProducts ($categoryId: String!, $page: Int!) {
  GetAllProductsInCategory(input:{
    categoryId: $categoryId,
    page: $page
  }) {
    products {
      id
      name
      price
      primaryImage
      businessId
      images
    }
    code
    success
    message
  }
}
`

export const GET_ALL_PRODUCTS_IN_SUBCATEGORY = gql`
query getProducts ($subcategoryId: String!, $page: Int!) {
  GetAllProductsInSubcategory(input:{
    subcategoryId: $subcategoryId,
    page: $page,
  }) {
    products {
      id
      name
      price
      primaryImage
      businessId
      images
      
    }
    code
    success
    message
  }
}
`

export const GET_PRODUCTS_BY_CAT_AND_SUB_FILTER = gql`
query getProduct ($page: Int!, $communityId: String!, $type: String!, $typeId: String!) {
  FilterCategorySearch(input:{
    page: $page,
    communityId: $communityId,
    type: $type,
    typeId: $typeId,
  }) {
    products {
      id
      name
      price
      images
      businessId
    }
    code
    success
    message
  }
}
`

export const GET_PRODUCT_BY_SUBCATEGORY = gql`
query getProducts ($businessId: String!, $subcategoryId: String!, $page: Int!) {
  GetProductBysubCategory(input: {
    businessId: $businessId,
    subcategoryId: $subcategoryId,
    page: $page
  }) {
    products {
      id
      name
      images
      price
      hide
      reviewScore
      category {
        categoryId
        categoryName
      }
      subcategory {
        subcategoryId
        subcategoryName
      }
      primaryImage
    }
    totalProductsInSubcategoryCount
    code
    success
    message
  }
}
`

export const GET_PRODUCT_BY_CATEGORY = gql`
query getProducts ($businessId: String!, $categoryId: String!, $page: Int!) {
  GetProductByCategory(input:{
    businessId: $businessId,
    categoryId: $categoryId,
    page: $page
  }) {
    products {
      id
      name
      price
      images
      hide
      reviewScore
      category {
        categoryId
        categoryName
      }
      subcategory {
        subcategoryId
        subcategoryName
      }
      primaryImage
    }
    code
    success
    message
  }
}
`

export const SHOP_ADMIN_SEARCH_PRODUCT_IN_MANAGER = gql`
query searchProduct($keyword: String!, $businessId: String!){
  BusinessSearchProduct(input: {
    keyword: $keyword,
    businessId: $businessId
  })
  {
    products{
      id
      name
      price
      primaryImage
      hide
    }
    code
    success
    message
  }
}
`

export const GET_PRODUCT_BY_ID = gql`
query getproduct($productId: String!) {
  GetProductById(input:{
    productId: $productId,
  })
  {
    product{
      id
      name
      price
      description
      primaryImage
      tags {
        tagId
        tagName
      }
      colors {
        colorId
        color
      }
      sizes {
        sizeId
        sizeNumber
      }
      hide
      category{
        categoryId
        categoryName
      }
      subcategory{
        subcategoryId
        subcategoryName
      }
      images
    }
    code
    success
    message
  }
}
`

export const GET_ALL_DETAILS_FROM_PRODUCT_WITH_ID = gql`
query getproduct($productId: String!) {
  GetProductById(input:{
    productId: $productId,
  })
  {
    product{
      id
      name
      price
      description
      primaryImage
      reviewScore
      tags {
        tagId
        tagName
      }
      colors {
        colorId
        color
      }
      sizes {
        sizeId
        sizeNumber
      }
      hide
      category{
        categoryId
        categoryName
      }
      subcategory{
        subcategoryId
        subcategoryName
      }
      reviews {
        author {
          authorId
          fullname
          displayPicture
        }
        rating
        description
        timeStamp
      }
      images
    }
    business {
      businessname,
      id,
      username,
      logo
      subscriptionStatus
      contact {
        phone,
        whatsapp {
          number,
          status
        }
      }
    }
    code
    success
    message
  }
}
`

export const BUSINESS_GET_ALL_DETAILS_FROM_PRODUCT_WITH_ID = gql`
query getproduct($productId: String!) {
  BusinessGetProductById(input:{
    productId: $productId,
  })
  {
    product{
      id
      name
      price
      description
      primaryImage
      reviewScore
      tags {
        tagId
        tagName
      }
      colors {
        colorId
        color
      }
      sizes {
        sizeId
        sizeNumber
      }
      hide
      category{
        categoryId
        categoryName
      }
      subcategory{
        subcategoryId
        subcategoryName
      }
      reviews {
        author {
          authorId
          fullname
          displayPicture
        }
        rating
        description
        timeStamp
      }
      images
    }
    business {
      businessname,
      id,
      username,
      logo
      contact {
        phone,
        whatsapp {
          number,
          status
        }
      }
    }
    code
    success
    message
  }
}
`

export const CREATE_PRODUCT_SIZE = gql`
mutation create ($sizes: [String]!, $productId: String!, $businessId: String!){
	CreateProductSizes(input:{
    sizes: $sizes,
    productId: $productId,
    businessId: $businessId
  }) {
    sizes {
      sizeId
      sizeNumber
    }
    code
    success
    message
  }
}
`

export const REMOVE_PRODUCT_SIZE = gql`
mutation remove($sizeId: String!, $productId: String!, $businessId: String!){
  RemoveProductSize(input: {
    sizeId: $sizeId,
    productId: $productId,
    businessId: $businessId
  }) {
    code
    success
    message
  }
}
`

export const CREATE_PRODUCT_COLOR = gql`
mutation create ($colors: [String]!, $productId: String!, $businessId: String!) {
	CreateProductColors(input:{
    colors: $colors,
    productId: $productId,
    businessId: $businessId
  }) {
    colors {
      colorId
      color
    }
    code
    success
    message
  }
}
`

export const REMOVE_PRODUCT_COLOR = gql`
mutation remove($colorId: String!, $productId: String!, $businessId: String!){
	RemoveProductColor(input:{
    colorId: $colorId,
    productId: $productId,
    businessId: $businessId
  }) {
    code
    success
    message
  }
}
`

export const CREATE_PRODUCT_DESCRIPTION = gql`
mutation create ($description: String!, $productId: String!, $businessId: String!) {
	EditDescription(input:{
    description: $description,
    productId: $productId,
    businessId: $businessId
  }) {
    code
    success
    message
  }
}
`

export const ADD_MORE_PRODUCT_PHOTO = gql`
mutation ($file: String!, $productId: String!, $businessId: String!) {
    AddmorePhotos(input:{
      file: $file
      productId: $productId,
      businessId: $businessId
  }) {
    photos
    code
    success
    message
  }
}
`

export const SET_IMAGE_PRIMARY = gql`
mutation markAsPrimary($imageName: String!, $productId: String!, $businessId: String!) {
  MakePrimaryImage(input:{
      imageName: $imageName,
      productId: $productId,
      businessId: $businessId
  }) {
    images
    code
    success
    message
  }
}
`

export const DELETE_PRODUCT_IMAGE = gql`
mutation removeImage($imageName: String!, $productId: String!, $businessId: String!) {
    RemoveProductPicture(input:{
      imageName: $imageName,
      productId: $productId,
      businessId: $businessId
  }) {
    code
    success
    message
  }
} 
`

export const EDIT_PRODUCT_BASIC_DETAILS = gql`
mutation editBasicDetails ($productId: String!, $productName: String!, $productPrice: Int!, $category: String, $subcategory: String!, $businessId: String!) {
  EditBasicDetails(input: {
    productId: $productId,
    productName: $productName,
    productPrice: $productPrice,
    category: $category,
    subcategory: $subcategory,
    businessId: $businessId
  }) {
    code
    success
    message
  }
}
`
export const SHOW_PRODUCT = gql`
mutation showProduct($productId: String!, $businessId: String!){
  ShowProduct(input : {
		productId: $productId,
    businessId: $businessId
  }) {
    code
    success
    message
  }
}
`

export const HIDE_PRODUCT = gql`
mutation HideProduct($productId: String!, $businessId: String!){
  HideProduct(input : {
		productId: $productId,
    businessId: $businessId
  }) {
    code
    success
    message
  }
}
`

export const DELETE_PRODUCT = gql`
mutation deleteProduct($businessId: String!, $productId: String!) {
  DeleteProduct(input : {
		productId: $productId,
    businessId: $businessId
  }) {
    code
    success
    message
  }
}
`

export const CUSTOMER_SEARCH_PRODUCT_IN_BUSINESS = gql`
query SearchInShop ($keyword: String!, $businessId: String!, $page: Int!) {
  BusinessSearchProductByCustomer(input:{
    keyword: $keyword,
    businessId: $businessId,
    page: $page
  }) {
    products {
      name
      id
      price
      primaryImage
    }
    resultCount
    code
    success
    message
  }
}
`

export const SAVE_PRODUCT_FOR_LATER = gql`
mutation saveForLater($productId: String!, $businessId: String!){
  SaveProductForLater(input:{
    productId: $productId,
    businessId: $businessId
  }) {
    code
    success
    message
  }
}
`

export const REMOVE_PRODUCT_FROM_SAVED_PRODUCTS = gql`
mutation remove($productId: String!) {
  RemoveProductFromSavedProducts(input:{
    productId: $productId
  }){
    code
    success
    message
  }
}
`

export const MOVE_PRODUCT_TO_CART = gql`
mutation movetocart($productId: String!) {
  MoveToCart(input:{
    productId: $productId
  }) {
    code
    success
    message
  }
}
`

export const GET_SAVED_PRODUCTS = gql`
query Getproduct($page: Int!){
  GetSavedItems(input:{
    page: $page
  }) {
    products {
      productId
      name
      image
      review
      businessId
      price
    }
    count
    code
    success
    message
  }
}
`

export const SIGNED_IN_USER_ADD_ITEM_TO_CART = gql`
mutation addItemToCart($businessId: String!, $productId: String!, $colorId: String, $sizeId: String){
  AddItemToCart(input:{
    businessId: $businessId,
    productId: $productId,
    colorId: $colorId,
    sizeId: $sizeId
  }) {
    code
    success
    message
  }
}

`

export const ANONYMOUS_ADD_ITEM_TO_CART = gql`
mutation addToCart($anonymousId: String!, $businessId: String!, $productId: String!, $colorId: String, $sizeId: String){
  AnonymousAddItemToCart(input:{
    anonymousId: $anonymousId,
    businessId: $businessId,
    productId: $productId,
    colorId: $colorId,
    sizeId: $sizeId
  }) {
    code
    success
    message
  }
}
`

export const CREATE_PRODUCT_REVIEW = gql`
mutation create ($productId: String!, $message: String!, $score: Int!) {
  CreateProductReview(input:{
    productId: $productId,
    message: $message,
    score: $score
  }) {
    code
    success
    message
  }
}
`

export const GET_PRODUCT_SUGGESTIONS = gql`
query getSuggesstion ($productId: String!, $businessId: String!) {
  GetProductSuggestion(input:{
    productId: $productId,
    businessId: $businessId
  }) {
    products{
      id
      name
      price
      businessId
      primaryImage
    }
    code
    success
    message
  }
}
`