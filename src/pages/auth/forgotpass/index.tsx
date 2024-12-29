import React, { useCallback, useState } from 'react'
import logo from '../../../utils/logo.png'
import PageTitle from '../../../component/title'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom';
import OTPInput from '../../../component/OtpInput';
export default function ForgetPassword() {
	const [otpShow, setOtpShow] = useState<boolean>(false);
	const formik = useFormik({
		initialValues: {
			email: '',
			otp:''
		},
		onSubmit: (values: { email: string, otp: string}) => {
			if (!otpShow) {
				setOtpShow(true);
			} else {
				
			}

			console.log("form values", formik.values, values);
		},
		validate: (values: { email: string, otp: string}) => {
			let errors: any = {};
			if (!values.email) {
				errors.email = 'Required*';
			} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
				errors.email = 'Invalid email address';
			}

			return errors;
		}
	});
	const onChange = useCallback(
        (value: string) => {
            formik.setFieldValue('otp', value);
        },
        [formik.setFieldValue]
    );
	return (
		<div className='w-screen h-screen flex box-border'>
			<div className='w-1/2 h-full bg-gray-100'>
				<img src={logo} alt='' className='w-full h-full'></img>
			</div>
			<div className='w-1/2 h-full'>
				<div className='p-5'>
					<PageTitle title='Log in to OptiCloud' />
				</div>
				<form onSubmit={formik.handleSubmit}>
					<div className='flex flex-col items-start p-5 justify-center h-full gap-3'>
						<div className='w-full'>
							<label htmlFor="email">E-mail</label>
							<div className='w-full border border-black p-1 my-1 rounded-md'>
								<input id="email" name="email" type='email' className='w-11/12 outline-none' onChange={formik.handleChange} value={formik.values.email} />
							</div>
							{formik.touched.email && formik.errors.email ? <div className='text-red-500 text-[0.8rem]'>{formik.errors.email}</div> : null}
						</div>
						{ otpShow && <OTPInput name="otp" value={formik.values.otp} valueLength={6} onChange={onChange} error={formik.errors.otp} touched={formik.touched.otp} />}
						<button type='submit' className='py-2 px-5 bg-black text-white rounded-md'>{otpShow?"Verify OTP":"Send OTP"}</button>
					</div>
				</form>

			</div>
		</div>
	)
}
