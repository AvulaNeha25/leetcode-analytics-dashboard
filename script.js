let chart;

// TRACK SINGLE USER
async function getStats(){

const username = document.getElementById("username").value

try{

const response = await fetch(`http://localhost:3000/leetcode/${username}`)
const data = await response.json()

// detect invalid user
if(!data || data.total === 0){

document.getElementById("currentUser").innerText = "❌ User not available"

document.getElementById("total").innerText = "-"
document.getElementById("easy").innerText = "-"
document.getElementById("medium").innerText = "-"
document.getElementById("hard").innerText = "-"

document.getElementById("easyBar").style.width = "0px"
document.getElementById("mediumBar").style.width = "0px"
document.getElementById("hardBar").style.width = "0px"

if(chart){
chart.destroy()
}

return
}

document.getElementById("currentUser").innerText =
"Showing stats for: " + username

document.getElementById("total").innerText = data.total
document.getElementById("easy").innerText = data.easy
document.getElementById("medium").innerText = data.medium
document.getElementById("hard").innerText = data.hard

document.getElementById("easyBar").style.width = data.easy * 2 + "px"
document.getElementById("mediumBar").style.width = data.medium * 2 + "px"
document.getElementById("hardBar").style.width = data.hard * 2 + "px"

createChart(data)

}catch(err){

document.getElementById("currentUser").innerText = "❌ User not available"

}

}
// SINGLE USER CHART
function createChart(data){

const ctx = document.getElementById("chart")

if(chart){
chart.destroy()
}

chart = new Chart(ctx,{
type:"doughnut",
data:{
labels:["Easy","Medium","Hard"],
datasets:[{
data:[data.easy,data.medium,data.hard]
}]
}
})

}

// COMPARE USERS
async function compareUsers(){

const user1 = document.getElementById("user1").value
const user2 = document.getElementById("user2").value

try{

const r1 = await fetch(`http://localhost:3000/leetcode/${user1}`)
const r2 = await fetch(`http://localhost:3000/leetcode/${user2}`)

const d1 = await r1.json()
const d2 = await r2.json()

createComparisonChart(d1,d2,user1,user2)

}catch(err){

document.getElementById("currentUser").innerText = "❌ Comparison failed"

}

}

// COMPARISON CHART
function createComparisonChart(d1,d2,u1,u2){

const ctx = document.getElementById("chart")

if(chart){
chart.destroy()
}

chart = new Chart(ctx,{
type:"bar",
data:{
labels:["Easy","Medium","Hard"],
datasets:[
{
label:u1,
data:[d1.easy,d1.medium,d1.hard]
},
{
label:u2,
data:[d2.easy,d2.medium,d2.hard]
}
]
}
})

}