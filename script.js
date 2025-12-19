console.log('JavaScript успешно подключен!');
// --- 1. ПЛАВНЫЙ СКРОЛЛ (Smooth Scroll) ---

document.querySelectorAll('.main-nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); 

        const targetId = this.getAttribute('href'); 
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});


// --- 2. ПОДСВЕТКА АКТИВНОЙ СЕКЦИИ (Scroll Spy) ---

const sections = document.querySelectorAll('section[id]'); // Убедимся, что берем только секции с ID
const navLinks = document.querySelectorAll('.main-nav a');

function updateScrollSpy() {
    let current = '';
    
    // !!! ИСПРАВЛЕНИЕ: Используем универсальный способ получения позиции скролла !!!
    const scrollPosition = window.scrollY || document.documentElement.scrollTop; 
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        
        // Проверяем, если позиция скролла прошла начало секции (с учетом отступа 150px)
        if (scrollPosition >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    // Убираем класс 'active' со всех ссылок, а затем добавляем его к нужной
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
}

// Запускаем функцию при загрузке страницы и при каждом скролле
window.addEventListener('scroll', updateScrollSpy);
window.addEventListener('load', updateScrollSpy);
document.addEventListener('DOMContentLoaded', () => {
    // 1. Находим элементы
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.getElementById('nextBtn');
    const prevButton = document.getElementById('prevBtn');
    
    if (slides.length === 0) return;
    
    // 2. Определяем ключевые параметры
    
    // Ширина одного слайда - это ширина track, деленная на количество слайдов
    // Но проще взять ширину самого первого слайда, так как она 100% ширины родителя
    const slideWidth = slides[0].offsetWidth; 
    
    // В режиме "один слайд за раз" это всегда 1
    const slidesVisible = 1; 
    
    let slideIndex = 0; // Индекс текущего видимого слайда

    // 3. Функция для перемещения
    const moveToSlide = (track, targetIndex) => {
        // Сдвигаем на ширину одного слайда * его индекс
        const amountToMove = targetIndex * slideWidth; 
        
        track.style.transform = `translateX(-${amountToMove}px)`;
        slideIndex = targetIndex;
    };
    
    // 4. Обработчик кнопки "Вперед"
    nextButton.addEventListener('click', e => {
        let newIndex = slideIndex + 1;
        
        // Циклическое движение: если достигли последнего слайда, переходим в начало
        if (newIndex >= slides.length) { 
            newIndex = 0; 
        }
        
        moveToSlide(track, newIndex);
    });

    // 5. Обработчик кнопки "Назад"
    prevButton.addEventListener('click', e => {
        let newIndex = slideIndex - 1;
        
        // Циклическое движение: если ушли за начало, переходим к последнему слайду
        if (newIndex < 0) {
            newIndex = slides.length - 1; 
        }
        
        moveToSlide(track, newIndex);
    });

    // 6. Установка начального положения
    if (slides.length > 0) {
        moveToSlide(track, 0);
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 }); // Сработает, когда блок виден на 10%

    // Ищем все элементы с классом reveal и начинаем слежку
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
});