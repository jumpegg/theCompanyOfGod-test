import { likeVo } from '../vo/like.vo';
import * as Hapi from 'hapi';
import * as Joi from 'joi';
import { commonRoute } from './common.route';

export const likeRoute = function(server:Hapi.Server){
	server.route({
		method: 'POST',
		path: '/api/like',
		config:{
			tags: ['api', 'like'],
			description: 'Create like',
			notes: 'like를 생성한다.',
			validate: {
				payload:{
					user_id : Joi.string().required(),
					post_id : Joi.number().integer().required()
				}
			}
		},
		handler: (req:any, res:any) =>{
			likeVo.create({
				user_id: req.payload.user_id,
				post_id: req.payload.post_id
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
		path: '/api/like/{id}',
		config:{
			tags: ['api', 'like'],
			description: 'Delete like',
			notes: '해당 like를 삭제한다.',
			validate: {
				params:{
					user_id : Joi.string().required(),
					post_id : Joi.number().integer().required()
				}
			}
		},
		handler: (req:any, res:any) =>{
			likeVo.destroy({
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