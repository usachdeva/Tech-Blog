// for signup
const signupFormHandler = async (event) => {
    event.preventDefault();

    const userName = document.querySelector("#userName-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();

    if (userName && password) {
        const response = await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify({ userName, password }),
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
