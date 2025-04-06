// Add loading state detection
if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initQuiz);
} else {
    initQuiz();
}

function initQuiz() {
    const quizForm = document.getElementById('quiz-form');
    const showResultButton = document.getElementById('show-result-button');

    const questionInputs = Array.from(quizForm.querySelectorAll('input[type="radio"]'));

    quizForm.addEventListener('change', () => {
        const allQuestionsAnswered = Array.from(new Set(questionInputs.map(input => input.name)))
            .every(name => quizForm.querySelector(`input[name="${name}"]:checked`));
        showResultButton.disabled = !allQuestionsAnswered;
    });

    showResultButton.addEventListener('click', () => {
        const selectedRoles = [];
        for (let i = 1; i <= 3; i++) {
            const selectedOption = quizForm.querySelector(`input[name="q${i}"]:checked`);
            if (selectedOption) {
                selectedRoles.push(selectedOption.value);
            }
        }

        const roleCounts = {};
        selectedRoles.forEach(role => {
            roleCounts[role] = (roleCounts[role] || 0) + 1;
        });

        let finalRole = '';
        const priorityOrder = ["Hecate", "Green Snake", "Agnes Naismith", "Catherine Campbell", "Macbeth", "The Bride"];

        for (const role in roleCounts) {
            if (roleCounts[role] >= 2) {
                finalRole = role;
                break;
            }
        }

        if (!finalRole) {
            for (const role of priorityOrder) {
                if (selectedRoles.includes(role)) {
                    finalRole = role;
                    break;
                }
            }
        }

        window.location.href = `result.html?role=${encodeURIComponent(finalRole)}`;
    });
    
    window.addEventListener('offline', function() {
        alert('Network connection lost. Please check your internet connection.');
    });
}
