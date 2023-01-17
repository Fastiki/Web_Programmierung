import { useNavigate } from 'react-router-dom';

function Login(data) {
    const navigate = useNavigate();
    
    fetch("http://localhost:8080/api/login?username="+data.user+"&password=" + data.password,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      /*   method: "GET", */
      })
      .then(function (res) { 
        if (res.status == 200){ // login success
          navigate('/'+data.user);
        }else if (res.status == 403){ // wrong password
          document.getElementById('floatingPassword').classList.add('is-invalid')
        }else if (res.status==404){// user not found
          navigate('/signup/'+data.user+'/'+data.password);
        }
        /* window.location.reload()  */
      })
      .catch(function (res) { console.log(res) });

  }
export default Login