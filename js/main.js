
// Form submission
let form = document.querySelector('#testDataForm')




// let headings =['Position','Name','Nationality','Sponsor','Points']
// function createTable2()
// {
//     // create table
//     const table = document.createElement("table");

//     // create caption and add to table
//     const caption = document.createElement("caption");
//     const captiontext = document.createTextNode("Elements");
//     caption.appendChild(captiontext);
//     table.appendChild(caption);

//     // create row for headings...
//     const hrow = document.createElement("tr");
//     table.appendChild(hrow);

//     // ...and add cells to it
//     for(let heading of headings)
//     {
//         const th = document.createElement("th");
//         const thtext = document.createTextNode(heading);
//         th.appendChild(thtext);
//         hrow.appendChild(th);
//     }
// }

// racer example

const racer_data = async (racers) => {
    
    let response = await axios.get(`https://ergast.com/api/f1/${query_season}/${query_round}/driverStandings.json`)
    //console.log(response.data)
    for(let i = 0;i<7;i++){
        let position=i+1;
        let firstName = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.givenName;
        let lastName= response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.familyName
        let name= firstName+" "+ lastName;
        let nationality= response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.nationality;
        let sponsor= response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Constructors[0].constructorId;
        sponsor = sponsor.charAt(0).toUpperCase() + sponsor.slice(1);
        let points = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].points;
        let result = {position,name,nationality,sponsor,points}
        racers.push(result);
        //console.log(`racers : ${racers[i]}`)
        //console.log(`racers : ${racers}`)}

        //console.log(`Postion': ${position}, Name  ${firstName} ${lastName}, Nationality ${nationality}, sponsor${sponsor}, points${points}`)
    }
    //console.log(`racers : ${racers}`)
    return racers
}


function generateTableHead(table) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of headings) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
      }
    }

  let table = document.querySelector("table");
 

  function generateTable(table, racers) {
    console.log('here')
    for ( element of racers) {
        console.log(element)
      let row = table.insertRow();
      for (key in element) {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);
      }
    }
  }
  // add event listener
let query_season
let query_round
let headings =['Position','Name','Nationality','Sponsor','Points']
form.addEventListener('submit', (event) => {
    event.preventDefault();
    query_season = document.querySelector('#season').value
    query_round = document.querySelector('#round').value
    const racers=[]
    racer_data(racers)
    console.log(racers)   
    generateTableHead(table);
    generateTable(table,racers);
})

  