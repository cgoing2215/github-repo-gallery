// div with class "overview," profile info display
const profileOverview = document.querySelector(".overview");
const username = "cgoing2215";
const repoList = document.querySelector(".repo-list");

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

