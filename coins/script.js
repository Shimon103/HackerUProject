
const fetchCryptoPrices = async () => {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=100&page=1`);
    const data = await response.json();
    allCoins = data;
    displayCoins(allCoins);
};

let allCoins = [];
let likedCoins = JSON.parse(localStorage.getItem('likedCoins')) || [];

const displayCoins = (coins) => {
    const container = document.getElementById('cryptoContainer');
    container.innerHTML = ''; 

    coins.forEach(coin => {
        const coinCard = document.createElement('div');
        const isLiked = likedCoins.includes(coin.id);
        coinCard.classList.add('card', 'cryptoCard', `${isLiked ? "liked" : "notLiked"}`);


        coinCard.innerHTML = `
            <img src="${coin.image}" class="card-img-top" alt="${coin.name} Logo">
            <div class="card-body">
                <h5 class="card-title">${coin.name} (${coin.symbol.toUpperCase()})</h5>
                <p class="card-text">$${coin.current_price.toLocaleString()}</p>
                <button class="btn btn-${isLiked ? 'danger' : 'success'} like-btn" data-coin-id="${coin.id}">
                    ${isLiked ? 'Unlike' : 'Like'}
                </button>
            </div>
        `;

        const likeButton = coinCard.querySelector('.like-btn');
        likeButton.addEventListener('click', () => toggleLike(coin.id));

        container.appendChild(coinCard);
    });
};

const toggleLike = (coinId) => {
    if (likedCoins.includes(coinId)) {
        likedCoins = likedCoins.filter(id => id !== coinId);
    } else {
        likedCoins.push(coinId);
    }

    localStorage.setItem('likedCoins', JSON.stringify(likedCoins));

    displayCoins(allCoins);
};

const sortCoins = (criteria) => {
    let sortedCoins = [];
    
    if (criteria === 'name_asc') {
        sortedCoins = [...allCoins].sort((a, b) => a.name.localeCompare(b.name));
    } else if (criteria === 'name_desc') {
        sortedCoins = [...allCoins].sort((a, b) => b.name.localeCompare(a.name));
    } else if (criteria === 'price_asc') {
        sortedCoins = [...allCoins].sort((a, b) => a.current_price - b.current_price);
    } else if (criteria === 'price_desc') {
        sortedCoins = [...allCoins].sort((a, b) => b.current_price - a.current_price);
    }
    
    displayCoins(sortedCoins);
};

const searchCoins = (coinName) => {
    const searchedCoins = allCoins.filter(coin => 
        coin.name.toLowerCase().includes(coinName.toLowerCase())
    );
    displayCoins(searchedCoins);
};

const filterFavorites = () => {
    const notFavs = document.querySelectorAll('.notLiked');
    notFavs.forEach(coin => {
        coin.classList.toggle('hidden');
    });
    const button = document.getElementById('filterFavorites');
    button.innerText = button.innerText === 'Show Favorites' ? 'Show all' : 'Show Favorites';
      
};

document.getElementById('sortBy').addEventListener('change', (event) => {
    sortCoins(event.target.value);
});

document.getElementById('search').addEventListener('input', (event) => {
    searchCoins(event.target.value);
});

document.getElementById('filterFavorites').addEventListener('click', () => {
    filterFavorites();
});

window.onload = fetchCryptoPrices;
