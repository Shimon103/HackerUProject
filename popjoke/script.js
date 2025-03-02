const getJoke = async () => {
    const category = document.querySelector('#categoryPicker').value;
    console.log(category);

    const response = await fetch(`https://v2.jokeapi.dev/joke/${category}`);
    const data = await response.json();
    console.log(data);
    applyJoke(data, category);
}

const applyJoke = (data, category) => {
    const jokeContainer = document.querySelector('.jokeContainer');
    const joke = document.querySelector('.joke');

    jokeContainer.classList.remove('fade-in');

    jokeContainer.className = 'jokeContainer';
    jokeContainer.classList.add(`category-${category}`);

    joke.innerHTML = "";

    setTimeout(() => {
        if (data.type === "twopart") {
            joke.innerHTML = `${data.setup} <br><br>` ;
            setTimeout(() => {
                joke.innerHTML += ` ${data.delivery}`;
            }, 2000);
        } else {
            joke.innerHTML = `${data.joke}`;
        }

        jokeContainer.classList.add('fade-in');
    }, 1000);
}

const resetJoke = document.querySelector('.jokeButton');
resetJoke.addEventListener('click', getJoke);
