import React, { useMemo, FC, useCallback } from 'react';

import { OTPProps } from '../../utils/types/Common';
const DIGIT_ONLY = new RegExp(/^\d+$/);
//new RegExp(/^(?:\d+|[a-zA-Z0-9]+)$/);
const OTPInput: FC<OTPProps> = ({
	value,
	valueLength,
	onChange,
	error,
	touched,
	name,
}) => {
	const valueItems = useMemo(() => {
		const valueArray = value?.split('');
		const items: Array<string> = [];

		for (let i = 0; i < valueLength; i++) {
			const char = valueArray[i];
             
			if (DIGIT_ONLY.test(char)) {
                items.push(char);
            } else {
                items.push('');
            }
		}
		return items;
	}, [value, valueLength]);

	const handleNextInput = (index: number) => {
		let findNextEle = document.getElementById(`input-${index + 1}`);
		const nextEle = findNextEle as HTMLInputElement | null;
		nextEle && nextEle.focus();
	};

	const handlePrevInput = (index: number) => {
		let findPreviousEle = document.getElementById(`input-${index - 1}`);
		const previousEle = findPreviousEle as HTMLInputElement | null;
		previousEle && previousEle.focus();
	};

	const handleOnChange = useCallback(
		(
			e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
			index: number
		) => {
			const target = e.target;
			let targetValue = target.value.trim();
			let findNextInputEle = document.getElementById(`input-${index + 1}`);
			const nextInputEl = findNextInputEle as HTMLInputElement | null;
            const isTargetValueDigit = DIGIT_ONLY.test(targetValue);
			if (!isTargetValueDigit && targetValue !== '') {
                return;
            }
            if (
                !isTargetValueDigit &&
                nextInputEl &&
                nextInputEl.value !== ''
            ) {
                return;
            }

            targetValue = isTargetValueDigit ? targetValue : ' ';
			const targetValueLength = targetValue.length;
			if (targetValueLength === 1) {
				const newValue =
					value.substring(0, index) +
					targetValue +
					value.substring(index + 1);
				onChange(newValue);
				if (!isTargetValueDigit) {
                    return;
                }
				handleNextInput(index);
			} else if (targetValueLength === valueLength) {
				onChange(targetValue);
				target.blur();
			}
		},
		[onChange, value, valueLength]
	);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const { key } = e;
		const target = e.target as HTMLInputElement;
		const index = Number(target.id.split("-")[1]);
		if (key === 'ArrowRight' || key === 'ArrowDown') {
			e.preventDefault();
			return handleNextInput(index);
		}

		if (key === 'ArrowLeft' || key === 'ArrowUp') {
			e.preventDefault();
			return handlePrevInput(index);
		}

		const targetValue = target.value;
		target.setSelectionRange(0, targetValue.length);

		if (e.key !== 'Backspace' || targetValue !== '') {
			return;
		}

		handlePrevInput(index);
	};

	return (
		<>
			<div className="flex w-full gap-8 justify-start">
				{valueItems?.map((digit, index) => (
					<div key={index} className=' w-1/12'>
						<input
							id={`input-${index}`}
							type="text"
							name={name ?? ''}
							value={digit}
							onChange={(e: any) =>
								handleOnChange(e, index)
							}
							className='border border-black p-1 rounded-md w-full'
							placeholder=""
							onKeyDown={handleKeyDown}
							autoFocus={index === 0}
						/>
					</div>
				))}

			</div>
			{touched && !!error && (
				<div>{error}</div>
			)}
		</>
	);
};

export default OTPInput;
