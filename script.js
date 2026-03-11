const copyBtn = document.getElementById("copyBtn");
const passwordDisplay = document.getElementById("passwordDisplay")

copyBtn.addEventListener("click", () => {
    const password = passwordDisplay.innerText;
    if (!password || password === "Click generate...") return;

    navigator.clipboard.writeText(password).then(() => {
        alert("Password copied to clipboard!");
    });
});

