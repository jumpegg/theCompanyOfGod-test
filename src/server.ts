import * as Hapi from 'hapi';
import * as Path from 'path';

class Server {
	public app:any;

	constructor(){
		this.init();
		this.router();
		this.start();
	}

	private init(){
		console.log(Path.join(__dirname, 'dist/client'));
		this.app = new Hapi.Server();
		this.app.connection({
			host: 'localhost',
			port: 8000
		})
		this.app.register(require('inert'))
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