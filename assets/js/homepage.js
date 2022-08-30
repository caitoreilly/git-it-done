var getUserRepos = function(){
    var response = fetch("https://api/github.com/users/octocat/repos");
    console.log(response);
};

getUserRepos();