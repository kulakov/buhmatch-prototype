(function() {
    'use strict';

    // Prevent double init
    if (window.BuhMatchWidget) return;
    window.BuhMatchWidget = true;

    // Config
    const CONFIG = {
        primaryColor: '#667eea',
        gradientStart: '#667eea',
        gradientEnd: '#764ba2',
        zIndex: 999999
    };

    // Inject styles
    const styles = document.createElement('style');
    styles.textContent = `
        #buhmatch-widget * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        #buhmatch-trigger {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, ${CONFIG.gradientStart} 0%, ${CONFIG.gradientEnd} 100%);
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
            z-index: ${CONFIG.zIndex};
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.3s, box-shadow 0.3s;
        }

        #buhmatch-trigger:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 25px rgba(102, 126, 234, 0.5);
        }

        #buhmatch-trigger svg {
            width: 28px;
            height: 28px;
            fill: white;
        }

        #buhmatch-trigger .badge {
            position: absolute;
            top: -5px;
            right: -5px;
            background: #ef4444;
            color: white;
            font-size: 11px;
            font-weight: 600;
            padding: 2px 6px;
            border-radius: 10px;
            animation: pulse-badge 2s infinite;
        }

        @keyframes pulse-badge {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }

        #buhmatch-modal {
            position: fixed;
            bottom: 90px;
            right: 20px;
            width: 380px;
            height: 600px;
            background: #fff;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            z-index: ${CONFIG.zIndex};
            display: none;
            flex-direction: column;
            overflow: hidden;
            animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        #buhmatch-modal.open {
            display: flex;
        }

        .bm-header {
            background: linear-gradient(135deg, ${CONFIG.gradientStart} 0%, ${CONFIG.gradientEnd} 100%);
            color: white;
            padding: 15px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .bm-header h1 {
            font-size: 16px;
            font-weight: 600;
        }

        .bm-header .close-btn {
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .bm-header .close-btn:hover {
            background: rgba(255,255,255,0.3);
        }

        .bm-progress {
            height: 3px;
            background: rgba(255,255,255,0.3);
        }

        .bm-progress .fill {
            height: 100%;
            background: #4ade80;
            transition: width 0.5s ease;
            width: 0%;
        }

        .bm-chat {
            flex: 1;
            overflow-y: auto;
            padding: 15px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            scroll-behavior: smooth;
        }

        .bm-message {
            max-width: 85%;
            padding: 10px 14px;
            border-radius: 16px;
            animation: fadeIn 0.3s ease;
            line-height: 1.4;
            font-size: 14px;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .bm-message.bot {
            background: #f0f0f0;
            align-self: flex-start;
            border-bottom-left-radius: 4px;
        }

        .bm-message.user {
            background: linear-gradient(135deg, ${CONFIG.gradientStart} 0%, ${CONFIG.gradientEnd} 100%);
            color: white;
            align-self: flex-end;
            border-bottom-right-radius: 4px;
        }

        .bm-message.highlight {
            background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
            border: 1px solid #86efac;
        }

        .bm-message .stat {
            display: inline-block;
            background: ${CONFIG.primaryColor};
            color: white;
            padding: 1px 6px;
            border-radius: 8px;
            font-size: 12px;
            font-weight: 600;
        }

        .bm-typing {
            display: flex;
            gap: 4px;
            padding: 10px 14px;
            background: #f0f0f0;
            border-radius: 16px;
            align-self: flex-start;
            border-bottom-left-radius: 4px;
        }

        .bm-typing span {
            width: 6px;
            height: 6px;
            background: #999;
            border-radius: 50%;
            animation: bounce 1.4s infinite ease-in-out;
        }

        .bm-typing span:nth-child(1) { animation-delay: -0.32s; }
        .bm-typing span:nth-child(2) { animation-delay: -0.16s; }

        @keyframes bounce {
            0%, 80%, 100% { transform: scale(0.8); }
            40% { transform: scale(1.2); }
        }

        .bm-buttons {
            padding: 12px 15px;
            display: flex;
            flex-direction: column;
            gap: 6px;
            background: #fff;
            border-top: 1px solid #eee;
            max-height: 200px;
            overflow-y: auto;
        }

        .bm-buttons.grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
        }

        .bm-btn {
            padding: 10px 14px;
            border: 1px solid #e0e0e0;
            border-radius: 10px;
            background: #fff;
            font-size: 13px;
            cursor: pointer;
            transition: all 0.2s;
            text-align: center;
        }

        .bm-btn:hover {
            background: #f8f9fa;
            border-color: ${CONFIG.primaryColor};
        }

        .bm-btn:active {
            transform: scale(0.98);
        }

        .bm-btn.primary {
            background: linear-gradient(135deg, ${CONFIG.gradientStart} 0%, ${CONFIG.gradientEnd} 100%);
            color: white;
            border: none;
            font-weight: 600;
        }

        .bm-btn.secondary {
            color: #666;
            font-size: 12px;
        }

        .bm-btn.full {
            grid-column: 1 / -1;
        }

        .bm-card {
            background: #fff;
            border-radius: 14px;
            padding: 14px;
            margin: 6px 0;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            animation: fadeIn 0.3s ease;
        }

        .bm-card .avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, ${CONFIG.gradientStart} 0%, ${CONFIG.gradientEnd} 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 10px;
        }

        .bm-card .name {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 2px;
        }

        .bm-card .rating {
            color: #f59e0b;
            font-size: 12px;
            margin-bottom: 6px;
        }

        .bm-card .tags {
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
            margin: 8px 0;
        }

        .bm-card .tag {
            background: #f0f0f0;
            padding: 3px 8px;
            border-radius: 10px;
            font-size: 11px;
            color: #666;
        }

        .bm-card .price {
            font-size: 14px;
            font-weight: 600;
            color: ${CONFIG.primaryColor};
            margin-top: 8px;
        }

        .bm-card-actions {
            display: flex;
            gap: 8px;
            margin-top: 12px;
        }

        .bm-card-actions .bm-btn {
            flex: 1;
            padding: 10px;
        }

        .bm-skip-btn {
            background: #fee2e2 !important;
            color: #dc2626 !important;
            border-color: #fecaca !important;
        }

        .bm-like-btn {
            background: #dcfce7 !important;
            color: #16a34a !important;
            border-color: #bbf7d0 !important;
        }

        .bm-match-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, ${CONFIG.gradientStart} 0%, ${CONFIG.gradientEnd} 100%);
            display: none;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: white;
            z-index: 100;
            animation: fadeIn 0.5s ease;
        }

        .bm-match-overlay.open {
            display: flex;
        }

        .bm-match-overlay h2 {
            font-size: 28px;
            margin-bottom: 8px;
        }

        .bm-match-overlay p {
            opacity: 0.9;
            margin-bottom: 25px;
        }

        .bm-match-avatars {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 25px;
        }

        .bm-match-avatars .avatar {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: rgba(255,255,255,0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
        }

        .bm-match-avatars .heart {
            font-size: 28px;
            animation: pulse 1s infinite;
        }

        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
        }

        .checkmark {
            color: #4ade80;
            margin-right: 4px;
        }

        @media (max-width: 420px) {
            #buhmatch-modal {
                width: calc(100vw - 20px);
                height: calc(100vh - 100px);
                right: 10px;
                bottom: 80px;
                border-radius: 16px;
            }

            #buhmatch-trigger {
                right: 15px;
                bottom: 15px;
            }
        }
    `;
    document.head.appendChild(styles);

    // Create widget container
    const container = document.createElement('div');
    container.id = 'buhmatch-widget';
    container.innerHTML = `
        <button id="buhmatch-trigger">
            <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>
            <span class="badge">1</span>
        </button>
        <div id="buhmatch-modal">
            <div class="bm-header">
                <h1>БухМэтч</h1>
                <button class="close-btn">×</button>
            </div>
            <div class="bm-progress"><div class="fill" id="bm-progress"></div></div>
            <div class="bm-chat" id="bm-chat"></div>
            <div class="bm-buttons" id="bm-buttons"></div>
            <div class="bm-match-overlay" id="bm-match">
                <h2>Мэтч! 🎉</h2>
                <p>Вы нашли друг друга</p>
                <div class="bm-match-avatars">
                    <div class="avatar">👤</div>
                    <div class="heart">❤️</div>
                    <div class="avatar" id="bm-match-initials">АС</div>
                </div>
                <button class="bm-btn primary" id="bm-start-chat" style="padding: 14px 35px;">Начать общение</button>
            </div>
        </div>
    `;
    document.body.appendChild(container);

    // Elements
    const trigger = document.getElementById('buhmatch-trigger');
    const modal = document.getElementById('buhmatch-modal');
    const chat = document.getElementById('bm-chat');
    const buttons = document.getElementById('bm-buttons');
    const progress = document.getElementById('bm-progress');
    const matchOverlay = document.getElementById('bm-match');
    const closeBtn = container.querySelector('.close-btn');
    const badge = container.querySelector('.badge');
    const startChatBtn = document.getElementById('bm-start-chat');

    let currentStep = 0;
    let userData = {};
    let isOpen = false;
    let started = false;

    const steps = [
        {
            messages: [
                { type: 'bot', text: 'Привет! 👋' },
                { type: 'bot', text: 'Подберу бухгалтера для вашего бизнеса за 2 минуты.' },
                { type: 'bot', text: '7 вопросов — и покажу лучших.' }
            ],
            buttons: [
                { text: 'Погнали! 🚀', action: () => nextStep(), primary: true }
            ],
            progress: 0
        },
        {
            messages: [{ type: 'bot', text: 'Чем занимается ваш бизнес?' }],
            buttons: [
                { text: '🛒 Торговля', action: () => answer('industry', 'Торговля', '847 бухгалтеров в торговле') },
                { text: '💼 Услуги', action: () => answer('industry', 'Услуги', '1 100+ в сфере услуг') },
                { text: '💻 IT', action: () => answer('industry', 'IT', '412 IT-бухгалтеров') },
                { text: '🏭 Производство', action: () => answer('industry', 'Производство', '380 в производстве') },
                { text: '🏗 Строительство', action: () => answer('industry', 'Строительство', '290 в строительстве') },
                { text: '🍽 Общепит', action: () => answer('industry', 'Общепит', '215 в общепите') }
            ],
            grid: true,
            progress: 14
        },
        {
            messages: [{ type: 'bot', text: 'Форма собственности?' }],
            buttons: [
                { text: 'ИП', action: () => answer('form', 'ИП', '62% клиентов — ИП') },
                { text: 'ООО', action: () => answer('form', 'ООО', '1 230 работают с ООО') },
                { text: 'Самозанятый', action: () => answer('form', 'Самозанятый', 'Подберём консультанта') },
                { text: 'Ещё не открыл', action: () => answer('form', 'Не открыл', 'Поможем зарегистрировать') }
            ],
            grid: true,
            progress: 28
        },
        {
            messages: [{ type: 'bot', text: 'Система налогообложения?' }],
            buttons: [
                { text: 'УСН 6%', action: () => answer('tax', 'УСН 6%', '89% клиентов на УСН 6%') },
                { text: 'УСН 15%', action: () => answer('tax', 'УСН 15%', 'Для бизнеса с расходами') },
                { text: 'ОСНО', action: () => answer('tax', 'ОСНО', 'Найдём эксперта по НДС') },
                { text: 'Патент', action: () => answer('tax', 'Патент', 'Минимум отчётности') },
                { text: 'Не знаю', action: () => answer('tax', 'Не знаю', 'Бухгалтер подскажет') }
            ],
            grid: true,
            progress: 42
        },
        {
            messages: [{ type: 'bot', text: 'Какие задачи для бухгалтера?' }],
            buttons: [
                { text: '📋 Полное ведение', action: () => answer('tasks', 'Полное ведение', '73% выбирают полное ведение'), primary: true, full: true },
                { text: 'Первичка', action: () => answer('tasks', 'Первичка', 'Только документы') },
                { text: 'Отчётность', action: () => answer('tasks', 'Отчётность', 'Сдача отчётов') },
                { text: 'Зарплата', action: () => answer('tasks', 'Зарплата', 'Расчёт ЗП') },
                { text: 'Консультации', action: () => answer('tasks', 'Консультации', 'Разовые вопросы') }
            ],
            grid: true,
            progress: 57
        },
        {
            messages: [{ type: 'bot', text: 'Сколько документов в месяц?' }],
            buttons: [
                { text: 'До 30', action: () => answer('docs', 'До 30', 'от 5 000 ₽/мес') },
                { text: '30–60', action: () => answer('docs', '30–60', 'от 8 000 ₽/мес') },
                { text: '60–100', action: () => answer('docs', '60–100', 'от 15 000 ₽/мес') },
                { text: '100–200', action: () => answer('docs', '100–200', 'Опытный специалист') },
                { text: '200+', action: () => answer('docs', '200+', 'Нужна команда') }
            ],
            grid: true,
            progress: 71
        },
        {
            messages: [{ type: 'bot', text: 'Оборот за год?' }],
            buttons: [
                { text: 'До 1 млн', action: () => answer('revenue', 'До 1 млн', 'Цены для стартапов') },
                { text: '1–5 млн', action: () => answer('revenue', '1–5 млн', 'Растущий бизнес') },
                { text: '5–20 млн', action: () => answer('revenue', '5–20 млн', 'Серьёзный бизнес') },
                { text: '20–60 млн', action: () => answer('revenue', '20–60 млн', 'Средний бизнес') },
                { text: '60+ млн', action: () => answer('revenue', '60+ млн', 'Крупный бизнес') },
                { text: 'Пропустить', action: () => answer('revenue', '—', 'Ок, пропускаем'), secondary: true }
            ],
            grid: true,
            progress: 85
        },
        {
            messages: [
                { type: 'bot', text: 'Последний! 🎯' },
                { type: 'bot', text: 'Сколько сотрудников?' }
            ],
            buttons: [
                { text: 'Только я', action: () => answer('employees', '0', 'Зарплата не нужна') },
                { text: '2–5', action: () => answer('employees', '2–5', 'ЗП включена') },
                { text: '6–15', action: () => answer('employees', '6–15', 'Опыт кадров') },
                { text: '16–50', action: () => answer('employees', '16–50', 'Большой штат') },
                { text: '50+', action: () => answer('employees', '50+', 'Нужен HR-бух') }
            ],
            grid: true,
            progress: 100
        },
        {
            messages: [
                { type: 'bot', text: 'Готово! 🎉' },
                { type: 'bot', text: 'Ищу бухгалтеров...' }
            ],
            buttons: [],
            progress: 100,
            autoNext: true,
            delay: 1500
        },
        {
            messages: [
                { type: 'bot', text: 'Нашёл <span class="stat">12 бухгалтеров</span>!' },
                { type: 'bot', text: 'Листайте: ❌ пропустить, ❤️ нравится' }
            ],
            buttons: [
                { text: 'Показать', action: () => showAccountants(), primary: true }
            ],
            progress: 100
        }
    ];

    const accountants = [
        {
            name: 'Анна Сидорова',
            initials: 'АС',
            rating: '⭐ 4.9 · 47 отзывов',
            experience: '8 лет',
            tags: ['Торговля', 'УСН', 'Маркировка'],
            price: 'от 12 000 ₽/мес',
            quote: '«Веду торговые компании с 2016»'
        },
        {
            name: 'Елена Козлова',
            initials: 'ЕК',
            rating: '⭐ 4.8 · 32 отзыва',
            experience: '6 лет',
            tags: ['Торговля', 'УСН', 'ОСНО'],
            price: 'от 10 000 ₽/мес',
            quote: '«Оптимизирую учёт»'
        },
        {
            name: 'Ирина Новикова',
            initials: 'ИН',
            rating: '⭐ 4.7 · 28 отзывов',
            experience: '10 лет',
            tags: ['ВЭД', 'Импорт', 'Китай'],
            price: 'от 15 000 ₽/мес',
            quote: '«Специалист по импорту»'
        }
    ];

    let currentAccountant = 0;

    function toggle() {
        isOpen = !isOpen;
        modal.classList.toggle('open', isOpen);
        if (isOpen && !started) {
            started = true;
            badge.style.display = 'none';
            showStep(0);
        }
    }

    function close() {
        isOpen = false;
        modal.classList.remove('open');
    }

    function addMessage(type, text, highlight = false) {
        const div = document.createElement('div');
        div.className = `bm-message ${type}` + (highlight ? ' highlight' : '');
        div.innerHTML = text;
        chat.appendChild(div);
        chat.scrollTop = chat.scrollHeight;
    }

    function showTyping() {
        const div = document.createElement('div');
        div.className = 'bm-typing';
        div.id = 'bm-typing';
        div.innerHTML = '<span></span><span></span><span></span>';
        chat.appendChild(div);
        chat.scrollTop = chat.scrollHeight;
    }

    function hideTyping() {
        const typing = document.getElementById('bm-typing');
        if (typing) typing.remove();
    }

    function renderButtons(btns, grid = false) {
        buttons.innerHTML = '';
        buttons.className = 'bm-buttons' + (grid ? ' grid' : '');

        btns.forEach(btn => {
            const button = document.createElement('button');
            button.className = 'bm-btn' +
                (btn.primary ? ' primary' : '') +
                (btn.secondary ? ' secondary' : '') +
                (btn.full ? ' full' : '');
            button.textContent = btn.text;
            button.onclick = btn.action;
            buttons.appendChild(button);
        });
    }

    async function showStep(stepIndex) {
        const step = steps[stepIndex];
        progress.style.width = step.progress + '%';

        for (const msg of step.messages) {
            showTyping();
            await delay(600);
            hideTyping();
            addMessage(msg.type, msg.text, msg.highlight);
            await delay(200);
        }

        renderButtons(step.buttons, step.grid);

        if (step.autoNext) {
            await delay(step.delay || 1500);
            nextStep();
        }
    }

    function nextStep() {
        currentStep++;
        if (currentStep < steps.length) {
            showStep(currentStep);
        }
    }

    async function answer(key, value, response) {
        userData[key] = value;
        addMessage('user', value);
        buttons.innerHTML = '';

        showTyping();
        await delay(800);
        hideTyping();

        addMessage('bot', '<span class="checkmark">✓</span> ' + response, true);
        await delay(400);
        nextStep();

        // Send to dataLayer for GTM
        if (window.dataLayer) {
            window.dataLayer.push({
                event: 'buhmatch_answer',
                buhmatch_field: key,
                buhmatch_value: value
            });
        }
    }

    function showAccountants() {
        currentAccountant = 0;
        showAccountantCard();
    }

    function showAccountantCard() {
        if (currentAccountant >= accountants.length) {
            showNoMore();
            return;
        }

        const acc = accountants[currentAccountant];
        chat.innerHTML = '';

        const card = document.createElement('div');
        card.className = 'bm-card';
        card.innerHTML = `
            <div class="avatar">${acc.initials}</div>
            <div class="name">${acc.name}</div>
            <div class="rating">${acc.rating}</div>
            <div style="color: #666; font-size: 12px;">${acc.experience}</div>
            <div class="tags">${acc.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
            <div style="font-style: italic; color: #666; font-size: 12px;">${acc.quote}</div>
            <div class="price">${acc.price}</div>
        `;
        chat.appendChild(card);

        buttons.innerHTML = '';
        buttons.className = 'bm-buttons';

        const actions = document.createElement('div');
        actions.className = 'bm-card-actions';
        actions.innerHTML = `
            <button class="bm-btn bm-skip-btn">❌ Пропустить</button>
            <button class="bm-btn bm-like-btn">❤️ Нравится</button>
        `;
        buttons.appendChild(actions);

        actions.querySelector('.bm-skip-btn').onclick = () => {
            if (window.dataLayer) {
                window.dataLayer.push({
                    event: 'buhmatch_skip',
                    buhmatch_accountant: acc.name
                });
            }
            currentAccountant++;
            showAccountantCard();
        };

        actions.querySelector('.bm-like-btn').onclick = () => {
            if (window.dataLayer) {
                window.dataLayer.push({
                    event: 'buhmatch_like',
                    buhmatch_accountant: acc.name
                });
            }
            document.getElementById('bm-match-initials').textContent = acc.initials;
            matchOverlay.classList.add('open');
        };
    }

    function showNoMore() {
        chat.innerHTML = '';
        addMessage('bot', 'Это все бухгалтеры по запросу.');
        addMessage('bot', 'Изменить параметры?');
        renderButtons([
            { text: 'Начать заново', action: () => restart(), primary: true },
            { text: 'Оставить заявку', action: () => submitLead() }
        ]);
    }

    function showChat() {
        matchOverlay.classList.remove('open');
        chat.innerHTML = '';

        const acc = accountants[currentAccountant];

        if (window.dataLayer) {
            window.dataLayer.push({
                event: 'buhmatch_match',
                buhmatch_accountant: acc.name,
                buhmatch_data: userData
            });
        }

        addMessage('bot', `Отлично! Передал заявку: ${acc.name}`);

        setTimeout(() => {
            addMessage('bot', 'Свяжется в течение 24 часов.');
        }, 600);

        setTimeout(() => {
            addMessage('bot', '💡 Первая консультация — бесплатно!');
        }, 1200);

        buttons.innerHTML = '';

        setTimeout(() => {
            renderButtons([
                { text: 'Смотреть других', action: () => { currentAccountant++; showAccountantCard(); } }
            ]);
        }, 1500);
    }

    function submitLead() {
        if (window.dataLayer) {
            window.dataLayer.push({
                event: 'buhmatch_lead',
                buhmatch_data: userData
            });
        }

        chat.innerHTML = '';
        addMessage('bot', '✓ Заявка отправлена!');
        addMessage('bot', 'Мы подберём бухгалтера и свяжемся с вами.');

        renderButtons([
            { text: 'Закрыть', action: () => close() }
        ]);
    }

    function restart() {
        currentStep = 0;
        userData = {};
        chat.innerHTML = '';
        showStep(0);
    }

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Events
    trigger.onclick = toggle;
    closeBtn.onclick = close;
    startChatBtn.onclick = showChat;

    // Push init event
    if (window.dataLayer) {
        window.dataLayer.push({
            event: 'buhmatch_init'
        });
    }

})();
