const myTitle = document.querySelector('.title');
const myText = document.querySelector('.todo');
const myContainer = document.querySelector('.container');
const todoList = document.getElementById('todoList');
var divs = todoList.getElementsByTagName('div');
const verify = document.getElementById("verified");
let newBtnX;
let newBtnMark;
let left = document.createElement("p");
let cnt = 0;
let todos = [];
let res;
const btnAll = document.createElement("button");
const btnActive = document.createElement("button");
const btnCompleted = document.createElement("button");
let newDiv

btnAll.className = "allButton";
btnActive.className = "activeButton";
btnCompleted.className = "completedButton";

myText.addEventListener("keypress", function(event) {
    if(event.key === 'Enter') {
        event.preventDefault();

        let todo = {
            "key" : myText.value,
            "value" : 'Active'
        }

        todos.push(todo);
        const jsonObj = JSON.stringify(todos); 

        localStorage.setItem('myArray', jsonObj);

        newDiv = document.createElement("div");
        newDiv.className = "myTasks";
        let newParagraph = document.createElement("p");
        let newdivBtns = document.createElement("div");
        newdivBtns.className = "myBtns";

        newBtnX = document.createElement("button");
        newBtnX.className = "xButtons";
        newBtnMark = document.createElement("button");
        newBtnMark.className = "markButtons";

        cnt++;

        newBtnX.addEventListener("click", (event) => checkXButton(event));

        newBtnMark.addEventListener("click", (event) => checkMarkButton(event));

        newParagraph.textContent = event.target.value;
        newBtnX.textContent = 'x';
        newBtnMark.textContent = '0';
        btnActive.textContent = 'Active';
        btnAll.textContent = 'All';
        btnCompleted.textContent = 'Completed';
        left.textContent = cnt + ' Items left';

        newDiv.setAttribute('id', newParagraph.textContent);
        newDiv.appendChild(newBtnMark);

        newDiv.appendChild(newParagraph);
        newDiv.appendChild(newBtnX);

        let containerLast= document.createElement("div");
        containerLast.className = "lastBtns";
        
        containerLast.appendChild(left);
        containerLast.appendChild(btnAll);
        containerLast.appendChild(btnActive);
        containerLast.appendChild(btnCompleted);

        todoList.appendChild(newDiv);
        myContainer.appendChild(todoList);
        myContainer.appendChild(containerLast);

        myText.value = '';
    }

});

btnCompleted.addEventListener("click", function() {
    for (var i = 0; i < divs.length; i += 1) {
        const myTodo = document.getElementById(divs[i].firstChild.nextSibling.textContent);

        if(myTodo.firstChild.textContent === '0') {
			myTodo.style.display = 'none';
		} else {
            myTodo.style.display = 'flex';
        }
    }
});

btnActive.addEventListener("click", function() {

    for (var i = 0; i < divs.length; i += 1) {
        const myTodo = document.getElementById(divs[i].firstChild.nextSibling.textContent);

        if(myTodo.firstChild.textContent === '1') {
			myTodo.style.display = 'none';
		} else {
            myTodo.style.display = 'flex';
        }
    }
});

btnAll.addEventListener("click", function() {
    for (var i = 0; i < divs.length; i += 1) {
        const myTodo = document.getElementById(divs[i].firstChild.nextSibling.textContent);
        myTodo.style.display = 'flex';
    }
    
});

document.addEventListener('mousemove', function checkHover() {
    const childrenVec = document.getElementById("todoList").children;
    totalChildren = childrenVec.length;

    if(totalChildren !== 0) {
        const isHover = e => e.parentElement.querySelector(':hover') === e; 

        for (let i = 0; i < totalChildren; i++) {
            const hovered = isHover(childrenVec[i]);
            hovered ? childrenVec[i].firstChild.nextSibling.nextSibling.style.visibility = "visible" : childrenVec[i].firstChild.nextSibling.nextSibling.style.visibility = "hidden";
        }
    }
    
});

