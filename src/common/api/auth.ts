import HttpClient from '../helpers/httpClient';

function AuthService() {
	return {
		login: (values: any) => {
			return HttpClient.post('/login/', values);
		},
		logout() {
			return HttpClient.post('/logout/', {});
		},
		forgetPassword: (values: any) => {
			return HttpClient.post('/forget-password/', values);
		},
	};
}

export default AuthService();
