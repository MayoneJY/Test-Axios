let loginButton = document.querySelector('#loginButton');
let userName = document.querySelector('#userName')
let userEmail = document.querySelector('#userEmail');

const clickButton = ()=>{
    loginButton = document.querySelector('#loginButton');
    userName = document.querySelector('#userName');
    userEmail = document.querySelector('#userEmail');
    axios({
        method: 'get',
        url: 'https://jsonplaceholder.typicode.com/users'
        })
        .then(function (response) {
            let loginCheck = false;
            response.data.forEach(data => {
                if(data.username === userName.value && data.email === userEmail.value){
                    const loginForm = document.querySelector('#loginForm');
                    loginCheck = true;
                    loginForm.remove();
                    successLogin(data.id, data.name);
                }
            });
            
            if(!loginCheck) alert("이름 또는 이메일이 일치하지 않습니다.");
        });
};

const successLogin = (id, name)=>{
    axios({
        method: 'get',
        url: 'https://jsonplaceholder.typicode.com/posts'
    })
    .then(function (response){
        const newDiv = document.createElement('div');
        newDiv.setAttribute('id','userPost');
        const newDivHead = document.createElement('div');
        newDivHead.setAttribute('id','userHead');
        const newName = document.createTextNode("Hello " + name);
        const newButton = document.createElement('button');
        const newButtonText = document.createTextNode("Logout");
        newButton.appendChild(newButtonText);
        newButton.addEventListener('click', logoutButton);
        const newTable = document.createElement('table');
        response.data.forEach(data => {
            if(data.userId === id){
                const newTr = document.createElement('tr');
                const newTd = document.createElement('td');
                const newPost = document.createTextNode("Post #" + data.id);
                const newTitle = document.createTextNode("Title: " + data.title);
                const newBody = document.createTextNode("Body: " + data.body);
                const newBr = document.createElement('br');
                const newBr2 = document.createElement('br');
                newTd.appendChild(newPost);
                newTd.appendChild(newBr);
                newTd.appendChild(newTitle);
                newTd.appendChild(newBr2);
                newTd.appendChild(newBody);
                newTr.appendChild(newTd);
                newTable.appendChild(newTr);
                document.body.appendChild(newDiv);
            }
        newDiv.appendChild(newTable);
        newDivHead.appendChild(newName);
        newDivHead.appendChild(newButton);
        document.body.appendChild(newDivHead);
        document.body.appendChild(newDiv);
        });
    });
};

const logoutButton = ()=>{
    const userPost = document.querySelector('#userPost');
    userPost.remove();
    const userHead = document.querySelector('#userHead');
    userHead.remove();
    const newDiv = document.createElement('div');
    newDiv.setAttribute('id','loginForm');
    const newUserName = document.createElement('input');
    newUserName.setAttribute('id','userName');
    const newUserEmail = document.createElement('input');
    newUserEmail.setAttribute('id','userEmail');
    const newButton = document.createElement('button');
    const newButtonText = document.createTextNode("Login");
    newButton.addEventListener('click', clickButton);
    newButton.appendChild(newButtonText);
    newDiv.appendChild(newUserName);
    newDiv.appendChild(newUserEmail);
    newDiv.appendChild(newButton);
    document.body.appendChild(newDiv);
}

loginButton.addEventListener('click', clickButton);