// import {sequelize} from '../dbconn';
// import * as Sequelize from 'sequelize';
import { postVo } from '../vo/post.vo';
import * as Hapi from 'hapi';

export const postRoute = function(server:Hapi.Server){
	server.route({
		method: 'GET',
		path: '/post/',
		handler: (req:any, res:any) =>{
			res('server is running');
		}
	})
}