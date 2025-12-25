let firstCard=null 
let secondCard=null
var open=false

function makeCard(){
    let arr=''
    let emoji=['😀','🤣','🥶','👽','💀','👺']
    let newArr=[...emoji,...emoji]

    for (let i = newArr.length - 1; i > 0; i--)
    { 
    const j = Math.floor(Math.random() * (i + 1));
    const temp = newArr[i];
    newArr[i] = newArr[j];
    newArr[j] = temp;
    }
    
    for(var i=0;i<newArr.length;i++)
    {
      arr = arr + ` <div class="card" >
      <div class="front">${newArr[i]}</div>
      <div class="back">?</div>
      </div>`
    }
    document.querySelector('.game-container').innerHTML= arr
}

function cardflip(){
      if(open ||this===firstCard){
          return
        }
      this.classList.add("flipped")
      if(!firstCard){
          firstCard=this;
      }else{
          secondCard=this;
          open=true
          isMatching();
        }
}

function addCardEvents(){
  let allCards=document.querySelectorAll(".card")
  allCards.forEach(card=>card.addEventListener('click',cardflip))
}

function isMatching(){
  var isMatch=(firstCard.querySelector('.front').textContent == secondCard.querySelector('.front').textContent)
  if(isMatch){
    disableClick()
  }else{
    unflipped()
  }
}
function unflipped(){
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    firstCard=null
    secondCard=null
    open=false
  }, 1000);
}

function disableClick(){
  firstCard.removeEventListener('click',cardflip)
  secondCard.removeEventListener('click',cardflip)
  firstCard=null
  secondCard=null
  open=false;
} 

function reset(){
  makeCard()
  addCardEvents();
}

makeCard();
addCardEvents();

var resetbtn=document.querySelector('#reset-btn')
resetbtn.addEventListener('click',function()
{ 
  console.log('RESTART')
  reset()
})

