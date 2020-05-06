const url = "https://dog.ceo/api/breeds/image/random";
const xmlBtn = document.querySelector('#xml');
const axiosBtn = document.querySelector('#axios');
const dog = document.querySelector('#dog-list');

//XMLHTTPREQUEST
function xmlrequest() {
    //Getting the request object
    const xhr = new XMLHttpRequest();
    //Opening the request
    xhr.open('GET', url, true);
    //When response comes
    xhr.onload = function() {   
        if(xhr.status === 200) {
            const newDog = JSON.parse(xhr.responseText);
            printDog(newDog);
            dog.lastElementChild.children[0].style.border = '8px solid #5bc0de';
        } else {
            //Error handling, client side
           console.log('Something went wrong', xhr.responseText, xhr.status)
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
    .then(response => {
        printDog(response.data);
        dog.lastElementChild.children[0].style.border = '8px solid #5cb85c'
    } )
    .catch(error => console.log(error.message));
}
 axiosBtn.addEventListener('click', axiosRequest);

//Print func on the page
function printDog(responseObj) {
    dog.innerHTML += `<li>
    <img src="${responseObj.message}">
    </li>
    `
}