//로그인

let userId;
let userPw;
function login() { 
  userId = prompt("아이디입력");
  if (userId.length == 0) { 
    alert("아이디를 입력하세요");
    return;
  }
}

function logout() { 
  userPw = prompt("비밀번호 입력");
  if (userPw.length == 0) { 
    alert("비밀번호를 입력하세요");
    return;
  }
}

if ((userId == "ssafy") && (userPw == "1234")) {
  alert("로그인 성공!!!");
  document.getElementById("profile_img").src
} else { 
  alert("아이디나 비밀번호가 틀렸습니다.");
}