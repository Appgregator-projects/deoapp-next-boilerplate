import HeaderOnlyLayout from '@/layouts/HeaderOnlyLayout'
import React from 'react'

function ProductLayout({children}) {
  return (
	<HeaderOnlyLayout>
		{children}
	</HeaderOnlyLayout>
  )
}

export default ProductLayout