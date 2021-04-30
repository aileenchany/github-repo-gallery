const divElement = document.querySelector(".overview"); //selects <div class="overview">.This div is where your profile information will appear.
const repoListElement = document.querySelector(".repo-list"); //selects the <ul> element
const username = "aileenchany";

//Async function that fetches user data from GitHub API
const getUsername = async function() {
    const apiUrl = await fetch(`https://api.github.com/users/${username}`);
    const data = await apiUrl.json();
    //console.log(data);

    displayUserInfo(data);
    fetchMyRepos();
};

getUsername();

//Function that displays user data
const displayUserInfo = function(data) {
    const userInfoElement = document.createElement("div"); //created a new <div>
    userInfoElement.classList.add("user-info"); //added a class to the <div> & below we add new html inside the <div>
    userInfoElement.innerHTML = `<figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`;
    divElement.append(userInfoElement); //we store "userInfoElement" inside "divElement"
};

//Function to fetch my repos
const fetchMyRepos = async function() {
    const myReposUrl = await fetch(`https://api.github.com/users/${username}/repos`);
    const myReposData = await myReposUrl.json();
    //console.log(myReposData);
    displayReposInfo(myReposData);
};

//Function that displays info about my repos
const displayReposInfo = function(repos) {
    for (const repo of repos) { 
        const li = document.createElement("li"); //created <li> 
        li.classList.add("repo"); //adding class to <li>
        li.innerHTML = `<h3>${repo.name}</h3>`; //adding repo name into <h3>
        repoListElement.append(li); //appending aka 'saving' the <li> inside the <ul>

        //console.log(li);
    }
};