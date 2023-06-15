
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}


function assignSetWalls() {
    let td = document.getElementsByTagName('td');
    Array.from(td).forEach((child)=>{
        child.addEventListener('click',(e)=>{
            if(event_pause_start){
                event_pause_start=false;
                e.target.className='startNode'
                return
            }
            if(event_pause_end){
                event_pause_end=false;
                e.target.className='endNode'
                return
            }
            if(e.target.className=='wall'){
                e.target.className='unvisited'
            }
            else if(e.target.className=='unvisited'){
                e.target.className='wall'
            }
            else if(e.target.className=='startNode'){
                event_pause_start=true;
                e.target.className='unvisited'
            }
            else if(e.target.className=='endNode'){
                event_pause_end=true;
                e.target.className='unvisited'
            }
        })
        child.addEventListener('mousedown',(e)=>{
            drag=true;
        })
        child.addEventListener('mouseup',(e)=>{
            drag=false;
        })
        
        child.addEventListener('mouseenter',(e)=>{
            if(drag){
                if(e.target.className=='wall'){
                    e.target.className='unvisited'
                }
                else if(e.target.className=='unvisited'){
                    e.target.className='wall'
                }
            }
        })
    })
}


function assignNodes(locx, locy1, locy2){  
    let startNode = document.getElementById(`${locx}-${locy1}`);
    let endNode = document.getElementById(`${locx}-${locy2}`);

    startNode.className='startNode';
    endNode.className='endNode';

}

function clearWalls(){
    let walls = document.getElementsByClassName('wall');
    Array.from(walls).forEach((wall)=>{
        wall.className='unvisited';
    });
}

function clearBoard(){
  let td = document.getElementsByTagName('td');
  Array.from(td).forEach((e)=>{
      if(e.className=='startNode' || e.className=='endNode'){
        //add args
      }else{
        e.className='unvisited';
      }
  });
}

function resolver(){
    let btn = document.getElementById('choose-algorithm');
    if(btn.innerHTML =='Start Depth-First Search'){
        dfs();
    }
    else if(btn.innerHTML =='Start Breadth-First Search'){
        //function call
    }
}

function recursivebacktrack(){
  let rows = document.getElementsByTagName('tr').length;
  let tr = document.getElementsByTagName('tr')
  let cols = tr[0].getElementsByTagName('td').length;
  mat=[]
  for(let i=0;i<rows;i++){
      let arr=[];
      for(let j=0;j<cols;j++){
          let e = document.getElementById(`${i}-${j}`);
          if(e.className=='unvisited'){arr[j]=1;} 
          if(e.className=='wall') {arr[j]=0;}
          if(e.className=='startNode'){arr[j]=2;} 
          if(e.className=='endNode'){arr[j]=3;} 
      }
      mat[i]=arr
  }

  const obj =new RecursiveBacktracking(mat)
  obj.generateMatrix()
}

