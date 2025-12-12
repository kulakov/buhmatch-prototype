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
        zIndex: 2147483647
    };

    // Create shadow host
    const host = document.createElement('div');
    host.id = 'buhmatch-widget-host';
    host.style.cssText = 'all: initial; position: fixed; z-index: 2147483647;';
    document.body.appendChild(host);

    // Create shadow DOM for style isolation
    const shadow = host.attachShadow({ mode: 'open' });

    // Inject styles into shadow DOM
    const styles = document.createElement('style');
    styles.textContent = `
        :host {
            all: initial;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            font-size: 14px;
            line-height: 1.4;
            color: #333;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: inherit;
            line-height: inherit;
        }

        .bm-trigger {
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
            z-index: 2147483647;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.3s, box-shadow 0.3s;
        }

        .bm-trigger:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 25px rgba(102, 126, 234, 0.5);
        }

        .bm-trigger svg {
            width: 28px;
            height: 28px;
            fill: white;
        }

        .bm-trigger .bm-badge {
            position: absolute;
            top: -5px;
            right: -5px;
            background: #ef4444;
            color: white;
            font-size: 11px;
            font-weight: 600;
            padding: 2px 6px;
            border-radius: 10px;
            animation: bm-pulse-badge 2s infinite;
        }

        @keyframes bm-pulse-badge {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }

        .bm-modal {
            position: fixed;
            bottom: 90px;
            right: 20px;
            width: 380px;
            height: 580px;
            max-height: calc(100vh - 120px);
            background: #fff;
            border-radius: 16px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            z-index: 2147483647;
            display: none;
            flex-direction: column;
            overflow: hidden;
            animation: bm-slideUp 0.3s ease;
        }

        @keyframes bm-slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .bm-modal.bm-open {
            display: flex;
        }

        .bm-header {
            background: linear-gradient(135deg, ${CONFIG.gradientStart} 0%, ${CONFIG.gradientEnd} 100%);
            color: white;
            padding: 14px 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-shrink: 0;
        }

        .bm-header-title {
            font-size: 15px;
            font-weight: 600;
            margin: 0;
        }

        .bm-close {
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            line-height: 1;
        }

        .bm-close:hover {
            background: rgba(255,255,255,0.3);
        }

        .bm-progress-bar {
            height: 3px;
            background: rgba(255,255,255,0.3);
            flex-shrink: 0;
        }

        .bm-progress-fill {
            height: 100%;
            background: #4ade80;
            transition: width 0.5s ease;
            width: 0%;
        }

        .bm-chat {
            flex: 1;
            overflow-y: auto;
            padding: 12px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            scroll-behavior: smooth;
            background: #fafafa;
        }

        .bm-msg {
            max-width: 85%;
            padding: 10px 12px;
            border-radius: 14px;
            animation: bm-fadeIn 0.3s ease;
            font-size: 14px;
            line-height: 1.4;
            word-wrap: break-word;
        }

        @keyframes bm-fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .bm-msg-bot {
            background: #fff;
            align-self: flex-start;
            border-bottom-left-radius: 4px;
            box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }

        .bm-msg-user {
            background: linear-gradient(135deg, ${CONFIG.gradientStart} 0%, ${CONFIG.gradientEnd} 100%);
            color: white;
            align-self: flex-end;
            border-bottom-right-radius: 4px;
        }

        .bm-msg-highlight {
            background: #ecfdf5;
            border: 1px solid #a7f3d0;
        }

        .bm-stat {
            display: inline-block;
            background: ${CONFIG.primaryColor};
            color: white;
            padding: 1px 6px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 600;
        }

        .bm-typing {
            display: flex;
            gap: 4px;
            padding: 10px 12px;
            background: #fff;
            border-radius: 14px;
            align-self: flex-start;
            border-bottom-left-radius: 4px;
            box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }

        .bm-typing span {
            width: 6px;
            height: 6px;
            background: #bbb;
            border-radius: 50%;
            animation: bm-bounce 1.4s infinite ease-in-out;
        }

        .bm-typing span:nth-child(1) { animation-delay: -0.32s; }
        .bm-typing span:nth-child(2) { animation-delay: -0.16s; }

        @keyframes bm-bounce {
            0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
            40% { transform: scale(1.1); opacity: 1; }
        }

        .bm-buttons {
            padding: 10px 12px;
            display: flex;
            flex-direction: column;
            gap: 6px;
            background: #fff;
            border-top: 1px solid #eee;
            flex-shrink: 0;
            max-height: 180px;
            overflow-y: auto;
        }

        .bm-buttons-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
        }

        .bm-btn {
            padding: 10px 12px;
            border: 1px solid #e5e5e5;
            border-radius: 10px;
            background: #fff;
            font-size: 13px;
            cursor: pointer;
            transition: all 0.2s;
            text-align: center;
            color: #333;
        }

        .bm-btn:hover {
            background: #f5f5f5;
            border-color: ${CONFIG.primaryColor};
        }

        .bm-btn:active {
            transform: scale(0.98);
        }

        .bm-btn-primary {
            background: linear-gradient(135deg, ${CONFIG.gradientStart} 0%, ${CONFIG.gradientEnd} 100%);
            color: white;
            border: none;
            font-weight: 600;
        }

        .bm-btn-primary:hover {
            opacity: 0.9;
            background: linear-gradient(135deg, ${CONFIG.gradientStart} 0%, ${CONFIG.gradientEnd} 100%);
        }

        .bm-btn-secondary {
            color: #888;
            font-size: 12px;
        }

        .bm-btn-full {
            grid-column: 1 / -1;
        }

        .bm-card {
            background: #fff;
            border-radius: 12px;
            padding: 14px;
            margin: 4px 0;
            box-shadow: 0 2px 8px rgba(0,0,0,0.06);
            animation: bm-fadeIn 0.3s ease;
        }

        .bm-avatar {
            width: 48px;
            height: 48px;
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

        .bm-card-name {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 2px;
            color: #333;
        }

        .bm-card-rating {
            color: #f59e0b;
            font-size: 12px;
            margin-bottom: 6px;
        }

        .bm-card-exp {
            color: #666;
            font-size: 12px;
        }

        .bm-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
            margin: 8px 0;
        }

        .bm-tag {
            background: #f3f4f6;
            padding: 3px 8px;
            border-radius: 8px;
            font-size: 11px;
            color: #555;
        }

        .bm-card-quote {
            font-style: italic;
            color: #666;
            font-size: 12px;
            margin-top: 6px;
        }

        .bm-card-price {
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

        .bm-skip {
            background: #fef2f2 !important;
            color: #dc2626 !important;
            border-color: #fecaca !important;
        }

        .bm-like {
            background: #f0fdf4 !important;
            color: #16a34a !important;
            border-color: #bbf7d0 !important;
        }

        .bm-match {
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, ${CONFIG.gradientStart} 0%, ${CONFIG.gradientEnd} 100%);
            display: none;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: white;
            z-index: 100;
            animation: bm-fadeIn 0.5s ease;
        }

        .bm-match.bm-open {
            display: flex;
        }

        .bm-match h2 {
            font-size: 26px;
            margin-bottom: 6px;
            font-weight: 600;
        }

        .bm-match p {
            opacity: 0.9;
            margin-bottom: 20px;
            font-size: 14px;
        }

        .bm-match-avatars {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 20px;
        }

        .bm-match-avatars .bm-avatar {
            width: 56px;
            height: 56px;
            background: rgba(255,255,255,0.2);
            margin: 0;
            font-size: 22px;
        }

        .bm-match-heart {
            font-size: 26px;
            animation: bm-pulse 1s infinite;
        }

        @keyframes bm-pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
        }

        .bm-checkmark {
            color: #10b981;
            margin-right: 4px;
        }

        @media (max-width: 420px) {
            .bm-modal {
                width: calc(100vw - 20px);
                height: calc(100vh - 100px);
                max-height: none;
                right: 10px;
                bottom: 80px;
                border-radius: 14px;
            }

            .bm-trigger {
                right: 15px;
                bottom: 15px;
                width: 56px;
                height: 56px;
            }
        }
    `;
    shadow.appendChild(styles);

    // Create widget HTML
    const widget = document.createElement('div');
    widget.innerHTML = `
        <button class="bm-trigger">
            <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>
            <span class="bm-badge">1</span>
        </button>
        <div class="bm-modal">
            <div class="bm-header">
                <div class="bm-header-title">БухМэтч</div>
                <button class="bm-close">×</button>
            </div>
            <div class="bm-progress-bar"><div class="bm-progress-fill"></div></div>
            <div class="bm-chat"></div>
            <div class="bm-buttons"></div>
            <div class="bm-match">
                <h2>Мэтч! 🎉</h2>
                <p>Вы нашли друг друга</p>
                <div class="bm-match-avatars">
                    <div class="bm-avatar">👤</div>
                    <div class="bm-match-heart">❤️</div>
                    <div class="bm-avatar bm-match-initials">АС</div>
                </div>
                <button class="bm-btn bm-btn-primary bm-start-chat" style="padding: 12px 30px;">Начать общение</button>
            </div>
        </div>
    `;
    shadow.appendChild(widget);

    // Get elements from shadow DOM
    const trigger = shadow.querySelector('.bm-trigger');
    const modal = shadow.querySelector('.bm-modal');
    const chat = shadow.querySelector('.bm-chat');
    const buttons = shadow.querySelector('.bm-buttons');
    const progress = shadow.querySelector('.bm-progress-fill');
    const matchOverlay = shadow.querySelector('.bm-match');
    const closeBtn = shadow.querySelector('.bm-close');
    const badge = shadow.querySelector('.bm-badge');
    const startChatBtn = shadow.querySelector('.bm-start-chat');
    const matchInitials = shadow.querySelector('.bm-match-initials');

    let currentStep = 0;
    let userData = {};
    let isOpen = false;
    let started = false;

    const steps = [
        {
            messages: [
                { text: 'Привет! 👋' },
                { text: 'Подберу бухгалтера для вашего бизнеса за 2 минуты.' },
                { text: '7 вопросов — и покажу лучших.' }
            ],
            buttons: [
                { text: 'Погнали! 🚀', action: () => nextStep(), primary: true }
            ],
            progress: 0
        },
        {
            messages: [{ text: 'Чем занимается ваш бизнес?' }],
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
            messages: [{ text: 'Форма собственности?' }],
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
            messages: [{ text: 'Система налогообложения?' }],
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
            messages: [{ text: 'Какие задачи для бухгалтера?' }],
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
            messages: [{ text: 'Сколько документов в месяц?' }],
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
            messages: [{ text: 'Оборот за год?' }],
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
                { text: 'Последний! 🎯' },
                { text: 'Сколько сотрудников?' }
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
                { text: 'Готово! 🎉' },
                { text: 'Ищу бухгалтеров...' }
            ],
            buttons: [],
            progress: 100,
            autoNext: true,
            delay: 1500
        },
        {
            messages: [
                { text: 'Нашёл <span class="bm-stat">12 бухгалтеров</span>!' },
                { text: 'Листайте: ❌ пропустить, ❤️ нравится' }
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
        modal.classList.toggle('bm-open', isOpen);
        if (isOpen && !started) {
            started = true;
            badge.style.display = 'none';
            showStep(0);
        }
    }

    function close() {
        isOpen = false;
        modal.classList.remove('bm-open');
    }

    function addMessage(text, isUser = false, highlight = false) {
        const div = document.createElement('div');
        div.className = 'bm-msg ' + (isUser ? 'bm-msg-user' : 'bm-msg-bot') + (highlight ? ' bm-msg-highlight' : '');
        div.innerHTML = text;
        chat.appendChild(div);
        chat.scrollTop = chat.scrollHeight;
    }

    function showTyping() {
        const div = document.createElement('div');
        div.className = 'bm-typing';
        div.innerHTML = '<span></span><span></span><span></span>';
        chat.appendChild(div);
        chat.scrollTop = chat.scrollHeight;
    }

    function hideTyping() {
        const typing = shadow.querySelector('.bm-typing');
        if (typing) typing.remove();
    }

    function renderButtons(btns, grid = false) {
        buttons.innerHTML = '';
        buttons.className = 'bm-buttons' + (grid ? ' bm-buttons-grid' : '');

        btns.forEach(btn => {
            const button = document.createElement('button');
            button.className = 'bm-btn' +
                (btn.primary ? ' bm-btn-primary' : '') +
                (btn.secondary ? ' bm-btn-secondary' : '') +
                (btn.full ? ' bm-btn-full' : '');
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
            addMessage(msg.text);
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
        addMessage(value, true);
        buttons.innerHTML = '';

        showTyping();
        await delay(800);
        hideTyping();

        addMessage('<span class="bm-checkmark">✓</span> ' + response, false, true);
        await delay(400);
        nextStep();

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
            <div class="bm-avatar">${acc.initials}</div>
            <div class="bm-card-name">${acc.name}</div>
            <div class="bm-card-rating">${acc.rating}</div>
            <div class="bm-card-exp">${acc.experience}</div>
            <div class="bm-tags">${acc.tags.map(t => `<span class="bm-tag">${t}</span>`).join('')}</div>
            <div class="bm-card-quote">${acc.quote}</div>
            <div class="bm-card-price">${acc.price}</div>
        `;
        chat.appendChild(card);

        buttons.innerHTML = '';
        buttons.className = 'bm-buttons';

        const actions = document.createElement('div');
        actions.className = 'bm-card-actions';
        actions.innerHTML = `
            <button class="bm-btn bm-skip">❌ Пропустить</button>
            <button class="bm-btn bm-like">❤️ Нравится</button>
        `;
        buttons.appendChild(actions);

        actions.querySelector('.bm-skip').onclick = () => {
            if (window.dataLayer) {
                window.dataLayer.push({ event: 'buhmatch_skip', buhmatch_accountant: acc.name });
            }
            currentAccountant++;
            showAccountantCard();
        };

        actions.querySelector('.bm-like').onclick = () => {
            if (window.dataLayer) {
                window.dataLayer.push({ event: 'buhmatch_like', buhmatch_accountant: acc.name });
            }
            matchInitials.textContent = acc.initials;
            matchOverlay.classList.add('bm-open');
        };
    }

    function showNoMore() {
        chat.innerHTML = '';
        addMessage('Это все бухгалтеры по запросу.');
        addMessage('Изменить параметры?');
        renderButtons([
            { text: 'Начать заново', action: () => restart(), primary: true },
            { text: 'Оставить заявку', action: () => submitLead() }
        ]);
    }

    function showChat() {
        matchOverlay.classList.remove('bm-open');
        chat.innerHTML = '';

        const acc = accountants[currentAccountant];

        if (window.dataLayer) {
            window.dataLayer.push({
                event: 'buhmatch_match',
                buhmatch_accountant: acc.name,
                buhmatch_data: userData
            });
        }

        addMessage(`Отлично! Передал заявку: ${acc.name}`);

        setTimeout(() => addMessage('Свяжется в течение 24 часов.'), 600);
        setTimeout(() => addMessage('💡 Первая консультация — бесплатно!'), 1200);

        buttons.innerHTML = '';
        setTimeout(() => {
            renderButtons([
                { text: 'Смотреть других', action: () => { currentAccountant++; showAccountantCard(); } }
            ]);
        }, 1500);
    }

    function submitLead() {
        if (window.dataLayer) {
            window.dataLayer.push({ event: 'buhmatch_lead', buhmatch_data: userData });
        }

        chat.innerHTML = '';
        addMessage('✓ Заявка отправлена!');
        addMessage('Мы подберём бухгалтера и свяжемся с вами.');
        renderButtons([{ text: 'Закрыть', action: () => close() }]);
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

    if (window.dataLayer) {
        window.dataLayer.push({ event: 'buhmatch_init' });
    }

})();
