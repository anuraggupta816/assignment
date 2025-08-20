import { DataTypes, Model, Sequelize, Optional } from 'sequelize';
import bcrypt from 'bcrypt';

export interface UserAttributes {
	id: number;
	name: string;
	email: string;
	password_hash: string;
	created_at?: Date;
	updated_at?: Date;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'password_hash'> {
	password?: string;
}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
	public id!: number;
	public name!: string;
	public email!: string;
	public password_hash!: string;
	public readonly created_at!: Date;
	public readonly updated_at!: Date;

	public async checkPassword(password: string): Promise<boolean> {
		return bcrypt.compare(password, this.password_hash);
	}
}

export function initUserModel(sequelize: Sequelize) {
	User.init(
		{
			id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
			name: { type: DataTypes.STRING(120), allowNull: false },
			email: { type: DataTypes.STRING(180), allowNull: false, unique: true },
			password_hash: { type: DataTypes.STRING(200), allowNull: false },
			created_at: DataTypes.DATE,
			updated_at: DataTypes.DATE
		},
		{
			sequelize,
			tableName: 'users',
			underscored: true
		}
	);
} 