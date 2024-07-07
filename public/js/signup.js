const signupFormHandler = async (event) => {
    event.preventDefault();

    const userName = document.querySelector("#name-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();

    if (userName && password) {
        const response = await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify({ name, email, password }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.replace("/profile");
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector(".signup-form")
    .addEventListener("submit", signupFormHandler);