async function dfs(){
    function shortestPath(grid) {
        const rows = grid.length;
        const cols = grid[0].length;
        const queue = [];
        const visited = new Array(rows).fill(false).map(() => new Array(cols).fill(false));
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // Up, Down, Left, Right
        const parents = new Array(rows).fill(null).map(() => new Array(cols).fill(null));
      
        let startRow, startCol, finishRow, finishCol;
      
        // Find start and finish nodes
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            if (grid[i][j] === 2) { // Start node
              startRow = i;
              startCol = j;
            } else if (grid[i][j] === 3) { // Finish node
              finishRow = i;
              finishCol = j;
            }
          }
        }
      
        // Initialize the queue with the start node
        queue.push([startRow, startCol]);
        visited[startRow][startCol] = true;
      
        // BFS traversal
        while (queue.length > 0) {
          const [currentRow, currentCol] = queue.shift();
      
          // Check if the current node is the finish node
          if (currentRow === finishRow && currentCol === finishCol) {
            return reconstructPath(parents, startRow, startCol, finishRow, finishCol);
          }
      
          // Visit neighboring nodes
          for (const [dx, dy] of directions) {
            const newRow = currentRow + dx;
            const newCol = currentCol + dy;
      
            // Check if the neighboring node is valid
            if (isValidNode(newRow, newCol, rows, cols, grid, visited)) {
              queue.push([newRow, newCol]);
              visited[newRow][newCol] = true;
              parents[newRow][newCol] = [-dx, -dy]; // Store parent pointers
            }
          }
        }
      
        // If the queue becomes empty and the finish node is not reached, there is no path
        return [];
      }
      
      // Check if a node is valid (within grid boundaries, not a wall, and not visited)
      function isValidNode(row, col, rows, cols, grid, visited) {
        return (
          row >= 0 &&
          row < rows &&
          col >= 0 &&
          col < cols &&
          grid[row][col] !== 0 &&
          !visited[row][col]
        );
      }
      
      // Reconstruct the shortest path using parent pointers
      function reconstructPath(parents, startRow, startCol, finishRow, finishCol) {
        const path = [];
        let currentRow = finishRow;
        let currentCol = finishCol;
      
        while (currentRow !== startRow || currentCol !== startCol) {
          path.unshift([currentRow, currentCol]);
      
          const [dx, dy] = parents[currentRow][currentCol];
          currentRow += dx;
          currentCol += dy;
        }
      
        path.unshift([startRow, startCol]);
        return path;
      }
      




    function Location(str){
        str = str.split('-')
        return [parseInt(str[0]),parseInt(str[1])];
    }

    function curNode(elem){
        if(elem.className =='startNode'){
            return false
        }
        else if(elem.className =='endNode'){
            return true
        }
        else{
            elem.className = 'curNode'
        }

        return false
    }

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
    
    function getSpeed(){
      var value = rangeSlider.value;
      return (101-value)*2;
    }
    
    function visNode(elem){
        if(elem.className =='startNode'){
            return 
        }
        else if(elem.className =='endNode'){
            return 
        }
        else{
            elem.className = 'visited'
        }
    }
    const map = new Map();
    let rows = document.getElementsByTagName('tr').length;
    let tr = document.getElementsByTagName('tr')
    let cols = tr[0].getElementsByTagName('td').length;
    mat=[]
    vis=[]
    rank=[]
    for(let i=0;i<rows;i++){
        let arr=[];
        let temp=[]
        let r=[]
        for(let j=0;j<cols;j++){
            let e = document.getElementById(`${i}-${j}`);
            if(e.className=='unvisited'){arr[j]=1; map.set(e.id,100000)} 
            if(e.className=='wall') {arr[j]=0;map.set(e.id,100000)}
            if(e.className=='startNode'){arr[j]=2;map.set(e.id,0)} 
            if(e.className=='endNode'){arr[j]=3;map.set(e.id,100000)} 
            temp[j]=0;
            r[j]=10000;
        }
        mat[i]=arr
        vis[i]=temp
        rank[i]=r
    }
    const stack = new Stack();
    let temp = document.getElementsByClassName('startNode');
    let startNode=Location(temp[0].id)
    let temp1 = document.getElementsByClassName('endNode');
    let endNode=Location(temp1[0].id)

    stack.push(startNode);
    let par=[-1,-1]
    let path = false;
    let moves=[[0,1],[1,0],[-1,0],[0,-1]];
    
    while(!stack.isEmpty()){
        let cur = stack.pop();
        vis[cur[0]][cur[1]]=1
        let id = `${cur[0]}-${cur[1]}`
        let elem = document.getElementById(id)
        let state=curNode(elem)
        if(state){
            path =true;
           break; 
        } 
        await sleep(getSpeed())
        visNode(elem)

        // moves = shuffleArray(moves) // to randomise the beahviour of depth first search
        moves.forEach((move)=>{
            let curx = cur[0]+move[0];
            let cury = cur[1]+move[1];
            if(curx>=0 && curx<rows && cury>=0 && cury<cols){
                if(vis[curx][cury]==0 && mat[curx][cury]!=0){
                    stack.push([curx,cury])
                    let val = map.get(`${curx}-${cury}`)
                    map.set(`${curx}-${cury}`,Math.min(val,map.get(id)+1))
                }
                else if(mat[curx][cury]==1){
                    let val=map.get(`${curx}-${cury}`)
                    map.set(`${curx}-${cury}`,Math.min(val,map.get(id)+1))
                }
            }
            
        })
    }

    
    let short_path =shortestPath(mat);
    if(short_path.length<1){
        let elem = document.getElementsByClassName('message');
        elem[0].textContent ='No path exisited !!!'
    }else{
        let elem = document.getElementsByClassName('message');
        elem[0].textContent ='DFS does not garuntee the shortest path !!!'
    }
    short_path.forEach(async(e)=>{
        let elem = document.getElementById(`${e[0]}-${e[1]}`)
        if(elem.className =='startNode' || elem.className =='endNode'){
            // pass arg
        }
        else{
            elem.className = 'path'
        }
        
    })

}

