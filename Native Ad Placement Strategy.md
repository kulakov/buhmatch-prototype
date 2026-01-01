# PROMPT FOR LOVABLE: Buhonline Matching Platform Prototype

Create an interactive prototype for a matching platform between entrepreneurs and accountants on the Buhonline portal (Russian accounting website).

## PROJECT OVERVIEW
- 3 screens: Homepage, Article page, Matching Hub
- Language: Russian
- Style: Clean, professional, based on existing Buhonline design
- Tech: React + TypeScript + Tailwind CSS

---

## COLORS (EXACT)
```
Primary Blue: #0066CC (header, buttons, main elements)
Dark Blue: #003D82 (top banner)
Orange: #FF6B35 (CTA, sticky bar)
Background: #FFFFFF
Background Alt: #F8F9FA
Border: #E9ECEF
Text: #212529
Text Muted: #6C757D
```

---

## SCREEN 1: HOMEPAGE (/)

### Structure Top to Bottom:

1. **Top Banner** (40px height, #003D82 background, white text)
   - "📢 Налоговые изменения с 2026 года — читайте актуальную информацию"
   - Close button [×]

2. **Sticky Bar** (56px height, #FF6B35 background, white bold text, sticky on scroll)
   - "🤝 Ищете бухгалтера на аутсорс? Найдем за 24 часа → БЕСПЛАТНО"
   - Click → navigate to Screen 3

3. **Header** (80px height, #0066CC background, white text)
   - Logo: "Бухонлайн" (left)
   - Nav menu: "Новости" "Сервисы" "Калькуляторы" "Справочник"
   - Search bar with icon
   - "Войти" button (right)

4. **Content Sections** (repeat 3 times):
   Each section:
   - Title (H2, 28px): "Популярное 🔥" (or "Калькуляторы 🧮" or "Налоговая реформа 2026")
   - Link "Все статьи →" (top right)
   - 3-column grid of article cards

**Article Card:**
```
┌────────────────────────┐
│  [Image 240x160px]     │ (placeholder: person with laptop)
├────────────────────────┤
│ Title (2-3 lines)      │
│                        │
│ Brief description      │
│ (gray text #6C757D)    │
│                        │
│ 👤 Марина Басовна      │
└────────────────────────┘
```
- Border: 1px solid #E9ECEF
- Border-radius: 12px
- Hover: shadow + translateY(-4px)
- One card with title "Платить НДС будут..." → links to Screen 2

**Blue Promo Block** (insert between sections):
```
┌─────────────────────────────────┐
│ BLUE BACKGROUND (#0066CC)       │
│                                 │
│ Получите бесплатную             │
│ консультацию по ведению         │
│ бухгалтерии для вашего бизнеса  │
│                                 │
│ [Записаться →] (white button)   │
│                                 │
│ 👤 Эксперт • 2,147 консультаций │
└─────────────────────────────────┘
```
Click → Screen 3

5. **FAB Button** (fixed bottom-right, 64x64px circle, #0066CC)
   - Icon: 🤝
   - Click → open modal with mini-form:
     - Name input
     - Phone input
     - Revenue dropdown (До 10 млн, 10-50 млн, 50-200 млн, Более 200 млн)
     - "Найти →" button → Screen 3

6. **Footer** (#0066CC background, white text, 4 columns)
   - "О проекте" "Инструменты" "Сервисы" "Связь"
   - "© 2025 Бухонлайн"

---

## SCREEN 2: ARTICLE PAGE (/article)

### Structure:
1. Same Header + Sticky Bar as Screen 1
2. Same FAB as Screen 1
3. Article content:

**Article Title (H1, 48px):**
"Платить НДС будут «упрощенщики» с выручкой от 20 миллионов рублей"

**Date:** 7 ноября 2025

**First paragraph (2-3 sentences):**
"Председатель правительства РФ Михаил Мишустин рассказал о новых параметрах налоговой реформы. Он сообщил, как будет снижаться лимит выручки, при достижении которого упрощенцы должны будут платить НДС."

### NATIVE AD BLOCK #1 (after first paragraph):
```
┌──────────────────────────────────────────┐
│ 💼 А вас коснутся эти изменения?         │
│                                          │
│ Ваша выручка в год: [input] млн руб      │
│                                          │
│ [Узнать за 30 секунд]                    │
│                                          │
│ ⚡ Бесплатная консультация с бухгалтером  │
└──────────────────────────────────────────┘
```
- Background: #F8F9FA
- Border: 1px solid #DEE2E6
- Padding: 24px
- Logic: if input > 15 → show warning message, button changes to "Связаться с бухгалтером" → Screen 3

**2-3 more paragraphs of article text** (any placeholder about tax reform)

### NATIVE AD BLOCK #2 (mid-article):
```
╔════════════════════════════════════════════╗
║ 💬 История предпринимателя                 ║
║                                            ║
║ "Когда узнал про НДС, думал — всё,        ║
║ разорюсь. Бухгалтер на аутсорсе за 3 дня  ║
║ нашел легальный способ сэкономить         ║
║ 2 млн в год."                             ║
║                                            ║
║ — Игорь М., владелец IT-компании          ║
║                                            ║
║ [Найти такого же бухгалтера →]            ║
╚════════════════════════════════════════════╝
```
- Background: #E7F3FF
- Border: 2px solid #0066CC
- Font-style: italic for quote
- Click → Screen 3

**Rest of article** (2 more paragraphs)

**Comments section header:** "Написать комментарий"

### NATIVE AD BLOCK #3 (fake first comment):
```
┌──────────────────────────────────────────┐
│ 👤 Сергей Волков                         │
│    Бухгалтер-консультант                 │
│ ⭐⭐⭐⭐⭐ 4.9 • 15 лет опыта              │
│                                          │
│ Коллеги, я помогаю предпринимателям      │
│ на УСН готовиться к переходу на НДС.     │
│                                          │
│ Если выручка приближается к 20 млн —     │
│ пишите, разберем вашу ситуацию бесплатно.│
│                                          │
│ [Написать Сергею →]                      │
│                                          │
│ ↳ 47 предпринимателей уже получили помощь│
└──────────────────────────────────────────┘
```
- Style: looks like regular comment
- Border-left: 4px solid #0066CC
- Click → Screen 3

---

## SCREEN 3: HUB - MATCHING PLATFORM (/find-accountant)

### 1. HERO SECTION
- Height: 400px
- Background: gradient from #0066CC to #0052A3
- Text: white, center-aligned

```
Найдите своего бухгалтера за 2 минуты

✓ 847 проверенных бухгалтеров
✓ Средний мэтч за 3 часа
✓ Первая консультация бесплатно

[Начать поиск — это быстро →]
```

### 2. HOW IT WORKS (3 steps)
```
[1️⃣ Опишите задачу (2 минуты)] → [2️⃣ Получите 3-5 анкет] → [3️⃣ Выберите и начните]
```
Flexbox, equal width, with arrow icons between

### 3. MULTI-STEP FORM (main feature!)

**STEP 1/4** (Progress bar: 25%)
```
Ваше имя:
[input field]

Телефон:
[input field with mask +7 (___) ___-__-__]

[Далее →]
```

**STEP 2/4** (Progress bar: 50%)
```
Ваша сфера бизнеса:
[dropdown: IT и разработка, Ритейл, Услуги, Производство, Строительство, HoReCa, Другое]

Годовая выручка:
(radio buttons) До 10 млн | 10-50 млн | 50-200 млн | Более 200 млн

Количество сотрудников:
(radio buttons) Только я | 2-10 | 11-50 | Более 50

[Далее →]
```

**STEP 3/4** (Progress bar: 75%)
```
Что вам нужно от бухгалтера? (можно несколько)
☐ Ведение учета (УСН/ОСНО/НДС)
☐ Подготовка отчетности
☐ Оптимизация налогов
☐ Консультации по налогам
☐ Работа с ФНС и фондами
☐ Кадровый учет
☐ Другое

Как срочно нужно:
(radio) Горит — нужно на вчера | В течение недели | Планирую, не горит

Бюджет на бухгалтерское обслуживание в месяц:
(radio) До 15,000 ₽ | 15-30k ₽ | 30-50k ₽ | 50-100k ₽ | Более 100k ₽

[Найти бухгалтеров →]
```

**STEP 4/4** (Progress bar: 100%) - RESULTS
```
╔════════════════════════════════════════╗
║ 🎉 Отлично! Нашли 5 бухгалтеров для вас║
║                                        ║
║ 📱 Вам придет SMS с контактами         ║
║ ⏰ И они уже получили вашу заявку      ║
║                                        ║
║ 👇 Посмотрите анкеты прямо сейчас:     ║
╚════════════════════════════════════════╝
```

### 4. ACCOUNTANT CARDS (5 cards)

**Card template:**
```
┌────────────────────────────────────────────┐
│ [64x64 avatar] 👤 Сергей Волков            │
│                ⭐⭐⭐⭐⭐ 4.9 (127 отзывов)  │
│                🟢 Онлайн сейчас            │
│                                            │
│ 💼 12 лет опыта                            │
│ 🎯 Специализация: IT-компании, УСН+НДС     │
│ 👥 Обслуживает: 23 клиента                 │
│ 💰 Стоимость: от 25,000 ₽/мес              │
│                                            │
│ "Работаю с растущими IT-компаниями.        │
│ Помогаю при масштабировании и переходе..."│
│                                            │
│ [📞 Позвонить] [💬 Написать] [Подробнее →] │
└────────────────────────────────────────────┘
```

**5 different cards with data:**
1. Сергей Волков, 4.9, IT-компании, 25,000₽/мес, Онлайн
2. Мария Светлова, 4.8, Retail, 18,000₽/мес
3. Алексей Ковалев, 4.9, Производство, 35,000₽/мес
4. Ирина Петрова, 4.7, HoReCa, 22,000₽/мес
5. Дмитрий Сидоров, 5.0, Услуги, 28,000₽/мес

Border: 1px solid #E9ECEF, Border-radius: 12px, Padding: 24px
Hover: border-color #0066CC, shadow

---

## TECHNICAL REQUIREMENTS

**Must work:**
- All buttons clickable and navigate correctly
- Multi-step form switches steps (use useState)
- Progress bar updates
- FAB modal opens/closes
- Calculator in article responds to input
- Sticky bar stays on scroll
- Card hover effects

**Don't need:**
- Real form submission (just console.log)
- Backend/API
- SMS integration
- Database
- Authentication

**Responsive:**
- Desktop first (1200px+)
- Mobile friendly (especially forms and FAB)

**Data:**
Use hardcoded mock data (no API calls)

**Animations:**
- Smooth transitions: 0.3s
- Button hover: scale(1.05)
- Card hover: translateY(-4px)

---

## ROUTING

- `/` → Screen 1 (Homepage)
- `/article` → Screen 2 (Article)
- `/find-accountant` → Screen 3 (Hub)

All CTA buttons/links lead to `/find-accountant`

---

## PRIORITY

**MUST HAVE (do first):**
1. Screen 3 (Hub) - the main feature
2. Multi-step form with 4 steps
3. 5 accountant cards with results

**SHOULD HAVE:**
1. Screen 2 (Article) with 3 native blocks
2. Sticky bar + FAB on all screens

**NICE TO HAVE:**
1. Screen 1 (Homepage) with full layout
2. Smooth scroll animations

---

Start with Screen 3 if unsure. That's the core product.

All texts in Russian. Use exact colors. Make it look professional and trustworthy.