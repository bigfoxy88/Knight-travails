//MAKES CHESS BOARD GRID
function makeChessBoard(){

    let board=[]
    for(let i=0;i<8;i++){
        for(let j=0;j<8;j++){
            board.push([i,j])
        }
    }
    return board
}
let chessBoard=makeChessBoard()

//DETERMINES POSSIBLE MOVES FROM PARTICULAR POSITION

function determinePossibleMoves(arr){
    let array=[]
    
        
        if(arr[0]-2>=0&&arr[1]-1>=0){
            array.push([arr[0]-2,arr[1]-1])
        } 
        if(arr[0]-2>=0&&arr[1]+1<=7){
            array.push([arr[0]-2,arr[1]+1])
        }
       
        if(arr[0]-1>=0&&arr[1]-2>=0){
            array.push([arr[0]-1,arr[1]-2])
        } 
       
        if(arr[0]-1>=0&&arr[1]+2<=7){
            array.push([arr[0]-1,arr[1]+2])
        }
        if(arr[0]+1<=7&&arr[1]-2>=0){
            array.push([arr[0]+1,arr[1]-2])
        }
      
        if(arr[0]+1<=7&&arr[1]+2<=7){
            array.push([arr[0]+1,arr[1]+2])
        }  
        if(arr[0]+2<=7&&arr[1]-1>=0){
            array.push([arr[0]+2,arr[1]-1])

        }
        
        if(arr[0]+2<=7&&arr[1]+1<=7){
            array.push([arr[0]+2,arr[1]+1])

        }
        
    return array
} 





function knightMoves(start,end){
    
    let queue=[]//QUEUE FOR BREADTH FIRST SEARCH
    let visited=new Set //SET TO STORE VISITED POSITIONS TO PREVENT DOUBLE VISITS
    visited.add(JSON.stringify(start))
    let path=[]//UNSHORTENED PATH
    let newPath=[]//SHORTENED PATHH
    let count=0
    queue.push({current:start,count,prev:null})
    while(queue.length!==0){
        //console.log(visited)
        let current=queue.shift()
        
        let posibleMoves=determinePossibleMoves(current.current)
        count++
        for(let i=0;i<posibleMoves.length;i++){
            
            if(posibleMoves[i][0]===end[0]&&posibleMoves[i][1]===end[1]){
                path.push({current:posibleMoves[i],count,prev:current.current})
                console.log(visited)
                return shortestPath(path)
            }else{

                if(visited.has(JSON.stringify(posibleMoves[i]))===false){
                    visited.add(JSON.stringify(posibleMoves[i]))
                    path.push({current:posibleMoves[i],count,prev:current.current})
                    queue.push({current:posibleMoves[i],count,prev:current.current})
                }
            }
        }
    }

    //GOES OVER UNSHORTENED PATH TO PRODUCE SHORTEST PATH
    function shortestPath(p){
    let item =JSON.stringify(p[p.length-1].prev)
    newPath.push(p[p.length-1].current)
    newPath.push(p[p.length-1].prev)
    //console.log(JSON.stringify(path[path.length-1].prev)===JSON.stringify(start))
    for(let i=p.length-1;i>=0;i--){
       // console.log(i)
        if(JSON.stringify(p[i].prev)===JSON.stringify(start)){
            //console.log(JSON.stringify(p[i].prev))
            newPath.push(p[i].prev)
            return newPath.reverse()
        }
        if(JSON.stringify(p[i].current)===item){
            newPath.push(p[i].prev)
            //console.log(newPath)
            item=JSON.stringify(p[i].prev)
            i=p.length-1
        }
    }
}

}

//RENDERS PATH AND NUMBER OF MOVES
function renderPath(p){
    console.log("you made it in "+(p.length-1)+" moves! heres your path")
    for(let i=0;i<p.length;i++){
        console.log(p[i])
    }
}
let p=knightMoves([0,0],[7,7])
renderPath(p)