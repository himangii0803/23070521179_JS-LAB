
const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "You are stronger than you think and braver than you feel.", author: "A.A. Milne" },
    { text: "Don't wait for the perfect moment. Take the moment and make it perfect.", author: "Zoey Sayward" },
    { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
    { text: "Happiness is letting go of what you think your life is supposed to look like.", author: "Mandy Hale" },
    { text: "Keep taking time for yourself until you’re you again.", author: "Lalah Delia" }
];

const affirmations = [
    { text: "I am capable of achieving my goals.", author: "Anonymous" },
    { text: "Every day is a new opportunity to change your life.", author: "Anonymous" },
    { text: "I choose to be happy and grateful.", author: "Anonymous" },
    { text: "I am worthy of love and respect.", author: "Anonymous" },
    { text: "I embrace change and grow stronger.", author: "Anonymous" },
    { text: "I am worthy of love and respect.", author: "Anonymous" },
    { text: "I am safe, I am loved, and I am at peace.", author: "Anonymous" },
    { text: "I am learning to find beauty in every chapter of my journey.", author: "Anonymous" },
    { text: "I am becoming the best version of myself, one step at a time.", author: "Anonymous" },
    { text: "My heart is calm, my mind is clear, and my soul is still.", author: "Anonymous" },
];

// DOM elements
const homeView = document.getElementById('home-view');
const contentView = document.getElementById('content-view');
const viewTitle = document.getElementById('view-title');
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const quotesBtn = document.getElementById('quotes-btn');
const affirmationsBtn = document.getElementById('affirmations-btn');
const backBtn = document.getElementById('back-btn');
const newQuoteBtn = document.getElementById('new-quote-btn');
const favoriteBtn = document.getElementById('favorite-btn');
const themeBtn = document.getElementById('theme-btn');
const favoritesUl = document.getElementById('favorites-ul');


let currentMode = 'quotes';
let currentArray = quotes;


let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
updateFavoritesList();


function getRandomItem() {
    const randomIndex = Math.floor(Math.random() * currentArray.length);
    return currentArray[randomIndex];
}

function displayItem(item) {
    quoteText.textContent = `"${item.text}"`;
    quoteAuthor.textContent = `- ${item.author}`;
}


function updateFavoritesList() {
    favoritesUl.innerHTML = '';
    favorites.forEach((fav, index) => {
        const li = document.createElement('li');
        li.textContent = `"${fav.text}" - ${fav.author}`;
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.onclick = () => {
            favorites.splice(index, 1);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            updateFavoritesList();
        };
        li.appendChild(removeBtn);
        favoritesUl.appendChild(li);
    });
}


function showContentView(mode) {
    currentMode = mode;
    currentArray = mode === 'quotes' ? quotes : affirmations;
    viewTitle.textContent = mode === 'quotes' ? 'Quotes' : 'Affirmations';
    homeView.style.display = 'none';
    contentView.style.display = 'block';
    displayItem(getRandomItem());
}


quotesBtn.addEventListener('click', () => showContentView('quotes'));
affirmationsBtn.addEventListener('click', () => showContentView('affirmations'));
backBtn.addEventListener('click', () => {
    contentView.style.display = 'none';
    homeView.style.display = 'block';
});

newQuoteBtn.addEventListener('click', () => {
    displayItem(getRandomItem());
});

favoriteBtn.addEventListener('click', () => {
    const currentItem = {
        text: quoteText.textContent.slice(1, -1), 
        author: quoteAuthor.textContent.slice(2) 
    };
    if (!favorites.some(fav => fav.text === currentItem.text)) {
        favorites.push(currentItem);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavoritesList();
        alert('Added to favorites!');
    } else {
        alert('Already in favorites!');
    }
});

themeBtn.addEventListener('click', () => {
    const body = document.body;
    if (body.style.background.includes('#e0f7fa')) {
        body.style.background = 'linear-gradient(to bottom, #fce4ec, #f8bbd9)'; 
    } else {
        body.style.background = 'linear-gradient(to bottom, #e0f7fa, #b2dfdb)'; 
    }
});