import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

type User = {
	id: number;
	email?: string;
	username: string;
	password: string;
	firstName: string;
	lastName: string;
	identificacion: number;
	role: string;
	turno: string;
	token: string;
};

const TOKEN =
	'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb2RlcnRoZW1lcyIsImlhdCI6MTU4NzM1NjY0OSwiZXhwIjoxOTAyODg5NDQ5LCJhdWQiOiJjb2RlcnRoZW1lcy5jb20iLCJzdWIiOiJzdXBwb3J0QGNvZGVydGhlbWVzLmNvbSIsImxhc3ROYW1lIjoiVGVzdCIsIkVtYWlsIjoic3VwcG9ydEBjb2RlcnRoZW1lcy5jb20iLCJSb2xlIjoiQWRtaW4iLCJmaXJzdE5hbWUiOiJIeXBlciJ9.P27f7JNBF-vOaJFpkn-upfEh3zSprYfyhTOYhijykdI';

const mock = new MockAdapter(axios, { onNoMatch: 'passthrough' });

export default function configureFakeBackend() {
	const users: User[] = [
		{
			id: 1,
			email: 'joseacosta@unicesar.edu.co',
			username: 'joseacosta',
			password: 'joseacosta',
			firstName: 'Jose',
			lastName: 'Acosta Serrano',
			identificacion:77010621,
			role: 'Ventanilla',
			turno:'AE',
			token: TOKEN,
		},	{
			id: 2,
			email: 'patriciabruges@unicesar.edu.co',
			username: 'Patricia',
			password: 'patriciabruges',
			firstName: 'Patricia',
			lastName: 'Bruges',
			identificacion:123456,
			role: 'Ventanilla',
			turno:'AE',
			token: TOKEN,
		},{
			id: 2,
			email: 'estudiante@unicesar.edu.co',
			username: 'Estudiante',
			password: 'estudiante',
			firstName: 'Estudiante',
			lastName: 'Estudiante',
			identificacion:123456,
			role: 'Teclado',
			turno:'EE',
			token: TOKEN,
		},	{
			id: 3,
			email: 'luisgrosado@unicesar.edu.co',
			username: 'Luis Gabriel',
			password: 'luisgrosado',
			firstName: 'Luis Gabriel',
			lastName: 'Rosado',
			identificacion:77198585,
			role: 'Ventanilla',
			turno:'CCE',
			token: TOKEN,
		},
		{
			id: 3,
			email: 'rosmarycoronel@unicesar.edu.co',
			username: 'Rosmary',
			password: 'rosmarycoronel',
			firstName: 'Rosmary',
			lastName: 'Coronel Mosquera',
			identificacion:49776124,
			role: 'Ventanilla',
			turno:'APG',
			token: TOKEN,
		},{
			id: 3,
			email: 'yelenismarquez@unicesar.edu.co',
			username: 'Yelenis',
			password: 'yelenismarquez',
			firstName: 'Yelenis',
			lastName: 'Marquez Daza',
			identificacion:49742002,
			role: 'Ventanilla',
			turno:'APG',
			token: TOKEN,
		},{
			id: 3,
			email: 'ventanilla@unicesar.edu.co',
			username: 'Ventanilla',
			password: 'ventanilla',
			firstName: 'Ventanilla',
			lastName: 'Ventanilla',
			identificacion:1234567,
			role: 'Ventanilla',
			turno:'APG',
			token: TOKEN,
		},
	];

	mock.onPost('/login/').reply(function (config) {
		console.info('login');
		return new Promise(function (resolve, reject) {
			setTimeout(function () {
				// get parameters from post request
				let params = JSON.parse(config.data);

				// find if any user matches login credentials
				let filteredUsers = users.filter((user) => {
					return user.username === params.username && user.password === params.password;
				});

				if (filteredUsers.length) {
					// if login details are valid return user details and fake jwt token
					let user = filteredUsers[0];
					resolve([200, user]);
				} else {
					// else return error
					resolve([401, { message: 'Email or Password is incorrect' }]);
				}
			}, 1000);
		});
	});

	mock.onPost('/forget-password/').reply(function (config) {
		return new Promise(function (resolve, reject) {
			setTimeout(function () {
				// get parameters from post request
				let params = JSON.parse(config.data);

				// find if any user matches login credentials
				let filteredUsers = users.filter((user) => {
					return user.email === params.email;
				});

				if (filteredUsers.length) {
					// if login details are valid return user details and fake jwt token
					let responseJson = {
						message:
							"We've sent you a link to reset password to your registered email.",
					};
					resolve([200, responseJson]);
				} else {
					// else return error
					resolve([
						401,
						{
							message:
								'Sorry, we could not find any registered user with entered email',
						},
					]);
				}
			}, 1000);
		});
	});
}
