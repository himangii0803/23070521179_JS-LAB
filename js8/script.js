document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    clearErrors();

    
    let isValid = true;

    
    const name = document.getElementById('name').value.trim();
    if (!name) {
        showError('nameError', 'Full name is required.');
        isValid = false;
    }

    
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        showError('emailError', 'Please enter a valid email address.');
        isValid = false;
    }

    
    const phone = document.getElementById('phone').value.trim();
    const phoneRegex = /^\d{10}$/;
    if (!phone || !phoneRegex.test(phone)) {
        showError('phoneError', 'Please enter a valid 10-digit phone number.');
        isValid = false;
    }

    const dob = document.getElementById('dob').value;
    if (!dob) {
        showError('dobError', 'Date of birth is required.');
        isValid = false;
    } else {
        const birthDate = new Date(dob);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (age < 18) {
            showError('dobError', 'You must be at least 18 years old.');
            isValid = false;
        }
    }

    
    const address = document.getElementById('address').value.trim();
    if (!address) {
        showError('addressError', 'Address is required.');
        isValid = false;
    }

    
    const membership = document.getElementById('membership').value;
    if (!membership) {
        showError('membershipError', 'Please select a membership type.');
        isValid = false;
    }

    
    const terms = document.getElementById('terms').checked;
    if (!terms) {
        showError('termsError', 'You must agree to the terms and conditions.');
        isValid = false;
    }

    
    if (isValid) {
        alert('Registration successful!');
        
        document.getElementById('registrationForm').reset();
    }
});


document.getElementById('email').addEventListener('blur', function() {
    const email = this.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
        showError('emailError', 'Please enter a valid email address.');
    } else {
        hideError('emailError');
    }
});

document.getElementById('phone').addEventListener('blur', function() {
    const phone = this.value.trim();
    const phoneRegex = /^\d{10}$/;
    if (phone && !phoneRegex.test(phone)) {
        showError('phoneError', 'Please enter a valid 10-digit phone number.');
    } else {
        hideError('phoneError');
    }
});

document.getElementById('dob').addEventListener('blur', function() {
    const dob = this.value;
    if (dob) {
        const birthDate = new Date(dob);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (age < 18) {
            showError('dobError', 'You must be at least 18 years old.');
        } else {
            hideError('dobError');
        }
    }
});


function showError(id, message) {
    const errorElement = document.getElementById(id);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function hideError(id) {
    const errorElement = document.getElementById(id);
    errorElement.style.display = 'none';
}

function clearErrors() {
    const errors = document.querySelectorAll('.error');
    errors.forEach(error => error.style.display = 'none');
}