const submitSignupForm = async (event) => {
  event.preventDefault()

  const username = $("#username").val()
  const firstName = $("#first-name").val()
  const lastName = $("#last-name").val()
  const password = $("#password").val()
  const confirmPassword = $("#confirm-password").val()

  if (username === "" || firstName === "" || lastName === "" || password === "" || confirmPassword === "") {
    $("#signup-error-messages").empty()
    $("#signup-error-messages").append(`
    <p class="error-message"> Sorry mate, we don't half do things around here :D <br>
    Complete all of the fields to signup.</p> 
    `)
  }

  if (password !== confirmPassword) {
    $("#signup-error-messages").empty()
    $("#signup-error-messages").append(`
    <p class="error-message"> Whoops! You might have misspelt your password. <br>
    Make sure your password and confirm password match.</p> 
    `)
  }

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify({
      username,
      firstName,
      lastName,
      password
    }),
  };

  const {status} = await fetch("/auth/signup", options);

  if (status === 200 ) {
    $(event.target).parent().empty().append(`
      <p class="text-center"> Congrats, you're in! :) </p>
    `)

    setTimeout(() => {
      window.location.replace("/login");
    }, 1000)
  } else if (status === 409) {
    $(".error-message").remove()
    $(event.target).parent().prepend(`
    <p class="error-message text-center"> Sorry, this username is already taken! </p>
    `)
    return
  } else {
    $(".error-message").remove()
    $(event.target).parent().prepend(`
    <p class="error-message text-center"> Oops! We're unable to sing you up right now. Please try again later. </p>
    `)
    return
  }


} 

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

const createNewComment = async (event) => {
  const parentContainer =  $(event.target).parent()
  const message = $("#add-comment-textarea").val()
  const postId = $(event.target).data("postid")

  if (message === "") {
    $(".error-message").remove()
    $(parentContainer).prepend(`
    <p class="error-message text-center"> Comment cannot be empty. </p>
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
      message,
      postId
    }),
  };

  const {status} = await fetch(`/api/comment/`, options);

  if (status === 200 ) {
    parentContainer.empty()
    parentContainer.append(`
      <p>Nice one! Your comment has been created.</p>
    `);

    setTimeout(() => {
      location.reload();
    }, 1000);

  } else {
    parentContainer.append(`
    <p class="error-message text-center"> Sorry, we're unable to add your comment right now. Please try again later </p>
    `)
    return
  }

}

const updateComment = async (event) => {
  const parentContainer = $(event.target).parent()
  const commentId = parentContainer.attr("id")
  const message = parentContainer.children(".form-floating").children("#updatedComment").val()

  if (message === "") {
    $(".error-message").remove()
    parentContainer.prepend(`
    <p class="error-message text-center"> Comment cannot be empty. </p>
    `)
    return
  }

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
      location.reload();
    }, 1000);
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

const deleteComment = async (event) => {
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

const createNewPost = async (event) => {
  const parentContainer = $(event.target).parent()
  const title = $("#post-title").val()
  const imageUrl = $("#post-image-url").val()
  const content = $("#post-content").val()
  
  if (title === "" || content === "" || imageUrl === "") {
    $(".error-message").remove()
    $(parentContainer).prepend(`
    <p class="error-message p-2"> Title, content and image url fields cannot be empty </p>
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
      title,
      imageUrl,
      content
    }),
  };

  const {status} = await fetch(`/api/post`, options);

  if (status === 200 ) {
    parentContainer.empty()
    parentContainer.append(`
      <p>Post created successfully</p>
    `)
    setTimeout(() => {
      window.location.replace("/dashboard")
    }, 1000)
  } else {
    parentContainer.append(`
    <p class="error-message text-center"> Sorry, we're unable to create your post right now. Please try again later </p>
    `)
    return
  }
}

const updatePost = async (event) => {
  const parentContainer = $(event.target).parent()
  const title = $("#post-title").val()
  const imageUrl = $("#post-image-url").val()
  const content = $("#post-content").val()
  const postId = $(event.target).data("postid")
  
  if (title === "" || content === "") {
    $(".error-message").remove()
    $(parentContainer).prepend(`
    <p class="error-message p-2"> Title and content fields cannot be empty </p>
    `)
    return
  }

  let options

  if(imageUrl === "") {
    options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      body: JSON.stringify({
        title,
        content,
      }),
    };
  } else {
    options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      body: JSON.stringify({
        title,
        content,
        imageUrl
      }),
    };
  }

  const {status} = await fetch(`/api/post/${postId}`, options);

  if (status === 200 ) {
    parentContainer.empty()
    parentContainer.append(`
      <p>Post updated successfully</p>
    `)
    setTimeout(() => {
      window.location.replace("/dashboard")
    }, 1000)
  } else {
    parentContainer.append(`
    <p class="error-message text-center"> Sorry, we're unable to update your post right now. Please try again later </p>
    `)
    return
  }
}

const deletePost = async (event) => {
  const parentContainer = $(event.target).parent()
  const postId = parentContainer.attr("id")

  console.log(postId)

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
  };

  const response = await fetch(`/api/post/${postId}`, options);

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
    <p class="error-message text-center"> Sorry, we're unable to delete this post right now. Please try again later. </p>
    `)
    return
  }
}

$("#signup-submit").on("click", submitSignupForm)
$("#login-submit").on("click", submitLoginForm)

$("#post-comment").on("click", createNewComment)
$('[data-name="edit-comment"]').on("click", renderEditCommentField)
$('[data-name="delete-comment"]').on("click", deleteComment)

$("#publish-post").on("click", createNewPost)
$("#update-post").on("click", updatePost)
$('[data-name="delete-post"]').on("click", deletePost)