import {sequelize} from '../dbconn';
import * as Sequelize from 'sequelize';

export const commentVo = sequelize.define('comment',{
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
	post_id:{
		type: Sequelize.INTEGER(11),
		primaryKey: true,
		allowNull: false
	},
	comment:{
		type: Sequelize.TEXT,
		allowNull: true
	},
	is_del:{
		type: Sequelize.INTEGER(1),
		allowNull: false
	}
})