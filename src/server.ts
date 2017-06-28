import * as Hapi from 'hapi';
import * as Path from 'path';
import { sequelize } from './dbconn';
import * as Sequelize from 'sequelize';
import * as inert from 'inert';
import * as vision from 'vision';
// const HapiSwagger = require("hapi-swagger");

import { 
	userRoute, 
	postRoute, 
	commentRoute,
	likeRoute 
} from './route';

const options = {
	info: {
		'title': 'Test API Documentation'
	}
}
class Server {
	public app:any;

	constructor(){
		this.init();
		this.router();
		this.start();
	}

	private init(){
		this.app = new Hapi.Server();
		this.app.connection({
			host: 'localhost',
			port: 8000
		})
		// this.app.register([inert, vision,
		// 	{
		// 		'register':require('hapi-swagger'),
		// 		'options': options
		// 	}
		// ])
		this.app.register([inert, vision, require("hapi-swagger")]);
	}

	private router(){
		this.app.route({
			method: 'GET',
			path: '/node_modules/{param*}',
			handler: {
				directory:{
					path: 'node_modules'
				}
			}
		})
		this.app.route({
			method: 'GET',
			path: '/client/{param*}',
			handler: {
				directory:{
					path: 'dist/client'
				}
			}
		})
		this.app.route({
			method: 'GET',
			path: '/',
			handler: (request:any, reply:any) => {
				reply.file('views/index.html');
			}
		})
		
		userRoute(this.app);
		postRoute(this.app);
		commentRoute(this.app);
		likeRoute(this.app);
	}

	private start(){
		this.app.start((err:any)=>{
			if(err){
				throw err;
			}
			console.log('Server running at : ', this.app.info.uri);
		})
	}
}

export const server = new Server();