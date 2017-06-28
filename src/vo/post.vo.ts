import {sequelize} from '../dbconn';
import * as Sequelize from 'sequelize';

export const postVo = sequelize.define('post',{
	id:{
		type: Sequelize.INTEGER(11),
		primaryKey: true,
		allowNull: false
	},
	user_id:{
		type: Sequelize.STRING(200),
		primaryKey: true,
		allowNull: false
	},
	content:{
		type: Sequelize.TEXT,
		allowNull: true
	},
	img:{
		type: Sequelize.STRING(500),
		allowNull: true
	},
	tag:{
		type: Sequelize.STRING(500),
		allowNull: true
	},
	is_del:{
		type: Sequelize.INTEGER(1),
		allowNull: true
	}
})