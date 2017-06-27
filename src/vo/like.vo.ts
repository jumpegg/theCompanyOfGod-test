import {sequelize} from '../dbconn';
import * as Sequelize from 'sequelize';

export const likeVo = sequelize.define('like',{
	user_id:{
		type: Sequelize.STRING(200),
		primaryKey: true,
		allowNull: false
	},
	post_id:{
		type: Sequelize.INTEGER(11),
		primaryKey: true,
		allowNull: false
	}
})