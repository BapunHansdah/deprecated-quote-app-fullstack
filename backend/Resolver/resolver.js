import {users,quotes} from '../db.js'
import '../models/userSchema.js'
import '../models/quoteSchema.js'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
const User = mongoose.model("Users")
const Quote = mongoose.model("Quotes")
import dotenv from 'dotenv'
dotenv.config()
console.log(process.env.JWT_SECRET)

export const resolvers = {
	Query:{
		users:async ()=>await User.find({}) ,
		user:async (_,{_id})=>await User.findOne({_id}),
		quotes:async ()=>await Quote.find({}).populate("by","_id firstName"),
		s_quote:async (_,{by})=>await Quote.find({by}),
	},
	User:{
            quotes:async (ur)=>await Quote.find({by:ur._id})
	},

	Mutation:{
		signUpUser:async (_,{userNew})=>{

			const user = await User.findOne({email:userNew.email})
			if(user){
				throw new Error("user already exist")
			}
			const hashedPassword = await bcrypt.hash(userNew.password,12)
			console.log(hashedPassword)
			const newUser = new User({
				...userNew,
				password:hashedPassword
			})
			return await newUser.save()
		},
		signInUser:async (_,{userSign})=>{
			const user =await User.findOne({email:userSign.email})
			if(!user){
				throw new Error("user does not exist exits with this mail")
			}
			const domatch = await bcrypt.compare(userSign.password,user.password)
			if(!domatch){
				throw new Error("email or password is invalid")
			} 
			const token = jwt.sign({userId:user._id},process.env.JWT_SECRET)
			return {token}
		},
		createQuote:async (_,{quote},{userId})=>{
			if(!userId){
				throw new Error("You must be login in")
			}
			const newQuote =new Quote({
				quote,
				by:userId
			})
			await newQuote.save()
			return "Quote saved succesfully"
		}
	}
}