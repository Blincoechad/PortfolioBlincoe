// my motivation responses
const responses = [
    'Do Better',
    'Dont Give up',
    'You Got This',
    'Keep Practicing',
    'Believe in Yourself',
];
const randomNumber = Math.floor(Math.random() * responses.length);
let answer = ''
if (randomNumber === 1) {
    answer = responses[1]
} else if (randomNumber === 2) {
    answer = responses[2]
} else if (randomNumber === 3) {
    answer = responses[3]
} else if (randomNumber === 4) {
    answer = responses[4]
} else {
    answer = "click again"
};
// clicking on button shows a random motivational response
document.getElementById('motivateButton').addEventListener('click', function() {
    document.getElementById('motivationDisplay').textContent = answer;
    answer = responses[Math.floor(Math.random() * responses.length)];
    if(responses.length === 0){
        document.getElementById('motivationDisplay').textContent = "Empty List, Add Some!";
    }
});
// after typing a new motivational response, adds it to the list
document.getElementById('addToList').addEventListener('click', function() {
    document.getElementById('addToList').addEventListener('click', function() {
        responses.push(document.getElementById('newMotivation').value);
        document.getElementById('newMotivation').value = '';
    })
});
// resets the whole list of motivational responses
document.getElementById('resetList').addEventListener('click', function() {
    document.getElementById('newMotivation').value = '';
    responses.length = 0;
    document.getElementById('newMotivation').innerHTML = '';
})