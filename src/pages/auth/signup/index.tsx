import React from 'react'
import logo from '../../../utils/logo.png'
import PageTitle from '../../../component/title'
import { useFormik, FormikProps } from 'formik'
import CustomButton from '../../../component/button';
import { FormFieldProps, SignUpInitialValues, SignUpTypes } from '../../../utils/types/formValues';
import { Link } from 'react-router-dom';
const GetField: React.FC<FormFieldProps & { formik: FormikProps<SignUpTypes> }> = ({ label, id, formik, error, ...props }) => (
	<div className='w-full'>
		<label htmlFor={id}>{label}</label>
		<div className='w-full border border-black p-1 my-1 rounded-md'>
			<input id={id} name={id} {...props} />
		</div>
		{formik.touched[id as keyof SignUpTypes] && formik.errors[id as keyof SignUpTypes] ? <div className='text-red-500 text-[0.8rem]'>{formik.errors[id as keyof SignUpTypes]}</div> : null}
	</div>
);
export default function SignUp() {
	const formik = useFormik({
		initialValues: SignUpInitialValues,
		validate: (values: SignUpTypes) => {
			let errors: SignUpTypes = { fname: '', lname: '', email: '', password: '', confirm_password: '', organisaion: '' };
			if (!values.fname) {
				errors.fname = 'Required*';
			}
			if (!values.lname) {
				errors.lname = 'Required*';
			}
			if (!values.email) {
				errors.email = 'Required*';
			} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
				errors.email = 'Invalid email address';
			}
			if (!values.password) {
				errors.password = 'Required*';
			}else if(formik.touched.confirm_password && values.confirm_password!=values.password){
				errors.password = 'Password must be same';
			}
			if (!values.confirm_password) {
				errors.confirm_password = "Required*";
			}else if(formik.touched.password && values.confirm_password!=values.password){
				errors.confirm_password = 'Password must be same';
			}
			if (!values.organisaion) {
				errors.organisaion = "Required*";
			}
			return errors;
		},
		onSubmit: (values: SignUpTypes) => {
			console.log("form values", formik.values, values);

		}
	});
	const fields: FormFieldProps[] = [
		{ label: 'First Name', id: 'fname', type: 'text' },
		{ label: 'Last Name', id: 'lname', type: 'text' },
		{ label: 'E-mail', id: 'email', type: 'email' },
		{ label: 'Password', id: 'password', type: 'password' },
		{ label: 'Confirm Password', id: 'confirm_password', type: 'password' },
		{ label: 'Organisaion/Company', id: 'organisaion', type: 'text' },
	];
	return (
		<div className='w-screen h-screen flex box-border'>
			<div className='w-1/2 h-full'>
				<div className='p-5'>
					<PageTitle title='Log in to OptiCloud' />
					<p className='text-[0.9rem]'>Already have an account?
						<Link to="/" className='mx-1 text-blue-600 underline'>Log in</Link>
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
								value={formik.values[field.id as keyof SignUpTypes]}
							/>
						))}
						<div className='w-full flex justify-end'>
							<button type='submit' className='py-2 px-5 bg-black text-white rounded-md'>Create Account</button>
						</div>
					</div>
				</form>
			</div>
			<div className='w-1/2 h-full bg-gray-100'>
				<img src={logo} className='w-full h-full'></img>
			</div>
		</div>
	)
}
