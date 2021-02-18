export default ({app}, inject) => {
		// perform graphql queries

		let performGraphQlMutation = async (apollo, queryString, variables, context) => {

			try {

				let result = await apollo.mutate({
                    mutation: queryString,
					variables: variables,
					context: context,
					fetchPolicy: 'no-cache'
                });

				return {
					error: false,
					result: result
				}
				
			} catch (error) {
				return {
					error: true,
					message: `A network error occurred. ${error.message}`
				}
			}


		}

		inject('performGraphQlMutation', performGraphQlMutation);


		let performGraphQlQuery = async (apollo, queryString, variables, context) => {
			

			try {
				
				let result = await apollo.query({
                    query: queryString,
					variables: variables,
					context: context,
					fetchPolicy: 'no-cache'
                });

				return {
					error: false,
					result: result
				}
				
			} catch (error) {
				return {
					error: true,
					message: `A network error occurred. ${error.message}`
				}
			}


		}

		inject('performGraphQlQuery', performGraphQlQuery);
}