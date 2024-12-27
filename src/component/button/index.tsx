import React from 'react'
import { ButtonProps } from '../../utils/types/Common'
export default function CustomButton(props:ButtonProps) {
  return <button type={props.type} className={`font-museo700 text-[1.8rem] m-5`}>
		{props.label}
	</button>
}
