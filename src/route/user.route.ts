import { userVo } from '../vo/user.vo';
import * as Hapi from 'hapi';

export const userRoute = function(server:Hapi.Server){
	server.route({
		method: 'GET',
		path: '/user',
		handler: (req:any, res:any) =>{
			userVo.findOne({
				where: {id: req.params.id}
			}).then(data=>{
				res(data);
			})
		}
	})
	server.route({
		method: 'GET',
		path: '/user/{id}',
		handler: (req:any, res:any) =>{
			userVo.findOne({
				where: {id: req.params.id}
			}).then(data=>{
				res(data);
			})
		}
	})
	server.route({
		method: 'POST',
		path: '/user',
		handler: (req:any, res:any) =>{
			userVo.create({
				id: req.payload.id,
				name: req.payload.name,
				nickname: req.payload.nickname
			}).then(data=>{
				res({msg:"done"});
			}).catch(err=>{
				console.log(err);
				res({msg:"error"});
			})
		}
	})
	server.route({
		method: 'PUT',
		path: '/user/{id}',
		handler: (req:any, res:any) =>{
			console.log(req.body);
			userVo.update({
				id: req.payload.id,
				name: req.payload.name,
				nickname: req.payload.nickname
			},{
				where:{id : req.params.id}
			}).then(data=>{
				res({msg:"done"});
			}).catch(err=>{
				console.log(err);
				res({msg:"error"});
			})
		}
	})
	server.route({
		method: 'DELETE',
		path: '/user/{id}',
		handler: (req:any, res:any) =>{
			userVo.update({
				is_del: 1
			},{
				where:{id : req.params.id}
			}).then(()=>{
				res({msg:"done"});
			}).catch(err=>{
				console.log(err);
				res({msg:"error"})
			})
		}
	})
}