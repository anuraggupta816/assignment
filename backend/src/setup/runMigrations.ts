import { execSync } from 'child_process';

export async function runMigrationsIfDev(): Promise<void> {
	if ((process.env.NODE_ENV || 'development') !== 'development') return;
	try {
		// Use sequelize-cli configured by .sequelizerc
		execSync('npx sequelize-cli db:migrate', { stdio: 'inherit' });
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error('Failed to run migrations:', error);
		throw error;
	}
} 