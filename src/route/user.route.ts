import { userVo } from '../vo/user.vo';
import * as Hapi from 'hapi';

export const userRoute = function(server:Hapi.Server){
	server.route({
		method: 'GET',
		path: '/user',
		handler: (req:any, res:any) =>{
			res('server is running');
		}
	})
}