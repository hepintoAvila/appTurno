import { ProfileOption } from './types';


// get the profilemenu
const profileMenus: ProfileOption[] = [
	{
		label: 'Lock Screen',
		icon: 'mdi mdi-lock-outline',
		redirectTo: '/account/lock-screen',
	},
	{
		label: 'Logout',
		icon: 'mdi mdi-logout',
		redirectTo: '/account/logout',
	},
];


export { profileMenus };
