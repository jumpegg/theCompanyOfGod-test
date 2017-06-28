import { userVo } from '../vo/user.vo';
import * as Hapi from 'hapi';
import * as Joi from 'joi';

export const userRoute = function(server:Hapi.Server){
	
	console.log(userVo.describe().then(
		data=>{
			let vo = data;
			console.log(vo);
		}
	));
	
	server.route({
		method: 'GET',
		path: '/api/user',
		config:{
			tags: ['api', 'user'],
			description: 'Get all user',
			notes: '모든 유저의 정보를 가져온다.'
		},
		handler: (req:any, res:any) =>{
			userVo.findAll({
				where: {is_del: 0}
			}).then(data=>{
				res(data);
			})
		}
	})
	server.route({
		method: 'GET',
		path: '/api/user/{id}',
		config:{
			tags: ['api', 'user'],
			description: 'Get specific user',
			notes: '해당 id의 유저를 검색한다.',
			validate: {
				params:{
					id : Joi.string().required()
				}
			}
		},
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
		path: '/api/user',
		config:{
			tags: ['api', 'user'],
			description: 'Create User',
			notes: 'user를 생성한다.',
			validate: {
				payload:{
					id : Joi.string().required(),
					name : Joi.string().required(),
					nickname : Joi.string().required()
				}
			}
		},
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
		path: '/api/user/{id}',
		config:{
			tags: ['api', 'user'],
			description: 'Update User',
			notes: 'user정보를 수정한다.',
			validate: {
				params:{
					id : Joi.string().required()
				},
				payload:{
					id : Joi.string(),
					name : Joi.string(),
					nickname : Joi.string()
				}
			}
		},
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
		path: '/api/user/{id}',
		config:{
			tags: ['api', 'user'],
			description: 'Delete User',
			notes: '해당 User를 삭제한다.',
			validate: {
				params:{
					id : Joi.string().required()
				}
			}
		},
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