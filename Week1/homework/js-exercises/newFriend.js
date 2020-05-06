const url = "https://www.randomuser.me/api";
const xmlBtn = document.querySelector('#xml');
const axiosBtn = document.querySelector('#axios');
const friend = document.querySelector('.response');

//XMLHTTPREQUEST
function xmlrequest() {
    //Getting the request object
    const xhr = new XMLHttpRequest();
    //Opening the request
    xhr.open('GET', url, true);
    //When response comes
    xhr.onload = function() {   
        if(xhr.status === 200) {
            const newFriend = JSON.parse(xhr.responseText);
            printFriend(newFriend);
        } else {
            //Error handling, client side
           friend.innerHTML = 'Something went wrong' + xhr.responseText + xhr.status
        }
    }
    // Error handling, server side
    xhr.onerror = function(error) {
        console.log('Something went wrong...', error)
    }
    //Sending the request
    xhr.send();
}
xmlBtn.addEventListener('click', xmlrequest);

//AXIOS REQUEST
function axiosRequest() {
    axios.get(url)
    .then(response => printFriend(response.data))
    .catch(error => friend.innerHTML = error.message);
}
 axiosBtn.addEventListener('click', axiosRequest);

//Print func on the page
function printFriend(responseObj) {
    friend.innerHTML = `
    <p>Name : ${responseObj.results[0].name.title} ${responseObj.results[0].name.first} ${responseObj.results[0].name.last}</p>
    <img src="${responseObj.results[0].picture.large}">
    `
}