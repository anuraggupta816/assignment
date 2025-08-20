import { Sequelize } from 'sequelize';
import 'dotenv/config';

const database = process.env.DB_NAME || 'portfolio_db';
const username = process.env.DB_USER || 'root';
const password = process.env.DB_PASSWORD || '';
const host = process.env.DB_HOST || '127.0.0.1';
const port = process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306;

export const sequelize = new Sequelize(database, username, password, {
	host,
	port,
	dialect: 'mysql',
	logging: false,
	define: { underscored: true, freezeTableName: false }
});

export async function connectDatabase(): Promise<void> {
	await sequelize.authenticate();
} 