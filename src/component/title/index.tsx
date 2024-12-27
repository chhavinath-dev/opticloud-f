import React from 'react'

export default function PageTitle({ title}:{title:string}) {
  return <div className={`font-museo700 text-[1.8rem]`}>
		{title}
	</div>
}
