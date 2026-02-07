// Основные переменные
let currentPage = 1;
const totalPages = 8;
let userAnswers = {};

// База хобби
const hobbies = {
    "photography": {
        name: "Фотография",
        description: "Искусство создания изображений. Развивает художественный вкус и внимание к деталям.",
        icon: "fa-camera",
        category: "creative"
    },
    "drawing": {
        name: "Рисование",
        description: "Выражение идей через искусство. Развивает креативность и моторику.",
        icon: "fa-paint-brush",
        category: "creative"
    },
    "hiking": {
        name: "Пеший туризм",
        description: "Исследование природы. Укрепляет здоровье и дарит впечатления.",
        icon: "fa-hiking",
        category: "active"
    },
    "cooking": {
        name: "Кулинария",
        description: "Искусство приготовления пищи. Творческий процесс с мгновенным результатом.",
        icon: "fa-utensils",
        category: "creative"
    },
    "reading": {
        name: "Чтение",
        description: "Погружение в литературные миры. Расширяет кругозор и словарный запас.",
        icon: "fa-book",
        category: "home"
    },
    "yoga": {
        name: "Йога",
        description: "Практика для тела и ума. Улучшает гибкость и помогает управлять стрессом.",
        icon: "fa-spa",
        category: "active"
    },
    "gardening": {
        name: "Садоводство",
        description: "Выращивание растений. Учит терпению и дарит связь с природой.",
        icon: "fa-leaf",
        category: "nature"
    },
    "music": {
        name: "Музыка",
        description: "Игра на инструменте или пение. Развивает слух и эмоциональный интеллект.",
        icon: "fa-guitar",
        category: "creative"
    },
    "coding": {
        name: "Программирование",
        description: "Создание программ и приложений. Развивает логическое мышление.",
        icon: "fa-code",
        category: "learning"
    },
    "chess": {
        name: "Шахматы",
        description: "Интеллектуальная игра. Развивает стратегическое мышление и концентрацию.",
        icon: "fa-chess",
        category: "learning"
    }
};

// Навигация
function nextPage() {
    if (currentPage > 1 && currentPage < 8 && !userAnswers[`page${currentPage}`]) {
        alert("Пожалуйста, выберите ответ на текущий вопрос");
        return;
    }
    
    if (currentPage < totalPages) {
        document.getElementById(`page${currentPage}`).classList.remove('active');
        currentPage++;
        document.getElementById(`page${currentPage}`).classList.add('active');
        updateProgressBar();
        
        if (currentPage === totalPages) {
            calculateResults();
        }
    }
}

function prevPage() {
    if (currentPage > 1) {
        document.getElementById(`page${currentPage}`).classList.remove('active');
        currentPage--;
        document.getElementById(`page${currentPage}`).classList.add('active');
        updateProgressBar();
    }
}

