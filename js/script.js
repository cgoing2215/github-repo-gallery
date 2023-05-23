// div with class "overview," profile info display
const profileOverview = document.querySelector(".overview");
// github username
const username = "cgoing2215";

const gitFetch = async function (){
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();

    displayData(data);
}

gitFetch();

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
}