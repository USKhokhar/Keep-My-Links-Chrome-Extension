
let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}


inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = " "
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})

function render(leads){
    let listItems = ""

    for(let i = 0; i < leads.length; i++){
        listItems += `<li><a href="${leads[i]}" target = "_blank"> ${leads[i]} </a></li>`
    }

    ulEl.innerHTML = listItems

    console.log(myLeads)
}

deleteBtn.addEventListener("click", function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})


tabBtn.addEventListener("click", function(){

    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
        
})