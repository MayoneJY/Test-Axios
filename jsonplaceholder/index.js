let loginButton = document.querySelector('#loginButton');
let userName = document.querySelector('#userName')
let userEmail = document.querySelector('#userEmail');
const main = document.querySelector('#main');

const clickButton = ()=>{
    loginButton = document.querySelector('#loginButton');
    userName = document.querySelector('#userName');
    userEmail = document.querySelector('#userEmail');
    axios({
        method: 'get',
        url: 'https://jsonplaceholder.typicode.com/users',
        params: {
            username: userName.value,
            email: userEmail.value
        }
        })
        .then(function (response) {
            if (response.data.length != 0){
                const loginForm = document.querySelector('#loginForm');
                loginForm.remove();
                successLogin(response.data[0].id, response.data[0].name);
            }
            else alert("이름 또는 이메일이 일치하지 않습니다.");
        });
};

loginButton.addEventListener('click', clickButton);

const successLogin = (id, name)=>{
    axios({
        method: 'get',
        url: 'https://jsonplaceholder.typicode.com/posts',
        params: {
            userId: id
        }
    })
    .then(function (response){
        let maininner;
        maininner = `<div id='userPost'>
            <div id='userHead'>
                Hello ${name}
                <button onclick='logoutButton();'>Logout</button>
            </div>
            <table>`;
        response.data.forEach(data => {
            maininner += `<tr>
                <td>
                    Post #${data.id}<br />
                    Title: ${data.title}<br />
                    Body: ${data.body}
                </td>
            </tr>`;
        });
        maininner += `</table></div>`;
        main.innerHTML = maininner;
    });
};

const logoutButton = ()=>{
    document.querySelector('#userPost').remove();
    main.innerHTML = 
    `<div id='loginForm'>
        <input type='text' id='userName'>
        <input type='text' id='userEmail'>
        <button id='loginButton'>Login</button>
    </div>`
    const newButton = document.querySelector('#loginButton');
    newButton.addEventListener('click', clickButton);
}
