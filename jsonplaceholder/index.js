const button = document.querySelector('#button');

const clickButton = ()=>{
    axios({
        method: 'get',
        url: 'https://jsonplaceholder.typicode.com/users',
        })
        .then(function (response) {
            console.log(response.data);
        });
};
button.addEventListener('click', clickButton);