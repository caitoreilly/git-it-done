var issueContainerElement = document.querySelector("#issues-container");

var limitWarningElement = document.querySelector("#limit-warning");

var getRepoIssues = function (repo) {
  console.log(repo);
  var apiURL = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
  fetch(apiURL).then(function (response) {
    // request was successful
    if (response.ok) {
      response.json().then(function (data) {
        // pass response data to DOM function
        displayIssues(data);
        console.log(data);

        //check if api has paginated issues
        if (response.headers.get("Link")) {
          displayWarning(repo);
        }
      });
    } else {
      alert("There was a problem with your request!");
    }
  });
};

var displayIssues = function (issues) {
  // add if statement to check for when there's a repository with no open issues
  if (issues.length === 0) {
    issueContainerElement.textContent = "This repo has no open issues!";
    return;
  }

  // loop over the response data and create an <a> element for each issue
  for (var i = 0; i < issues.length; i++) {
    //create a link element to take users to the issue on github
    var issueElement = document.createElement("a");
    issueElement.classList =
      "list-item flex-row justify-space-bewteen align-center";
    issueElement.setAttribute("href", issues[i].html_url);
    issueElement.setAttribute("target", "_blank");

    // create span to hold issue title
    var titleElement = document.createElement("span");
    titleElement.textContent = issues[i].title;

    // append to container
    issueElement.appendChild(titleElement);

    // create a type element
    var typeElement = document.createElement("span");

    // check if issue is an actual issue or a pull request
    if (issues[i].pull_request) {
      typeElement.textContent = "(Pull request)";
    } else {
      typeElement.textContent = "(Issue)";
    }

    // append to container
    issueElement.appendChild(typeElement);

    // append issue element <a> to issues container
    issueContainerElement.appendChild(issueElement);
  }
};

var displayWarning = function (repo) {
  // add text to warning container
  limitWarningElement.textContent = "To see more than 30 issues, visit ";

  // create link element
  var linkElement = document.createElement("a");
  linkElement.textContent = "GitHub.com";
  linkElement.setAttribute("href", "https://github.com/" + repo + "/issues");
  linkElement.setAttribute("target", "_blank");
  console.log(limitWarningElement);

  // append to warning container
  limitWarningElement.appendChild(linkElement);
};

getRepoIssues("facebook/react");
