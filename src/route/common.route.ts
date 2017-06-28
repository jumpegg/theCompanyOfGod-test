import * as Hapi from 'hapi';
import * as Joi from 'joi';
import * as Sequelize from 'sequelize';

export const commonRoute = function(vo:Sequelize.Model<any,any>, server:Hapi.Server){
	let tbl = vo.getTableName();
	let input = vo.describe();
	server.route({
		method: 'GET',
		path: `/api/${tbl}`,
		config:{
			tags: ['api', `${tbl}`],
			description: `Get all ${tbl}`,
			notes: `모든 ${tbl}의 정보를 가져온다.`
		},
		handler: (req:any, res:any) =>{
			vo.findAll({
				where: {is_del: 0}
			}).then(data=>{
				res(data);
			})
		}
	})
	server.route({
		method: 'GET',
		path: `/api/${tbl}/{id}`,
		config:{
			tags: ['api', `${tbl}`],
			description: `Get specific ${tbl}`,
			notes: `해당 id의 ${tbl}을 검색한다.`,
			validate: {
				params:{
					id : Joi.string().required()
				}
			}
		},
		handler: (req:any, res:any) =>{
			vo.findOne({
				where: {id: req.params.id}
			}).then(data=>{
				res(data);
			})
		}
	})
	server.route({
		method: 'POST',
		path: `/api/${tbl}`,
		config:{
			tags: ['api', `${tbl}`],
			description: `Create ${tbl}`,
			notes: `${tbl}를 생성한다.`,
			validate: {
				payload:{
					id : Joi.string().required(),
					name : Joi.string().required(),
					nickname : Joi.string().required()
				}
			}
		},
		handler: (req:any, res:any) =>{
			vo.create({
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
		path: `/api/${tbl}/{id}`,
		config:{
			tags: ['api', `${tbl}`],
			description: `Update ${tbl}`,
			notes: `${tbl}정보를 수정한다.`,
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
			vo.update({
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
		path: `/api/${tbl}/{id}`,
		config:{
			tags: ['api', `${tbl}`],
			description: `Delete ${tbl}`,
			notes: `해당 ${tbl}를 삭제한다.`,
			validate: {
				params:{
					id : Joi.string().required()
				}
			}
		},
		handler: (req:any, res:any) =>{
			vo.update({
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