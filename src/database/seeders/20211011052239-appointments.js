'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'Appointments',
			[
				{
					physicianId: 1,
					patientId: 1,
					appointmentDate: '2021-12-05',
					description: 'Exame Físico',
				},
				{
					physicianId: 1,
					patientId: 4,
					appointmentDate: '2021-12-10',
					description: 'Exame Físico',
				},
				{
					physicianId: 2,
					patientId: 2,
					appointmentDate: '2021-12-07',
					description: 'Exame Físico',
				},
				{
					physicianId: 2,
					patientId: 3,
					appointmentDate: '2021-12-15',
					description: 'Exame Físico',
				},
				{
					physicianId: 3,
					patientId: 5,
					appointmentDate: '2021-12-12',
					description: 'Exame Físico',
				},
				{
					physicianId: 3,
					patientId: 6,
					appointmentDate: '2021-12-20',
					description: 'Exame Físico',
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Appointments', null, {});
	},
};
