const title = document.querySelector('#title');
const notes = document.querySelector('#notes');
const btn = document.querySelector('#btn');

const savedNotesDiv = document.querySelector('#saved-notes-div');
const savedNotes = document.querySelector('#saved-notes');

const noNote = document.querySelector('.no-note')

let h3 = '';
let p = '';

const date = new Date().toDateString();

const noteKey = 'notes';

document.addEventListener('DOMContentLoaded', () => {

    const fetchedNotes = [...JSON.parse(localStorage.getItem(noteKey))]

    fetchedNotes.forEach(note => {
        // appendingNotes();


        const div = document.createElement('div');
        h3 = document.createElement('h3');
        p = document.createElement('p');
        const btnDiv = document.createElement('div');
        const btnDelete = document.createElement('button');
        const btnEdit = document.createElement('button');
        const small = document.createElement('small');


        div.className = 'note';
        div.id = 'saved-notes';
        h3.innerText = note.title;
        h3.id = 'note-title';
        p.id = 'note-desc';
        p.innerText = note.notes;

        btnDiv.className = 'buttons';

        btnDelete.id = 'delete';
        btnDelete.className = 'delete-btn';
        btnDelete.innerText = 'Delete Note';
        btnDelete.setAttribute('onclick', 'deleteNote(event)')

        btnEdit.id = 'edit';
        btnEdit.className = 'edit-btn';
        btnEdit.innerText = 'Edit Note'
        btnEdit.setAttribute('onclick', 'editNote(event)')

        btnDiv.append(btnDelete, btnEdit);

        small.id = 'date';
        small.innerText = date;

        div.append(h3);
        div.append(p);
        div.append(btnDiv);
        div.append(small);

        savedNotesDiv.append(div);

        noNoteFun();
    })
})


btn.addEventListener('click', () => {
    if (title.value == '') {
        title.parentElement.className = 'warning';
        title.placeholder = 'Title is Required!';
    }
    else {
        appendingNotes();
        noNoteFun();
        title.placeholder = 'Title';
        title.parentElement.classList.remove('warning');

        // Saving Notes to the localStorage

        localStorage.setItem(noteKey, JSON.stringify([...JSON.parse(localStorage.getItem(noteKey) || '[]'), { title: title.value, notes: notes.value }]))

        notes.value = '';
        title.value = '';
    }
});

function appendingNotes() {
    const div = document.createElement('div');
    h3 = document.createElement('h3');
    p = document.createElement('p');
    const btnDiv = document.createElement('div');
    const btnDelete = document.createElement('button');
    const btnEdit = document.createElement('button');
    const small = document.createElement('small');


    div.className = 'note';
    div.id = 'saved-notes';
    h3.innerText = title.value;
    h3.id = 'note-title';
    p.id = 'note-desc';
    p.innerText = notes.value;

    btnDiv.className = 'buttons';

    btnDelete.id = 'delete';
    btnDelete.className = 'delete-btn';
    btnDelete.innerText = 'Delete Note';
    btnDelete.setAttribute('onclick', 'deleteNote(event)')

    btnEdit.id = 'edit';
    btnEdit.className = 'edit-btn';
    btnEdit.innerText = 'Edit Note'
    btnEdit.setAttribute('onclick', 'editNote(event)')

    btnDiv.append(btnDelete, btnEdit);

    small.id = 'date';
    small.innerText = date;

    div.append(h3);
    div.append(p);
    div.append(btnDiv);
    div.append(small);

    savedNotesDiv.append(div);

}


function deleteNote(event) {
    let noteList = event.target.parentElement.parentElement;
    let noteListTitle = event.target.parentElement.parentElement.firstChild;
    noteList.remove();

    // Remove From localStorage

    const fetchedNotes = [...JSON.parse(localStorage.getItem(noteKey))]

    fetchedNotes.forEach(note => {
        if (note.title == noteListTitle.innerText) {
            fetchedNotes.splice(fetchedNotes.indexOf(note), 1)
        }
    })

    localStorage.setItem(noteKey, JSON.stringify(fetchedNotes))

    noNoteFun();
}

function editNote(event) {
    // deleteNote();
    let noteList = event.target.parentElement.parentElement;
    let noteListTitle = event.target.parentElement.parentElement.firstChild;
    noteList.remove();

    // Remove from local storage

    const fetchedNotes = [...JSON.parse(localStorage.getItem(noteKey))]

    fetchedNotes.forEach(note => {
        if (note.title == noteListTitle.innerText) {
            fetchedNotes.splice(fetchedNotes.indexOf(note), 1)
        }
    })

    localStorage.setItem(noteKey, JSON.stringify(fetchedNotes))

    title.value = h3.innerText;
    notes.value = p.innerText;

    noNoteFun();
}

function noNoteFun() {
    savedNotesDiv.children.length > 1 ? noNote.hidden = true : noNote.hidden = false;
}
