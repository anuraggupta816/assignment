'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const tableExists = async (name) => {
			const [rows] = await queryInterface.sequelize.query(
				"SELECT COUNT(*) AS cnt FROM information_schema.tables WHERE table_schema = DATABASE() AND table_name = ?",
				{ replacements: [name] }
			);
			const first = Array.isArray(rows) ? rows[0] : rows;
			return Number(first.cnt || first.CNT || 0) > 0;
		};

		if (!(await tableExists('users'))) {
			await queryInterface.createTable('users', {
				id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
				name: { type: Sequelize.STRING(120), allowNull: false },
				email: { type: Sequelize.STRING(180), allowNull: false, unique: true },
				password_hash: { type: Sequelize.STRING(200), allowNull: false },
				created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
				updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
			});
		}

		if (!(await tableExists('investments'))) {
			await queryInterface.createTable('investments', {
				id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
				user_id: {
					type: Sequelize.INTEGER.UNSIGNED,
					allowNull: false,
					references: { model: 'users', key: 'id' },
					onDelete: 'CASCADE',
					onUpdate: 'CASCADE'
				},
				name: { type: Sequelize.STRING(150), allowNull: false },
				asset_type: { type: Sequelize.ENUM('stock', 'bond', 'mutual_fund'), allowNull: false },
				purchase_price: { type: Sequelize.DECIMAL(15, 2), allowNull: false },
				current_value: { type: Sequelize.DECIMAL(15, 2), allowNull: false },
				created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
				updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
			});
		}

		if (!(await tableExists('transactions'))) {
			await queryInterface.createTable('transactions', {
				id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
				user_id: {
					type: Sequelize.INTEGER.UNSIGNED,
					allowNull: false,
					references: { model: 'users', key: 'id' },
					onDelete: 'CASCADE',
					onUpdate: 'CASCADE'
				},
				investment_id: {
					type: Sequelize.INTEGER.UNSIGNED,
					allowNull: false,
					references: { model: 'investments', key: 'id' },
					onDelete: 'CASCADE',
					onUpdate: 'CASCADE'
				},
				type: { type: Sequelize.ENUM('buy', 'sell'), allowNull: false },
				quantity: { type: Sequelize.DECIMAL(15, 4), allowNull: false },
				price: { type: Sequelize.DECIMAL(15, 2), allowNull: false },
				created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
				updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
			});
		}
	},

	async down(queryInterface, Sequelize) {
		const tableExists = async (name) => {
			const [rows] = await queryInterface.sequelize.query(
				"SELECT COUNT(*) AS cnt FROM information_schema.tables WHERE table_schema = DATABASE() AND table_name = ?",
				{ replacements: [name] }
			);
			const first = Array.isArray(rows) ? rows[0] : rows;
			return Number(first.cnt || first.CNT || 0) > 0;
		};

		if (await tableExists('transactions')) {
			await queryInterface.dropTable('transactions');
		}
		if (await tableExists('investments')) {
			await queryInterface.dropTable('investments');
		}
		if (await tableExists('users')) {
			await queryInterface.dropTable('users');
		}
	}
}; 