window.onload = function () {
    var poll = localStorage.getItem("poll");  // localStorage에서 poll이름의 data얻기
    var pollDiv = document.querySelector("#vote");
    localStorage.clear();
        
    if (poll) {
        //localStorage에서 얻은 문자열을 JSON객체로 변환
        var vote = JSON.parse(poll);
        var sdate = vote.start_date;   //시작일
        var edate = vote.end_date;     //종료일
        var question = vote.question;  //질문
        var answers = vote.answers;    //답변

        //투표 항목 구성
        var pollContent = "<div class='vote_title'>[당신의 선택]</div>";
        pollContent += "<div class='vote_question'>" + question + "</div>";
        pollContent += "<div class='vote_answer'>";
        pollContent += "  <ul>";

        for (var i = 0; i < answers.length; i++){
            pollContent += "<li>";
            pollContent += "    <label>";
            pollContent += '      <input type="radio" name="vote_answer" value="' + answers[i] + '" />' + answers[i];
            pollContent += "    </label>";
            pollContent += "  </li >";
        }
        pollContent += "</ul>";
        pollContent += "</div>";
        pollContent += '<div class="vote_button">';
        pollContent += '  <button class="button btn_primary" onclick="javascript:poll();">투표하기</button>';
        pollContent += '  <button class="button">결과보기</button>';
        pollContent += "</div>";
        pollContent += '<div class="vote_date">투표기간 : ' + dateFormat(sdate) + " ~ " + dateFormat(edate) + "</div>";
    
        pollDiv.innerHTML = pollContent;  // 투표 화면에 투표양식 추가
    } else {
        pollDiv.innerHTML = '<div class="vote_title">진행중인 투표가 없습니다.</div>';
    }
}

//투표 시작일과 종료일의 날짜 형식(yy.mm.dd)------------------------
function dateFormat(date) {
    var yymmdd = date.split("-");
    return yymmdd[0].substr(2, 2) + "." + yymmdd[1] + "." + yymmdd[2];
}

//로그인----------------------------------------------------------
function login() {
    var userid = prompt("아이디입력","ssafy");
    if (userid.length == 0) {
        alert("아이디 입력!!!");
        return;
    }
    var userpass = prompt("비밀번호입력", "1234");
    if (userpass.length == 0) {
        alert("비밀번호 입력!!!");
        return;
    }
    if (userid == "ssafy" && userpass == "1234") {
        alert("로그인 성공");
        // id가 profile_img인 element의 src 속성의 값을 img/profile.png로 바꿈
        document.getElementById("profile_img").src = "img/profile.png";
        document.getElementById("header_nav_confirm_off").style.display = "none";
        document.getElementById("header_nav_confirm_on").style.display = "block";
    } else {
        alert("아이디 또는 비밀번호 확인하시오")
    }
}
//로그아웃--------------------------------------------------------
function logout() {
    // document.getElementById("profile_img").src = "img/noimg.png";
    // document.getElementById("header_nav_confirm_on").style.display = "none";
    // document.getElementById("header_nav_confirm_off").style.display = "block";
    document.querySelector("#profile_img").setAttribute("src", "img/noimg.png");
    document.querySelector("#header_nav_confirm_on").setAttribute("style", "display: none");
    document.querySelector("#header_nav_confirm_off").setAttribute("style", "display: block");
}
//지역매장 펼치기/접기--------------------------------------------
var cnt = 0;
function slideDown(areaid) {
    if (areaid.style.display == "none") {
        areaid.style.display = "block";
        cnt++;
    } else if(areaid.style.display == "block"){
        areaid.style.display = "none";
        cnt--;
    }

    if (cnt == 4) { // 모든 메뉴가 펼쳐졌다면 전국매장접기 버튼 활성화
        document.getElementsByClassName("store_display_off")[0].style.display = "block";
        document.getElementsByClassName("store_display_on")[0].style.display = "none";
    } else {        // 모든 메뉴가 접혔다면 전국매장펼치기 버튼 활성화
        document.getElementsByClassName("store_display_off")[0].style.display = "none";
        document.getElementsByClassName("store_display_on")[0].style.display = "block";
    }
}

//전국매장 펼치기 / 접기------------------------------------------
function allSlide(onoff) {
    if (onoff == "on") {  //펼치기
        var subs = document.getElementsByClassName("store_item_sub");
        for (var i = 0; i < subs.length; i++) subs[i].style.display = "block";

        document.getElementsByClassName("store_display_off")[0].style.display = "block";
        document.getElementsByClassName("store_display_on")[0].style.display = "none";
        cnt = 4;
    } else {  //접기
        var subs = document.getElementsByClassName("store_item_sub");
        for (var i = 0; i < subs.length; i++) subs[i].style.display = "none";

        document.getElementsByClassName("store_display_off")[0].style.display = "none";
        document.getElementsByClassName("store_display_on")[0].style.display = "block";
        cnt = 0;
    }
}
//투표하기-------------------------------------------------------
function poll() {
    var votes = document.getElementsByName("vote_answer");
    var sel_menu = "";
    
    for (var i = 0; i < votes.length; i++){
        if (votes[i].checked == true) {
            sel_menu = votes[i].value;
            break;
        }
    }
    alert(sel_menu + "를 선택했습니다");
}
//관리자(투표만들기)----------------------------------------------
function pollMake() {
    // pollmake.html의 창아이디를 poll로 설정하고 가로 500, 세로 300인 창을 열기.
    window.open("pollmake.html", "poll", "width=500,height=300,top=300,left=400");
}
//답변 항목 추가--------------------------------------------------
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
    var sdate = document.querySelector("#start_date").value;   //시작일
    var edate = document.querySelector("#end_date").value;     //종료일
    if (!sdate || !edate) {
        alert("설문 기간 입력하시오");
        return;
    }

    var quest = document.querySelector("#question").value;   //질문
    if (!quest) {
        alert("질문 내용을 입력하시오.");
        return;
    }

    var answerInput = document.querySelectorAll("input[name='answer']");  //답변항목
    for (var i = 0; i < answerInput.length; i++){
        if (!answerInput[i].value) {
            alert("답변 항목을 입력하시오");
            return;
        }
    }

    var answers = [];
    for (var i = 0; i < answerInput.length; i++){
        answers.push(answerInput[i].value);     //답변 배열에 입력 data 추가
    }
    // 입력 data를 이용해서 JSON 객체 생성
    var polljson = {
        start_date: sdate,
        end_date: edate,
        question: quest,
        answers:answers
    };
    var poll_json = JSON.stringify(polljson); // JSON 객체를 문자열로 변환
    localStorage.setItem("poll", poll_json);  //localStorage에 추가

    alert("투표를 생성합니다.");
    opener.document.location.reload();        // 부모창 새로고침
    self.close();
}