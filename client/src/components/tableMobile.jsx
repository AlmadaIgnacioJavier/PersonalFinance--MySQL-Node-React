import {useState, useEffect} from 'react'
import Cookies from 'universal-cookie'

function TableMobile(props){
	const [resultTable, setResultTable] = useState([])
	const cookies = new Cookies()

	let backgroundTr = function(type){
		if (type === "Pasive") {
			return 'linear-gradient(359deg, #ff00001f, transparent)'
		} else{
			return '#00d7382b'
		}
	}

	let categoryFilted = function(){
		var select = document.querySelector("#categorySelect")
		if (select.value != "Category" && select.value != "All" ) {
			let newValue = props.allTransactions.filter(e=>{return(e.category === select.value)})
			setResultTable(newValue)
		} else{
			setResultTable(props.allTransactions)
		}
	}

	useEffect(e=>{
		categoryFilted()
	},[props.allTransactions])

	return(
		<table className="table">
			<thead>
			    <tr>
			      <th scope="col">Concept</th>
			      <th scope="col">
			      <select id="categorySelect" onChange={categoryFilted} defaultValue="Category">
						<option>Category</option>
						<option>All</option>
						<option>Food</option>
						<option>Family</option>
						<option>Gym</option>
						<option>Gift</option>
						<option>Other</option>
                  </select>
				  </th>
			      <th scope="col">$</th>
			      <th scope="col">Date</th>
			      <th scope="col"></th>
			    </tr>
			</thead>
			<tbody className="table-group-divider">
			    {resultTable.map((tra, index)=>{
			    	return(
				    <tr key={index} style={{'background': backgroundTr(tra.type)}}>
				      <td>{tra.consept}</td>
				      <td>{tra.category}</td>
				      <td>{tra.type === "Pasive" ? `-$${tra.amount}` : `$${tra.amount}`}</td>
				      <td>{tra.date}</td>
				      <td><div className="iconEdit" onClick={e=>{props.setEditTransaction(index); props.setShowEdit(true); }}></div></td>
				    </tr>) 
			    })
				}
				{(resultTable.length === 0 && props.allTransactions.length > 0 && props.isLoged) &&
					<tr>
					<td colSpan="7">
						<div className="noFoundResults">
							<h1>No results found</h1>
						</div>
					</td>
					</tr>
				}
				{(props.allTransactions.length === 0 && props.isLoged) &&
					<tr>
					<td colSpan="7">
						<div className="noFoundResults">
							<h1>You haven't transactions to display</h1>
						</div>
					</td>
					</tr>
				}
				{!props.isLoged &&
					<tr>
					<td colSpan="7">
						<div className="noFoundResults">
							<h1>You must be logged in to add or view transactions</h1>
						</div>
					</td>
					</tr>
				}
			   
			</tbody>

		</table>
	)
}

export default TableMobile