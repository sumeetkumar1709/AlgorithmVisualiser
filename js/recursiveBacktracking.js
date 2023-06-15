class RecursiveBacktracking{
    constructor(matrix){
        this.matrix = matrix;
        this.rows = matrix.length;
        this.cols = matrix[0].length;
    }
    print(){
        console.log(this.matrix)
    }
    
    async generateMatrix(){
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }
        let mat = this.matrix
        let rows = this.rows
        let cols = this.cols

        let startNode=[-1,-1];
        let endNode=[-1,-1];
        let vis = []
        for(let i=0; i<rows;i++){
            let temp =[]
            for(let j=0; j<cols;j++){
                if(mat[i][j]==2){
                    startNode=[i,j]
                }
                if(mat[i][j]==3){
                    endNode=[i,j]
                }
                temp[j]=0;
            }
            vis[i]=temp;
        }
        let td = document.getElementsByTagName("td");
        Array.from(td).forEach((el)=>{
            if(el.className=='startNode' || el.className=='endNode'){

            }
            else{
                el.className='wall'
            }})

        let stack = new Stack();
        stack.push(startNode)
        let maze=[];
        let moves = [[1,0],[0,1],[-1,0],[0,-1]]
        vis[startNode[0]][startNode[1]] =1
        while(!stack.isEmpty()){
            let cur =stack.peek();
            if(cur==endNode) break;
            let elem = document.getElementById(`${cur[0]}-${cur[1]}`);
            
            moves=shuffleArray(moves)
            await sleep(10);

            let temp = []
            for(let i=0;i<4;i++){
                let curx=cur[0]+moves[i][0];
                let cury=cur[1]+moves[i][1];

                if(curx>0 && curx<rows && cury>0 && cury<cols ){
                    if(vis[curx][cury]!=1){
                       temp.push([curx,cury]);
                    }
                }
            }

            if(temp.length==0){
                stack.pop();
            }else{
                stack.push(temp[0])
                vis[temp[0][0]][temp[0][1]]=1;
                let elem1 = document.getElementById(`${temp[0][0]}-${temp[0][1]}`);
                let elem2 = document.getElementById(`${cur[0]}-${cur[1]}`);
                elem1.className='unvisited'
                elem.className='unvisited'
            }

        }
        
        // let td = document.getElementsByTagName("td");
        // Array.from(td).forEach((el)=>{
        //     if(el.className=='startNode' || el.className=='endNode'){

        //     }
        //     else{
        //         el.className='wall'
        //     }

        // });
        // maze.forEach((el)=>{
        //     let elem = document.getElementById(`${el[0]}-${el[1]}`);

        //     if(elem.className!='endNode')
        //     elem.className='unvisited';
        // });

    }


  
    
}