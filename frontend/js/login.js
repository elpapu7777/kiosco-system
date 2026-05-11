    async function login() {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const response = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  });

  const data = await response.json();

  const message = document.getElementById("message");

  if (data.success) {
    message.style.color = "green";
    message.innerText = data.message;

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1000);

  } else {
    message.style.color = "red";
    message.innerText = data.message;
  }
}