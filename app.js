const express = require('express')
﻿const app = express();
app.use(express.json());

const path = require('path')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')

const app = express()

const dbPath = path.join(__dirname, 'cricketTeam.db')
let db = null;

const intialzeDBAndServer=async()=>{
    try{
        db=await open({
            filename:dbPath,
            driver:sqlite3.Database,
        });

    }
    catch (e){
        console.log(`DB Error:${e.message}`);
        process.exit(1);
        
    }
};
intialzeDBAndServer()



app.get("/players/",async(request,responce)=>{
    const getCricketplayer=`
    SELECT
    *
    FROM
       cricket_team 
    ORDER BY 
         playerId;`;
    const bookArray= await db.all(getCricketplayer);
    responce.send(bookArray)
})
export.modules=app;


app.post("/players/",async(request,responce)=>{
    const cricketDeatils=request.body;
    const{
        player_id,
        player_name,
        jersey_number,
        role
    }=cricketDeatils;
    const addplayerDetails = `
  INSERT INTO
    players(player_id, player_name, jersey_number, role)
  VALUES(
    ${player_id},
    '${player_name}',
    ${jersey_number},
    '${role}'
  );`;
    const dpResponce= await db.all(addplayerDetails);
    const patientId=dpResponce.lastID
    responce.send(player_id:player_id)
    
})
export.modules=app;

app.get("/players/",async(request,responce)=>{
    const{playerId}=request.params;
    const getCricketplayer=`
    SELECT
    *
    FROM
       cricket_team 
    WHERE
       playerId=${playerId};`;
    const detailsofParticularPlayer= await db.all(getCricketplayer);
    responce.send(detailsofParticularPlayer)
})
export.modules=app;

app.post("/players/",async(request,responce)=>{
    const {playerId}=request.params;
    const cricketDeatils=request.body;
    const{
        player_id,
        player_name,
        jersey_number,
        role
    }=cricketDeatils;
    const updateThePlayerdetails=`
    UPDATE 
      players
    SET 
        player_name=${player_name},
        jersey_number=${jersey_number},
        role=${role},
    WHERE
        player_id=${player_id}

    ;`;
    await db.all(updateThePlayerdetails);
    responce.send("Player Details Updated")
    
})
export.modules=app;

app.get("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const getThePlayerDetails = `
    SELECT
     *
    FROM
     players
    WHERE
      playerId = ${playerId};`;
  const patient = await db.all(getThePlayerDetails);
  response.send("Player Removed");
});
module.exports=app;
