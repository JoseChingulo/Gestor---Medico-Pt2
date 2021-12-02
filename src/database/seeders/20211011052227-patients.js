'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'Patients',
			[
				{
					name: 'Martinho Gilson',
					email: 'martinho.m@gmail.com',
					phone: '998954602',
				},
				{
					name: 'Francisca Nadia',
					email: 'fran.nadia@hotmail.com',
					phone: '999995656',
				},
				{
					name: 'Galvino Kaleison',
					email: 'galivino.ka@gmail.com',
					phone: '999996569',
				},
				{
					name: 'Teresa Cardoso',
					email: 'tcardoso@hotmail.com',
					phone: '988996700',
				},
				{
					name: 'Andre Magalhães',
					email: 'andre.01@gmail.com',
					phone: '99346789',
				},
				{
					name: 'Monica Gale',
					email: 'gale.mon@outlook.com',
					phone: '987336789',
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Patients', null, {});
	},
};
