// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!

//callback functions --------------------------------------------
//add property to TAG by ID
function addPropertyById(idName, propertyName, propertyValue) {
  let elementById = document.getElementById(idName)
  elementById.setAttribute(propertyName, propertyValue)
}

// handling the mimicServerCall response

//   * When the "server" returns a success status:
//     * Change the heart to a full heart
//     * Add the `.activated-heart` class to make the heart appear red
// * When a user clicks on a full heart:
//   * Change the heart back to an empty heart
//   * Remove the `.activated-heart` class
function handleMimicServerCall(e) {
  mimicServerCall().then((res) => changeHeart(e))
  .catch((err) => handleError(err))
}



//   * When the "server" returns a failure status:
//     * Respond to the error using a `.catch(() => {})` block after your
//       `.then(() => {})` block.
//     * Display the error modal by removing the `.hidden` class
//     * Display the server error message in the modal
//     * Use `setTimeout` to hide the modal after 3 seconds (add the `.hidden` class)
function handleError(err) {
  document.getElementById('modal').classList.remove('hidden')
  document.getElementById('modal').innerText = err
  setTimeout(function() {
    document.getElementById('modal').classList.add('hidden')}, 3000 )
}

//Change heart state
// * When the "server" returns a success status:
//     * Change the heart to a full heart
//     * Add the `.activated-heart` class to make the heart appear red
// * When a user clicks on a full heart:
//   * Change the heart back to an empty heart
function changeHeart(e) {
  let heartState = e.target.innerText
  if(heartState === EMPTY_HEART) {
    e.target.innerText = FULL_HEART
    e.target.classList.add('activated-heart') 
  } else {
    e.target.innerText = EMPTY_HEART
    e.target.classList.remove('activated-heart')
  }
  return heartState
}
// Add the .hidden class to the error modal in the HTML so it does not appear when the page first loads

window.addEventListener('load',function() {
  addPropertyById('modal','class','hidden')
})



// When a user clicks on an empty heart:
// Invoke mimicServerCall to simulate making a server request
document.addEventListener('DOMContentLoaded', () => {
  const likeButtons = document.getElementsByClassName('like-glyph')

  for(let likeBtn of likeButtons){
    // likeBtn.addEventListener("click", changeHeart)
    likeBtn.addEventListener("click", mimicServerCall)
    likeBtn.addEventListener("click", handleMimicServerCall)
   
    }
})



//   when the page first loads
// * When a user clicks on an empty heart:
//   * Invoke `mimicServerCall` to simulate making a server request
//   * When the "server" returns a failure status:
//     * Respond to the error using a `.catch(() => {})` block after your
//       `.then(() => {})` block.
//     * Display the error modal by removing the `.hidden` class
//     * Display the server error message in the modal
//     * Use `setTimeout` to hide the modal after 3 seconds (add the `.hidden` class)
//   * When the "server" returns a success status:
//     * Change the heart to a full heart
//     * Add the `.activated-heart` class to make the heart appear red
// * When a user clicks on a full heart:
//   * Change the heart back to an empty heart
//   * Remove the `.activated-heart` class
// * Keep all your styling rules entirely in `style.css`. Do not manipulate any
//   `.style` properties.
// * Only manipulate the DOM once the server request responds. Do not make the
//   heart full until you're inside a successful `.then` block.


//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
