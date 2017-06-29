import { postVo } from '../vo/post.vo';
import * as Hapi from 'hapi';
import * as Joi from 'joi';
import { commonRoute } from './common.route';

export const postRoute = function(server:Hapi.Server){
	
	commonRoute(postVo, server);

	server.route({
		method: 'POST',
		path: '/api/post',
		config:{
			tags: ['api', 'post'],
			description: 'Create post',
			notes: 'post를 생성한다.',
			validate: {
				payload:{
					user_id : Joi.string().required(),
					content : Joi.string(),
					img : Joi.string(),
					tag : Joi.string()
				}
			}
		},
		handler: (req:any, res:any) =>{
			postVo.create({
				user_id: req.payload.user_id,
				content: req.payload.content,
				img: req.payload.img,
				tag: req.payload.tag
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
		path: '/api/post/{id}',
		config:{
			tags: ['api', 'post'],
			description: 'Update post',
			notes: 'post정보를 수정한다.',
			validate: {
				params:{
					id : Joi.string().required()
				},
				payload:{
					user_id : Joi.string().required(),
					content : Joi.string(),
					img : Joi.string(),
					tag : Joi.string()
				}
			}
		},
		handler: (req:any, res:any) =>{
			postVo.update({
				user_id: req.payload.user_id,
				content: req.payload.content,
				img: req.payload.img,
				tag: req.payload.tag
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