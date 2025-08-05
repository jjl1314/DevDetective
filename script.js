const modeBtn = document.getElementById("btn-mode");
const modeText = document.getElementById("mode-text");
const body = document.body;

modeBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  body.classList.toggle("light-mode");
  const isDark = body.classList.contains("dark-mode");
  modeText.innerText = isDark ? "LIGHT" : "DARK";
});

const url = "https://api.github.com/users/";
const input = document.getElementById("input");
const searchBtn = document.getElementById("submit");
const noResults = document.getElementById("no-results");
const profileContainer = document.getElementById("profile-container");
const clearBtn = document.getElementById("clear");

searchBtn.addEventListener("click", () => {
  const username = input.value;
  if (username === "") return;

  fetch(url + username)
    .then((res) => res.json())
    .then((data) => {
      if (data.message === "Not Found") {
        alert("User not found!");
        return;
      }
     
      document.getElementById("user-img").src = data.avatar_url;
      document.getElementById("name").innerText = data.name || data.login;
      document.getElementById("username").innerText = `@${data.login}`;
      
      const joinDate = new Date(data.created_at);
      const options = { day: 'numeric', month: 'short', year: 'numeric' };
      document.getElementById("join-date").innerText = `Joined ${joinDate.toLocaleDateString('en-GB', options)}`;
      
      document.getElementById("bio").innerText = data.bio || "No bio available.";
      document.getElementById("repos").innerText = data.public_repos;
      document.getElementById("followers").innerText = data.followers;
      document.getElementById("following").innerText = data.following;
      
      document.getElementById("location").innerText = data.location || "Not Available";
      document.getElementById("blog").innerText = data.blog ? data.blog.replace(/^https?:\/\//, '') : "Not Available";
      document.getElementById("twitter").innerText = data.twitter_username ? `@${data.twitter_username}` : "Not Available";
      document.getElementById("company").innerText = data.company || "Not Available";

      profileContainer.classList.remove("hidden");
    })
    .catch((err) => {
      console.error("Error fetching data:", err);
      alert("Something went wrong.");
    });
});

input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

clearBtn.addEventListener("click", () => {
  input.value = "";
  input.focus();
  profileContainer.classList.add("hidden");
});