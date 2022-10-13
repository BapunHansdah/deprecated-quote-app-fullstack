import { ApolloServer} from 'apollo-server';
import {ApolloServerPluginLandingPageGraphQLPlayground} from 'apollo-server-core'

import {typeDefs} from './Typedefs/typeDefs.js'
import {resolvers} from './Resolver/resolver.js'

import {randomBytes} from 'crypto'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

import {connectDB} from './config/db.js'

dotenv.config()
connectDB()
const PORT = process.env.PORT || 4000
function authorize({req}){
    
    const {authorization} = req.headers

    if(authorization){
    	const {userId} = jwt.verify(authorization,process.env.JWT_SECRET)
    	return {userId}
    }
 }


const server = new ApolloServer({
	typeDefs,
	resolvers,
	context:authorize,
	plugins:[
		ApolloServerPluginLandingPageGraphQLPlayground()
	]
})

server.listen(PORT,console.log(`app running at Port ${PORT}`))
