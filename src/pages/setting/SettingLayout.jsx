import HeaderOnlyLayout from '@/layouts/HeaderOnlyLayout'
import MicroFullLayout from '@/layouts/MicroFullLayout'
import React from 'react'

function SettingLayout({children}) {
  return (
	<MicroFullLayout>
		{children}
	</MicroFullLayout>
  )
}

export default SettingLayout