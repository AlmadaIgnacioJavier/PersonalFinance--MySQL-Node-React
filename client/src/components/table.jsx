import TableMobile from './tableMobile'
import Table from './tableTransactions' 
import {useState, useEffect} from 'react'
function Tables(props){

	const [isMobile, setIsMobile] = useState()

	let isMobileCheck = function(){
		if(window.outerWidth < 680){
			setIsMobile(true)
		} else{
			setIsMobile(false)
		}
	}

	useEffect(e=>{
		isMobileCheck()
		window.addEventListener('resize', e=>{
			isMobileCheck()
		})
	},[])

	return(
		<>
			{isMobile &&
				<TableMobile
					allTransactions={props.allTransactions}
					setEditTransaction={props.setEditTransaction}
					setShowEdit={props.setShowEdit}
					isLoged={props.isLoged}
			/>}
			{!isMobile &&
				<Table
					allTransactions={props.allTransactions}
					setEditTransaction={props.setEditTransaction}
					setShowEdit={props.setShowEdit}
					isLoged={props.isLoged}
			/>}

		</>
	)
}

export default Tables