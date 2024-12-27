import React from 'react'
import logo from '../../../utils/logo.png'
import PageTitle from '../../../component/title'
import { useFormik, FormikProps } from 'formik'
import CustomButton from '../../../component/button';
import { LoginInitialValues, LoginTypes, FormFieldProps } from '../../../utils/types/formValues';
import { Link } from 'react-router-dom';
const GetField: React.FC<FormFieldProps & { formik: FormikProps<LoginTypes> }> = ({ label, id, formik, error, ...props }) => (
	<div className='w-full'>
		<label htmlFor={id}>{label}</label>
		<div className='w-full border border-black p-1 my-1 rounded-md'>
			<input id={id} name={id} {...props} />
		</div>
		{formik.touched[id as keyof LoginTypes] && formik.errors[id as keyof LoginTypes] ? <div className='text-red-500 text-[0.8rem]'>{formik.errors[id as keyof LoginTypes]}</div> : null}
	</div>
);

export default function LogIn() {
	const formik = useFormik({
		initialValues: LoginInitialValues,
		validate: (values: LoginTypes) => {
			let errors: LoginTypes = { email: '', password: '' };
			if (!values.email) {
				errors.email = 'Required*';
			} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
				errors.email = 'Invalid email address';
			}
			if (!values.password) {
				errors.password = 'Required*';
			}

			return errors;
		},
		onSubmit: (values: LoginTypes) => {
			console.log("form values", formik.values, values);
		}
	});
	const fields: FormFieldProps[] = [
		{ label: 'E-mail', id: 'email', type: 'email' },
		{ label: 'Password', id: 'password', type: 'password' },
	];
	return (
		<div className='w-screen h-screen flex box-border'>
			<div className='w-1/2 h-full bg-gray-100'>
				<img src={logo} className='w-full h-full'></img>
			</div>
			<div className='w-1/2 h-full'>
				<div className='p-5'>
					<PageTitle title='Log in to OptiCloud' />
					<p className='text-[0.9rem]'>Don’t have an account?
						<Link to="/signup" className='mx-1 text-blue-600 underline'>create account</Link>
					</p>
				</div>
				<form onSubmit={formik.handleSubmit}>
					<div className='flex flex-col items-start p-5 justify-center h-full gap-3'>
						{fields.map((field) => (
							<GetField
								key={field.id}
								{...field}
								formik={formik}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								className='w-11/12 outline-none'
								value={formik.values[field.id as keyof LoginTypes]}
							/>
						))}
						<button type='submit' className='py-2 px-5 bg-black text-white rounded-md'>Continue</button>
						<p className='text-[0.9rem]'>Forgot Password?
						<Link to="/forgot-password" className='mx-1 text-blue-600 underline'>Reset Password</Link>
					</p>
					</div>
				</form>
				
			</div>
		</div>
	)
}
