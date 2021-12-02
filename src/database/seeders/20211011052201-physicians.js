'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'Physicians',
			[
				{
					name: 'José Chingulo',
					email: 'chingulo@gmail.com',
					password: '123',
				},
				{
					name: 'Domingos Cardoso',
					email: 'cardoso@gmail.com',
					password: '456',
				},
				{
					name: 'Antonio Emanuel',
					email: 'emanuel.gmail.com',
					password: '432',
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Physicians', null, {});
	},
};
