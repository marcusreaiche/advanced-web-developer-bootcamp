/*
Coding Exercise - Async Functions Assignment
Async Functions Assignment

1. Write a function called hasMostFollowers, which accepts a variable number of arguments. You should then make an AJAX call to the Github User API (https://developer.github.com/v3/users/#get-a-single-user) to get the name and number of followers of each argument. The function should return a string which displays the username who has the most followers. 

Hint - Try to use Promise.all to solve this and remember that the jQuery AJAX methods ($.getJSON, $.ajax, etc.) return a promise.

    hasMostFollowers('elie','tigarcia','colt').then(function(data){
        console.log(data)
    });
     
    "Colt has the most followers with 424" 

*/

const base_url = "https://api.github.com/users";

async function hasMostFollowers(...users){
  try {
    const usersData = await Promise.all(
      users.map(user => $.getJSON(`${base_url}/${user}`)));
    const user = usersData.reduce((user, curr) => {
      if(curr.followers > user.followers) {
        return curr;
      }
      else {
        return user;
      }
    }, {followers: -1});
    return `${user.login} has the most followers with ${user.followers}`;
  } catch (error) {
    console.log(error.message);
    return ;
  }
}

// Tests
hasMostFollowers('elie','tigarcia','colt').then(function(data){
  console.log(data)
});

hasMostFollowers("stolinski", "flaviocopes", "tylermcginnis", "colt").then(function(data){
  console.log(data)
});

hasMostFollowers("wesbos", "tylermcginnis").then(function(data){
  console.log(data)
});
/*

2. Write a function called starWarsString, which accepts a number. You should then make an AJAX call to the Star Wars API (https://swapi.co/ ) to search for a specific character by the number passed to the function. Your function should return a promise that when resolved will console.log the name of the character.

    starWarsString(1).then(function(data){
        console.log(data)
    })
     
    "Luke Skywalker"

Bonus 1 -  Using the data from the previous AJAX call above, make another AJAX request to get the first film that character is featured in and return a promise that when resolved will console.log the name of the character and the film they are featured in 

    starWarsString(1).then(function(data){
        console.log(data)
    })
     
    "Luke Skywalker is featured in The Empire Strikes Back, directed by Irvin Kershner"

Bonus 2 -  Using the data from Bonus 1 - make another AJAX call to get the information about the first planet that the film contains. Your function should return a promise that when resolved will console.log the name of the character and the film they are featured in and the name of the planet. 

    starWarsString(1).then(function(data){
        console.log(data)
    })
     
    "Luke Skywalker is featured in The Empire Strikes Back, directed by Irvin Kershner and it takes place on Hoth"

*/

const api = axios.create({
  baseURL: "https://swapi.co/api/people"
});

async function starWarsString(id) {
  // Get person data
  const response = await api.get(`/${id}`);
  const {name, films} = response.data;
  // Get film data
  const filmResponse = await axios.get(films[0]);
  const {title: film, director, planets} = filmResponse.data;
  // Get planet data
  const planetResponse = await axios.get(planets[0]);
  const {name: planet} = planetResponse.data;
  return `${name} is featured in ${film}, directed by ${director} and it takes place on ${planet}`;
}

// Tests
starWarsString(1).then(function(data){
  console.log(data)
});

function nonBlockingRequest() {
  for (let i = 1; i < 17; i++) {
    starWarsString(i).then(data => console.log(`async ${i}: ` ,data));
  }
}

async function blockingRequest() {
  for (let i = 1; i < 17; i++) {
    const data = await starWarsString(i);
    console.log(`sync ${i}: `, data);
  }
}
nonBlockingRequest();
blockingRequest();