window.onload = function () {
    const str = localStorage.getItem('myArray');

    const parsedArray = JSON.parse(str);
    cnt = parsedArray.length;


    for(let i = 0; i < parsedArray.length; i += 1) {
        todos[i] = parsedArray[i];

        newDiv = document.createElement("div");
        newDiv.className = "myTasks";
        let newParagraph = document.createElement("p");
        let newdivBtns = document.createElement("div");
        newdivBtns.className = "myBtns";

        newBtnX = document.createElement("button");
        newBtnX.className = "xButtons";
        newBtnMark = document.createElement("button");
        newBtnMark.className = "markButtons";

        newParagraph.textContent = todos[i].key;
        newBtnX.textContent = 'x';

        if(todos[i].value === 'Active') {
            newBtnMark.textContent = '0';

        } else {
            newBtnMark.textContent = '1';
            newParagraph.style.color = "#cacaca";
            newParagraph.style.textDecoration = "line-through";
            newBtnMark.style.backgroundImage="url('CSS/images/check.png')";
            cnt--;
            console.log(cnt);
        }

        newBtnX.addEventListener("click", (event) => checkXButton(event));

        newBtnMark.addEventListener("click", (event) => checkMarkButton(event));

        btnActive.textContent = 'Active';
        btnAll.textContent = 'All';
        btnCompleted.textContent = 'Completed';

        newDiv.setAttribute('id', newParagraph.textContent);
        newDiv.appendChild(newBtnMark);

        newDiv.appendChild(newParagraph);
        newDiv.appendChild(newBtnX);

        let containerLast= document.createElement("div");
        containerLast.className = "lastBtns";
        
        containerLast.appendChild(left);
        containerLast.appendChild(btnAll);
        containerLast.appendChild(btnActive);
        containerLast.appendChild(btnCompleted);

        todoList.appendChild(newDiv);
        myContainer.appendChild(todoList);
        myContainer.appendChild(containerLast);

        myText.value = '';
    }
    left.textContent = cnt + ' Items left';


    console.log(todos);
}


function checkMarkButton(event) {
    const childElement = event.target;  
    let parentElement = childElement.parentElement;
    let firstChild = parentElement.firstChild;

    const htKey = firstChild.nextSibling.textContent;
    const index = todos.findIndex(todo => todo.key == htKey);

    if(event.target.textContent === '1') {
        event.target.textContent = '0';
        firstChild.nextSibling.style.color = "#d3c6d1";
        firstChild.nextSibling.style.textDecoration = "none";

        firstChild.style.backgroundImage="none";
        const str = localStorage.getItem('myArray');

        // convert JSON string to relevant object
        const parsedArray = JSON.parse(str);

        parsedArray[index].value = "Active";
        const jsonObj = JSON.stringify(parsedArray); 

        localStorage.setItem('myArray', jsonObj);
        cnt++;
        todos[index].value = "Active";
        left.textContent = cnt + ' Items left';

    } else if (event.target.textContent === '0') {
        event.target.textContent = '1';
        firstChild.nextSibling.style.color = "#cacaca";
        firstChild.nextSibling.style.textDecoration = "line-through";
        firstChild.style.backgroundImage="url('CSS/images/check.png')";

        const str = localStorage.getItem('myArray');

        // convert JSON string to relevant object
        const parsedArray = JSON.parse(str);
        parsedArray[index].value = "Completed";

        const jsonObj = JSON.stringify(parsedArray); 

        localStorage.setItem('myArray', jsonObj);
        
        cnt--;
        todos[index].value = "Completed";
        left.textContent = cnt + ' Items left';
    }
}

function checkXButton(event) {
    const childElement = event.target;  
    let parentElement = childElement.parentElement;
    const htKey = parentElement.firstChild.nextSibling.textContent;

    const index = todos.findIndex(todo => todo.key == htKey);

    if(newBtnMark.textContent === '0') { 
        cnt--;
    }

    delete todos.splice(index, 1); 

    left.textContent = cnt + ' Items left';
    const str = localStorage.getItem('myArray');

    // convert JSON string to relevant object
    const parsedArray = JSON.parse(str);
    delete parsedArray.splice(index, 1);

    const jsonObj = JSON.stringify(parsedArray); 

    localStorage.setItem('myArray', jsonObj);
    parentElement.remove();

}






