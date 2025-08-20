import { Sequelize } from 'sequelize';
import { sequelize } from '../setup/database';
import { initUserModel, User } from './user';
import { initInvestmentModel, Investment } from './investment';
import { initTransactionModel, Transaction } from './transaction';

initUserModel(sequelize);
initInvestmentModel(sequelize);
initTransactionModel(sequelize);

User.hasMany(Investment, { foreignKey: 'user_id', as: 'investments' });
Investment.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasMany(Transaction, { foreignKey: 'user_id', as: 'transactions' });
Transaction.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Investment.hasMany(Transaction, { foreignKey: 'investment_id', as: 'transactions' });
Transaction.belongsTo(Investment, { foreignKey: 'investment_id', as: 'investment' });

export { sequelize, Sequelize, User, Investment, Transaction }; 