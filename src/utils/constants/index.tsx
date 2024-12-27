export enum AXIOS_METHODS {
	GET = "GET",
	POST = "POST",
	PATCH = "PATCH",
	PUT = "PUT",
	DELETE = "DELETE",
}

export const RESPONSE_TYPE = {
	failure: "Failure",
	success: "Success",
};

export const PARENT_ROUTES = {
	AUTH: "Auth",
};

export const MESSAGES = {
	error: {
		required: (field: string) => `Please enter ${field}`,
		invalid: (field: string) => `Please enter valid ${field}`,
		select: (field: string) => `Please select ${field}`,
		failedTo: (operation: string, value = "") =>
			`Failed to ${operation} ${value}`,
		invalidPassword:
			"Password must Contain at least 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character",
		matchPassword: "New Password and Confirm Password should be Same",
		samePassword: "New Password should not be same as Old Password",
		endpointError: "Something went Wrong, Please Try again after Sometime.",
		emailIdNotValid: "Login Id does not exist. Enter valid Login Id",
		otpNotValid: "Invalid OTP, Please Try Again",
	},
};





