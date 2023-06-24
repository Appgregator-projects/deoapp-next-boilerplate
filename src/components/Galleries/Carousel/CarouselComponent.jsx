import { Gallery } from './Gallery'

export const CarouselComponent = (props) => {
	let images = []
	// console.log(props)
	if (!props.images)
		images = [
			{
				id: '01',
				image: 'https://images.unsplash.com/photo-1602024242516-fbc9d4fda4b6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
				alt: 'Awesome watch',
			},
			{
				id: '02',
				image: 'https://images.unsplash.com/photo-1451290337906-ac938fc89bce?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1777&q=80',
				alt: 'Awesome watch',
			},
			{
				id: '03',
				image: 'https://images.unsplash.com/photo-1568010434570-74e9ba7126bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
				alt: 'Awesome watch',
			},

		]
	else
		images = props.images

	// console.log(images)

	return (
		<Gallery images={images}  aspectRatio={props.aspectRatio}/>
	)
}