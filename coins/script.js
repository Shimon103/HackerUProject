let allCoins = [];

const fetchCryptoPrices = async () => {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=100&page=1`);
    const data = await response.json();
    allCoins = data; 
    displayCoins(allCoins);
};

const displayCoins = (coins) => {
    const container = document.getElementById('cryptoContainer');
    container.innerHTML = ''; 

    coins.forEach(coin => {
        const coinCard = document.createElement('div');
        coinCard.classList.add('card', 'cryptoCard');

        coinCard.innerHTML = `
            <img src="${coin.image}" class="card-img-top" alt="${coin.name} Logo">
            <div class="card-body">
                <h5 class="card-title">${coin.name} (${coin.symbol.toUpperCase()})</h5>
                <p class="card-text">$${coin.current_price.toLocaleString()}</p>
            </div>
        `;

        container.appendChild(coinCard);
    });
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

document.getElementById('sortBy').addEventListener('change', (event) => {
    sortCoins(event.target.value);
});

document.getElementById('search').addEventListener('input', (event) => {
    searchCoins(event.target.value);
});

window.onload = fetchCryptoPrices;
