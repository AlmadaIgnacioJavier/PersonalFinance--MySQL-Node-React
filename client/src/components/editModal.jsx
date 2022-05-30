import {useEffect} from 'react'
import Axios from 'axios'

function EditModal(props){
	
	let close = function(){
		document.querySelector(".newItem").style.animation = "hide 0.5s"
		window.setTimeout(e=>{
			props.quitEditModal(false)
		}, 400)
	}

	let saveChanges = function(){
		const consept = document.querySelector("#conseptInput").value;
		const amount = document.querySelector("#amountInput").value;
		const category = document.querySelector("#categorySelect").value;

		Axios.put("http://localhost:3001/update", {
	      id: props.transaction.id,
	      consept: consept,
	      amount: amount,
	      category: category
	    }).then(()=>{
	      console.log("se cargo el cambio")
	      props.refreshTable()
	      close()
	    }).catch((error)=>{
	      console.log(error)
	    })
	}

	let deleteTransaction = function(){
		Axios.delete(`http://localhost:3001/delete/${props.transaction.id}`).then((response) => {
	      props.refreshTable()
	      close()
	    });
	}

	return(
		<div className="newItem" id="editModalContainer">
			<a className="close" onClick={close}></a>
			<h1 className="newItemTittle">Edit transaction</h1>
			<div className="new-amount-container">
				<label>$</label>
				<input type="number" className="input-amount" name="amount" id="amountInput" defaultValue={props.transaction ? props.transaction.amount : 0}></input>
			</div>

			<div className="form-floating mb-3 concept-container">
			  <input type="text" className="form-control concept-input" id="conseptInput" defaultValue={props.transaction ? props.transaction.consept : ""}></input>
			  <label htmlFor="floatingInput">Concept</label>
			</div>

			<select defaultValue={props.transaction ? props.transaction.category : "Category"} id="categorySelect">
				<option>Category</option>
				<option>Food</option>
				<option>Family</option>
				<option>Gym</option>
				<option>Gift</option>
				<option>Other</option>
			</select>

			<div className="addTransactionContainer mb-4">
				<button className="addTransaction deleteTransaction" onClick={deleteTransaction}>Delete transaction</button>
				<button className="addTransaction" onClick={saveChanges}>Save changes</button>
			</div>
			
		</div>
	)
}
export default EditModal