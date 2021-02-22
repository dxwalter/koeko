import gql from 'graphql-tag'

export const GET_ALL_COURSES_FOR_ANONYMOUS_USER = gql`
query {
  studentGetAllCourses{
    courses {
      courseId
      publish
      price
      name
      description
      displayPicture
      funnelPage
    }
    code
    success
    message
  }
}
`