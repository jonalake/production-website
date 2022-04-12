const form = document.forms.input
const stateDropdown = document.querySelector("select")

function handleSubmit(event) {
    event.preventDefault()

    const formData = new FormData(event.target)
    const asString = new URLSearchParams(formData).toString()
    window.location.href = `results.html?${asString}`
}

fetch("./assets/states.json")
    .then(response => response.json())
    .then(stateList => {
        stateList.map(state => {
            const option = document.createElement("option")
            option.textContent = `${state.name}`
            option.value = `${state.state_code}`
            option.name = "state"
            return option
        }).forEach(option => {
            stateDropdown.append(option)
        })
    })

form.addEventListener("submit", handleSubmit)