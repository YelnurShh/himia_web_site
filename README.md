# Zertte

7–11 сыныптарға арналған қазақ тіліндегі интерактивті химия платформасы. Сабақтар, тесттер, 118 элементтің периодтық жүйесі, алты қауіпсіз виртуалды тәжірибе, алты ғылыми жоба, жеке күнделік және мұғалім панелі бар.

## Технологиялар

- Next.js App Router, React, TypeScript (strict mode)
- Tailwind CSS және қарапайым CSS
- Firebase Authentication (Google, Email/Password)
- Cloud Firestore
- Groq API арқылы OpenAI GPT-OSS химия чаты

## Жергілікті іске қосу

Node.js 20.9 немесе одан жаңасын орнатыңыз.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Сайт: [http://localhost:3000](http://localhost:3000). Firebase әлі қосылмаса да ашық беттер дайын TypeScript деректерін көрсетеді. Кіру, прогресс сақтау және мұғалім панелі үшін Firebase қажет.

## Firebase қосу

1. [Firebase Console](https://console.firebase.google.com/) ішінде жаңа жоба ашыңыз және Web App тіркеңіз.
2. **Authentication → Sign-in method** бөлімінде Google және Email/Password провайдерлерін қосыңыз.
3. **Authentication → Settings → Authorized domains** тізіміне жергілікті доменді және кейін Vercel берген доменді қосыңыз.
4. **Firestore Database** ашыңыз. Қолданылатын орналасуды таңдаңыз.
5. **Firestore → Rules** ішіне [firestore.rules](./firestore.rules) файлын қойып, **Publish** басыңыз.
6. Web App конфигурациясынан төмендегі мәндерді `.env.local` файлына көшіріңіз:

```dotenv
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

`NEXT_PUBLIC_*` мәндері браузерге беріледі; Firestore деректерін қорғау үшін ережелер міндетті. Құпия Admin SDK кілтін бұл айнымалыларға қоймаңыз.

## ЖИ чатты қосу

[Groq Console](https://console.groq.com/keys) ішінен API кілтін жасап, `.env.local` файлына қосыңыз:

```dotenv
GROQ_API_KEY=...
GROQ_MODEL=openai/gpt-oss-20b
```

`GROQ_API_KEY` тек серверде қолданылады, оған `NEXT_PUBLIC_` префиксін қоспаңыз. Әдепкі GPT-OSS 20B моделі жылдам чат үшін таңдалған; сапасы жоғарырақ нұсқа қажет болса, `GROQ_MODEL=openai/gpt-oss-120b` деп өзгертуге болады. Екі модельдің қолжетімділігі мен нақты лимитін Groq аккаунтыңыздан тексеріңіз. Чат сұрақтары Groq сервисіне жіберіледі; сайт чат тарихын дерекқорда сақтамайды. API сұрауларының көлемі шектелген және бір сервер данасы бойынша қарапайым жиілік шектеуі бар. Жария сайтта шығынды сенімді басқару үшін тұрақты сақтау орнына негізделген лимиттеу немесе пайдаланушы аутентификациясын қосу қажет.

## Мұғалім рөлін беру

Алдымен мұғалім аккаунтын кәдімгі тіркелу бетінде жасаңыз. Содан кейін Firestore Console ішіндегі `users/{uid}` құжатының `role` өрісін қолмен `student` мәнінен `teacher` мәніне өзгертіңіз. Пайдаланушы өз рөлін сайттан өзгерте алмайды. Рөл жаңарғаннан кейін аккаунттан шығып, қайта кіріңіз.

## Мазмұн және дерек моделі

Бастапқы мазмұн `data/` ішінде: 15 сабақ және 75 сұрақ, 118 элемент, 6 тәжірибе, 6 жоба, 6 жетістік. Firestore бос кезде осы деректер көрсетіледі. Мұғалім панелінде өзгертілген материал Firestore-ға сақталып, жарияланған нұсқа жергілікті деректің орнына қолданылады. Жоба күйіндегі материал тек мұғалімге көрінеді.

Коллекциялар: `users`, `lessons` (ішкі `questions`), `elements`, `experiments`, `projects`, `catalogState`; пайдаланушының ішкі коллекциялары: `progress`, `researchJournal`, `achievements`, `experiments`.

XP тек алғашқы орындалған әрекет үшін қосылады: сабақ 50, тесттегі әр дұрыс жауап 10 (қайта тапсыруда тек алдыңғы үздік нәтижеден артық бөлігі), тәжірибе 30, жоба күнделігі 40. Оқушы сериясы аяқталған сабақ күндерінен есептеледі.

## Production және Vercel

```bash
npm run typecheck
npm run lint
npm run build
npm start
```

Vercel-ге осы репозиторийді қосып, `.env.local` ішіндегі айнымалыларды **Project Settings → Environment Variables** бөлімінде орнатыңыз. `NEXT_PUBLIC_SITE_URL` мәніне Vercel берген нақты `https://...` мекенжайын жазыңыз. Доменді өзіңіз Vercel арқылы таңдаған соң, оны Firebase Authentication-ның Authorized domains тізіміне қосыңыз. Сайт кодында домен алдын ала бекітілмеген.

ЖИ чат жұмыс істеуі үшін Vercel-де `GROQ_API_KEY` айнымалысын да орнатыңыз. `GROQ_MODEL` мәні міндетті емес.

## Қауіпсіздік және шектеулер

Жеке деректер Firestore Security Rules арқылы иесіне және мұғалімге шектеледі. Бұл мектеп жобасында XP есебі клиенттен орындалады; қасақана өзгертуге төзімді жүйе қажет болса, серверлік тексеру керек. Виртуалды тәжірибелер — оқу моделі, оларды үйде қайталауға нұсқау емес.

Элементтердің нөмірі, таңбасы, массасы және электрондық конфигурациясы [PubChem Periodic Table JSON](https://pubchem.ncbi.nlm.nih.gov/rest/pug/periodictable/JSON) дерегінен алынды; қазақша атаулар мен қолданылу мысалдары `data/element-localization.ts` ішінде. Периодтық жүйенің 118 элементтік ауқымы [IUPAC кестесімен](https://iupac.org/what-we-do/periodic-table-of-elements/) салыстырылды.
