# SÖZ DETEKTIV AI — Netlify

Бұл нұсқада Netlify Function бар. Ең дұрыс жариялау жолы — GitHub арқылы Netlify-ға қосу немесе Netlify CLI қолдану. Netlify Drop арқылы жай ZIP жүктеу функцияны жарияламауы мүмкін.

1. `OPENAI_API_KEY` Environment variable сақталған болуы керек.
2. Репозиторийді Netlify-ға Git арқылы қосыңыз.
3. Publish directory: `.`
4. Functions directory: `netlify/functions`
5. Сайт шыққан соң `/.netlify/functions/ai` адресін ашып тексеріңіз. GET кезінде `SÖZ DETEKTIV AI function is online.` деген жауап шығуы керек.

API кілтін HTML/JavaScript ішіне жазбаңыз және ешкімге жібермеңіз.
