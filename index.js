const form = document.forms.input;

function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const asString = new URLSearchParams(formData).toString();
    window.location.href = `results.html?${asString}`
}

form.addEventListener('submit', handleSubmit)
