import { commentVo } from '../vo/comment.vo';
import * as Hapi from 'hapi';

export const commentRoute = function(server:Hapi.Server){
	server.route({
		method: 'GET',
		path: '/comment',
		handler: (req:any, res:any) =>{
			res('server is running');
		}
	})
}