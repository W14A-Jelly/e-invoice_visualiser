import {useState, useEffect} from 'react'

const Filepage = () =>{
	const [files, setfiles] = useState([])
	
	useEffect (() =>{
		const get_files = async () =>{
			const filesfromserver = await fetchfiles()
			setfiles(filesfromserver)
		}
	get_files()

	}, [])

	const fetchfiles = async () => {
		// const response = await fetch('https://peaceful-headland-84816.herokuapp.com/list/filenames?token = ${token}')
		const response = await fetch('http://192.168.1.184:8080/example')
		const data = (await response.json()).files
		return data
	}
	const myarray = ['Apple','Banana']
	console.log(files)
	return <div>ABC</div>
}

export default Filepage