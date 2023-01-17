import 'bootstrap/dist/css/bootstrap.min.css';

import React, { isValidElement } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import { useForm } from "react-hook-form";
import {
  Link
} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

function Signin() {

  const navigate = useNavigate();

  function login(data) {

    fetch("http://localhost:8080/api/login?username=" + data.user + "&password=" + data.password,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        /*   method: "GET", */
      })
      .then(function (res) {
        if (res.status == 200) { // login success
          navigate('/' + data.user);
        } else if (res.status == 403) { // wrong password
          document.getElementById('floatingPassword').classList.add('is-invalid')
        } else if (res.status == 404) {// user not found
          navigate('/signup/' + data.user + '/' + data.password);
        }
        /* window.location.reload()  */
      })
      .catch(function (res) { console.log(res) });

  }

  const { register, handleSubmit, formState: { errors } } = useForm();
  let { username, userpassword } = useParams();

  const onSubmit = login
  return (
    <main class="form-signin w-100 m-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <img class="mb-4" src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"> */}
        <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

        <div class="form-floating">
          <input  {...register("user", { required: true })} type="text" class="form-control" id="floatingInput" placeholder="Username" />
          <label for="floatingInput">Username</label>
        </div>
        <div class="form-floating">
          <input  {...register("password", { required: true })} type="password" class="form-control" id="floatingPassword" placeholder="Password" />
          <label for="floatingPassword">Password</label>
        </div>

        {/*  <div class="checkbox mb-3">
                <label>
                    <input type="checkbox" value="remember-me"/> Remember me
                </label>
            </div> */}
        <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        <p class="mt-5 mb-3 text-muted">© 2017–2022</p>
      </form>
    </main>
  );
}

export default Signin;



