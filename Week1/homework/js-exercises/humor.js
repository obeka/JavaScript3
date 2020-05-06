const url = "https://xkcd.now.sh/?comic=latest";
const pic = document.querySelector('#pic');
//XMLHTTPREQUEST
function xmlrequest() {
    //Getting the requst object
    const xhr = new XMLHttpRequest();
    //Opening the request
    xhr.open('GET', url, true);

    //When response comes
    xhr.onload = function() {   
        if(xhr.status === 200) {
           const responseObj = (JSON.parse(xhr.responseText));
           pic.innerHTML = `<img style="width:500px; margin-right:50px" src="${responseObj.img}">`
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
xmlrequest();

//AXIOS REQUEST
function axiosRequest() {
    axios.get(url)
    .then(response => {
        pic.innerHTML += `<img style="width:500px;" src="${response.data.img}">`
        console.log(response.data)
    })
    .catch(error => console.log(error.message));
}
axiosRequest();
