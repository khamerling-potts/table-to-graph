function tableToGraph(friends) {
  // type your code here
  const result = {};
  let newfriends = friends.replace(
    /<tr>|<\/tr>|<table>|<\/table>|<th>|<\/th>/gm,
    ""
  );
  const friendsarr = newfriends.split(/<td>|<\/td>/gm).slice(1, -1);
  for (let i = 0; i < friendsarr.length; i += 4) {
    let current = friendsarr[i];
    let adjacent =
      friendsarr[i + 2] === "" ? [] : friendsarr[i + 2].split(", ");

    result[current] = adjacent;

    for (let friend of adjacent) {
      if (!result[friend]) result[friend] = [];
      if (!result[friend].includes(current)) result[friend].push(current);
    }
  }
  return result;
}

if (require.main === module) {
  function printResults(obj) {
    for (const key in obj) {
      console.log(`${key}: ${obj[key]}`);
    }
  }

  // add your own tests in here
  let friends =
    "<table><tr><th>Person</th><th>Friends</th></tr><tr><td>Fred</td><td>Jane, Carol, Anesh, Xi</td></tr><tr><td>Carol</td><td>Fred, Anesh, Janelle</td></tr></table>";
  let result = {
    Fred: ["Jane", "Carol", "Anesh", "Xi"],
    Jane: ["Fred"],
    Carol: ["Fred", "Anesh", "Janelle"],
    Anesh: ["Fred", "Carol"],
    Xi: ["Fred"],
    Janelle: ["Carol"],
  };

  //const newfriends = friends.replace(/<[a-z]*>|<\/[a-z]*>/gm, " ");
  //let newfriends = friends.replace(/<td>|<\/td>/gm, " ");
  // let newfriends = friends.replace(
  //   /<tr>|<\/tr>|<table>|<\/table>|<th>|<\/th>/gm,
  //   ""
  // );

  // console.log(newfriends.split(/<td>|<\/td>/gm).slice(1, -1));

  console.log("Expecting: ");
  printResults(result);
  console.log("");
  console.log("Got: ");
  printResults(tableToGraph(friends));

  console.log("");

  friends =
    "<table><tr><th>Person</th><th>Friends</th></tr><tr><td>Gremlin</td><td></td></tr></table>";
  result = {
    Gremlin: [],
  };
  console.log("Expecting: ");
  printResults(result);
  console.log("");
  console.log("Got: ");
  printResults(tableToGraph(friends));
}

module.exports = tableToGraph;

// Please add your pseudocode to this file
// And a written explanation of your solution
