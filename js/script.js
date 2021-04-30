const divElement = document.querySelector(".overview"); //selects <div class="overview">.This div is where your profile information will appear.
const username = "aileenchany";

//Async function that fetches user data from GitHub API
const getUsername = async function() {
    const apiUrl = await fetch(`https://api.github.com/users/${username}`);
    const data = await apiUrl.json();
    console.log(data);

    displayUserInfo(data);
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