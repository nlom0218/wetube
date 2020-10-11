import axios from "axios";

const addCommentFrom = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const commentDelete = document.querySelectorAll(".comment-delete");

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
  //parseInt -> string를 number로 바뀌는 함수? 메소드?
};

const addComment = (comment) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const div = document.createElement("div");
  span.innerHTML = comment;
  div.innerHTML = "✖";
  li.appendChild(span);
  li.appendChild(div);
  commentList.prepend(li);
  increaseNumber();
};

const sendComment = async (comment) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment,
    },
  });
  if (response.status === 200) {
    addComment(comment);
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  const commentInput = addCommentFrom.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const deleteCommentApi = async (commentId) => {
  await axios({
    url: `/api/${commentId}/delect-comment`,
    method: "POST",
  });
};

function handleDelete(event) {
  event.preventDefault();
  const commentId = event.target.parentNode.lastElementChild.innerText;
  const li = event.target.parentNode;
  commentList.removeChild(li);
  decreaseNumber();
  deleteCommentApi(commentId);
}

const deleteComment = () => {
  var i = 0;
  while (commentDelete.length > i) {
    commentDelete[i].addEventListener("click", handleDelete);
    i = i + 1;
  }
};

function init() {
  addCommentFrom.addEventListener("submit", handleSubmit);
  deleteComment();
}

if (addCommentFrom) {
  init();
}
