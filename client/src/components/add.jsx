import {useState, useEffect} from 'react'
import Axios from 'axios'
import Cookies from 'universal-cookie'
import swal from 'sweetalert'

function AddNew(props){

	const [openClose, setOpenClose] = useState(false);
	const cookies = new Cookies()

	let close = function(){
		document.querySelector(".newItem").style.animation = "hide 0.5s"
		window.setTimeout(e=>{
			setOpenClose(false)
		}, 400)
	}

	let alertCustom = function(message){
		swal({
			title: message,
			icon: "warning",
			button: "Acept",
			timer: 5000
		})
	}

	let joinData = function(){
		const amountInput = document.querySelector("#amountInput")
		const typeSelect = document.querySelector("#typeSelect")
		const conceptInput = document.querySelector("#conceptInput")
		const categorySelect = document.querySelector("#categorySelectModal")
		const date = new Date()
		const today = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
		const userMail = cookies.get('userID').mail;

		if((amountInput.value != "") && (typeSelect.value != "Type") && (conceptInput.value != "") && (categorySelect.value != "Category")){
			Axios.post("http://localhost:3001/api/create", {
		      consept: conceptInput.value,
		      type: typeSelect.value,
		      amount: amountInput.value,
		      category: categorySelect.value,
		      date: today,
		      mail: userMail
		    }).then(()=>{
		      props.refreshTable();
		      close()
		    })
		} else{
			alertCustom("Please complete all the entries")
		}
		
	}

	return(
		<>
		{(!openClose && props.conditional) &&
			<div className="transactionOpenContainer">
				<button className="addTransactionOpen" onClick={e=>{setOpenClose(true)}}>Add Transaction</button>
			</div>
		}
		{(openClose && props.conditional) &&
			<div className="newItem">
			<a className="close" onClick={e=>{close()}}></a>
			<h1 className="newItemTittle">Add new transaction</h1>
			<div className="new-amount-container">
				<label>$</label>
				<input type="number" id="amountInput" className="input-amount" name="amount" placeholder="1000"></input>
			</div>

			<select className="mb-3" id="typeSelect">
				<option>Type</option>
				<option>Active</option>
				<option>Pasive</option>
			</select>

			<div className="form-floating mb-3 concept-container">
			  <input type="text" className="form-control concept-input" id="conceptInput" placeholder="name@example.com"></input>
			  <label htmlFor="floatingInput">Concept</label>
			</div>

			<select id="categorySelectModal">
				<option>Category</option>
				<option>Food</option>
				<option>Family</option>
				<option>Gym</option>
				<option>Gift</option>
				<option>Other</option>
			</select>

			<div className="addTransactionContainer mb-4">
				<button className="addTransaction" onClick={joinData}>Add</button>
			</div>
			
		</div>}
		</>
	)
}
export default AddNew