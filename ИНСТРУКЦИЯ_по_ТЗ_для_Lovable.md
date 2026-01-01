# 🎯 Обновлённое ТЗ для Lovable — Quick Start

## Что изменилось (v2.0)

### ✅ Обновлено под реальный дизайн Бухонлайн:

1. **Цветовая палитра** → точные HEX коды с реального сайта:
   - Primary Blue: `#0066CC` (вместо #0D6EFD)
   - Orange CTA: `#FF6B35`
   - Dark Blue: `#003D82`

2. **Главная страница** → полностью переработана:
   - Top banner (уведомление сверху)
   - Sticky bar (оранжевый, с призывом)
   - Header (синий, с навигацией и поиском)
   - Сетка карточек статей (3 колонки)
   - Секции контента (Популярное, Калькуляторы, Реформа 2026)
   - Акцентные синие блоки для нативной рекламы
   - Footer (синий, многоколоночный)

3. **Mock данные** → готовые тексты для статей:
   - 8 карточек статей с реальными заголовками
   - Имена авторов (Марина Басовна, Сергей Волков)
   - Промо-блок для нативного размещения

4. **Детализация** → добавлены точные размеры:
   - Высоты блоков (header 80px, sticky 56px, banner 40px)
   - Padding и margins
   - Border-radius и shadows
   - Hover эффекты

---

## 📂 Файлы готовы

1. **TZ_Lovable_Buhonline_Prototype.md** (821 строка)
   - Полное ТЗ с 3 экранами
   - Готово для Lovable

2. **Стратегия_нативной_рекламы_Бухонлайн.md** (938 строк)
   - Стратегический документ
   - 5000+ мэтчей/месяц
   - Экономика и план внедрения

---

## 🚀 Как использовать ТЗ в Lovable

### Вариант 1: Всё сразу (если Lovable мощный)

```
Prompt для Lovable:

"Create an interactive prototype based on the full specification 
in TZ_Lovable_Buhonline_Prototype.md.

Priority:
1. Screen 3 (Hub) - the main matching platform
2. Screen 2 (Article) - with 3 native ad blocks
3. Screen 1 (Homepage) - with all sections

Use exact colors, layouts, and texts from the spec."
```

### Вариант 2: Поэтапно (рекомендуется)

#### Этап 1: Hub (30 минут)
```
Prompt:

"Create Screen 3 from the spec - the Hub matching platform:

1. Hero section with gradient blue background
2. '3 steps' section
3. Multi-step form (4 steps with progress bar):
   - Step 1: Name + Phone
   - Step 2: Business info (dropdown + radios)
   - Step 3: Requirements (checkboxes + radios)
   - Step 4: Results with 5 accountant cards
4. Use exact colors from spec: #0066CC, #FF6B35
5. Make it fully interactive"
```

#### Этап 2: Статья с нативными блоками (20 минут)
```
Prompt:

"Add Screen 2 - Article page:

1. Header + Sticky bar from Screen 1
2. Article layout with title, text paragraphs
3. 3 native ad blocks:
   - Block #1: Risk calculator (after 1st paragraph)
   - Block #2: Client story / Social proof
   - Block #3: Expert comment (as fake first comment)
4. FAB button (same as Screen 1)
5. All blocks lead to Screen 3"
```

#### Этап 3: Главная страница (20 минут)
```
Prompt:

"Add Screen 1 - Homepage:

1. Top banner (dark blue #003D82)
2. Orange sticky bar (#FF6B35)
3. Blue header (#0066CC) with nav and search
4. 3 sections with article cards (3 columns):
   - Popular
   - Calculators
   - Reform 2026
5. Blue promo block (native ad)
6. Footer (blue)
7. FAB button (fixed position)"
```

---

## 🎨 Ключевые особенности ТЗ

### Что делает его отличным:

1. ✅ **Точная визуальная спецификация**
   - HEX цвета с реального сайта
   - Размеры в пикселях
   - ASCII-схемы компонентов
   - Hover-эффекты описаны

2. ✅ **Готовый контент**
   - Не lorem ipsum, а реальные тексты
   - Mock данные в JavaScript
   - Имена, цифры, примеры

3. ✅ **Функциональные требования**
   - Что должно кликаться
   - Логика форм
   - Переходы между экранами
   - Валидация полей

4. ✅ **Приоритизация**
   - Must Have (обязательно)
   - Should Have (желательно)
   - Nice to Have (бонус)

5. ✅ **Acceptance Criteria**
   - Чеклист готовности
   - Как проверить результат
   - Минимальные требования

---

## 💡 Советы по работе с Lovable

### Если что-то пошло не так:

1. **Lovable не понимает структуру?**
   - Скопируй только раздел нужного экрана
   - Упрости prompt до минимума
   - Добавь: "Use Tailwind CSS for styling"

2. **Цвета не те?**
   - Явно укажи в prompt: "Use EXACTLY these colors: #0066CC, #FF6B35"
   - Покажи цветовую палитру из раздела "Дизайн референсы"

3. **Форма не работает?**
   - Начни с простой версии (1 шаг)
   - Потом добавь остальные шаги
   - Используй useState для переключения

4. **Слишком большое ТЗ?**
   - Сосредоточься только на Hub (Экран 3)
   - Это главная фича
   - Остальное - бонус

### Полезные добавления к промпту:

```
Additional instructions for Lovable:

- Use React + TypeScript
- Use Tailwind CSS for styling
- Make it mobile-responsive
- Add smooth transitions (0.3s)
- Use React hooks for state management
- Console.log form data (no real backend needed)
- Add placeholder images (UI Avatars or similar)
```

---

## 🎯 Ожидаемый результат

### После работы Lovable у вас будет:

✅ **Кликабельный прототип** из 3 страниц
✅ **Рабочая форма** с 4 шагами
✅ **5 карточек бухгалтеров** с данными
✅ **Все кнопки кликабельны** и ведут куда надо
✅ **Мобильная версия** работает
✅ **Можно показать клиенту** для фидбека
✅ **Можно тестировать** на реальных пользователях

### Чего НЕ будет (и это нормально):

❌ Backend / API
❌ Реальная отправка SMS
❌ База данных
❌ Авторизация
❌ Реальные платежи

**Это прототип для тестирования концепции, не production app.**

---

## 📊 Чеклист перед началом

### Подготовка:

- [ ] Открыл файл TZ_Lovable_Buhonline_Prototype.md
- [ ] Прочитал раздел нужного экрана
- [ ] Скопировал цветовую палитру
- [ ] Приготовил промпт для Lovable
- [ ] Определился с последовательностью (всё сразу или поэтапно)

### После создания прототипа:

- [ ] Проверил все 3 экрана открываются
- [ ] Форма переключает шаги
- [ ] Кнопки кликабельны
- [ ] Цвета соответствуют спецификации
- [ ] Мобильная версия адекватная
- [ ] Нет console errors
- [ ] Можно поделиться ссылкой

---

## 🆘 Если нужна помощь

### Типичные проблемы и решения:

**Проблема:** Lovable генерит совсем не то
**Решение:** Упрости промпт, начни с одного компонента

**Проблема:** Форма не переключает шаги
**Решение:** Попроси явно: "Use useState to manage step number, add Next/Back buttons"

**Проблема:** Дизайн далёк от референса
**Решение:** Приложи скриншоты из uploads, скажи "Match this exact design"

**Проблема:** Текст на английском, а нужен русский
**Решение:** Добавь в prompt: "All texts must be in Russian language"

---

## ✨ Следующие шаги после прототипа

1. **Тестирование** (3-5 дней)
   - Показать 20-30 предпринимателям
   - Собрать фидбек
   - Измерить конверсию прототипа

2. **Итерация** (1-2 недели)
   - Исправить узкие места
   - Упростить форму если нужно
   - Улучшить тексты

3. **Production разработка** (6-8 недель)
   - Нанять разработчиков
   - Использовать прототип как референс
   - Добавить backend, интеграции, CRM

4. **Запуск** (неделя 12)
   - Soft launch на 10% трафика
   - Full launch через 2 недели
   - Масштабирование до 5000 мэтчей/месяц

---

**Удачи с прототипом! 🚀**

*P.S. Если Lovable создал что-то крутое — сделай скриншот и покажи, интересно посмотреть!*