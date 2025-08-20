import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export type AssetType = 'stock' | 'bond' | 'mutual_fund';

export interface InvestmentAttributes {
	id: number;
	user_id: number;
	name: string;
	asset_type: AssetType;
	purchase_price: number;
	current_value: number;
	created_at?: Date;
	updated_at?: Date;
}

export interface InvestmentCreationAttributes extends Optional<InvestmentAttributes, 'id'> {}

export class Investment extends Model<InvestmentAttributes, InvestmentCreationAttributes> implements InvestmentAttributes {
	public id!: number;
	public user_id!: number;
	public name!: string;
	public asset_type!: AssetType;
	public purchase_price!: number;
	public current_value!: number;
	public readonly created_at!: Date;
	public readonly updated_at!: Date;
}

export function initInvestmentModel(sequelize: Sequelize) {
	Investment.init(
		{
			id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
			user_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
			name: { type: DataTypes.STRING(150), allowNull: false },
			asset_type: { type: DataTypes.ENUM('stock', 'bond', 'mutual_fund'), allowNull: false },
			purchase_price: { type: DataTypes.DECIMAL(15, 2), allowNull: false },
			current_value: { type: DataTypes.DECIMAL(15, 2), allowNull: false },
			created_at: DataTypes.DATE,
			updated_at: DataTypes.DATE
		},
		{ sequelize, tableName: 'investments', underscored: true }
	);
} 