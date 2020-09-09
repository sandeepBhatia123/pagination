import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HeaderSecond from '../components/Header/header-second';
import Footer from '../components/Footer/footer';
import Search from '../components/Pages/Search/search';
import CourseList from '../components/Pages/Course-List/course-list';
import SelectCourse from '../components/Pages/Select-Course/select-course';
import CourseCategory from '../components/Pages/Course-Detail/CountriesCategories'
import AfterCourse from '../components/Pages/Course-List/AfterCourse'

export default function IndexRoute() {
    return (
        <BrowserRouter>
            <HeaderSecond />
            <main className="main-wrapper">
                <Switch>
                    <Route exact path="/" component={Search}  />
                    <Route path="/CourseList" component={CourseList}  />
                    <Route path ="/coursecat"  component={CourseCategory}/>
                   <Route path="/AfterCourse" component={AfterCourse}/>                   
                   <Route path="/SelectCourse" component= {SelectCourse} />
                </Switch>
            </main>
            <Footer />
        </BrowserRouter>
    );
}

