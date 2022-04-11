const form = document.forms.input;
const stateDropdown = document.querySelector("select")

function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const asString = new URLSearchParams(formData).toString();
    window.location.href = `results.html?${asString}`
}

fetch("./assets/states.json")
    .then(response => response.json())
    .then(response => {
        response.map(response => {
            const state = document.createElement("option")
            state.textContent = `${response.name}`
            state.value = `${response.state_code}`
            return state
        }).forEach(state => {
            stateDropdown.append(state)
        })

    })

form.addEventListener('submit', handleSubmit)
