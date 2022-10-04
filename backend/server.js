import { ApolloServer,gql } from 'apollo-server';
import {ApolloServerPluginLandingPageGraphQLPlayground} from 'apollo-server-core'
import {users,quotes} from './db.js'

const typeDefs = gql`
      type Query{
      	users:[User]
      	user(_id:ID!):User
      	quotes:[Quotes]
      	s_quote(by:ID!):[Quotes]
      }
      type User{
      	_id:ID!
      	firstName:String
      	lastName:String
      	quotes:[Quotes]
      }
      type Quotes{
      	by:ID
      	quote:String
      }
`

const resolvers = {
	Query:{
		users:()=>users,
		user:(_,{_id})=>users.find(user=>user._id == _id),
		quotes:()=>quotes,
		s_quote:(_,{by})=>quotes.filter(q=>q.by==by)
	},
	User:{
            quotes:(ur)=>quotes.filter(q => q.by == ur._id)
	}
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
	plugins:[
		ApolloServerPluginLandingPageGraphQLPlayground()
	]
})

server.listen().then(({url})=>{
	console.log(url)
})
