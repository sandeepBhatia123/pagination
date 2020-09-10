import React , {useState,useEffect }from 'react';
import Loader from '../../Loader/loader'
import { Link } from 'react-router-dom';

const CourseCategory = (props) => {
    let {searchQul,searchStream,searchSubStream,courseType,countryName} = props.history.location.state == undefined ? [] : props.history.location.state;

      
    useEffect (()=>{

         getCountriesCat();

     },[ ])
 
     let [CountriesCat,setCountriesCat]= useState([''])
     let [loader,setLoader]=useState('')
 
 
 
              const  getCountriesCat = async(data) =>{
                  setLoader("true")
             
                
 
                   await fetch(`https://api.odmit.com/api/v1/category-course-count?qualification=${searchQul}&stream=${searchStream}&sub_stream=${searchSubStream}&course_type=${courseType}&country=${countryName}`)
                            .then((response)=>{
                             return response.json()
                         })
 
                         .then((res)=>{
                             setCountriesCat(res.response.data) 
                             
                         })
                         .catch((err)=>{
                             console.log(err)
                         })
                         .finally(()=>{
                             setLoader("false")
                         })
                }
                
	
		return(
			<div>
                <Loader loader={loader}/>
				<div className="top-bar">
					<div className="container-fluid">
						<div className="d-between">
							<div className="top-filter">
								<input className="form-control form-control-sm" placeholder="Stream" type="text"  />
								<input className="form-control form-control-sm" placeholder="Location" type="text" />
								<input className="form-control form-control-sm" placeholder="Graduation" type="text" />
							</div>
							<div className="right-widget d-center">
								<div className="list-icon">
									<Link to="/#"><i className="ri-notification-3-line"></i></Link>
									<Link to="/#"><i className="ri-user-line"></i></Link>
									<Link to="/#"><i className="ri-shopping-cart-2-line"></i></Link>
								</div>
								<div className="toggles d-center mr-3">
									<div className="toggle-wrap d-center">
										<span>Online Courses</span>
										<label className="switch">
										  <input type="checkbox" defaultChecked />
										  <span className="slider round"></span>
										</label>
									</div>
									<div className="toggle-wrap d-center">
										<span>International Courses</span>
										<label className="switch">
										  <input type="checkbox" defaultChecked />
										  <span className="slider round"></span>
										</label>
									</div>
								</div>
								<h2 className="heading">ODMIT</h2>
							</div>
						</div>
					</div>
				</div>
				<div className="apply-for">
					<h2 className="mb-0">Our<br/>Popular<br/>Courses</h2>
				</div>
                <div className="course-bulk">
                    <div className="container-lg">
                        <div className="sec-heading">
							<h4>Our Popular Courses</h4>
						</div>
                        <div className="row course-category">
                           
                                {
                                    
                                    CountriesCat.map((v,i)=>{
                                       
                                        return(
                                        <div className="col-lg-4" key={i}>
                                        <div className="media">
                                        <img src={"https://images.odmit.com"+v.icon} className="img-fluid" alt="blog img" width="120" height="120" />
                                        <div className="media-body align-self-center">
                                        <button id="no-background" onClick={()=>props.history.push({pathname:"/AfterCourse",state:{courseType:courseType,selectCountry:countryName,selectSubStream:searchSubStream,selectQualification:searchQul,selectStream:searchStream,selectCategory:`${v.category}`}})} className="d-title stretched-link">{v.category}</button>
                                            <p className="mb-0">({v.course_count}  courses)</p>
                                        </div>
                                    </div>
                                    </div>
                                    )
                                
                                    })
                              
                                     
                                }
                            
                        </div>
                    </div>
                </div>
			</div>
		);
	}


export default CourseCategory;