// ES2015 Promises Assignment

// 1. Write a function called getMostFollowers, which accepts a variable number of arguments. You should then make an AJAX call to the Github User API (https://developer.github.com/v3/users/#get-a-single-user) to get the name and number of followers of each argument. The function should return a promise, which when resolved, returns a string which displays the username who has the most followers. 

// Hint - Try to use Promise.all to solve this and remember that the jQuery AJAX methods ($.getJSON, $.ajax, etc.) return a promise.

console.log("Promises exercises")

const base_url = "https://api.github.com/users"

function getMostFollowers(...args) {
  return Promise.all(
    args.map(username => {
      return $.getJSON(`${base_url}/${username}`);
    }))
    .then(data => data.map(userdata => {
      const {login, followers} = userdata;
      return {login, followers};
    }))
    .then(data => (
      data.reduce((user, u) => {
        if(u.followers > user.followers) {
          return u;
        }
        else {
          return user;
        }
      }, { followers: -1})
    ))
    .then(data => `${data.login} has the most followers with ${data.followers}`);
}


// Test
getMostFollowers("elie", "colt", "tigarcia")
  .then(data => console.log(data));


const base_url_star_wars = "https://swapi.co/api"; 

function starWarsString(id) {
  return $.getJSON(`${base_url_star_wars}/people/${id}`)
    .then(data => {
      return new Promise((resolve, reject) => {
        $.getJSON(data.films[0]).then(filmData => {
          resolve({
            name: data.name,
            film: filmData.title,
            director: filmData.director,
            planets: filmData.planets,
          });
        })
      });
    })
    .then(data => {
      return new Promise((resolve, reject) => {
        $.getJSON(data.planets[0])
          .then(planetData => {
            resolve(`${data.name} is featured in ${data.film}, directed by ${data.director} and it takes place on ${planetData.name}`);
          });
    });
  });
}

// Test case
starWarsString(1).then(data => console.log(data));
