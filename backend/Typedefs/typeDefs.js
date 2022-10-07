import {gql} from 'apollo-server'

export const typeDefs = gql`
      type Query{
      	users:[User]
      	user(_id:ID!):User
      	quotes:[Quotes]
      	s_quote(by:ID!):[Quotes]
            links:[Links]
            s_link(by:ID!):[Links]
      }
      type User{
      	_id:ID!
      	firstName:String
      	lastName:String
      	email:String
      	password:String
      	quotes:[Quotes]
            links:[Links]
      }
      type Quotes{
      	by:ID
      	quote:String
      }
      type Links{
            by:ID
            link:String
      }
      type Token{
            token:String
      }
      type Mutation{
      	signUpUser(userNew:userInputs!):User
            signInUser(userSign:userSignInputs):Token
            createQuote(quote:String):String
            createLink(link:String):String
      }
      input userInputs{
      	firstName:String!
      	lastName:String!
      	email:String!
      	password:String!
      }
      input userSignInputs{
            email:String!
            password:String!
      }
`