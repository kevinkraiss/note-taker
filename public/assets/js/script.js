const notesList = document.querySelector('list-group')

const renderListItems = (listItem) => {
    notesList.innerHTML = ''
    listItem.forEach(listItem => {
        const li = document.createElement('li')
        li.innerHTML = `<li>${listItem.title}</li>`

        notesList.appendChild(li)
    })
}
