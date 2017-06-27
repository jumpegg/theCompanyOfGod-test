import { likeVo } from '../vo/like.vo';
import * as Hapi from 'hapi';

export const likeRoute = function(server:Hapi.Server){
	server.route({
		method: 'GET',
		path: '/like',
		handler: (req:any, res:any) =>{
			res('server is running');
		}
	})
}