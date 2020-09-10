import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import Loader from '../../Loader/loader'
// import Pagination from "react-js-paginate;
import ReactPaginate from 'react-paginate';

// require("bootstrap/less/bootstrap.less");





    const AfterCourse = (props) =>{
        let {courseType,selectCountry,selectSubStream,selectQualification,selectCategory,selectStream}=props.history.location.state;


// show more information with the click of button


const bigHeight=(bigOver)=>{
if(document.getElementById(bigOver).style.height='100px'){

document.getElementById(bigOver).style.height = '400px';
}
else
{
document.getElementById(bigOver).style.height='100px'
}
}


const [data,setResult] = useState([]);
    const [loader,setLoader] = useState([]);
    const [pageSecond,setPageSecond] =useState([]);
    const [onLineCourse,setOnlineCourse] = useState([]);
    const [pagesno,setPagesNo] = useState([]);

// new pagination const
    const [offset,setOffest] = useState(0);
    const [perPage,setperPage] = useState(6);
    const [currentPage,setcurrentPage] = useState(1);
    const [postData,setpostData] = useState([])
    const [pageCount,setpageCount] = useState()

          useEffect(()=>{
            getResult();
            getOnlineCourse();
       },[currentPage])

   const getResult = async() =>{
            setLoader("true")
            // setResult(data)
            await fetch(`https://api.odmit.com/api/v1/institute-stack?qualification=${selectQualification}&stream=${selectStream}&substream=${selectSubStream}&course_type=${courseType}&country=${selectCountry}&category=${selectCategory}&page=${currentPage}&limit=6&offset=0`)
           .then((response)=>{
             return response.json()
  })
  .then((res)=>{
  setResult(res.response.data)
             const data = res.response.data;
             const totalPages = res.response.total_record
             const slice = data.slice(offset,offset + perPage)
             let mypageCount = Math.ceil(totalPages / perPage)
             console.log(res.response.data)
             setpostData(slice)
             setpageCount(mypageCount)
  })
  .catch((err)=>{
       console.log(err)
          })
  .finally(()=>{
  setLoader("false")
  })
        }

      const handlePageClick = (e) => {
        const selectedPage = e.selected + 1;
        console.log(selectedPage)
        const offset = selectedPage * perPage;
        setOffest(offset)
        setcurrentPage(selectedPage)
  };

        const getResultPageSecond = async() =>{
                await fetch(`https://api.odmit.com/api/v1/institute-stack?qualification=${selectQualification}&stream=${selectStream}&substream=${selectSubStream}&course_type=${courseType}&country=${selectCountry}&category=${selectCategory}&page=${currentPage}&limit=6&offset=0`)
                       .then((response)=>{
                           return response.json()
                       })
                       .then((res)=>{
                           console.log(res.response.data,"nexxxtttt page")
                           setResult(res.response.data)
                       })
                       .catch((err)=>{
                           console.log(err)
                       })
            }

            const getOnlineCourse = async(data) =>{
                // setOnlineCourse(data)
                await fetch(`https://api.odmit.com/api/v1/online-courses-list?qualification=${selectQualification}&page=1&limit=4&offset=0`)
                  .then((response)=>{
                      return response.json()
                  })
                  .then((res)=>{
                    //   console.log(res.response.data,"fetchhhhhhhhh")
                      setOnlineCourse(res.response.data)
                  })

            }


// ADD CLASS to show  box shadow acc to course list



const addSh = (data) =>{

if(data !== undefined && data.length > 1){

return "course-stack-card mycourse-sh";

}
else{

return "course-stack-card";
}
}
            return(
                <div>
                    <Loader loader = {loader}/>
                    <div className="top-bar">
                        <div className="container-fluid">
                            <div className="d-between">
                                <div className="top-filter">
                                    <input className="form-control form-control-sm" placeholder="Stream" type="text" />
                                    <input className="form-control form-control-sm" placeholder="Location" type="text" />
                                    <input className="form-control form-control-sm" placeholder="Graduation" type="text" />
                                </div>
                                <div className="right-widget d-center">
                                    <div className="list-icon">
                                        <Link to="/"><i className="ri-notification-3-line"></i></Link>
                                        <Link to="/"><i className="ri-user-line"></i></Link>
                                        <Link to="/"><i className="ri-shopping-cart-2-line"></i></Link>
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
                        <h2 className="mb-0">Apply<br/>Collaborate<br/>Explore</h2>
                    </div>
                    <div className="course-bulk">
                        <div className="container-lg">
                        <div className="courses-slider-wrap">
                            <h2 className="mb-0">Best<br/>Online<br/>Courses</h2>
                            <div className="courses-slider">

                                    {
                                        onLineCourse.map((idx,i)=>{
                                            return(
                                                <div className="slide-list" key={i}>
                                                <div className="media">
                                                <img src="/assets/img/courses-img-1.png" className="img-fluid" alt="Course figure" width="100" height="130" />
                                                <div className="media-body">
                                            <h6>{idx.course}</h6>
                                            <p className="mb-0">{idx.category}</p>
                                                </div>
                                            </div>
                                            <div className="d-between">
                                                <span className="small text-muted">T&C Apply*</span>
                                                <Link to="/" className="site-link">Explore <i className="ri-add-line"></i></Link>
                                                </div>
                                                </div>
                                            )
                                        })
                                    }

                                  </div>
                        </div>
                                

                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="box-card">
                                                    {
                                            data.map((v,i)=>{

                                                    return(
                                        <div key={i} className={addSh(v.courses_list)} >
                                                    <div className="media" key={i}>
                                                        <img src={"https://images.odmit.com"+v.institute_banner} className="img-fluid mr-3" alt="course img" width="200" height="160" />

                                                <div className="media-body">

                                                    <div className="mb-3">
                                                        <h6>{v.institute_name}
                                                            <img src="/assets/img/badge.png" className="img-fluid ml-2" alt="badge" width="40" height="40" />
                                                        </h6>
                                                <span className="text-muted small"> {v.city} , {v.country}</span>
                                                    </div>
                                                    <p key={i}>{v.courses_list == undefined ? (null) : (
                                                    v.courses_list.map((idx,i)=>{
                                                        if(i == 0){
                                                        return(
                                                        <span key={i} className="">{idx.course}</span>
                                                        )

                                                    }
                                                    })

                                                    )}
                                                </p>
                                                    <p id={`bigOver${i}`}
                                                    style={{overflow:"hidden", height:"100px"}}
                                                    className="mb-0">{v.institute_overview}</p>
                                                    <button onClick={()=>bigHeight(`bigOver${i}`)}
                                                    style={{
                                                    zIndex:1,
                                                    marginLeft:"300px",
                                                    fontWeight:"bolder",
                                                    background:"rgba(0, 0, 0, 0.0)",
                                                    border:"none"
                                                    }}>
                                                    ....</button>
                                                </div>
                                                <div style={{width:"160px",height:"230px"}} className="fixed-block">
                                                <img src="/assets/img/ribbon.png" className="img-fluid ribbon" alt="ribbon" width="25" height="80" />
                                                    <span className="text-warning d-block mb-4">Get Admission Online</span>
                                                    <p className="price">
                                                        <span className="d-block strike"></span>
                                                <span className="d-block font-lg"></span>
                                                    </p>
                                                    <Link to="/" className="btn btn-primary btn-sm apply-btn">APPLY</Link>
                                                </div>
                                            </div>

                                      

                                        </div>

                                                )



                                            })
                                        }
                                        <ReactPaginate
                  previousLabel={"prev"}
                  nextLabel={"next"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={(e)=>handlePageClick(e)}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}/>

                                            <div className="pageCont" >

                                            {
                                              pagesno.map((v,i)=>{
                                                return(
                                                  <button onClick = {()=>getResultPageSecond(i+1)}>{i+1}</button>
                                                )
                                              })
                                            }


                                          </div>

                                    </div>

                                </div>
                                <div className="col-lg-4">
                                    <div className="box-card">
                                        <img src="/assets/img/admissions-ad-2.jpg" className="img-fluid" alt="ads" width="" height="" />
                                    </div>
                                    <div className="suggestion-block box-card">
                                        <h6>Suggestion For You</h6>
                                    {/*    {
                                            pageSecond.map((v,i)=>{
                                                return(
                                                    <div className="media" key={i}>
                                                    <img src={"https://images.odmit.com"+v.institute_banner} className="img-fluid mr-3" alt="blog-img" width="120" height="120" />
                                                    <div className="media-body">
                                                <h6>{v.institute_name}</h6>
                                                <p  style={{overflow:"hidden",height:"100px"}}>{v.institute_overview}</p>
                                                        <Link to="/" className="site-link">Explore <i className="ri-add-line"></i></Link>
                                                    </div>
                                                </div>
                                                )
                                            })
                                        } */}

                                        {/* <div className="media">
                                            <img src="/assets/img/blog-img-2.png" className="img-fluid mr-3" alt="blog-img" width="120" height="120" />
                                            <div className="media-body">
                                                <h6>Aryan University</h6>
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting text of the printing and typesetting .</p>
                                                <Link to="/" className="site-link">Explore <i className="ri-add-line"></i></Link>
                                            </div>
                                        </div>
                                        <div className="media">
                                            <img src="/assets/img/blog-img-1.png" className="img-fluid mr-3" alt="blog-img" width="120" height="120" />
                                            <div className="media-body">
                                                <h6>Aryan University</h6>
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting text of the printing and typesetting .</p>
                                                <Link to="/" className="site-link">Explore <i className="ri-add-line"></i></Link>
                                            </div>

                                        </div>
     */}
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            );
        }


    export default AfterCourse;

	
