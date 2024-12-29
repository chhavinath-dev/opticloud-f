export interface SignUpTypes {
	fname: string,
	lname: string,
	email: string,
	password: string,
	confirm_password: string,
	organisaion: string,
};

export interface LoginTypes {
	email: string,
	password: string,
};
export interface ResetPasswordTypes {
	password: string,
	confirm_password: string
}
export interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	id: string;
	error?: string;
}
export const SignUpInitialValues: SignUpTypes = {
	fname: '',
	lname: '',
	email: '',
	password: '',
	confirm_password: '',
	organisaion: '',
};

export const LoginInitialValues: LoginTypes = {
	email: '',
	password: ''
};
export const ResetPasswordInitialValues: ResetPasswordTypes={
	password:'',
	confirm_password:''
}



