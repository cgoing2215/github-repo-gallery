const profileOverview = document.querySelector(".overview");
const username = "cgoing2215";
const repoList = document.querySelector(".repo-list");
const repoSection = document.querySelector(".repos");
const indivRepo = document.querySelector(".repo-data");
const backToButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

const gitFetch = async function (){
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    displayData(data);
}

gitFetch();

const displayData = function (data){
    const userInfo = document.createElement("div");
    userInfo.classList.add("user-info");
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
    gitRepos(username);
}

const gitRepos = async function (username){
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();
    displayRepo(repoData);
}

const displayRepo = function (repos){
    filterInput.classList.remove("hide");
    for (const repo of repos){
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li);
    }
};

repoList.addEventListener("click", function (e){
    if (e.target.matches("h3")){
        const repoName = e.target.innerText;
        indivRepoFetch(repoName);
    };
});

const indivRepoFetch = async function (repoName){
    const fetchReq = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchReq.json();

    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    
    const languages = [];
    for (const language in languageData){
        languages.push(language);
    }
    displayIndivRepo(repoInfo, languages);
}

const displayIndivRepo = function (repoInfo, languages){
    backToButton.classList.remove("hide");
    indivRepo.innerHTML = "";
    indivRepo.classList.remove("hide");
    repoSection.classList.add("hide");

    const div = document.createElement("div");
    div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    indivRepo.append(div);
};

backToButton.addEventListener("click", function (){
    repoSection.classList.remove("hide");
    indivRepo.classList.add("hide");
    backToButton.classList.add("hide");
});

filterInput.addEventListener("input", function(e){
    const searchValue = e.target.value;
    const repos = document.querySelectorAll(".repo");
    const lowerSearchValue = searchValue.toLowerCase();

    for (const repo of repos){
        const lowerCaseRepo = repo.innerText.toLowerCase();
        if (!lowerCaseRepo.includes(lowerSearchValue)){
            repo.classList.add("hide");
        } else {
            repo.classList.remove("hide");
        }
    };
})