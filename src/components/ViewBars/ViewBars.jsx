import React from 'react'
import { FiColumns, FiList } from 'react-icons/fi'

function ViewBars(props) {
	if (props.layout === 'single')
		return <FiColumns onClick={() => props.setLayout('grid')} />
	else
		return <FiList onClick={() => props.setLayout('single')} />
}

export default ViewBars