// div with class "overview," profile info display
const profileOverview = document.querySelector(".overview");
const username = "cgoing2215";
const repoList = document.querySelector(".repo-list");
const repoSection = document.querySelector(".repos");
const indivRepo = document.querySelector(".repo-data");

const gitFetch = async function (){
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();

    displayData(data);
}

gitFetch();

// fetch & display User Information 
const displayData = function (data){
    const userInfo = document.createElement("div");
    userInfo.classList.add(".user-info");

    userInfo.innerHTML = `
    <figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>
    `;

    profileOverview.append(userInfo);
    gitRepos();
}

// fetch repos
const gitRepos = async function (){
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();

    displayRepo(repoData);
}

// display info about repos
const displayRepo = function (repos){
    for (const repo of repos){
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name} </h3>`;

        repoList.append(li);
    }
};

// click event for repo box
repoList.addEventListener("click", function (e){
    if (e.target.matches("h3")){
        const repoName = e.target.innerText;
        indivRepoFetch(repoName);
    };
});

// get specific repo info
const indivRepoFetch = async function (repoName){
    const fetchReq = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchReq.json();
    console.log(repoInfo);

    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    console.log(languageData);
    
    const languages = [];
    for (const language in languageData){
        languages.push(language);
    }
    displayIndivRepo(repoInfo, languages);
}

// display specific repo info
const displayIndivRepo = function (repoInfo, languages){
    indivRepo.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;

    indivRepo.append(div);

    indivRepo.classList.remove("hide");
    indivRepo.classList.add("repo-data");
    repoSection.classList.add("hide");
}