function updateProgressBar() {
    const progressSteps = document.querySelectorAll('.progress-step');
    progressSteps.forEach((step, index) => {
        if (index < currentPage) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
    
    const progressBar = document.querySelector('.progress-bar');
    const progressPercent = ((currentPage - 1) / (totalPages - 1)) * 100;
    progressBar.style.setProperty('--progress-width', `${progressPercent}%`);
}

// Выбор ответа
function selectOption(optionElement, value) {
    const options = optionElement.parentElement.querySelectorAll('.option');
    options.forEach(opt => opt.classList.remove('selected'));
    optionElement.classList.add('selected');
    userAnswers[`page${currentPage}`] = value;
}

// Расчет результатов
function calculateResults() {
    if (Object.keys(userAnswers).length === 0) {
        userAnswers = {
            page2: 'creative',
            page3: 'achievement',
            page4: 'anywhere',
            page5: 'moderate',
            page6: 'skill',
            page7: 'moderate_budget'
        };
    }
    
    const userProfile = {
        activity: userAnswers.page2 || 'creative',
        satisfaction: userAnswers.page3 || 'achievement',
        environment: userAnswers.page4 || 'anywhere',
        time: userAnswers.page5 || 'moderate',
        goal: userAnswers.page6 || 'skill',
        budget: userAnswers.page7 || 'moderate_budget'
    };
    
    const hobbyScores = {};
    
    for (const [hobbyId, hobby] of Object.entries(hobbies)) {
        let score = 0;
        if (hobby.category === userProfile.activity) score += 3;
        if (hobby.category === userProfile.environment) score += 2;
        score += Math.random();
        hobbyScores[hobbyId] = score;
    }
    
    const sortedHobbies = Object.entries(hobbyScores)
        .sort((a, b) => b[1] - a[1])
        .map(item => item[0]);
    
    const topHobbies = sortedHobbies.slice(0, 4);
    displayResults(topHobbies, userProfile);
}

function displayResults(topHobbyIds, userProfile) {
    const mainHobby = hobbies[topHobbyIds[0]];
    const alternatives = topHobbyIds.slice(1).map(id => hobbies[id]);
    
    document.getElementById('mainHobbyName').textContent = mainHobby.name;
    document.getElementById('mainHobbyDesc').textContent = mainHobby.description;
    document.getElementById('mainHobbyIcon').className = `fas ${mainHobby.icon}`;
    
    document.getElementById('altName1').textContent = alternatives[0].name;
    document.getElementById('altDesc1').textContent = alternatives[0].description;
    document.getElementById('altIcon1').className = `fas ${alternatives[0].icon}`;
    
    document.getElementById('altName2').textContent = alternatives[1].name;
    document.getElementById('altDesc2').textContent = alternatives[1].description;
    document.getElementById('altIcon2').className = `fas ${alternatives[1].icon}`;
    
    document.getElementById('altName3').textContent = alternatives[2].name;
    document.getElementById('altDesc3').textContent = alternatives[2].description;
    document.getElementById('altIcon3').className = `fas ${alternatives[2].icon}`;
    
    generatePersonalizedText(userProfile, mainHobby);
}

function generatePersonalizedText(userProfile, mainHobby) {
    let text = "На основе ваших ответов мы подобрали ";
    
    if (userProfile.activity === 'creative') text += "творческое хобби ";
    else if (userProfile.activity === 'active') text += "активное хобби ";
    else text += "идеальное хобби ";
    
    text += `"${mainHobby.name}". `;
    
    if (userProfile.time === 'little') text += "Оно не требует много времени и подойдет для расслабления.";
    else if (userProfile.time === 'moderate') text += "Вы сможете заниматься им регулярно в свободное время.";
    else text += "Вы сможете посвящать ему столько времени, сколько захотите.";
    
    document.getElementById('personalizedText').textContent = text;
}

// Функции для кнопок
function showResults() {
    if (!userAnswers[`page${currentPage}`]) {
        alert("Пожалуйста, выберите ответ на текущий вопрос");
        return;
    }
    
    document.getElementById(`page${currentPage}`).classList.remove('active');
    currentPage = totalPages;
    document.getElementById('resultsPage').classList.add('active');
    updateProgressBar();
    calculateResults();
}

function restartTest() {
    userAnswers = {};
    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('selected');
    });
    
    document.getElementById('resultsPage').classList.remove('active');
    currentPage = 1;
    document.getElementById('page1').classList.add('active');
    updateProgressBar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function shareResults() {
    const mainHobby = document.getElementById('mainHobbyName').textContent;
    const alt1 = document.getElementById('altName1').textContent;
    const alt2 = document.getElementById('altName2').textContent;
    const alt3 = document.getElementById('altName3').textContent;
    
    const shareText = `Моё идеальное хобби: ${mainHobby}! 
Альтернативы: ${alt1}, ${alt2}, ${alt3}
Найди своё на HobbyFinder!`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Мой результат теста',
            text: shareText
        });
    } else {
        navigator.clipboard.writeText(shareText);
        alert("Результат скопирован в буфер обмена!");
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    updateProgressBar();
});