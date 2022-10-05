import {users,quotes} from '../db.js'

export const resolvers = {
	Query:{
		users:()=>users,
		user:(_,{_id})=>users.find(user=>user._id == _id),
		quotes:()=>quotes,
		s_quote:(_,{by})=>quotes.filter(q=>q.by==by)
	},
	User:{
            quotes:(ur)=>quotes.filter(q => q.by == ur._id)
	},

	Mutation:{
		signUpUser(_,{userNew}){
			const _id = randomBytes(5).toString("hex")
			users.push({
				_id,
				...userNew
			})
			return users.find(user=>user._id==_id)
		}
	}
}