
let drag=false;
let event_pause_start = false;
let event_pause_end = false;
// adding functionality to the algorithm list
let items = document.getElementsByClassName('algo')
Array.from(items).forEach((item)=>{
    item.addEventListener('click',(e)=>{
        let val = e.target.innerHTML;
        btn = document.getElementById('choose-algorithm');
        btn.innerHTML = "Start "+val;
        let elem = document.getElementsByClassName('message');
        elem[0].textContent =''
    });
});

let addWalls = document.getElementsByClassName('add-wall')
Array.from(addWalls).forEach((item)=>{
    item.addEventListener('click',(e)=>{
        if(e.target.innerHTML =='Recursive Backtracking'){
            recursivebacktrack()
        }
    })
})

let clear = document.getElementsByClassName('clear')
Array.from(clear).forEach((item)=>{
    item.addEventListener('click',(e)=>{
        if(e.target.innerHTML == 'Clear Walls'){
            clearWalls()
        }
        else if(e.target.innerHTML == 'Clear Board'){
            clearBoard()
        }
    })
});


document.addEventListener('readystatechange', event => { 
    let w = window.innerWidth ;
    let h = window.innerHeight;

    h-= 110;

    let state = document.getElementsByClassName('table')
    if(state.length!=0) return 

    let table = document.createElement('table');
    table.className='table'
    table.style=`height:${h}px; width:${w}px;`
    let tbody = document.createElement('tbody');
    
    

    let rows = Math.floor(h/20);
    let cols = Math.floor(w/20);

    for(var i=0; i<rows; i++){
        let tr = document.createElement('tr');
        for(var j=0; j<cols; j++){
            let td = document.createElement('td');
            td.id=`${i}-${j}`;
            td.className='unvisited';
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    document.body.appendChild(table);
    let locx = Math.floor(rows/2)
    let locy1 = Math.floor(cols/3)
    let locy2 = Math.floor(cols/3) + locy1;
    assignSetWalls()
    assignNodes(locx, locy1, locy2)
});

var rangeSlider = document.getElementById("myRange");
var sliderValue = document.getElementById("sliderValue");

rangeSlider.addEventListener("input", function() {
  var value = rangeSlider.value;
  sliderValue.textContent = "Speed: " + value;
});

