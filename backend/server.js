import { ApolloServer,gql } from 'apollo-server';
import {ApolloServerPluginLandingPageGraphQLPlayground} from 'apollo-server-core'
import {users,quotes} from './db.js'
import {typeDefs} from './Typedefs/typeDefs.js'
import {resolvers} from './Resolver/resolver.js'

import {randomBytes} from 'crypto'
import dotenv from 'dotenv'

import {connectDB} from './config/db.js'
import './models/userSchema.js'
import './models/quoteSchema.js'


dotenv.config()
connectDB()


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
