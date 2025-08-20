import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export type TransactionType = 'buy' | 'sell';

export interface TransactionAttributes {
	id: number;
	user_id: number;
	investment_id: number;
	type: TransactionType;
	quantity: number;
	price: number;
	created_at?: Date;
	updated_at?: Date;
}

export interface TransactionCreationAttributes extends Optional<TransactionAttributes, 'id'> {}

export class Transaction extends Model<TransactionAttributes, TransactionCreationAttributes> implements TransactionAttributes {
	public id!: number;
	public user_id!: number;
	public investment_id!: number;
	public type!: TransactionType;
	public quantity!: number;
	public price!: number;
	public readonly created_at!: Date;
	public readonly updated_at!: Date;
}

export function initTransactionModel(sequelize: Sequelize) {
	Transaction.init(
		{
			id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
			user_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
			investment_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
			type: { type: DataTypes.ENUM('buy', 'sell'), allowNull: false },
			quantity: { type: DataTypes.DECIMAL(15, 4), allowNull: false },
			price: { type: DataTypes.DECIMAL(15, 2), allowNull: false },
			created_at: DataTypes.DATE,
			updated_at: DataTypes.DATE
		},
		{ sequelize, tableName: 'transactions', underscored: true }
	);
} 