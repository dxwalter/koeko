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
      enrolled
      enrolledCount
      reviewScore
    }
    code
    success
    message
  }
}
`

export const STUDENT_ENROLL_INTO_COURSE = gql`
mutation enrollIntoCourse ($courseId: String!, $transactionRef: String!) {
  StudentEnrollCourse(input:{
    courseId: $courseId,
    transactionRef: $transactionRef
  }) {
    code
    success
    message
  }
}
`

export const STUDENT_GET_ALL_ENROLLED_COURSES = gql`
query {
  StudentGetEnrolledCourses{
    courses {
      courseId
      publish
      price
      name
      description
      displayPicture
      enrolled
      reviewScore
      enrolledCount
    }
    code
    success
    message
  }
}
`

export const STUDENT_GET_COURSE_DETAILS = gql`
query getCourseDetails($courseId: String!) {
  StudentGetCourseContent(input:{
    courseId: $courseId,
  }) {
    courseDetails {
      courseId
      publish
      price
      name
      funnelPage
      description
      displayPicture
      reviewScore
      enrolledCount
    }
    courseContent{
			isCompleted
      contentId
      displayPicture
      courseId
      materials
      title
    }
    
    code
    success
    message
  }
}
`

export const STUDENT_GET_COURSE_VIDEO = gql`
query getVideo ($courseId: String!, $contentId: String!) {
  StudentGetCourseVideo(input:{
    courseId: $courseId,
    contentId: $contentId
  }) {
    videoContent {
      keywords
      title
      videoLink
      materials
      courseId
      displayPicture
      contentId
    }
    code
    success
    message
  }
}
`

export const MarkTutorialAsComplete = gql`
mutation markAsComplete ($courseId: String!, $contentId: String!) {
  StudentMarkContentAsComplete(input:{
    courseId: $courseId,
    contentId: $contentId
  }) {
    code
    success
    message
  }
}
`

export const STUDENT_MARK_COURSE_AS_COMPLETE = gql`
mutation markAsComplete ($courseId: String!) {
  StudentMarkCourseAsComplete(input:{
    courseId: $courseId
  }){
    code
    success
    message
  }
}
`