import MicroFullLayout from '@/layouts/MicroFullLayout'
import MicroHeaderOnlyLayout from '@/layouts/MicroHeaderOnlyLayout'
import React from 'react'

function CourseLayout({children}) {
  return (
	<MicroHeaderOnlyLayout>
		{children}
	</MicroHeaderOnlyLayout>
  )
}

export default CourseLayout