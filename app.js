const gameboard=document.querySelector("#gameboard")
const player=document.querySelector("#player")
const gameInfo=document.querySelector("#game-info")
let playergo='black'
player.innerHTML="It's black turn"
const startpieces=[
    rook,kinght,bishop,queen,king,bishop,kinght,rook,
    pawn,pawn,pawn,pawn,pawn,pawn,pawn,pawn,
    "","","","","","","","",
    "","","","","","","","",
    "","","","","","","","",
    "","","","","","","","",
    pawn,pawn,pawn,pawn,pawn,pawn,pawn,pawn,
    rook,kinght,bishop,queen,king,bishop,kinght,rook
]
function createBoard(){
    
    startpieces.forEach((startpiece,i)=>{
      const square=document.createElement('div')
      square.innerHTML=startpiece
      square.classList.add('square')
      square.firstChild?.setAttribute('draggable',true)
      square.setAttribute('square',i)
      const row= (Math.floor((63-i)/8))+1
      if(row%2==0){
        if(i%2==0){
        square.classList.add('fuchsia')
        }
        else{
            square.classList.add('snow')
        }
      }
      else{
        if(i%2==0){
            square.classList.add('snow')
        }
        else{
            square.classList.add('fuchsia')
        }
      }
      if(i<16){
        square.firstChild.firstChild.classList.add('black')
      }
      if(i>47){
        square.firstChild.firstChild.classList.add('white')
      }
      if (i==4){
        square.classList.add('blackKing')
      }
      if(i==60){
        square.classList.add('whiteKing')
      }
      gameboard.append(square);
    })

}
createBoard();
const allsquares = document.querySelectorAll(" .square")
allsquares.forEach(square =>{
    square.addEventListener('dragstart',dragstart)
    square.addEventListener('dragover',dragover)
    square.addEventListener('drop',dragDrop)
})
let startpositionId
let dragElement
function dragstart (e) {
    startpositionId= e.target.parentNode.getAttribute('square')
    dragElement=e.target
    
}
function dragover(e){  
    e.preventDefault()   
}
function dragDrop(e){
    e.stopPropagation()  
    const correctGo=dragElement.firstChild.classList.contains(playergo)
    const taken=e.target.classList.contains('pieces')
    const valid =checkIfValid(e.target)
    underPromotion(e.target)
    const opponentGo=playergo==='white'?'black':'white'
    const takenByOpponent=e.target.firstChild?.classList.contains(opponentGo)
    if(correctGo){
        if(takenByOpponent&&valid){
    e.target.parentNode.append(dragElement)
    e.target.remove()
    changePlayer()
    check(e.target)
    checkForWin()
    return
        }
     if(taken){
         gameInfo.textContent="You Cannot do that Baka"
         setTimeout(()=>gameInfo.textContent="",5000)
         return
     } 
     if(valid){
        e.target.append(dragElement)
        underPromotion(e.target)
        check(e.target)
        changePlayer()
        checkForWin()
     }  
    }
}
function changePlayer(){
    if(playergo==='black'){
       reverseId()
        playergo='white'
        player.innerHTML="It's white turn "
        removeRotate()
    }
    else{
        
        revertId()
        playergo='black'
        player.innerHTML="It's black turn "
        rotate()
    }
}
function reverseId(){
    const allSquares=document.querySelectorAll(".square")
    allSquares.forEach((square,i)=>{
      square.setAttribute('square',(63-i))
    })
}
function revertId(){
      const allSquares=document.querySelectorAll(".square")
      allSquares.forEach((square,i)=>{
        square.setAttribute('square',i)
      })
}
function checkIfValid(target){
     const targetId=Number(target.getAttribute('square'))||Number(target.parentNode.getAttribute('square'))
     const startId=Number(startpositionId)
     const piece=dragElement.id
     switch(piece){
        case 'pawn':
            const startRow=[8,9,10,11,12,13,14,15]
            if(startRow.includes(startId) && targetId===(16+startId) && !(document.querySelector(`[square="${startId+16}"]`).firstChild) &&!(document.querySelector(`[square="${startId+8}"]`).firstChild)||targetId===startId+8 && !(document.querySelector(`[square="${startId+8}"]`).firstChild)|| (startId+7===targetId && document.querySelector(`[square ="${startId + 7}"]`).firstChild)||(startId+9===targetId && document.querySelector(`[square="${startId+9}"]`).firstChild)){
                return true
                

            }
            break;
        case 'knight':
            if(startId+17===targetId||startId+15===targetId||startId+10===targetId||startId+6===targetId||startId-10===targetId||startId-6===targetId||startId-17===targetId||startId-15===targetId){
                return true
            }
            break;
         case 'bishop':
            if(startId + 9===targetId||
              startId + 18 ===targetId && !(document.querySelector(`[square="${startId+9}"]`).firstChild)||
               startId + 27 ===targetId && !(document.querySelector(`[square="${startId+9}"]`).firstChild) && !(document.querySelector(`[square="${startId+18}"]`).firstChild)||
               startId + 36 ===targetId &&  !(document.querySelector(`[square="${startId+9}"]`).firstChild)&& !(document.querySelector(`[square="${startId+18}"]`).firstChild) && !(document.querySelector(`[square="${startId+27}"]`).firstChild)||
               startId + 45 ===targetId && !(document.querySelector(`[square="${startId+9}"]`).firstChild)&& !(document.querySelector(`[square="${startId+18}"]`).firstChild)&& !(document.querySelector(`[square="${startId+27}"]`).firstChild)&& !(document.querySelector(`[square="${startId+36}"]`).firstChild)||
               startId + 54 ===targetId && !(document.querySelector(`[square="${startId+9}"]`).firstChild)&& !(document.querySelector(`[square="${startId+18}"]`).firstChild)&& !(document.querySelector(`[square="${startId+27}"]`).firstChild)&& !(document.querySelector(`[square="${startId+36}"]`).firstChild)&& !(document.querySelector(`[square="${startId+45}"]`).firstChild)||
               startId + 63 ===targetId && !(document.querySelector(`[square="${startId+9}"]`).firstChild)&& !(document.querySelector(`[square="${startId+18}"]`).firstChild)&& !(document.querySelector(`[square="${startId+27}"]`).firstChild)&& !(document.querySelector(`[square="${startId+36}"]`).firstChild)&& !(document.querySelector(`[square="${startId+45}"]`).firstChild)&& !(document.querySelector(`[square="${startId+54}"]`).firstChild)||

               startId - 9===targetId||
               startId - 18 ===targetId && !(document.querySelector(`[square="${startId-9}"]`).firstChild)||
               startId - 27 ===targetId && !(document.querySelector(`[square="${startId-9}"]`).firstChild) && !(document.querySelector(`[square="${startId-18}"]`).firstChild)||
               startId - 36 ===targetId &&  !(document.querySelector(`[square="${startId-9}"]`).firstChild)&& !(document.querySelector(`[square="${startId-18}"]`).firstChild) && !(document.querySelector(`[square="${startId-27}"]`).firstChild)||
               startId - 45 ===targetId && !(document.querySelector(`[square="${startId-9}"]`).firstChild)&& !(document.querySelector(`[square="${startId-18}"]`).firstChild)&& !(document.querySelector(`[square="${startId-27}"]`).firstChild)&& !(document.querySelector(`[square="${startId-36}"]`).firstChild)||
               startId - 54 ===targetId && !(document.querySelector(`[square="${startId-9}"]`).firstChild)&& !(document.querySelector(`[square="${startId-18}"]`).firstChild)&& !(document.querySelector(`[square="${startId-27}"]`).firstChild)&& !(document.querySelector(`[square="${startId-36}"]`).firstChild)&& !(document.querySelector(`[square="${startId-45}"]`).firstChild)||
               startId - 63===targetId && !(document.querySelector(`[square="${startId-9}"]`).firstChild)&& !(document.querySelector(`[square="${startId-18}"]`).firstChild)&& !(document.querySelector(`[square="${startId-27}"]`).firstChild)&& !(document.querySelector(`[square="${startId-36}"]`).firstChild)&& !(document.querySelector(`[square="${startId-45}"]`).firstChild)&& !(document.querySelector(`[square="${startId-54}"]`).firstChild)||

               startId + 7===targetId||
               startId + 14 ===targetId && !(document.querySelector(`[square="${startId+7}"]`).firstChild)||
               startId + 21 ===targetId && !(document.querySelector(`[square="${startId+7}"]`).firstChild) && !(document.querySelector(`[square="${startId+14}"]`).firstChild)||
               startId + 28 ===targetId &&  !(document.querySelector(`[square="${startId+7}"]`).firstChild)&& !(document.querySelector(`[square="${startId+14}"]`).firstChild) && !(document.querySelector(`[square="${startId+21}"]`).firstChild)||
               startId + 35 ===targetId && !(document.querySelector(`[square="${startId+7}"]`).firstChild)&& !(document.querySelector(`[square="${startId+14}"]`).firstChild)&& !(document.querySelector(`[square="${startId+21}"]`).firstChild)&& !(document.querySelector(`[square="${startId+28}"]`).firstChild)||
               startId + 42 ===targetId && !(document.querySelector(`[square="${startId+7}"]`).firstChild)&& !(document.querySelector(`[square="${startId+14}"]`).firstChild)&& !(document.querySelector(`[square="${startId+21}"]`).firstChild)&& !(document.querySelector(`[square="${startId+28}"]`).firstChild)&& !(document.querySelector(`[square="${startId+35}"]`).firstChild)||
               startId + 49===targetId && !(document.querySelector(`[square="${startId+7}"]`).firstChild)&& !(document.querySelector(`[square="${startId+14}"]`).firstChild)&& !(document.querySelector(`[square="${startId+21}"]`).firstChild)&& !(document.querySelector(`[square="${startId+28}"]`).firstChild)&& !(document.querySelector(`[square="${startId+35}"]`).firstChild)&& !(document.querySelector(`[square="${startId+42}"]`).firstChild)||

               startId - 7===targetId||
               startId - 14 ===targetId && !(document.querySelector(`[square="${startId-7}"]`).firstChild)||
               startId - 21 ===targetId && !(document.querySelector(`[square="${startId-7}"]`).firstChild) && !(document.querySelector(`[square="${startId-14}"]`).firstChild)||
               startId - 28 ===targetId &&  !(document.querySelector(`[square="${startId-7}"]`).firstChild)&& !(document.querySelector(`[square="${startId-14}"]`).firstChild) && !(document.querySelector(`[square="${startId-21}"]`).firstChild)||
               startId - 35 ===targetId && !(document.querySelector(`[square="${startId-7}"]`).firstChild)&& !(document.querySelector(`[square="${startId-14}"]`).firstChild)&& !(document.querySelector(`[square="${startId-21}"]`).firstChild)&& !(document.querySelector(`[square="${startId-28}"]`).firstChild)||
               startId - 42 ===targetId && !(document.querySelector(`[square="${startId-7}"]`).firstChild)&& !(document.querySelector(`[square="${startId-14}"]`).firstChild)&& !(document.querySelector(`[square="${startId-21}"]`).firstChild)&& !(document.querySelector(`[square="${startId-28}"]`).firstChild)&& !(document.querySelector(`[square="${startId-35}"]`).firstChild)||
               startId - 49===targetId && !(document.querySelector(`[square="${startId-7}"]`).firstChild)&& !(document.querySelector(`[square="${startId-14}"]`).firstChild)&& !(document.querySelector(`[square="${startId-21}"]`).firstChild)&& !(document.querySelector(`[square="${startId-28}"]`).firstChild)&& !(document.querySelector(`[square="${startId-35}"]`).firstChild)&& !(document.querySelector(`[square="${startId-42}"]`).firstChild)
                ){
                    return true
                }
                break
            case 'rook':
                if(startId+8===targetId||
                    startId+16===targetId && !(document.querySelector(`[square="${startId+8}"]`).firstChild)||
                    startId+24===targetId && !(document.querySelector(`[square="${startId+8}"]`).firstChild)&& !(document.querySelector(`[square="${startId+16}"]`).firstChild)||
                    startId+32===targetId && !(document.querySelector(`[square="${startId+8}"]`).firstChild)&& !(document.querySelector(`[square="${startId+16}"]`).firstChild)&& !(document.querySelector(`[square="${startId+24}"]`).firstChild)||
                    startId+40===targetId && !(document.querySelector(`[square="${startId+8}"]`).firstChild)&& !(document.querySelector(`[square="${startId+16}"]`).firstChild)&& !(document.querySelector(`[square="${startId+24}"]`).firstChild)&& !(document.querySelector(`[square="${startId+32}"]`).firstChild)||
                    startId+48===targetId && !(document.querySelector(`[square="${startId+8}"]`).firstChild)&& !(document.querySelector(`[square="${startId+16}"]`).firstChild)&& !(document.querySelector(`[square="${startId+24}"]`).firstChild)&& !(document.querySelector(`[square="${startId+32}"]`).firstChild)&& !(document.querySelector(`[square="${startId+40}"]`).firstChild)||
                    startId+56===targetId && !(document.querySelector(`[square="${startId+8}"]`).firstChild)&& !(document.querySelector(`[square="${startId+16}"]`).firstChild)&& !(document.querySelector(`[square="${startId+24}"]`).firstChild)&& !(document.querySelector(`[square="${startId+32}"]`).firstChild)&& !(document.querySelector(`[square="${startId+40}"]`).firstChild)&& !(document.querySelector(`[square="${startId+48}"]`).firstChild)||

                    startId-8===targetId||
                    startId-16===targetId && !(document.querySelector(`[square="${startId-8}"]`).firstChild)||
                    startId-24===targetId && !(document.querySelector(`[square="${startId-8}"]`).firstChild)&& !(document.querySelector(`[square="${startId-16}"]`).firstChild)||
                    startId-32===targetId && !(document.querySelector(`[square="${startId-8}"]`).firstChild)&& !(document.querySelector(`[square="${startId-16}"]`).firstChild)&& !(document.querySelector(`[square="${startId-24}"]`).firstChild)||
                    startId-40===targetId && !(document.querySelector(`[square="${startId-8}"]`).firstChild)&& !(document.querySelector(`[square="${startId-16}"]`).firstChild)&& !(document.querySelector(`[square="${startId-24}"]`).firstChild)&& !(document.querySelector(`[square="${startId-32}"]`).firstChild)||
                    startId-48===targetId && !(document.querySelector(`[square="${startId-8}"]`).firstChild)&& !(document.querySelector(`[square="${startId-16}"]`).firstChild)&& !(document.querySelector(`[square="${startId-24}"]`).firstChild)&& !(document.querySelector(`[square="${startId-32}"]`).firstChild)&& !(document.querySelector(`[square="${startId-40}"]`).firstChild)||
                    startId-56===targetId && !(document.querySelector(`[square="${startId-8}"]`).firstChild)&& !(document.querySelector(`[square="${startId-16}"]`).firstChild)&& !(document.querySelector(`[square="${startId-24}"]`).firstChild)&& !(document.querySelector(`[square="${startId-32}"]`).firstChild)&& !(document.querySelector(`[square="${startId-40}"]`).firstChild)&& !(document.querySelector(`[square="${startId-48}"]`).firstChild)||
                    
                    startId-1===targetId||
                    startId-2===targetId && !(document.querySelector(`[square="${startId-1}"]`).firstChild)||
                    startId-3===targetId && !(document.querySelector(`[square="${startId-1}"]`).firstChild)&& !(document.querySelector(`[square="${startId-2}"]`).firstChild)||
                    startId-4===targetId && !(document.querySelector(`[square="${startId-1}"]`).firstChild)&& !(document.querySelector(`[square="${startId-2}"]`).firstChild)&& !(document.querySelector(`[square="${startId-3}"]`).firstChild)||
                    startId-5===targetId && !(document.querySelector(`[square="${startId-1}"]`).firstChild)&& !(document.querySelector(`[square="${startId-2}"]`).firstChild)&& !(document.querySelector(`[square="${startId-3}"]`).firstChild)&& !(document.querySelector(`[square="${startId-4}"]`).firstChild)||
                    startId-6===targetId && !(document.querySelector(`[square="${startId-1}"]`).firstChild)&& !(document.querySelector(`[square="${startId-2}"]`).firstChild)&& !(document.querySelector(`[square="${startId-3}"]`).firstChild)&& !(document.querySelector(`[square="${startId-4}"]`).firstChild)&& !(document.querySelector(`[square="${startId-5}"]`).firstChild)||
                    startId-7===targetId && !(document.querySelector(`[square="${startId-1}"]`).firstChild)&& !(document.querySelector(`[square="${startId-2}"]`).firstChild)&& !(document.querySelector(`[square="${startId-3}"]`).firstChild)&& !(document.querySelector(`[square="${startId-4}"]`).firstChild)&& !(document.querySelector(`[square="${startId-5}"]`).firstChild)&& !(document.querySelector(`[square="${startId-6}"]`).firstChild)||

                    startId+1===targetId||
                    startId+2===targetId && !(document.querySelector(`[square="${startId+1}"]`).firstChild)||
                    startId+3===targetId && !(document.querySelector(`[square="${startId+1}"]`).firstChild)&& !(document.querySelector(`[square="${startId+2}"]`).firstChild)||
                    startId+4===targetId && !(document.querySelector(`[square="${startId+1}"]`).firstChild)&& !(document.querySelector(`[square="${startId+2}"]`).firstChild)&& !(document.querySelector(`[square="${startId+3}"]`).firstChild)||
                    startId+5===targetId && !(document.querySelector(`[square="${startId+1}"]`).firstChild)&& !(document.querySelector(`[square="${startId+2}"]`).firstChild)&& !(document.querySelector(`[square="${startId+3}"]`).firstChild)&& !(document.querySelector(`[square="${startId+4}"]`).firstChild)||
                    startId+6===targetId && !(document.querySelector(`[square="${startId+1}"]`).firstChild)&& !(document.querySelector(`[square="${startId+2}"]`).firstChild)&& !(document.querySelector(`[square="${startId+3}"]`).firstChild)&& !(document.querySelector(`[square="${startId+4}"]`).firstChild)&& !(document.querySelector(`[square="${startId+5}"]`).firstChild)||
                    startId+7===targetId && !(document.querySelector(`[square="${startId+1}"]`).firstChild)&& !(document.querySelector(`[square="${startId+2}"]`).firstChild)&& !(document.querySelector(`[square="${startId+3}"]`).firstChild)&& !(document.querySelector(`[square="${startId+4}"]`).firstChild)&& !(document.querySelector(`[square="${startId+5}"]`).firstChild)&& !(document.querySelector(`[square="${startId+6}"]`).firstChild)      
                    ){
                        return true
                    }
                    break;
                case 'queen':
                    if(startId + 9===targetId||
                        startId + 18 ===targetId && !(document.querySelector(`[square="${startId+9}"]`).firstChild)||
                         startId + 27 ===targetId && !(document.querySelector(`[square="${startId+9}"]`).firstChild) && !(document.querySelector(`[square="${startId+18}"]`).firstChild)||
                         startId + 36 ===targetId &&  !(document.querySelector(`[square="${startId+9}"]`).firstChild)&& !(document.querySelector(`[square="${startId+18}"]`).firstChild) && !(document.querySelector(`[square="${startId+27}"]`).firstChild)||
                         startId + 45 ===targetId && !(document.querySelector(`[square="${startId+9}"]`).firstChild)&& !(document.querySelector(`[square="${startId+18}"]`).firstChild)&& !(document.querySelector(`[square="${startId+27}"]`).firstChild)&& !(document.querySelector(`[square="${startId+36}"]`).firstChild)||
                         startId + 54 ===targetId && !(document.querySelector(`[square="${startId+9}"]`).firstChild)&& !(document.querySelector(`[square="${startId+18}"]`).firstChild)&& !(document.querySelector(`[square="${startId+27}"]`).firstChild)&& !(document.querySelector(`[square="${startId+36}"]`).firstChild)&& !(document.querySelector(`[square="${startId+45}"]`).firstChild)||
                         startId + 63 ===targetId && !(document.querySelector(`[square="${startId+9}"]`).firstChild)&& !(document.querySelector(`[square="${startId+18}"]`).firstChild)&& !(document.querySelector(`[square="${startId+27}"]`).firstChild)&& !(document.querySelector(`[square="${startId+36}"]`).firstChild)&& !(document.querySelector(`[square="${startId+45}"]`).firstChild)&& !(document.querySelector(`[square="${startId+54}"]`).firstChild)||
          
                         startId - 9===targetId||
                         startId - 18 ===targetId && !(document.querySelector(`[square="${startId-9}"]`).firstChild)||
                         startId - 27 ===targetId && !(document.querySelector(`[square="${startId-9}"]`).firstChild) && !(document.querySelector(`[square="${startId-18}"]`).firstChild)||
                         startId - 36 ===targetId &&  !(document.querySelector(`[square="${startId-9}"]`).firstChild)&& !(document.querySelector(`[square="${startId-18}"]`).firstChild) && !(document.querySelector(`[square="${startId-27}"]`).firstChild)||
                         startId - 45 ===targetId && !(document.querySelector(`[square="${startId-9}"]`).firstChild)&& !(document.querySelector(`[square="${startId-18}"]`).firstChild)&& !(document.querySelector(`[square="${startId-27}"]`).firstChild)&& !(document.querySelector(`[square="${startId-36}"]`).firstChild)||
                         startId - 54 ===targetId && !(document.querySelector(`[square="${startId-9}"]`).firstChild)&& !(document.querySelector(`[square="${startId-18}"]`).firstChild)&& !(document.querySelector(`[square="${startId-27}"]`).firstChild)&& !(document.querySelector(`[square="${startId-36}"]`).firstChild)&& !(document.querySelector(`[square="${startId-45}"]`).firstChild)||
                         startId - 63===targetId && !(document.querySelector(`[square="${startId-9}"]`).firstChild)&& !(document.querySelector(`[square="${startId-18}"]`).firstChild)&& !(document.querySelector(`[square="${startId-27}"]`).firstChild)&& !(document.querySelector(`[square="${startId-36}"]`).firstChild)&& !(document.querySelector(`[square="${startId-45}"]`).firstChild)&& !(document.querySelector(`[square="${startId-54}"]`).firstChild)||
          
                         startId + 7===targetId||
                         startId + 14 ===targetId && !(document.querySelector(`[square="${startId+7}"]`).firstChild)||
                         startId + 21 ===targetId && !(document.querySelector(`[square="${startId+7}"]`).firstChild) && !(document.querySelector(`[square="${startId+14}"]`).firstChild)||
                         startId + 28 ===targetId &&  !(document.querySelector(`[square="${startId+7}"]`).firstChild)&& !(document.querySelector(`[square="${startId+14}"]`).firstChild) && !(document.querySelector(`[square="${startId+21}"]`).firstChild)||
                         startId + 35 ===targetId && !(document.querySelector(`[square="${startId+7}"]`).firstChild)&& !(document.querySelector(`[square="${startId+14}"]`).firstChild)&& !(document.querySelector(`[square="${startId+21}"]`).firstChild)&& !(document.querySelector(`[square="${startId+28}"]`).firstChild)||
                         startId + 42 ===targetId && !(document.querySelector(`[square="${startId+7}"]`).firstChild)&& !(document.querySelector(`[square="${startId+14}"]`).firstChild)&& !(document.querySelector(`[square="${startId+21}"]`).firstChild)&& !(document.querySelector(`[square="${startId+28}"]`).firstChild)&& !(document.querySelector(`[square="${startId+35}"]`).firstChild)||
                         startId + 49===targetId && !(document.querySelector(`[square="${startId+7}"]`).firstChild)&& !(document.querySelector(`[square="${startId+14}"]`).firstChild)&& !(document.querySelector(`[square="${startId+21}"]`).firstChild)&& !(document.querySelector(`[square="${startId+28}"]`).firstChild)&& !(document.querySelector(`[square="${startId+35}"]`).firstChild)&& !(document.querySelector(`[square="${startId+42}"]`).firstChild)||
          
                         startId - 7===targetId||
                         startId - 14 ===targetId && !(document.querySelector(`[square="${startId-7}"]`).firstChild)||
                         startId - 21 ===targetId && !(document.querySelector(`[square="${startId-7}"]`).firstChild) && !(document.querySelector(`[square="${startId-14}"]`).firstChild)||
                         startId - 28 ===targetId &&  !(document.querySelector(`[square="${startId-7}"]`).firstChild)&& !(document.querySelector(`[square="${startId-14}"]`).firstChild) && !(document.querySelector(`[square="${startId-21}"]`).firstChild)||
                         startId - 35 ===targetId && !(document.querySelector(`[square="${startId-7}"]`).firstChild)&& !(document.querySelector(`[square="${startId-14}"]`).firstChild)&& !(document.querySelector(`[square="${startId-21}"]`).firstChild)&& !(document.querySelector(`[square="${startId-28}"]`).firstChild)||
                         startId - 42 ===targetId && !(document.querySelector(`[square="${startId-7}"]`).firstChild)&& !(document.querySelector(`[square="${startId-14}"]`).firstChild)&& !(document.querySelector(`[square="${startId-21}"]`).firstChild)&& !(document.querySelector(`[square="${startId-28}"]`).firstChild)&& !(document.querySelector(`[square="${startId-35}"]`).firstChild)||
                         startId - 49===targetId && !(document.querySelector(`[square="${startId-7}"]`).firstChild)&& !(document.querySelector(`[square="${startId-14}"]`).firstChild)&& !(document.querySelector(`[square="${startId-21}"]`).firstChild)&& !(document.querySelector(`[square="${startId-28}"]`).firstChild)&& !(document.querySelector(`[square="${startId-35}"]`).firstChild)&& !(document.querySelector(`[square="${startId-42}"]`).firstChild)||
        
                         startId+8===targetId||
                    startId+16===targetId && !(document.querySelector(`[square="${startId+8}"]`).firstChild)||
                    startId+24===targetId && !(document.querySelector(`[square="${startId+8}"]`).firstChild)&& !(document.querySelector(`[square="${startId+16}"]`).firstChild)||
                    startId+32===targetId && !(document.querySelector(`[square="${startId+8}"]`).firstChild)&& !(document.querySelector(`[square="${startId+16}"]`).firstChild)&& !(document.querySelector(`[square="${startId+24}"]`).firstChild)||
                    startId+40===targetId && !(document.querySelector(`[square="${startId+8}"]`).firstChild)&& !(document.querySelector(`[square="${startId+16}"]`).firstChild)&& !(document.querySelector(`[square="${startId+24}"]`).firstChild)&& !(document.querySelector(`[square="${startId+32}"]`).firstChild)||
                    startId+48===targetId && !(document.querySelector(`[square="${startId+8}"]`).firstChild)&& !(document.querySelector(`[square="${startId+16}"]`).firstChild)&& !(document.querySelector(`[square="${startId+24}"]`).firstChild)&& !(document.querySelector(`[square="${startId+32}"]`).firstChild)&& !(document.querySelector(`[square="${startId+40}"]`).firstChild)||
                    startId+56===targetId && !(document.querySelector(`[square="${startId+8}"]`).firstChild)&& !(document.querySelector(`[square="${startId+16}"]`).firstChild)&& !(document.querySelector(`[square="${startId+24}"]`).firstChild)&& !(document.querySelector(`[square="${startId+32}"]`).firstChild)&& !(document.querySelector(`[square="${startId+40}"]`).firstChild)&& !(document.querySelector(`[square="${startId+48}"]`).firstChild)||

                    startId-8===targetId||
                    startId-16===targetId && !(document.querySelector(`[square="${startId-8}"]`).firstChild)||
                    startId-24===targetId && !(document.querySelector(`[square="${startId-8}"]`).firstChild)&& !(document.querySelector(`[square="${startId-16}"]`).firstChild)||
                    startId-32===targetId && !(document.querySelector(`[square="${startId-8}"]`).firstChild)&& !(document.querySelector(`[square="${startId-16}"]`).firstChild)&& !(document.querySelector(`[square="${startId-24}"]`).firstChild)||
                    startId-40===targetId && !(document.querySelector(`[square="${startId-8}"]`).firstChild)&& !(document.querySelector(`[square="${startId-16}"]`).firstChild)&& !(document.querySelector(`[square="${startId-24}"]`).firstChild)&& !(document.querySelector(`[square="${startId-32}"]`).firstChild)||
                    startId-48===targetId && !(document.querySelector(`[square="${startId-8}"]`).firstChild)&& !(document.querySelector(`[square="${startId-16}"]`).firstChild)&& !(document.querySelector(`[square="${startId-24}"]`).firstChild)&& !(document.querySelector(`[square="${startId-32}"]`).firstChild)&& !(document.querySelector(`[square="${startId-40}"]`).firstChild)||
                    startId-56===targetId && !(document.querySelector(`[square="${startId-8}"]`).firstChild)&& !(document.querySelector(`[square="${startId-16}"]`).firstChild)&& !(document.querySelector(`[square="${startId-24}"]`).firstChild)&& !(document.querySelector(`[square="${startId-32}"]`).firstChild)&& !(document.querySelector(`[square="${startId-40}"]`).firstChild)&& !(document.querySelector(`[square="${startId-48}"]`).firstChild)||
                    
                    startId-1===targetId||
                    startId-2===targetId && !(document.querySelector(`[square="${startId-1}"]`).firstChild)||
                    startId-3===targetId && !(document.querySelector(`[square="${startId-1}"]`).firstChild)&& !(document.querySelector(`[square="${startId-2}"]`).firstChild)||
                    startId-4===targetId && !(document.querySelector(`[square="${startId-1}"]`).firstChild)&& !(document.querySelector(`[square="${startId-2}"]`).firstChild)&& !(document.querySelector(`[square="${startId-3}"]`).firstChild)||
                    startId-5===targetId && !(document.querySelector(`[square="${startId-1}"]`).firstChild)&& !(document.querySelector(`[square="${startId-2}"]`).firstChild)&& !(document.querySelector(`[square="${startId-3}"]`).firstChild)&& !(document.querySelector(`[square="${startId-4}"]`).firstChild)||
                    startId-6===targetId && !(document.querySelector(`[square="${startId-1}"]`).firstChild)&& !(document.querySelector(`[square="${startId-2}"]`).firstChild)&& !(document.querySelector(`[square="${startId-3}"]`).firstChild)&& !(document.querySelector(`[square="${startId-4}"]`).firstChild)&& !(document.querySelector(`[square="${startId-5}"]`).firstChild)||
                    startId-7===targetId && !(document.querySelector(`[square="${startId-1}"]`).firstChild)&& !(document.querySelector(`[square="${startId-2}"]`).firstChild)&& !(document.querySelector(`[square="${startId-3}"]`).firstChild)&& !(document.querySelector(`[square="${startId-4}"]`).firstChild)&& !(document.querySelector(`[square="${startId-5}"]`).firstChild)&& !(document.querySelector(`[square="${startId-6}"]`).firstChild)||

                    startId+1===targetId||
                    startId+2===targetId && !(document.querySelector(`[square="${startId+1}"]`).firstChild)||
                    startId+3===targetId && !(document.querySelector(`[square="${startId+1}"]`).firstChild)&& !(document.querySelector(`[square="${startId+2}"]`).firstChild)||
                    startId+4===targetId && !(document.querySelector(`[square="${startId+1}"]`).firstChild)&& !(document.querySelector(`[square="${startId+2}"]`).firstChild)&& !(document.querySelector(`[square="${startId+3}"]`).firstChild)||
                    startId+5===targetId && !(document.querySelector(`[square="${startId+1}"]`).firstChild)&& !(document.querySelector(`[square="${startId+2}"]`).firstChild)&& !(document.querySelector(`[square="${startId+3}"]`).firstChild)&& !(document.querySelector(`[square="${startId+4}"]`).firstChild)||
                    startId+6===targetId && !(document.querySelector(`[square="${startId+1}"]`).firstChild)&& !(document.querySelector(`[square="${startId+2}"]`).firstChild)&& !(document.querySelector(`[square="${startId+3}"]`).firstChild)&& !(document.querySelector(`[square="${startId+4}"]`).firstChild)&& !(document.querySelector(`[square="${startId+5}"]`).firstChild)||
                    startId+7===targetId && !(document.querySelector(`[square="${startId+1}"]`).firstChild)&& !(document.querySelector(`[square="${startId+2}"]`).firstChild)&& !(document.querySelector(`[square="${startId+3}"]`).firstChild)&& !(document.querySelector(`[square="${startId+4}"]`).firstChild)&& !(document.querySelector(`[square="${startId+5}"]`).firstChild)&& !(document.querySelector(`[square="${startId+6}"]`).firstChild)      
                    )
                        {
                        return true
                    }
                    break;
                    case 'king':
                       if(
                        startId+1==targetId||
                        startId-1==targetId||
                        startId+8==targetId||
                        startId-8==targetId||
                        startId+7==targetId||
                        startId+9==targetId||
                        startId-9==targetId||
                        startId-7==targetId
                       ){
                        return true
                       }
                       break;
                          
     }
}
function checkForWin(){
    const kings=Array.from(document.querySelectorAll("#king"))
    if(!(kings.some(king=> king.firstChild.classList.contains('black')))){
        player.innerHTML='fuiyoh!!!!!!!'
        gameInfo.innerHTML='white wins'
        const allSquares=document.querySelectorAll('.square')
         allSquares.forEach(square=>
            square.firstChild?.setAttribute('draggable',false)
         )
         return
        }
        if(!(kings.some(king=> king.firstChild.classList.contains('white')))){
            player.innerHTML='fuiyoh!!!!!!!'
            gameInfo.innerHTML='black wins'
            const allSquares=document.querySelectorAll('.square')
             allSquares.forEach(square=>
                square.firstChild?.setAttribute('draggable',false)
             )
             return
        }   
    }
function underPromotion(target){
    targetId=Number(target.getAttribute('square'))||Number(target.parentNode.getAttribute('square'))
    if(dragElement.id==='pawn'){
        const lastRow=[63,62,61,60,59,58,57,56]
         if(lastRow.includes(targetId)){
            dragElement.id='queen'
            dragElement.classList.add('queen')
            
         }
    }
}
function rotate(){
    gameboard.classList.add('rotate')
    allPieces=document.querySelectorAll('.pieces')
    allPieces.forEach((piece)=>piece.classList.add('rotate'))
}
function removeRotate(){
    gameboard.classList.remove('rotate')
    allPieces=document.querySelectorAll('.pieces')
    allPieces.forEach((piece)=>piece.classList.remove('rotate'))
}
function check(start){
     const startId=Number(start.getAttribute('square'))||Number(start.parentNode.getAttribute('square'))
    const blackKing=document.querySelector('.blackKing')
    const whiteKing=document.querySelector('.whiteKing')
    const blackKingId=blackKing.getAttribute('square')
    const whiteKingId=whiteKing.getAttribute('.square')
     
 
}