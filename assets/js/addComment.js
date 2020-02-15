import axios from 'axios';

const addCommentForm = document.getElementById('jsAddComment');

const sendComment = async (comment) => {
  const videoId = window.location.href.split('/videos/')[1];
  const response = await axios({
    method: 'post',
    url: `/api/${videoId}/comment`,
    data: {
      comment
    }
  });
  console.log(response);
};

function handleSubmit(event) {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector('input');
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = '';
}

function init() {
  addCommentForm.addEventListener('submit', handleSubmit);
}

if (addCommentForm) {
  init();
}
