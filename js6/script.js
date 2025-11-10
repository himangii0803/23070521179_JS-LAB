const inputString = document.getElementById('inputString');
const reverseBtn = document.getElementById('reverseBtn');
const output = document.getElementById('output');

// Function to reverse a string
function reverseString(str) {
    return str.split('').reverse().join('');
}

// Event listener for the button
reverseBtn.addEventListener('click', () => {
    const original = inputString.value;
    if (original.trim() === '') {
        output.textContent = 'Please enter a string!';
        output.style.color = '#e74c3c'; // Red for error
    } else {
        const reversed = reverseString(original);
        output.textContent = reversed;
        output.style.color = '#27ae60'; // Green for success
        // Add a quick animation class (optional, for extra flair)
        output.classList.add('highlight');
        setTimeout(() => output.classList.remove('highlight'), 500);
    }
});

// Allow reversing on Enter key press
inputString.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        reverseBtn.click();
    }
});