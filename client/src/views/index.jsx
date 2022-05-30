import Nav from '../components/nav'
import {useState, useEffect} from 'react'
import Cookies from 'universal-cookie'
import Axios from 'axios'
import Tables from '../components/table'
import EditModal from '../components/editModal'

function Index(){
	const [allTransactions, setAllTransactions] = useState([])
	const [actualBalance, setActualBalance] = useState(0)
	const [conditional, setConditional] = useState(false)
	const [showEdit, setShowEdit] = useState(false)
	const [editTransaction, setEditTransaction] = useState()

	const cookies = new Cookies()

	let refreshTable = function(){
		const res =  Axios.get("http://localhost:3001/api/showBalance").then((response) => {
			if (cookies.get('userID')) {
				setConditional(true)
				let userTransactions = response.data.filter(e=>{return (e.mail === cookies.get('userID').mail)})
			    let lastTenTransactions = userTransactions.reverse().slice(0, 10)
			    setAllTransactions(lastTenTransactions);			    
			} else{
				setConditional(false)
			}
		
   	    });
	}

	useEffect(e=>{
		refreshTable()
	}, [])

	useEffect(e=>{
		var amounts = 0;
		if (allTransactions) {
			allTransactions.forEach((tr)=>{
				if(tr.type === "Pasive"){
					amounts = amounts - tr.amount
				} else{
					amounts = amounts + tr.amount
				}				
			})
		}
		setActualBalance(amounts)
	}, [allTransactions])


	return(
		<>
		<Nav/>
		<div className={actualBalance >= 0 ? "actualBalance greenTittle" : "actualBalance redTittle"}>
			<h1>Actual balance: {actualBalance}</h1>
		</div>
		{conditional &&
			<h1 className="tittle-index">Last 10 transactions</h1>
		}
		<div className="tableContainerIndex">
			<Tables 	
					allTransactions={allTransactions}
					setEditTransaction={setEditTransaction}
					isLoged={conditional}
					setShowEdit={setShowEdit}/>

		</div>
		{showEdit && 
			<EditModal  quitEditModal= {setShowEdit}
						transaction= {allTransactions[editTransaction]}
						refreshTable= {refreshTable}/>
		}
		</>

	)
}
export default Index