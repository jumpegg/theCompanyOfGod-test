import {sequelize} from '../dbconn';
import * as Sequelize from 'sequelize';

export const userVo = sequelize.define('user',{
	id:{
		type: Sequelize.STRING(200),
		primaryKey: true,
		allowNull: false
	},
	name:{
		type: Sequelize.STRING(200),
		allowNull: false
	},
	nickname:{
		type: Sequelize.STRING(200),
		allowNull: false
	},
	avatar:{
		type: Sequelize.STRING(500),
		allowNull: true
	},
	is_del:{
		type: Sequelize.INTEGER(1),
		allowNull: true
	}
})