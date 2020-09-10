import React , {useState,useEffect }from 'react';
import Loader from '../../Loader/loader'
import '../../Loader/loader.css'
import '../../../assets/scss/style.scss'
import { Link } from 'react-router-dom';


const Search = (props)=>{
	let [data,setQuali] = useState([""])
    let [stream,setStream]=useState([])
    let [substream,setsubStream] = useState([])
    let [search,setSearch] = useState([])
    let [searchQul,setSearchQul] = useState('');
    let [searchStream,setSearchStream] = useState('');
    let [searchSubStream,setSearchSubStream] = useState('');
    let [country,setcountry] = useState([]);
	let [courseType,setcourseType] = useState('');
	let [loader,setLoader]=useState('');

	useEffect(()=>{
		getApiData();

   },[])

   const getApiData= async()=>{
	   setLoader("true")
	   setQuali([])
	 
	await fetch(`https://api.odmit.com/api/v1/qualification-list`)
	.then((response)=>{
		return response.json()
	})
	.then((res)=>{
	   setQuali(res.response.data)
	})
	.catch((err)=>{
		console.log(err,"errorrrrrrrrrrrrrrrrrrr")
	})
	.finally(()=>{
		setLoader("false")
	})
}
const getStream = async(data) =>{
	setcountry([])
	setLoader("true")
	setSearch([])
	setStream([])
	setSearchQul(data)
	  await fetch(`https://api.odmit.com/api/v1/stream-list?qualification=${data}`)
	  .then((response)=>{
		  return response.json()
	  })
	  .then((res)=>{
		 setStream(res.response.data)
		//  console.log(res.response.data)
	  })
	  .catch((err)=>{
		  console.log(err,"errorrrrrrrrrrrrrrrrrrr")
	  })
	  .finally(()=>{
		setLoader("false")
	})
  }

	// second close

	 const getSubStream = async(data) =>{
		setcountry([])
		setLoader("true")
		setSearch([])
		 setSearchStream(data)
		 await fetch(`https://api.odmit.com/api/v1/substream-list?stream=${data}`)
		 .then((response)=>{
				 return response.json()
		 })
		 .then((res)=>{
				setsubStream(res.response.data)
				

		 })
		 .catch((err)=>{
				 console.log(err,"errorrrrrrrrrrrrrrrrrrr")
		 })
		 .finally(()=>{
			setLoader("false")
		})
	 }

	 // third close
			const getSearchData =async(data) =>{
				setSearch([])
				setcountry([])
			
				setLoader("false")
		
			
				let comp = "Oncampus";
		
				if(searchQul !== '' || searchStream !== '' || searchSubStream !== ''){
					
						 await fetch(`https://api.odmit.com/api/v1/course-type-count?qualification=${searchQul}&stream=${searchStream}&sub_stream=${searchSubStream}&course_type=${comp}`)
						 
								 .then((response)=>{
								 return response.json()
						 })
						 .then((res)=>{
									 setSearch(res.response.data)
						 })
						.catch((error)=>{
								console.log(error,"network error")
							})

							.finally(()=>{
								setLoader("false")
							})
				 //   }
		 }
		   //show div TOGGLE
		 if(document.getElementById('noDisplay').style.display = 'none')
		 {
			 document.getElementById('noDisplay').style.display = 'block';
		 }
		 else{
			document.getElementById('noDisplay').style.display = 'none';
		 }
					
					}
				


					// search closed

					const getCountry =async(data) =>{
					
						setLoader("true")
							setcourseType(data)
							setcountry([])
							// let comp = data
						
						await fetch(`https://api.odmit.com/api/v1/country-course-count?qualification=${searchQul}&stream=${searchStream}&sub_stream=${searchSubStream}&course_type=${data}`)
								.then((response)=>{
								return response.json()
						})
						.then((res)=>{
									setcountry(res.response.data)
						})
					 .catch((error)=>{
							 console.log(error)
						 })
						 .finally(()=>{
							setLoader("false")
						})
						
					}


		return(
			<div className="session-page">
				<Loader loader={loader}/>
				<div className="main-header">
		           	<nav className="navbar navbar-expand-xl navbar-dark d-between">
		           		<button type="button" className="btn btn-primary btn-sm btn-lg">Join For Free</button>
		           		<div className="right-widget">
		           			<Link to="/" className="link">Log In</Link>
		           			<Link className="navbar-brand" to="/#">ODMIT</Link>
		           		</div>
		            </nav>
		        </div>
		        <div className="session-inner">
					<div className="d-center vh-100">
						<div className="d-center-inner">
							<div className="search-block">
								<div className="qualification search-label border-none">
									<span>Qualification</span>
									<select className="custom-select" onChange={(e)=>getStream(e.target.value)}>
									<option>select Qualification</option>

				 {
             data.map((v,i)=>{
                 return(
                    <option  key ={i} >{v.qualification}</option>
                 )
             })
         }

									</select>
								</div>
								<div className="stream search-label">
									<span>Stream</span>
									<select className="custom-select" onChange={(e)=>getSubStream(e.target.value)}>
									<option>select stream</option>
				          {
				              stream.map((v,i)=>{
				                  return(
				                     <option   key ={i} >{v.stream}</option>
				                  )
				              })
				          }
									</select>
								</div>
								<div className="subject search-label"  style={{display:"none"}} id = "show">
									<span>Subject</span>
									<select className="custom-select"  onChange={(e)=>setSearchSubStream(e.target.value)}>
										<option>Select subject</option>
									{
											substream.map((v,i)=>{
										
													if( v.length >= 0 || v.length == null ){
															document.getElementById('show').style.display = "block"
															return(
														 <option   key ={i} >{v}</option>
													)
												 }
												 else{

															document.getElementById('show').style.display = "none"
												 }
											})
									}
									</select>
								</div>
								<a className="search-btn"  onClick={getSearchData}>
									<i className="ri-search-2-line"></i>
								</a>
							</div>
							<div className="s-block" id ="noDisplay" style={{display:"none"}}>
								<div className="mb-3">
									<div  className="d-flex-box" id="hide-show" style={{display:""}}>
												{
		                      search.map((v,i)=>{
								  
		                          return(
									  
									<div key={i} className="box-inline" onClick ={()=>getCountry(v.course_Type)}>
																<a >
																<span   className="wrap" key={i}>
																<span   className="d-block" >{v.course_Type}</span>
																<span className="d-block">{v.course_count}</span>
																</span>
																</a>
																</div>							
		                          )
		                      })
		                    }
									</div>
								</div>
								<div className="country-table">
								{
									country.map((v,i)=>{		
                                              
											return(
												<div className="e-box" key={i}>
													
														<span className="d-block">{v.course_count}</span>
														<button className="back" onClick={()=>props.history.push({pathname:"/coursecat",state:{searchQul:searchQul,searchStream:searchStream,searchSubStream:searchSubStream,courseType:courseType,countryName:`${v.country_name}`}})}><span className="d-block">{v.country_name}</span></button>
													
												</div>
											)

									})
								}
								</div>
							</div>
						</div>
					</div>
					<div className="d-bottom">
						<div className="bottom-block">
							<h2>Get Admission <br />Online</h2>
							<p className="mb-0">Build skills with courses, <br/>certificates, and degrees online <br/>from world-class universities and compaines</p>
						</div>
					</div>
		        </div>
	        </div>
		);
	}


export default Search;