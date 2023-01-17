import 'bootstrap/dist/css/bootstrap.min.css';
import './css/post.css';
import React, { isValidElement } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";
function Post() {

  function birdPost(data) {

    fetch("http://localhost:8080/api/birdpost?user=" + username + "&content=" + encodeURIComponent(data.post) + "&uuid=" + uuidv4(),
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
      })
      .then(function (res) { navigate(-1) })
      .catch(function (res) { console.log(res) });
  }

  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = birdPost
  let { username } = useParams();

  return (
    <main id='PostMain'>

      <form onSubmit={handleSubmit(onSubmit)}>
        <button id='ZurueckBtn' type="button" class="btn btn-primary" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>

        <div class="form-floating">
          <textarea
            {...register("post", { required: true })}
            class="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea2">
          </textarea>
          <label for="floatingTextarea2">Poste etwas</label>
        </div>

        <button id='PostBtn' class="btn btn-primary" type="submit">Posten</button>

      </form>
    </main >
  );
}

export default Post;


