import AddNew from '../components/add.jsx'
import EditModal from '../components/editModal'
import Tables from '../components/table'
import {useState, useEffect} from 'react'
import Axios from 'axios'
import Cookies from 'universal-cookie'
import Nav from '../components/nav'

function Balance(){
	const [showEdit, setShowEdit] = useState(false)
	const [editTransaction, setEditTransaction] = useState()
	const [conditional, setConditional] = useState(false)
	const [allTransactions, setAllTransactions] = useState([])
	const [actualBalance, setActualBalance] = useState()
	const [selected, setSelected] = useState("All")
	const [backgroundTittle, setBackgroundTittle] = useState()

	const cookies = new Cookies()

	// Functions

	let changeSelected = function(event){
		document.querySelectorAll(".button-header").forEach(e=>{
			if(e.classList[1] === "header-selected"){
				e.classList.remove("header-selected")
			}
		})
		event.target.classList.add("header-selected");
		setSelected(event.target.value)
	}

	// Consult if the user is logged

	let isLoged = function(){
		if(cookies.get('userID') && cookies.get('userID').mail != null){
			setConditional(true)
		} else{
			setConditional(false)
		}
	}

	cookies.addChangeListener(e=>{
    	isLoged()
    })

	let refreshTable = function(){
		const res =  Axios.get("http://localhost:3001/api/showBalance").then((response) => {
			if (cookies.get('userID')) {
				let userTransactions = response.data.filter(e=>{return (e.mail === cookies.get('userID').mail)})	
	    
			     if (selected === "All") {
			     	setAllTransactions(userTransactions.reverse());
			     } else {
			     	var transactions = userTransactions.filter(e=>{return(e.type === selected)})
			     	setAllTransactions(transactions.reverse())
			     }
			}
		
   	    });
	}

	// Background of filter buttons

	let tittle = function(){
		if (selected === "Pasive") {
			return(<h1>All liabilities: ${actualBalance * -1}</h1>)
		} else if(selected === "Active"){
			return(<h1>All assets: ${actualBalance}</h1>)
		} else{
			return(<h1>Actual balance: ${actualBalance}</h1>)
		}
	}

	// USE FFECTS

	// At start
	useEffect(e=>{
		isLoged()
		refreshTable()
	}, [])

	// When some transaction change
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

	// Filter active/pasive refresh
	useEffect(e=>{
		refreshTable()
	},[selected])

	// If the user log out
	useEffect(e=>{
		if (!conditional) {
			setAllTransactions([])
		}
	},[conditional])

	return(
	<>
	<Nav/>
	<div className="containerDiv">
		<div className={actualBalance >= 0 ? "actualBalance greenTittle" : "actualBalance redTittle"}>
			{tittle()}
		</div>
		<div className="tableContainer">
			<div className="headerBalance" >
				<button value="Active" className="button-header" onClick={changeSelected}>Actives</button>
				<button value="All" className="button-header header-selected" onClick={changeSelected}>All</button>
				<button value="Pasive" className="button-header" onClick={changeSelected}>Passives</button>
			</div>
			
			<Tables
				allTransactions={allTransactions}
				setEditTransaction={setEditTransaction}
				setShowEdit={setShowEdit}
				isLoged={conditional}
			/>
			
			<AddNew conditional = {conditional}
					refreshTable= {refreshTable}/>
			{showEdit && 
				<EditModal  quitEditModal= {setShowEdit}
							transaction= {allTransactions[editTransaction]}
							refreshTable= {refreshTable}/>
			}
			
		</div>

		</div>
	</>
	)
}

export default Balance