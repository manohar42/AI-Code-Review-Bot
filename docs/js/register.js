const form = document.getElementById("registerForm");
const message = document.getElementById("message");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const registerData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    };

    try {
        const response = await fetch("http://localhost:5135/api/account/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(registerData)
        });

        const data = await response.text();

        if (response.ok) {
            message.textContent = "Registration successful!";
            message.className = "text-sm mt-4 text-center text-green-500";
            form.reset();

            // optional redirect after success
            // window.location.href = "login.html";
        } else {
            message.textContent = data;
            message.className = "text-sm mt-4 text-center text-red-500";
        }
    } catch (error) {
        message.textContent = "Could not connect to backend.";
        message.className = "text-sm mt-4 text-center text-red-500";
    }
});