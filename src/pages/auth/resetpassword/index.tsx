import React from 'react'
import logo from '../../../utils/logo.png'
import PageTitle from '../../../component/title'
import { useFormik, FormikProps } from 'formik'
import CustomButton from '../../../component/button';
import { ResetPasswordInitialValues, ResetPasswordTypes, FormFieldProps } from '../../../utils/types/formValues';

const GetField: React.FC<FormFieldProps & { formik: FormikProps<ResetPasswordTypes> }> = ({ label, id, formik, error, ...props }) => (
	<div className='w-full'>
		<label htmlFor={id}>{label}</label>
		<div className='w-full border border-black p-1 my-1 rounded-md'>
			<input id={id} name={id} {...props} />
		</div>
		{formik.touched[id as keyof ResetPasswordTypes] && formik.errors[id as keyof ResetPasswordTypes] ? <div className='text-red-500 text-[0.8rem]'>{formik.errors[id as keyof ResetPasswordTypes]}</div> : null}
	</div>
);

export default function ResetPassword() {
	const formik = useFormik({
		initialValues: ResetPasswordInitialValues,
		validate: (values: ResetPasswordTypes) => {
			let errors: any = {};
			// if (!values.email) {
			// 	errors.email = 'Required*';
			// } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
			// 	errors.email = 'Invalid email address';
			// }
			// if (!values.password) {
			// 	errors.password = 'Required*';
			// }

			return errors;
		},
		onSubmit: (values:  ResetPasswordTypes) => {
			
			console.log("hi")
		}
	});
	const fields: FormFieldProps[] = [
		{ label: 'Password', id: 'password', type: 'password' },
		{ label: 'Confirm Password', id: 'confirm_password', type: 'password' },
	];
	return (
		<div className='w-screen h-screen flex box-border'>
			<div className='w-1/2 h-full bg-gray-100'>
				<img src={logo} alt='' className='w-full h-full'></img>
			</div>
			<div className='w-1/2 h-full'>
				<div className='p-5'>
					<PageTitle title='Reset Password' />
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
								value={formik.values[field.id as keyof ResetPasswordTypes]}
							/>
						))}
						<button type="submit" className='py-2 px-5 bg-black text-white rounded-md'>Reset</button>
					</div>
				</form>
				
			</div>
		</div>
	)
}
