import { Form, PasswordInput, TextInput } from '@/components';
import { Button, Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import {  Navigate } from 'react-router-dom';
import AccountWrapper from '../AccountWrapper';
import useLogin, { LoginFormFields, loginFormSchema } from './useLogin';

const BottomLink = () => {

	return (
		<Row className="mt-3">
			<Col className="text-center">
				<p className="text-muted">
				 {''}
				</p>
			</Col>
		</Row>
	);
};

export default function Login() {
	const { t } = useTranslation();

	const { loading, login, redirectUrl, isAuthenticated } = useLogin();

	return (
		<>
			{isAuthenticated && <Navigate to={redirectUrl} replace />}


			<AccountWrapper bottomLinks={<BottomLink />}>
				<div className="text-center w-75 m-auto">
					<h4 className="text-dark-50 text-center mt-0 fw-bold">{t('Sign In')}</h4>
					<p className="text-muted mb-4">
						{t('Enter your username and password to access admin panel.')}
					</p>
				</div>

				<Form<LoginFormFields>
					onSubmit={login}
					schema={loginFormSchema}
					defaultValues={{ login: 'Teclado', password: 'teclado' }}
				>
					<Row>
						<Col>
							<TextInput
								name="username"
								label={t('Login')}
								type="text"
								placeholder={t('Enter your login')}
								containerClass="mb-3"
							/>
						</Col>
					</Row>
					<PasswordInput
						label={t('Password')}
						name="password"
						placeholder={t('Enter your password')}
						containerClass="mb-3"
					>

					</PasswordInput>

					{/* <CheckInput
            name="rememberme"
            type="checkbox"
            label="Remember me"
            containerClass="mb-3"
            defaultChecked
          /> */}

					<div className="mb-3 text-center">
						<Button variant="primary" type="submit" disabled={loading}>
							{t('Log In')}
						</Button>
					</div>
				</Form>
			</AccountWrapper>
		</>
	);
}
