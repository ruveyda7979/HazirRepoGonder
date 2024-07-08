document.addEventListener('DOMContentLoaded', () => {
    // Home.html sayfasına özgü kodlar
    if (document.querySelector('.wrapper')) {
        const wrapper = document.querySelector('.wrapper');
        const registerLink = document.querySelector('.register-link');
        const loginLink = document.querySelector('.login-link');
        const btnPopup = document.querySelector('.btnLogin-popup');
        const iconClose = document.querySelector('.icon-close');
        
        registerLink.onclick = () => {
            wrapper.classList.add('active');
        };
        
        loginLink.onclick = () => {
            wrapper.classList.remove('active');
        };
        
        btnPopup.onclick = () => {
            wrapper.classList.add('active-popup');
        };
        
        iconClose.onclick = () => {
            wrapper.classList.remove('active-popup');
            wrapper.classList.remove('active');
        };
    }

    // Projects.html sayfasına özgü kodlar
    if (document.getElementById('project-list')) {
        const projectList = document.getElementById('project-list');
        const addProjectBtn = document.getElementById('add-project-btn');
        const filterInput = document.getElementById('filter');


        //Modal elements

        const modal = document.getElementById('add-project-modal');
        const closeModal =document.querySelector('.close');
        const saveProjectBtn = document.getElementById('save-project-btn');
        const projectNameInput = document.getElementById('project-name');
        const projectDescriptionInput = document.getElementById('project-description');
        const projectFileInput = document.getElementById('project-file');
        const projectDateInput = document.getElementById('project-date');

        //Added Project button click event to open modal
        addProjectBtn.addEventListener('click', () => {
            modal.style.display = 'flex';
        });

        // Close modal event
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Save project button click event 
        saveProjectBtn.addEventListener('click', () => {
            const projectName = projectNameInput.value;
            const projectDescription = projectDescriptionInput.value;
            const projectFile = projectFileInput.files[0];
            const projectDate = projectDateInput.value;


            if(projectName && projectDescription && projectFile && projectDate) {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${projectName}</strong><p>${projectDescription}</p><p>${projectDate}</p>`;
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.addEventListener('click', () => {
                    if(confirm('Are you sure you want to delete this project? ')){
                        projectList.removeChild(li);
                    } 
                });
                
                li.appendChild(deleteBtn);
                projectList.appendChild(li);

                //Clear inputs and close modal

                projectNameInput.value = '';
                projectDescriptionInput.value = '';
                projectFileInput.value = '';
                projectDateInput.value = '';
                modal.style.display = 'none';
            

            } else {
                alert('Please fill in all fields');
            }
        });



        // Projeleri filtreleme
        filterInput.addEventListener('keyup', () => {
            const filterValue = filterInput.value.toLowerCase();
            const projects = projectList.getElementsByTagName('li');
            Array.from(projects).forEach(project => {
                const projectName = project.firstChild.textContent;
                if (projectName.toLowerCase().indexOf(filterValue) != -1) {
                    project.style.display = 'flex';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    }


    if (document.getElementById('json-container')) {
        const newJsonBtn = document.getElementById('new-json-btn');
        const searchBtn = document.getElementById('search-btn');
        const searchJsonInput = document.getElementById('search-json');
        const jsonForm = document.getElementById('json-form');
        const saveBtn = document.getElementById('save-btn');


        newJsonBtn.addEventListener('click', () => {
            jsonForm.style.display ='block';
            clearForm();
        });

        searchBtn.addEventListener('click', () => {
            const searchValue = searchJsonInput.value;
            //JSON arama fonksiyonu burada olacak
        });

        saveBtn.addEventListener('click', () => {
            const jsonData = {
                name: document.getElementById('json-name').value,
                url: document.getElementById('request-url').value,
                content: document.getElementById('content').value,
                relatedTable: document.getElementById('related-table').value,
                sendPattern: document.getElementById('sent-pattern').value,
                receivedPattern:document.getElementById('received-pattern').value
            };
            //JSON kaydetme fonksiyonu burada olacak
        });

        function clearForm(){
            document.getElementById('json-name').value = '';
            document.getElementById('request-url').value = '';
            document.getElementById('content').value = '';
            document.getElementById('related-table').value = '';
            document.getElementById('sent-pattern').value = '';
            document.getElementById('received-pattern').value =''; 

        }

    
    }





});
