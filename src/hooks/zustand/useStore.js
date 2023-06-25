'use client'
import React from 'react'
import { useState, useEffect } from 'react'
function useStore(store,callback) {
	const result = store(callback)
	const [data, setData] = useState()


	useEffect(() => {
		setData(result)
	  }, [result])
	
	  return data
}

export default useStore