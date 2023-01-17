import 'bootstrap/dist/css/bootstrap.min.css';
import './css/main.css';
import React, { isValidElement } from 'react'
import useFetch from "react-fetch-hook";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import postCard from './components/postcard';

function Main() {
    const navigate = useNavigate();
    const { register: registerSearch, handleSubmit: handleSubmitSearch, formState: { errors: errorsSearch } } = useForm();
    let { username } = useParams();

    let { isLoading, data, error } = useFetch("http://localhost:8080/api/getUserFeed/" + username);

    if (isLoading) {
        return <div>Is loading!</div>
    }

    function handleSearch(data) {
        navigate('/search/' + username + '/' + encodeURIComponent(data.searchterm));
    }

    return (
        <div class="container">

            <nav class="navbar bg-body-tertiary">
                <div class="container-fluid">
                    <Link class="navbar-brand" to={"/" + username}><b>Feed</b></Link>
                    <Link class="navbar-brand" to={"/profile/" + username + "/" + username}>Profile</Link>
                    <form class="d-flex" role="search">
                        <input {...registerSearch("searchterm", { required: true })} class="form-control me-2" type="text" placeholder="Search" aria-label="Search" />
                        <button class="btn btn-outline-success" onClick={handleSubmitSearch(handleSearch)}>Search</button>
                    </form>
                </div>
            </nav>

            <div id='Cardcontainer' class="container">
                <div>
                    {postCard(data, username)}
                </div>
            </div>

            <Link to={'/post/' + username}>
                <button id="post" type="button" class="btn btn-primary btn-lg">Posten</button>
            </Link>
        </div>
    );
}

export default Main;








