import { commentVo } from '../vo/comment.vo';
import * as Hapi from 'hapi';
import * as Joi from 'joi';
import { commonRoute } from './common.route';

export const commentRoute = function(server:Hapi.Server){

	commonRoute(commentVo, server);

	server.route({
		method: 'POST',
		path: '/api/comment',
		config:{
			tags: ['api', 'comment'],
			description: 'Create comment',
			notes: 'comment를 생성한다.',
			validate: {
				payload:{
					user_id : Joi.string().required(),
					post_id : Joi.number().integer().required(),
					comment : Joi.string()
				}
			}
		},
		handler: (req:any, res:any) =>{
			commentVo.create({
				user_id: req.payload.user_id,
				post_id: req.payload.post_id,
				comment: req.payload.comment
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
		path: '/api/comment/{id}',
		config:{
			tags: ['api', 'comment'],
			description: 'Update comment',
			notes: 'comment정보를 수정한다.',
			validate: {
				params:{
					id : Joi.string().required()
				},
				payload:{
					user_id : Joi.string().required(),
					post_id : Joi.number().integer().required(),
					comment : Joi.string()
				}
			}
		},
		handler: (req:any, res:any) =>{
			commentVo.update({
				user_id: req.payload.user_id,
				post_id: req.payload.post_id,
				comment: req.payload.comment
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