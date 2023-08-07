const addBox = document.querySelector('.add-box')
const popupBox = document.querySelector('.popup-box')
const popupTitle = popupBox.querySelector('header p')
const closeIcon = popupBox.querySelector('header i')
const titleTag = popupBox.querySelector('input')
const descTag = popupBox.querySelector('textarea')
const addBtn = popupBox.querySelector('button')

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
//  getting localstorage note it it exist and parsing them
// to js objects else passing an empty array to notes
const notes = JSON.parse(localStorage.getItem('notes') || '[]')

addBox.addEventListener('click', () => {
    titleTag.focus()
    popupBox.classList.add('show')
})
closeIcon.addEventListener('click', () => {
    titleTag.value = ''
    descTag.value = ''
    addBtn.innerHTML = 'Add Note'
    popupTitle.innerHTML = 'Add a New Note'
    popupBox.classList.remove('show')
})

function showNotes() {
    document.querySelectorAll('.note').forEach((note) => note.remove())
    notes.forEach((note, index) => {
        let liTag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${note.description}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="fa fa-ellipsis-h" aria-hidden="true"></i>
                                <ul class="menu">
                                <li onclick="updateNote(${index}, '${note.title}', '${note.description}')"><i class="fa fa-pencil-square" aria-hidden="true"></i>Edit</li>
                                <li onclick="deletNote(${index})"><i class="fa fa-trash" aria-hidden="true"></i>Delete</li>
                                </ul>
                            </div>
                        </div>
                    </li>`
        addBox.insertAdjacentHTML('afterend', liTag)
    })
}

showNotes()

function showMenu(elem) {
    elem.parentElement.classList.add('show')
    document.addEventListener('click', (e) => {
        if (e.target.tagName != 'I' || e.target != elem) {
            elem.parentElement.classList.remove('show')
        }
    })
}

function deletNote(noteId) {
    let confirmDel = confirm('are you sure you want to delete?')
    if (!confirmDel) return
    notes.splice(noteId, 1) //remove selected notes from array task/list
    // update deleted note list
    localStorage.setItem('notes', JSON.stringify(notes))
    showNotes()
}

function updateNote(noteId, title, desc) {
    addBox.click()
    titleTag.value = title
    descTag.value = desc
    addBtn.innerHTML = 'update Note'
    popupTitle.innerHTML = 'update a Note'
    console.log(noteId, title, desc)
}

addBtn.addEventListener('click', (e) => {
    e.preventDefault()
    let noteTitle = titleTag.value,
        noteDesc = descTag.value

    if (noteTitle || noteDesc) {
        let dateObj = new Date(),
            month = months[dateObj.getMonth()],
            day = dateObj.getDate(),
            year = dateObj.getFullYear()

        let noteInfo = {
            title: noteTitle,
            description: noteDesc,
            date: `${month} ${day}, ${year}`,
        }

        notes.push(noteInfo)
        // saving notes to local storae
        localStorage.setItem('notes', JSON.stringify(notes))
        closeIcon.click()
        showNotes()
    }
})
