'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const hash = await bcrypt.hash('password123', 10);
		await queryInterface.bulkInsert('users', [
			{
				name: 'Demo User',
				email: 'demo@example.com',
				password_hash: hash,
				created_at: new Date(),
				updated_at: new Date()
			}
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('users', { email: 'demo@example.com' }, {});
	}
}; 