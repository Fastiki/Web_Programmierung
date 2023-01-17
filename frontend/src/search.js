import 'bootstrap/dist/css/bootstrap.min.css';
import './css/main.css';
import React, { isValidElement } from 'react'
import useFetch from "react-fetch-hook";
import postCard from './components/postcard';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function Search() {

    const navigate = useNavigate();
    const { register: registerSearch, handleSubmit: handleSubmitSearch, formState: { errors: errorsSearch } } = useForm();
    let { username, searchterm } = useParams();

    const { isLoading, data, error } = useFetch("http://localhost:8080/api/search/" + encodeURIComponent(searchterm));

    if (isLoading) {
        return <div>Is loading!</div>
    }

    function handleSearch(data) {
        navigate('/search/' + username + '/' + encodeURIComponent(data.searchterm));
    }

    return (
        <main id='SearchMain'>
            <div class="container">

                <nav class="navbar bg-body-tertiary">
                    <div class="container-fluid">
                        <Link class="navbar-brand" to={"/" + username}>Feed</Link>
                        <Link class="navbar-brand" to={"/profile/" + username + "/" + username}>Profile</Link>
                        <form class="d-flex" role="search">
                            <input {...registerSearch("searchterm", { required: true })} class="form-control me-2" type="text" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-success" onClick={handleSubmitSearch(handleSearch)}>Search</button>
                        </form>
                    </div>
                </nav>

                <div id='Cardcontainer' class="container">
                    <h6>Results for {searchterm}</h6>
                    {postCard(data, username)}
                    {data.length == 0 ? <div>nothing found :(</div> : null}
                    <div>
                    </div>
                </div>

                <Link to={'/post/' + username}>
                    <button id="post" type="button" class="btn btn-primary btn-lg"
                    >Posten</button>
                </Link>
            </div>
        </main>
    );
}

export default Search;








