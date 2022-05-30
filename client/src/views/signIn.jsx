import Nav from '../components/nav.jsx'
import swal from 'sweetalert'
import Axios from 'axios'
import {useNavigate} from 'react-router-dom'
import Cookies from 'universal-cookie'

function signIn(){
	const navegate = useNavigate()
	const cookies = new Cookies()
	
	let alertCustom = function(message){
		swal({
			title: message,
			icon: "error",
			button: "Acept",
			timer: 5000
		})
	}

	let login = function(mail, password){

		Axios.post("http://localhost:3001/api/login", {
        mail: mail,
        password: password
      }).then((response) => {
      	if (response.data[0]) {
        	cookies.set('userID', response.data[0], {path: '/'});
        	navegate("/")
      	} else{
      		alertCustom(response.data.message)
      	}
      });
	}

	let signIn = function(){
		let mailRegExp = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
		let mail = document.querySelector("#mail").value;
		let password = document.querySelector("#password").value

		if (mailRegExp.test(mail) && password.split('').length > 0) {
			Axios.post("http://localhost:3001/api/register", {
		      mail: mail,
		      password: password
		    } ).then(res=>{
		    	console.log(res)
		      if(res.data.message === "User registred succesfully"){
		      	login(mail, password)
		      } else{
		      	alertCustom(res.data.message)
		      }
		    }).catch(err=>{
		      console.log(err)
		    })
		} else{
			alertCustom("Mail or password are invalid")
		}

	}	

	return(
		<>
			<Nav/>
			<div className="login-container">
				<h1>Sign In</h1>
				<div className="form-floating mb-3">
				  <input type="email" className="form-control" id="mail"></input>
				  <label htmlFor="floatingInput">Email address</label>
				</div>
				<div className="form-floating">
				  <input type="password" className="form-control" id="password"	></input>
				  <label htmlFor="floatingPassword">Password</label>
				</div>
				<div className="mt-3 sendLogin-div">
					<button onClick={signIn}>Sign In</button>
				</div>
			</div>
		</>
	)
}

export default signIn