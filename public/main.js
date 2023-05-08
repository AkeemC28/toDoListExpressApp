const serverURL = 'http://localhost:2830'; 
var submitButton = document.getElementById('submit');
var toDoInput = document.getElementById('toDoInput');
var toDoList = document.getElementById('toDoList');
var form = document.getElementById('#newtask');
var clearButton = document.querySelector('#clear');
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
        // .then(response => {
        //     if (response.ok) return response.json();
        // })
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

function clearCompleted() {
  let done = document.getElementsByClassName('done');
  let completedTasks = [];
  for (let i = 0; i < done.length; i++) {
    completedTasks.push(done[i].innerText);
    done[i].style.textDecoration = 'line-through';
    done[i].classList.add('done');
  }
  toggleTaskStatus(completedTasks);
}



function toggleTaskStatus(tasks) {
  fetch(`${serverURL}/tasks`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      tasks: tasks,
      completed: true
    }),
  })
    .then((response) => {
      // Handle the response if needed
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}


function clear(){ 
  let toDoTask = document.querySelectorAll('li')
  for(let i = 0; i < toDoTask.length; i++){
    sendDelete(toDoTask[i].innerText);
  // tasksUp();
}
}


function sendDelete(tasks){
  console.log(tasks)
  fetch('/tasks', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      tasks: tasks
    })
  }).then(function (response) {
    // window.location.reload()
  })
  
}


// Array.from(clearButton).forEach(function(element) {
//     const task = this.parentNode.parentNode.childNodes[1].innerText;
//     element.addEventListener('click', function(){
//       fetch('/tasks', {
//         method: 'delete',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           task: task
//         })
//       }).then(function (response) {
//         window.location.reload()
//       })
//     });
// });



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


