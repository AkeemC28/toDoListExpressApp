const serverURL = 'http://localhost:2830'; 

var trash = document.getElementsByClassName("fa-trash");
var submitButton = document.getElementById('submit');
var toDoInput = document.getElementById('toDoInput');
var toDoList = document.getElementById('toDoList');
var form = document.getElementById('#newtask');
var clearButton = document.getElementById('clear');
var clearCompletedTask = document.getElementById('cct');
var leftOver = document.getElementById('leftOver');

submitButton.addEventListener('click', function (e) {
    e.preventDefault();
    if (document.querySelector('#toDoInput').value.length == 0) {
        alert("Please Enter A Task");
        return;
    }

    fetch(`${serverURL}/tasks`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            tasks: toDoInput.value,
            
        })
        
    }) 
        .then(response => {
            if (response.ok) return response.json();
        })
        .then(data => {
            console.log(data);
            // window.location.reload(true);
        })
        .catch(error => {
            console.error('Error:', error);
        });

    const li = document.createElement('li');
    li.innerText = toDoInput.value;
    toDoInput.value = "";

    toDoList.appendChild(li);
    li.addEventListener('click', () => {
        
        li.classList.toggle('done');
        tasksUp();
        
    });
    
});

 


function tasksUp(){
  let everyTask = document.querySelectorAll('li').length
  let clearCompletedTask = document.querySelectorAll('.done').length
      leftOver.innerText = (everyTask - clearCompletedTask)
}

function clearCompleted(){
  console.log('clearCompleted')
  let done = document.getElementsByClassName('done')
  for(let i = 0; i < done.length; i++){
      done[i].style.display = 'none'
  }
  tasksUp()
}
function clear(){
  document.getElementById("toDoList").innerText = ("");
  tasksUp();
}



clearButton.addEventListener('click', clear)
clearCompletedTask.addEventListener('click', clearCompleted)


//Template Functions

// const createTask = (e) => {
//   e.preventDefault()
//   if(document.querySelector('#toDoInput').value.length == 0){
//     alert("Please Enter A Task");
//     return 
// }
// const li = document.createElement('li');
// li.innerText = toDoInput.value;
// toDoInput.value = "";
// toDoList.appendChild(li);
// li.addEventListener('click', () => {
//     li.classList.toggle('done');
//     tasksUp()
//   })  

//   fetch('task', {
//     method: 'post',
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify({
//       'tasks': toDoInput.value,
//     })
//   })
//   .then(response => {
//     if (response.ok) return response.json()
//   })
//   .then(data => {
//     console.log(data)
//     window.location.reload(true)
//   })
  
// }

// Array.from(thumbUp).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const name = this.parentNode.parentNode.childNodes[1].innerText
//         const msg = this.parentNode.parentNode.childNodes[3].innerText
//         const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
//         fetch('task', {
//           method: 'put',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//             'name': name,
//             'msg': msg,
//             'thumbUp':thumbUp
//           })
//         })
//         .then(response => {
//           if (response.ok) return response.json()
//         })
//         .then(data => {
//           console.log(data)
//           window.location.reload(true)
//         })
//       });
// });

// Array.from(thumbDown).forEach(function(element) {
//   element.addEventListener('click', function(){
//     const name = this.parentNode.parentNode.childNodes[1].innerText
//     const msg = this.parentNode.parentNode.childNodes[3].innerText
//     const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
//     fetch('messages/thumbDown', {
//       method: 'put',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({
//         'name': name,
//         'msg': msg,
//         'thumbUp':thumbUp
//       })
//     })
//     .then(response => {
//       if (response.ok) return response.json()
//     })
//     .then(data => {
//       console.log(data)
//       window.location.reload(true)
//     })
//   });
// });

// Array.from(trash).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const name = this.parentNode.parentNode.childNodes[1].innerText
//         const msg = this.parentNode.parentNode.childNodes[3].innerText
//         fetch('messages', {
//           method: 'delete',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             'name': name,
//             'msg': msg
//           })
//         }).then(function (response) {
//           window.location.reload()
//         })
//       });
// });
