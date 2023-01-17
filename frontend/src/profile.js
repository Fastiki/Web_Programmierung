import 'bootstrap/dist/css/bootstrap.min.css';
import './css/profile.css';
import React, { isValidElement } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
    Link
} from "react-router-dom";
import useFetch from "react-fetch-hook";
import postCard from './components/postcard';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {

    function follow(data) {
        console.log(userFollowsBool)

        document.getElementById('followBtn').classList.toggle('btn-light')
        document.getElementById('followBtn').classList.toggle('btn-secondary')
        let type = null

        if (userFollowsBool.data) {
            document.getElementById('followBtn').innerText = 'follow'

            userFollowsBool.data = false
            //unfollow
            type = 'userunfollows'

        } else {
            document.getElementById('followBtn').innerText = 'unfollow'

            userFollowsBool.data = true
            type = 'userfollows'

        }

        fetch("http://localhost:8080/api/" + type + "/?user=" + username + "&followuser=" + profileusername,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
            })
            .then(function (res) { })
            .catch(function (res) { console.log(res) });


    }
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm(); // follow 
    const { register: registerSearch, handleSubmit: handleSubmitSearch, formState: { errors: errorsSearch } } = useForm();

    let { username, profileusername } = useParams();

    const { isLoading, data, error } = useFetch("http://localhost:8080/api/getUserPosts/" + profileusername);
    var userFollowsBool = useFetch("http://localhost:8080/api/getUserFollowing/" + username + "/" + profileusername);

    if (isLoading) {
        return <div>Is loading!</div>
    }

    function handleSearch(data) {
        navigate('/search/' + username + '/' + encodeURIComponent(data.searchterm));
    }

    return (
        <main id='ProfileMain'>
            <div class="container">
                <nav class="navbar bg-body-tertiary">
                    <div class="container-fluid">
                        <Link class="navbar-brand" to={"/" + username}>Feed</Link>
                        <Link class="navbar-brand" to={"/profile/" + username + "/" + username}>{username == profileusername ? <b>Profile</b> : <span>Profile</span>}</Link>
                        <form class="d-flex" role="search" >
                            <input {...registerSearch("searchterm", { required: true })} class="form-control me-2" type="text" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-success" onClick={handleSubmitSearch(handleSearch)}>Search</button>
                        </form>
                    </div>
                </nav>
                <div class="card">

                    <div class="card-body">
                        <h5 class="card-title">@{profileusername} <button id='followBtn' onClick={handleSubmit(follow)} type="button" class={"btn " + (userFollowsBool.data ? "btn-light" : "btn-secondary") + " btn-lg"}
                        >{userFollowsBool.data ? "unfollow" : "follow"}</button></h5>
                        <p class="card-text"></p>
                    </div>
                    <ul class="list-group list-group-flush">
                    </ul>
                </div>

                <h3 class="text-start">{data.length} Post{data.length == 1 ? "" : 's'}:</h3>

                <div id='Cardcontainer' class="container">
                    {
                        postCard(data, username)
                    }

                </div>
                <Link to={'/post/' + username}>
                    <button id="post" type="button" class="btn btn-primary btn-lg"
                    >Posten</button>
                </Link>
            </div>
        </main>
    );
}

export default Profile;