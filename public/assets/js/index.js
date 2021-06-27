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

$("#login-submit").on("click", submitLoginForm)