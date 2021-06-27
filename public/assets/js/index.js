const submitLoginForm = async (event) => {
  event.preventDefault()
  const username = $("#username").val()
  const password = $("#password").val()

  if (username === "" || password === "") {
    $(".error-message").remove()
    $(event.target).parent().prepend(`
    <p class="error-message text-center"> You must enter a username and password to log in. </p>
    `)
    return
  }

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify({
      username,
      password
    }),
  };

  const {status} = await fetch("/auth/login", options);

  if (status === 200 ) {
    window.location.replace("/dashboard")
  } else if (status > 399 && status < 500) {
    $(".error-message").remove()
    $(event.target).parent().prepend(`
    <p class="error-message text-center"> Username or password is incorrect. </p>
    `)
    return
  } else {
    $(".error-message").remove()
    $(event.target).parent().prepend(`
    <p class="error-message text-center"> Oops! We're unable to log you in right now. Please try again later. </p>
    `)
    return
  }
}

const refreshWindow = () => {
  location.reload()
}

const updateComment = async (event) => {
  const parentContainer = $(event.target).parent()
  const commentId = parentContainer.attr("id")
  const message = parentContainer.children(".form-floating").children("#updatedComment").val()

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify({
      message
    }),
  };

  const {status} = await fetch(`/api/comment/${commentId}`, options);

  if (status === 200 ) {
    parentContainer.empty()
    parentContainer.append(`
      <p>Comment updated successfully</p>
    `)
    setTimeout(() => {
      location.reload;
    }, 1000)
  } else {
    parentContainer.append(`
    <p class="error-message text-center"> Sorry, we're unable to update your comment right now. Please try again later </p>
    `)
    return
  }
   
}

const renderEditCommentField = (event) => {
  const parentContainer = $(event.target).parent()
  const currentCommentElement = parentContainer.siblings(".comment")
  parentContainer.empty()
  
  const currentComment = currentCommentElement.text()
  currentCommentElement.remove()
  
  parentContainer.append(`
  <div class="form-floating">
    <textarea class="form-control" id="updatedComment"> ${currentComment} </textarea>
    <label for="updatedComment"> Your comment </label>
  </div>
  <button class="btn btn-secondary" id="update-comment">Update</button>
  <button class="btn btn-secondary" id="cancel-comment-update">Cancel</button>
  `)    

  $("#cancel-comment-update").on("click", refreshWindow)
  $("#update-comment").on("click", updateComment)

}

const deleteComment = async () => {
  const parentContainer = $(event.target).parent()
  const commentId = parentContainer.attr("id")

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
  };

  const response = await fetch(`/api/comment/${commentId}`, options);

  if (response.status === 200) {
    parentContainer.empty();
    parentContainer.append(`
    <p> Deleted successfully. </p>
    `);

    setTimeout(() => {
      location.reload();
    }, 1000);
  } else {
    parentContainer.append(`
    <p class="error-message text-center"> Sorry, we're unable to delete this comment right now. Please try again later. </p>
    `)
    return
  }
}

$("#login-submit").on("click", submitLoginForm)
$('[data-name="edit-comment"]').on("click", renderEditCommentField)
$('[data-name="delete-comment"]').on("click", deleteComment)