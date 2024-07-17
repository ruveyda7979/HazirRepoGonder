document.addEventListener('DOMContentLoaded', () => {
    // Home.html sayfasına özgü kodlar
    if (document.querySelector('.wrapper')) {
        const wrapper = document.querySelector('.wrapper');
        const registerLink = document.querySelector('.register-link');
        const loginLink = document.querySelector('.login-link');
        const btnPopup = document.querySelector('.btnLogin-popup');
        const iconClose = document.querySelector('.icon-close');

        registerLink.addEventListener('click', () => {
            wrapper.classList.add('active');
        });

        loginLink.addEventListener('click', () => {
            wrapper.classList.remove('active');
        });

        btnPopup.addEventListener('click', () => {

            wrapper.style.display = 'flex';
            wrapper.classList.add('active-popup')
        });

        iconClose.addEventListener('click', () => {
            wrapper.style.display = 'none';
            wrapper.classList.remove('active-popup');
            wrapper.classList.remove('active');
        });
      

    //Registration form submission
    const registrationForm = document.querySelector('.register-form');
    
        registrationForm.addEventListener('submit',(event) => {
            event.preventDefault();
            //Here you would normally send the data to the server
            const fullName = registrationForm.querySelector('input[type="text"]').value;
            const email = registrationForm.querySelector('input[type="email"]').value;
            const password = registrationForm.querySelector('input[type="password"]').value;

            //After successful registraition, redirect to login
            alert(`Registered with Name: ${fullName}, Email: ${email}`);
            wrapper.classList.remove('active');
        
        });

    
    

    //Login form submission
    const loginForm = document.querySelector('.login form');
    
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            //Here you would normally send the data to the server
            const email = loginForm.querySelector('input[type="email"]').value;
            const password = loginForm.querySelector('input[type="password"]').value;

            //After successful login,redirect to projects page
            alert(`Logged in with Email: ${email}`);
            window.location.href ='projects.html';

    
        });
    }
    

    
    

    // Projects.html sayfasına özgü kodlar
    if (document.getElementById('project-list')) {
        const projectList = document.getElementById('project-list');
        const addProjectBtn = document.getElementById('add-project-btn');
        
        const filterInput = document.getElementById('filter');

        // Modal elements
        const modal = document.getElementById('add-project-modal');
        const closeModal = document.querySelector('.close');
        const saveProjectBtn = document.getElementById('save-project-btn');
        const projectNameInput = document.getElementById('project-name');
        const projectDescriptionInput = document.getElementById('project-description');
        const projectFileInput = document.getElementById('project-file');
        const projectDateInput = document.getElementById('project-date');

       

        // Project Details Modal Elements
        const projectDetailsModal = document.getElementById('project-details-modal');
        const closeDetailsModal = projectDetailsModal.querySelector('.close');
        const detailProjectName = document.getElementById('detail-project-name');
        const detailProjectDescription = document.getElementById('detail-project-description');
        const detailProjectDate = document.getElementById('detail-project-date');
        const detailProjectFile = document.getElementById('detail-project-file');

         //Project Edit Modal
         const editModal = document.getElementById('edit-project-modal');
         const closeEditModal = document.querySelector('.close-edit');
         const updateProjectBtn = document.getElementById('update-project-btn');
         const editProjectNameInput = document.getElementById('edit-project-name');
         const editProjectDescriptionInput = document.getElementById('edit-project-description');
         const editProjectFileInput = document.getElementById('edit-project-file');
         const editProjectDateInput = document.getElementById('edit-project-date');

         let projects =[];
         let currentEditIndex = null;


        // Added Project button click event to open modal
        addProjectBtn.addEventListener('click', () => {
            modal.style.display = 'flex';
        });

        

        // Close modal event
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Close project details modal event
        closeDetailsModal.addEventListener('click', () => {
            projectDetailsModal.style.display = 'none';
        });

        // Close Edit Project Modal

        closeEditModal.addEventListener('click', () => {
            editModal.style.display ='none';
        });

        // Save project button click event
        saveProjectBtn.addEventListener('click', () => {
            const projectName = projectNameInput.value;
            const projectDescription = projectDescriptionInput.value;
            const projectFile = projectFileInput.files[0] ? projectFileInput.files[0].name : '';
            const projectDate = projectDateInput.value;

            if (projectName && projectDescription  && projectDate) {
                const project = {
                    name: projectName,
                    description:projectDescription,
                    file: projectFile,
                    date:projectDate
                };
                projects.push(project);
                renderProjects();
                modal.style.display ='none';
                clearInputs();
            } else{
                alert('Please fill in all fields');
            }
                });

                //Update Projects

                updateProjectBtn.addEventListener('click', () => {
                    const projectName = editProjectNameInput.value;
                    const projectDescription = editProjectDescriptionInput.value;
                    const projectFile = editProjectFileInput.files[0] ? editProjectFileInput.files[0].name : projects[currentEditIndex].file;
                    const projectDate = editProjectDateInput.value;

                    if(projectName && projectDescription && projectDate){
                        projects[currentEditIndex] = {
                            name:projectName,
                            description: projectDescription,
                            file: projectFile,
                            date: projectDate
                        };

                        renderProjects();
                        editModal.style.display = 'none';

                    } else{
                        alert('Please fill in all fields');
                    }
                });

                //Render Projects 
                function renderProjects(){
                    projectList.innerHTML = '';
                    projects.forEach((project,index) => {
                        const li = document.createElement('li');
                        li.innerHTML =`
                        <strong>${project.name}</strong>
                    <p>${project.description}</p>
                    <p>${project.date}</p>
                    <button class="edit-btn" data-index="${index}">Edit</button>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                `;
                projectList.appendChild(li);
                        
                    });

                    //Add Event Listeners to Edit and Delete buttons
                    document.querySelectorAll('.edit-btn').forEach(button => {

                        button.addEventListener('click', (e)=> {
                            currentEditIndex = e.target.dataset.index;
                            const project = projects[currentEditIndex];
                            editProjectNameInput.value = project.name;
                            editProjectDescriptionInput.value = project.description;
                            editProjectDateInput.value = project.date;
                            editModal.style.display = 'flex';
                            
                        });
                    });

                    document.querySelectorAll('.delete-btn').forEach(button => {
                        button.addEventListener('click', (e) => {
                            const index = e.target.dataset.index;
                            if(confirm('Are you sure you want to delete this project?')) {
                                project.splice(index, 1);
                                renderProjects();
                            }
                        });
                    });
                }

                //Clear Inputs
                function clearInputs() {
                    projectNameInput.value = '';
                    projectDescriptionInput.value = '';
                    projectFileInput.value = '';
                    projectDateInput.value = '';
                }

                // Filter Projects
        filterInput.addEventListener('keyup', () => {
            const filterValue = filterInput.value.toLowerCase();
            const filteredProjects = projects.filter(project => project.name.toLowerCase().includes(filterValue));
            projectList.innerHTML = '';
            filteredProjects.forEach((project, index) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <strong>${project.name}</strong>
                    <p>${project.description}</p>
                    <p>${project.date}</p>
                    <button class="edit-btn" data-index="${index}">Edit</button>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                `;
                projectList.appendChild(li);
            });
        });
    }


    // JSON Yönetim sayfasına özgü kodlar
    if (document.getElementById('json-container')) {
        const newJsonBtn = document.getElementById('new-json-btn');
        const searchJsonInput = document.getElementById('search-json');
        const jsonForm = document.getElementById('json-form');
        const saveBtn = document.getElementById('save-btn');
        const jsonList = document.getElementById('json-list');

        const editModal = document.getElementById('edit-json-modal');
        const closeEditModal = document.querySelector('.close-edit');
        const updateJsonBtn = document.getElementById('update-json-btn');
        const editJsonNameInput = document.getElementById('edit-json-name');
        const editRequestUrlInput = document.getElementById('edit-request-url');
        const editContentInput = document.getElementById('edit-content');
        const editRelatedTableInput = document.getElementById('edit-related-table');
        const editDateInput = document.getElementById('edit-date');
        const editSentPatternEditor = CodeMirror.fromTextArea(document.getElementById('edit-sent-pattern'), {
            lineNumbers: true,
            mode: 'javascript',
        });
        const editReceivedPatternEditor = CodeMirror.fromTextArea(document.getElementById('edit-received-pattern'), {
            lineNumbers: true,
            mode: 'javascript',
        });

        let jsonDataList = [];
        let currentEditIndex = null;

        

        

        document.getElementById('edit-sent-pattern-language').addEventListener('change', (event) => {
            const mode = event.target.value;
            editSentPatternEditor.setOption('mode', mode);
        });

        document.getElementById('edit-received-pattern-language').addEventListener('change', (event) => {
            const mode = event.target.value;
            editReceivedPatternEditor.setOption('mode', mode);
        });

        closeEditModal.addEventListener('click', () => {
            editModal.style.display = 'none';
        });

        newJsonBtn.addEventListener('click', () => {
            jsonForm.style.display = 'block';
            clearForm();
        });

        searchJsonInput.addEventListener('keyup', () => {
            const searchValue = searchJsonInput.value.toLowerCase();
            const jsonItems = jsonList.getElementsByTagName('li');
            Array.from(jsonItems).forEach((item) => {
                const itemName = item.firstChild.textContent.toLowerCase();
                if (itemName.includes(searchValue)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });

        saveBtn.addEventListener('click', () => {
            const jsonData = {
                name: document.getElementById('json-name').value,
                url: document.getElementById('request-url').value,
                content: document.getElementById('content').value,
                relatedTable: document.getElementById('related-table').value,
                date: document.getElementById('date').value,
                sentPattern: sentPatternEditor.getValue(),
                receivedPattern: receivedPatternEditor.getValue(),
            };

            if (jsonData.name) {
                let li;
                const existingIndex = jsonDataList.findIndex((data) => data.name === jsonData.name);
                if (existingIndex >= 0) {
                    li = jsonList.children[existingIndex];
                    jsonDataList[existingIndex] = jsonData;
                } else {
                    li = document.createElement('li');
                    li.innerHTML = `<span>${jsonData.name}</span>`;
                    jsonList.appendChild(li);
                    jsonDataList.push(jsonData);

                    li.addEventListener('click', () => {
                        fillForm(jsonData);
                        currentEditIndex = existingIndex;
                        editJsonNameInput.value = jsonData.name;
                        editRequestUrlInput.value = jsonData.url;
                        editContentInput.value = jsonData.content;
                        editRelatedTableInput.value = jsonData.relatedTable;
                        editDateInput.value = jsonData.date;
                        editSentPatternEditor.setValue(jsonData.sentPattern);
                        editReceivedPatternEditor.setValue(jsonData.receivedPattern);
                        editModal.style.display = 'flex';
                    });

                    const deleteBtn = document.createElement('button');
                    deleteBtn.textContent = 'Delete';
                    deleteBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        if (confirm('Are you sure you want to delete this JSON entry?')) {
                            const index = jsonDataList.findIndex((data) => data.name === jsonData.name);
                            jsonDataList.splice(index, 1);
                            jsonList.removeChild(li);
                            clearForm();
                        }
                    });

                    li.appendChild(deleteBtn);
                }

                clearForm();
            } else {
                alert('JSON Name is required.');
            }
        });

        updateJsonBtn.addEventListener('click', () => {
            const jsonData = {
                name: editJsonNameInput.value,
                url: editRequestUrlInput.value,
                content: editContentInput.value,
                relatedTable: editRelatedTableInput.value,
                date: editDateInput.value,
                sentPattern: editSentPatternEditor.getValue(),
                receivedPattern: editReceivedPatternEditor.getValue(),
            };

            if (jsonData.name) {
                jsonDataList[currentEditIndex] = jsonData;
                renderJsonList();
                editModal.style.display = 'none';
            } else {
                alert('JSON Name is required.');
            }
        });

        function fillForm(jsonData) {
            document.getElementById('json-name').value = jsonData.name;
            document.getElementById('request-url').value = jsonData.url;
            document.getElementById('content').value = jsonData.content;
            document.getElementById('related-table').value = jsonData.relatedTable;
            document.getElementById('date').value = jsonData.date;
            sentPatternEditor.setValue(jsonData.sentPattern);
            receivedPatternEditor.setValue(jsonData.receivedPattern);
            sentPatternEditor.refresh();
            receivedPatternEditor.refresh();
        }

        function clearForm() {
            document.getElementById('json-name').value = '';
            document.getElementById('request-url').value = '';
            document.getElementById('content').value = '';
            document.getElementById('related-table').value = '';
            document.getElementById('date').value = '';
            sentPatternEditor.setValue('');
            receivedPatternEditor.setValue('');
        }

        function renderJsonList() {
            jsonList.innerHTML = '';
            jsonDataList.forEach((jsonData, index) => {
                const li = document.createElement('li');
                li.innerHTML = `<span>${jsonData.name}</span>`;
                li.addEventListener('click', () => {
                    fillForm(jsonData);
                    currentEditIndex = index;
                    editJsonNameInput.value = jsonData.name;
                    editRequestUrlInput.value = jsonData.url;
                    editContentInput.value = jsonData.content;
                    editRelatedTableInput.value = jsonData.relatedTable;
                    editDateInput.value = jsonData.date;
                    editSentPatternEditor.setValue(jsonData.sentPattern);
                    editReceivedPatternEditor.setValue(jsonData.receivedPattern);
                    editModal.style.display = 'flex';
                });

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (confirm('Are you sure you want to delete this JSON entry?')) {
                        jsonDataList.splice(index, 1);
                        renderJsonList();
                        clearForm();
                    }
                });

                li.appendChild(deleteBtn);
                jsonList.appendChild(li);
            });
        }
    }
});