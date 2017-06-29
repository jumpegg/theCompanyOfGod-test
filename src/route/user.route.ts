import { userVo } from '../vo/user.vo';
import * as Hapi from 'hapi';
import * as Joi from 'joi';
import { commonRoute } from './common.route';

export const userRoute = function(server:Hapi.Server){

	commonRoute(userVo, server);

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

}