import gql from 'graphql-tag'


export const CREATE_NEW_STUDENT = gql`
mutation createStudent($name: String!, $email: String!, $password: String!, $courseId: String!, $transactionReferenceId: String!){
  CreateStudent(input:{
    name: $name,
    email: $email,
    password: $password,
    courseId: $courseId,
    transactionReferenceId: $transactionReferenceId
  }) {
    studentData {
      id
      name
      email
      accessToken
    }
    code
    success
    message
  }
}
`

export const LOGIN_STUDENT = gql`
query loginStudent($email: String!, $password: String!) {
  LoginStudent(input:{
    email: $email,
    password: $password
  }) {
    studentData {
      id
      name
      gender
      email
      instagramId
      phoneNumber
      profilePhoto
      accessToken
    }
    code
    success
    message
  }
}
`

export const RECOVER_PASSWORD = gql`
query changePassword($email: String!){
  RecoverStudentPassword(input:{
    email: $email
  }) {
    code
    success
    message
  }
}
`

export const CHANGE_PASSWORD = gql`
  mutation changePassword ($email: String!, $password: String!) {
      CreateNewStudentPassword(input:{
        email: $email,
        password: $password
      }) {
        code
        success
        message
      }
  }
`

