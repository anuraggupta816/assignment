"use strict";
const tableName = "users";
const { QueryTypes } = require("sequelize");
const bcrypt = require("bcrypt");
console.log("saveData111");
module.exports = {
  up: async (queryInterface) => {
    try {
      const saveData = [
        {
          data: [
            {
              id: 4,
              user_id: 2,
              investment_id: 4,
              type: "sell",
              quantity: 5.0,
              price: 110.75,
            },
            {
              id: 16,
              user_id: 2,
              investment_id: 2,
              type: "sell",
              quantity: 1.0,
              price: 1.0,
            },
          ],
          tableName: "transactions",
        },
        {
          data: [
            {
              id: 2,
              user_id: 2,
              name: "tata motors",
              asset_type: "stock",
              purchase_price: 1200.0,
              current_value: 1450.5,
              created_at: new Date(),
              updated_at: new Date(),
            },
            {
              id: 3,
              user_id: 2,
              name: "ACME Corp",
              asset_type: "stock",
              purchase_price: 1200.0,
              current_value: 1450.5,
              created_at: new Date(),
              updated_at: new Date(),
            },
            {
              id: 4,
              user_id: 2,
              name: "ACME Corp",
              asset_type: "stock",
              purchase_price: 1200.0,
              current_value: 1450.55,
              created_at: new Date(),
              updated_at: new Date(),
            },
          ],
          tableName: "investments",
        },
        {
          data: [
            {
              //id: 2,
              name: "anurag",
              email: "anurag1234@yopmail.com",
              password_hash: "Admin@123", //bcrypt.hash("Admin@123", 10),
              created_at: new Date(),
              updated_at: new Date(),
            },
          ],
          tableName: "users",
        },
      ];
      console.log("saveData", saveData);
      for (const element of saveData) {
        for (const item of element.data) {
          let existsQuery = "";
          let dataExists = [];

          if (element.tableName === "users") {
            existsQuery = `SELECT * FROM ${element.tableName} WHERE email = :email`;
            dataExists = await queryInterface.sequelize.query(existsQuery, {
              type: QueryTypes.SELECT,
              replacements: { email: item.email },
            });

            // Hash password before inserting
            if (dataExists.length === 0) {
              item.password_hash = await bcrypt.hash(item.password_hash, 10);
            }
          } else if (item.id) {
            existsQuery = `SELECT * FROM ${element.tableName} WHERE id = :id`;
            dataExists = await queryInterface.sequelize.query(existsQuery, {
              type: QueryTypes.SELECT,
              replacements: { id: item.id },
            });
          }

          if (dataExists.length === 0) {
            await queryInterface.bulkInsert(element.tableName, [item]);
          }
        }
      }
    } catch (error) {
      console.log("Error inserting users:", error);
      throw error;
    }
  },

  down: async (queryInterface) => {
    // Delete users by email
    const emails = ["anurag@yopmail.com", "anurag1@yopmail.com"];
    await queryInterface.bulkDelete(tableName, { email: emails });
  },
};
