const divElement = document.querySelector(".overview"); //selects <div class="overview">.This div is where your profile information will appear.
const repoList = document.querySelector(".repo-list"); //selects the <ul> element
const reposSection =document.querySelector(".repos"); //selects <section> element where all repo names will live in
const repoDataSection = document.querySelector(".repo-data"); // selects <section> where each repo's data will be stored in 
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
    console.log(myReposData);
    displayReposInfo(myReposData);
};

//Function that displays info about my repos
const displayReposInfo = function(repos) {
    for (const repo of repos) { 
        const li = document.createElement("li"); //created <li> 
        li.classList.add("repo"); //adding class to <li>
        li.innerHTML = `<h3>${repo.name}</h3>`; //adding repo name into <h3>
        repoList.append(li); //appending aka 'saving' the <li> inside the <ul>

        //console.log(li);
    }
};

//Event listener for <ul> section
repoList.addEventListener("click", function(e) {
    //e.preventDefault();
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;

        console.log(repoName);
        getSpecificRepoInfo(repoName);
       
    }
});

//Function to Get Specific Repo Info
const getSpecificRepoInfo = async function(name) {
    const repoUrl = await fetch(`https://api.github.com/repos/${username}/${name}`); //end point parameters = /repos/{owner}/{repo}
    const repoInfo = await repoUrl.json();

    console.log(repoInfo);

    //Fetch language data & create an Array of Languages
    const fetchLanguages = await fetch(repoInfo.languages_url); //gets the languages_url data 
    const languageData = await fetchLanguages.json();

    console.log(languageData);

    const languages = [];

    for (const language in languageData) {
        languages.push(language); //we push the language inside the data into the "languages" array
    }
    displaySpecificRepoInfo(repoInfo, languages);
};

//Function to Display Specific Repo Info
const displaySpecificRepoInfo = function(repoInfo, languages) {
    repoDataSection.innerHTML = "";
    repoDataSection.classList.remove("hide");
    reposSection.classList.add("hide");

    const repoDataDiv = document.createElement("div");
    repoDataDiv.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;

    repoDataSection.append(repoDataDiv);
};