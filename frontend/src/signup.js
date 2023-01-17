import 'bootstrap/dist/css/bootstrap.min.css';
import './css/signup.css';
import React, { isValidElement } from 'react'

import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  function signup(data) {

    fetch("http://localhost:8080/api/signup?username=" + data.user + "&password=" + data.password,
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

        } else if (res.status == 404) {// user does already exist
          document.getElementById('passwordHelp').style.display = 'block'
        }
        /* window.location.reload()  */
      })
      .catch(function (res) { console.log(res) });

  }

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = signup
  let { username, userpassword } = useParams();

  return (
    <main class="form-signin w-100 m-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <img class="mb-4" src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"> */}
        <h1 class="h3 mb-3 fw-normal">Create a new account</h1>

        <div class="form-floating">
          <input  {...register("user", { required: true })} type="text" class="form-control" id="floatingInput" placeholder="Username" defaultValue={username} />
          <label for="floatingInput">Username</label>
          <small id="passwordHelp" class="text-danger">
            User does already exist
          </small>
        </div>
        <div class="form-floating">
          <input  {...register("password", { required: true })} type="password" class="form-control" id="floatingPassword" placeholder="Password" defaultValue={userpassword} />
          <label for="floatingPassword">Password</label>
          <div class="col-sm-3">
          </div>
        </div>

        {/*  <div class="checkbox mb-3">
                  <label>
                      <input type="checkbox" value="remember-me"/> Remember me
                  </label>
              </div> */}
        <button class="w-100 btn btn-lg btn-primary" type="submit">Create</button>
        <p class="mt-5 mb-3 text-muted">© 2017–2022</p>
      </form>
    </main>
  );
}

export default Signup;



