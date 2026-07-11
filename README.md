# Человек и юмор в Новое и Новейшее время

Интерактивный научно-популярный сайт на русском языке о трансформации юмора с XVII по XXI век: от коллективного и ритуального смеха к личной рефлексии, психологической защите, стендапу, мемам и цифровой идентичности.

## Источники

- PDF `Наполнение сайта.pdf` использован как обязательный источник полного психологического контента: Фрейд, Фрай, Блейхер и Крук, Домбровская, Козинцев, анекдоты-иллюстрации и разборы.
- Gamma-презентация `https://copy-of--xpl2sh2.gamma.site/` использована как источник исследовательской структуры, списка разделов, команды и библиографии.
- Hero/OG-изображение `public/assets/hero-from-engraving-to-meme.png` сгенерировано для проекта в концепции «от гравюры к мему».
- Изображения галереи `public/assets/freud-halberstadt.jpg`, `kant-engraving.jpg`, `bergson-nobel.jpg`, `chaplin-the-kid.jpg`, `duchamp-fountain.jpg` взяты из Wikimedia Commons/Public domain; подписи и атрибуция указаны в разделе «Галерея».
- Дополнительные иллюстрации галереи `theater-portal-illustration.png`, `satirical-print-workshop.png`, `digital-meme-archive.png` сгенерированы для проекта и используются как визуальные метафоры эпох.

## Запуск

```bash
npm install
npm run dev
```

## Проверка

```bash
npm run typecheck
npm run build
npm run preview
```

## Публикация

### Vercel

1. Импортируйте папку проекта в Vercel.
2. Framework Preset: `Vite`.
3. Build Command: `npm run build`.
4. Output Directory: `dist`.

### Netlify

1. Создайте новый site из репозитория или загрузите проект вручную.
2. Build command: `npm run build`.
3. Publish directory: `dist`.

### GitHub Pages

Для публикации в подпапке репозитория добавьте `base` в `vite.config.ts`, затем выполните `npm run build` и опубликуйте содержимое `dist`.

## Архитектура

- `src/data` - структурированные данные для таймлайна, теорий, психологии, команды и литературы.
- `src/components` - независимые React-компоненты разделов.
- `src/styles.css` - общая визуальная система, адаптивность, focus states и reduced motion.
- `CONTENT_REVIEW.md` - места, требующие дополнительной научной проверки.
