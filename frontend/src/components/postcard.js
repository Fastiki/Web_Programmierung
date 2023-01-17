import { Link } from "react-router-dom";

function wrapWords(text, realusername) {
  const words = text.split(' ');
  const wrappedWords = words.map(word => {
    if (word.startsWith('@')) {
      const username = word.slice(1);

      return <Link to={"/profile/" + realusername + "/" + username.replace(/[^\w\s]/gi, '')}>{"@" + username.replace(/[^\w\s]/gi, '')}</Link>;
    } else if (word.startsWith('#')) {

      return <Link to={"/search/" + realusername + "/" + encodeURIComponent('#' + word.replace(/[^\w\s]/gi, ''))}>{"#" + word.replace(/[^\w\s]/gi, '')}</Link>;
    } else {
      return " " + word + " ";
    }
  });
  return wrappedWords;
}

// function wrapHashtags(text, realusername) {
//     const words = text.split(' ');
//     const wrappedWords = words.map(word => {
//       if (word.startsWith('#')) {

//         return <Link to={"/search/"+realusername+"/"+encodeURIComponent('#'+word.replace(/[^\w\s]/gi, ''))}>{"#"+word.replace(/[^\w\s]/gi, '')}</Link>;
//       } else {
//         return " "+word+" ";
//       }
//     });
//     return wrappedWords;
// }


function postCard(data, username) {
  return data.map((post) => <div class="card"><div class="card-body">

    <h6 class="card-title"><Link to={"/profile/" + username + "/" + post.username}>@{post.username}  </Link>   {post.datetime}</h6>

    <p class="card-text">{wrapWords(post.content, username)}</p></div></div>)
}

export default postCard;