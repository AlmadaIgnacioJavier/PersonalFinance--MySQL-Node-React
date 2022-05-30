import Nav from '../components/nav.jsx'
import {useNavigate} from 'react-router-dom'
import Axios from 'axios'
import Cookies from 'universal-cookie'
import swal from 'sweetalert'

function Login(){
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

	let login = function(){
		let mail = document.querySelector("#mail").value;
		let password = document.querySelector("#password").value

		Axios.post("http://localhost:3001/api/login", {
        mail: mail,
        password: password
      }).then((response) => {
      	document.querySelector("#mail").value = ""
      	document.querySelector("#password").value = ""
      	if (response.data[0]) {
        	cookies.set('userID', response.data[0], {path: '/'});
        	navegate("/")
      	} else{
      		alertCustom(response.data.message)
      	}
      });
	}

	return(
		<>
			<Nav/>
			<div className="login-container">
				<h1>Login</h1>
				<div className="form-floating mb-3">
				  <input type="email" className="form-control" id="mail"></input>
				  <label htmlFor="floatingInput">Email address</label>
				</div>
				<div className="form-floating">
				  <input type="password" className="form-control" id="password"></input>
				  <label htmlFor="floatingPassword">Password</label>
				</div>
				<div className="mt-3 sendLogin-div">
					<button onClick={login}>Login</button>
				</div>
				<div className="registrer-div">
					<h5>Don´t have an account? Sign In!</h5>
					<button onClick={e=> navegate("/signin")}>Sign In</button>
				</div>
			</div>
		</>
	)
}
export default Login