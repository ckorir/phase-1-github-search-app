
document.addEventListener('DOMContentLoaded', () => {

    const form = document.querySelector('#github-form')
    const userList = document.querySelector('#user-list')
    const repoList = document.querySelector('#repos-list')

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchValue = e.target.search.value;
        searchUser(searchValue);
        form.reset();
    })

    function searchUser(search) {
        const url = `https://api.github.com/search/users?q=${search}`;

        return fetch(url)

        .then(response => response.json())
        .then(data => {
        // Clear previous user list
            userList.innerHTML = '';
            // handle the retrieved user data
            data.items.forEach(user => {
                const userName = document.createElement('p');
                const userImg = document.createElement('img')
                userImg.src = user.avatar_url
                userName.textContent = user.login;
                console.log(user)
                userList.appendChild(userName);
                userList.appendChild(userImg);
                userProfile = userName + userImg
                // Adda a click event to the users
                userName.addEventListener('click', () => {

                    const url = `https://api.github.com/users/${search}/repos`;
                    
                    return fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        // Clear previous user list
                        repoList.innerHTML = '';
                        // Makes an event for each reop
                        data.forEach(r => {
                            // Create HTML Elements
                            const repoName = document.createElement('li')
                            const repoLink = document.createElement('a');
                
                            repoLink.href = r.html_url;
                            repoLink.textContent = r.name;
                            // Appends Elements to DOM
                            repoName.appendChild(repoLink);
                            repoList.appendChild(repoName);
                            
                        })
                    })
                })
            })
            return data;
        })
    }
})

