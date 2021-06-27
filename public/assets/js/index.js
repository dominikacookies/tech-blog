console.log("hello to client")

const submitLoginForm = (event) => {
  event.preventDefault()
  console.log("submitting")
}

$("#login-submit").on("click", submitLoginForm)