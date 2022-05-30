import {useState, useEffect} from 'react'
import {Link, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'

function Nav(){

	const [paddingTittle, setPaddingTittle] = useState(0)
	const [islogged, setIsLogged] = useState(false)
	const navegate = useNavigate()
	const cookies = new Cookies()

	let resolveBoostrapBug = function(){
		document.querySelector("body").addEventListener("click", e=>{
			document.querySelector("body").style.overflow = "auto"
			document.querySelector("body").style.paddingRight = "0"
		})
	}

	let isLogged = function(){
		if(cookies.get('userID') && cookies.get('userID').mail != null){
			setIsLogged(true)
		} else{
			setIsLogged(false)
		}
	}

	let logOut = function(){
		cookies.remove('userID');
		window.location.reload()
	}

	cookies.addChangeListener(e=>{
    	isLogged()
    })

	useEffect(e=>{
		isLogged()
		resolveBoostrapBug()
	},[])	

	return(
		<nav className="navbar bg-light fixed-top">
		  <div className="nav-container">
		   <h3 className="nav-tittle">Personal balance</h3>
		    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
		      <span className="navbar-toggler-icon"></span>
		    </button>
		    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
		      <div className="offcanvas-header">
		        <h5 className="offcanvas-title " id="offcanvasNavbarLabel">Personal Balance</h5>
		        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
		      </div>
		      <div className="offcanvas-body">
		        <ul className="navbar-nav justify-content-end flex-grow-1">
		          <li className="nav-item">
		            <Link className="nav-link" to="/">Home</Link>
		          </li>
		          <li className="nav-item">
		            <Link className="nav-link" to="/balance">Balance</Link>
		          </li>		     
		        </ul>
		      </div>
		      	{ !islogged &&
		      <div className="nav-signIn-container">
		      	<button onClick={e=>navegate("/login")}>Login / Sign In</button>
		      </div>
		  		}
		  		{islogged &&
		  			<div className="nav-signIn-container">
		      			<button onClick={logOut}>Log out</button>
		      		</div>
		  		}
		    </div>
		  </div>
		</nav>
	)
}
export default Nav