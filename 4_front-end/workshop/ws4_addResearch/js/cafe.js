//로그인
let userId;
let userPw;
function login() { 
  userId = prompt("아이디입력", "ssafy");
  if (userId.length == 0) { 
    alert("아이디를 입력");
    return;
  }
  userPw = prompt("비밀번호 입력", "1234");
  if (userPw.length == 0) { 
    alert("비밀번호를 입력");
    return;
  }

  if ((userId == "ssafy") && (userPw == "1234")) {
    alert("로그인 성공!!!");
    // id가 profile_img인 element의 src 속성의 값을 img/profile.png로 바꿈
    document.getElementById("profile_img").src = "img/profile.png";
    document.getElementById("header_nav_confirm_off").style.display = "none";
    document.getElementById("header_nav_confirm_on").style.display = "block";
  } else { 
    alert("아이디나 비밀번호가 틀렸습니다.");
  }
}

//로그아웃
function logout() { 
  document.querySelector("#profile_img").setAttribute("src", "img/noimg.png");
  document.querySelector("#header_nav_confirm_on").setAttribute("style", "display: none");
  document.querySelector("#header_nav_confirm_off").setAttribute("style", "display: block");
}

//전국 매장 펼치기/ 접기
function allSlide(onoff) { 
  if (onoff == "on") { // 펼치기
    let subs = document.getElementsByClassName("store_item_sub");
    for (let i = 0; i < subs.length; i++) subs[i].style.display = "block";

    document.getElementsByClassName("store_display_off")[0].style.display = "block";
    document.getElementsByClassName("store_display_on")[0].style.display = "none";
    cnt = 4; 
  } else { // 접기
    let subs = document.getElementsByClassName("store_item_sub");
    for (var i = 0; i < subs.length; i++) subs[i].style.display = "none";

    document.getElementsByClassName("store_display_off")[0].style.display = "none";
    document.getElementsByClassName("store_display_on")[0].style.display = "block";
    cnt = 0;
  }
}

//지역 매장 펼치기/ 접기
let cnt = 0;
function slideDown(areaid) { 
  if (areaid.style.display == "none") {
    areaid.style.display = "block";
    cnt++;
  } else if (areaid.style.display == "block") { 
    areaid.style.display = "none";
    cnt--;
  }

  if (cnt == 4) { // 모든 메뉴가 펼쳐졌다면 전국매장접기 버튼 활성화
    document.getElementsByClassName("store_display_off")[0].style.display = "block";
    document.getElementsByClassName("store_display_on")[0].style.display = "none";
  } else { // 모든 메뉴가 접혔다면 전국매장펼치기 버튼 활성화
    document.getElementsByClassName("store_display_off")[0].style.display = "none";
    document.getElementsByClassName("store_display_on")[0].style.display = "block";
  }
}

//투표하기
function poll() { 
  let votes = document.getElementsByName("vote_answer");
  let sel_menu = "";

  for (let i = 0; i < votes.length; i++) { 
    if (votes[i].checked == true) { 
      sel_menu = votes[i].value;
      break;
    }
  }

  alert(sel_menu + "를 선택했습니다.");
}

//관리자 투표만들기
function pollMake() {
  window.open("pollmake.html", "poll", "width=600,height=400,top=300,left=400");
}

//답변 추가
function addAnswer() {
  var listDiv = document.getElementById("poll_answer_list");

  var divEl = document.createElement("div");        //<div></div>
  divEl.setAttribute("class", "poll_answer_item");  //<div class="poll_answer_item"></div>
  var inputEl = document.createElement("input");    //<input />
  inputEl.setAttribute("type", "text");             //<input type="text" /> 
  inputEl.setAttribute("name", "answer");           //<input type="text" name="answer" />
  var buttonEl = document.createElement("button");
  buttonEl.setAttribute("type", "button");
  buttonEl.setAttribute("class", "button");
  
  //버튼에 click 이벤트 리스너 등록
  buttonEl.addEventListener("click", function(e){
      var parent = this.parentNode;
      listDiv.removeChild(parent);
  });
  buttonEl.appendChild(document.createTextNode("삭제"));

  divEl.appendChild(inputEl);
  divEl.appendChild(buttonEl);
  listDiv.appendChild(divEl);
}
//투표생성----------------------------------------------------------
function makePoll() {
  let sdate = document.querySelector("#start_date").value;   //시작일
  let edate = document.querySelector("#end_date").value;     //종료일
  if (!sdate || !edate) {
      alert("설문 기간 입력하시오");
      return;
  }

  let quest = document.querySelector("#question").value;  
  if (!quest) {
      alert("질문 내용을 입력하시오.");
      return;
  }

  
  let answerInput = document.querySelectorAll("input[name='answer']");  //답변항목
  for (let i = 0; i < answerInput.length; i++){
      if (!answerInput[i].value) {
          alert("답변 항목을 입력하시오");
          return;
      }
  }

  let answers = [];
  for (let i = 0; i < answerInput; i++) {  //답변 배열안에 데이터 넣기
    answers.push(answerInput[i].value);
  }

  let polljson = { // 값매칭시켜주기
    start_date: sdate,
    end_date: edate,
    question: quest,
    answers: answers
  };

  let poll_json = JSON.stringify(polljson); // JSON 객체를 문자열로 변환
  localStorage.setItem("poll", poll_json);  //localStorage에 추가

  alert("투표를 생성합니다.");
  opener.document.location.reload();        // 부모창 새로고침
  self.close();
}