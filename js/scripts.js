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
        
        // Projeleri ekleme
        addProjectBtn.addEventListener('click', () => {
            const projectName = prompt('Enter project name:');
            if (projectName) {
                const li = document.createElement('li');
                li.textContent = projectName;
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.addEventListener('click', () => {

                    //confirm message
                    if(confirm('Are you sure you want to delete this project?')){
                        projectList.removeChild(li);

                    }
     
                });
                li.appendChild(deleteBtn);
                projectList.appendChild(li);
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
});
