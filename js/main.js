let form = document.querySelector('#testDataForm')

const racer_data = async (racers) => {
    racers=[]
    let response = await axios.get(`https://ergast.com/api/f1/${query_season}/${query_round}/driverStandings.json`)
    for(let i = 0;i<7;i++){
        let position=i+1;
        let firstName = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.givenName;
        let lastName= response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.familyName
        let name= firstName+" "+ lastName;
        let nationality= response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.nationality;
        let sponsor= response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Constructors[0].constructorId;
        sponsor = sponsor.charAt(0).toUpperCase() + sponsor.slice(1);
        let points = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].points;
        let result = [position,name,nationality,sponsor,points]
        // let row = table.insertRow();
        // for (key in result) {
        //   let cell = row.insertCell();
        //   let text = document.createElement('td')
        //   text.innerHTML = result[key];
        //   //document.append(text)
        //   cell.appendChild(text);
        // }
        racers.push(result);
    }
    console.log(racers)
    
    for (var row=0; row<7;row++){
      var crow=racers[row]
      console.log('crow', crow)
      
      for (var val=0; val<5;val++){
        var x = document.getElementById("table").rows[row+1].cells;
        x[val].innerHTML = crow[val];
      }}
    return racers
}


// function generateTableHead(table) {
//     table.deleteTHead()
//     let thead = table.createTHead();
//     let row = thead.insertRow();
//     for (let key of headings) {
//         let th = document.createElement("th");
//         let text = document.createTextNode(key);
//         th.appendChild(text);
//         row.appendChild(th);
//       }
// }
function fillTable(table){

}

let table = document.querySelector("table");  
let query_season
let query_round
//let headings =['Position','Name','Nationality','Sponsor','Points']

form.addEventListener('submit', (event) => {
    document.getElementById("table").style.display = '';
  
    event.preventDefault();
    query_season = document.querySelector('#season').value
    query_round = document.querySelector('#round').value
    var racers=[]
    let data=racer_data(racers)  ;
    console.log('data', data)
   
})

function toggle() {
  if( document.getElementById("hidethis").style.display=='none' ){
    document.getElementById("hidethis").style.display = 'table-row'; // set to table-row instead of an empty string
  }else{
    document.getElementById("hidethis").style.display = 'none';
  }
 }
  