// import React from 'react'
// import { Link, Outlet, useNavigate } from 'react-router-dom'

// function Navbar() {
//   var navigate = useNavigate();
//     function logout(){
//         window.localStorage.clear();
//         navigate('/');
//     }
//   return (
//     <div>
    //   <nav className="navbar navbar-expand-lg bg-light shadow" style={{background:'linear-gradient(69.9deg, rgb(76, 79, 106) 3.2%, rgb(118, 124, 163) 97.6%)'}}>
    //     <div className="container-fluid">
    //         <Link to='/' className="navbar-brand text-light"><img src="https://www.bhashyamschools.com/assets/images/logo/logo.png" alt="BHASHYAM SCHOOL" style={{width:'100px',height:'50px'}}/></Link>
    //         <Link className="navbar-brand text-light" to="/home">Home</Link>
    //         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    //         <span className="navbar-toggler-icon"></span>
    //         </button>
    //         <div className="collapse navbar-collapse" id="navbarSupportedContent">
    //         <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    //             <li className='nav-item'>
    //                 <Link to='/allcomplaints' className="nav-link text-light">Customer Care</Link>
    //             </li>
    //             <li className='nav-item'>
    //                 <Link to='/zonals' className="nav-link text-light">Zonal Officers</Link>
    //             </li>
    //             <li className='nav-item'>
    //                 <Link to='/principal' className="nav-link text-light">Principal</Link>
    //             </li>
    //         </ul>
    //         {/* <form className="d-flex" role="search">
    //             <button className="btn btn-outline-light">Logout</button>
    //         </form> */}
    //         <ul className="navbar-nav  mb-2 mb-lg-0">
    //             <li className='nav-item'>
    //                 <Link to='/addbranch' className="nav-link text-light">Add Branch</Link>
    //             </li>
    //             <li className='nav-item'>
    //                 <Link to='/addzonal' className="nav-link text-light">Add ZEO</Link>
    //             </li>
    //             <li className='nav-item'>
    //                 <Link to='/complaint' className="nav-link text-light">Add Complaint</Link>
    //             </li>
                // <li className='nav-item'>
                //     <Link to='/' className="btn btn-outline-light" onClick={logout}>Logout</Link>
                // </li>
    //         </ul>
    //         </div>
    //     </div>
    //   </nav>

//       <Outlet/>
//     </div>
//   )
// }

// export default Navbar
import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Zonalroutes from './routes/Zonalroutes';
import Principalroutes from './routes/Principalroutes';
import Customerroutes from './routes/Customerroutes';
import Adminroutes from './routes/Adminroutes';

function Navbar() {
    var navigate = useNavigate();
    var [routes,setRoutes] = useState([]);
    var [role,setRole] = useState(window.localStorage.getItem('role') || '');
    var rolee = window.localStorage.getItem('role');

    function logout(){
        window.localStorage.clear();
        setRole('');
        navigate('/');
        setRoutes([]);
    }
    useEffect(()=>{
        console.log("rolee",rolee);
        if(rolee){
            switch(rolee){
                case "zonalofficer" :
                    setRoutes(Zonalroutes);
                    break;
                case "principal" : 
                    setRoutes(Principalroutes);
                    break;
                case "Customercare" : 
                    setRoutes(Customerroutes);
                    break;
                case "Admin" :
                    setRoutes(Adminroutes);
                    break;
                default : 
                    navigate('/login');
                    break;               
            }
        } else {
            navigate('/login')
        }
    },[routes,rolee])
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-light shadow" style={{background:'linear-gradient(69.9deg, rgb(76, 79, 106) 3.2%, rgb(118, 124, 163) 97.6%)'}}>
            <div className="container-fluid">
                {/* <Link to='/' className="navbar-brand text-light">INTERNATIONAL SCHOOL</Link> */}
                
                <h5 className='m-2 ms-1 me-3 text-light'>International School</h5>
                <Link className="navbar-brand text-light" to="/home">Home</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarSupportedContent">
                  <ul className="navbar-nav">
                       {
                           routes.map((route,i)=>(
                            route.path !== '/login' ? (
                                <li key={i} className='nav-item'>
                                    <NavLink to={route.path} className="nav-link text-light" activeClassName="active">
                                        {route.label}
                                    </NavLink>
                                </li>
                            ) : (
                                <li key={i} className='nav-item'>
                                    <button className="nav-link btn btn-link text-light" onClick={logout} style={{ textDecoration: "none", color: "inherit" }}>
                                        {route.label}
                                    </button>
                                </li>
                            )
                           ))
                       }
                  </ul>
                  <ul className='navbar-nav  mb-2 mb-lg-0'>
                    <li className='nav-item'>
                        <Link to='/' className="btn btn-outline-light" onClick={logout}>Logout</Link>
                    </li>
                  </ul>
                </div>
            </div>
      </nav>
    </div>
  )
}

export default Navbar
