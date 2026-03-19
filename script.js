// ملاحظة: اترك apiKey فارغاً إذا كنت ستستخدمه في بيئة توفر المفتاح تلقائياً
const apiKey = "AIzaSyBzNv2H9pjaOJLkn2Ospt83VbBXiUShe8I"; 

// --- نظام إعادة المحاولة للطلبات (Exponential Backoff) ---
async function fetchWithRetry(url, options, maxRetries = 5) {
    let delay = 1000;
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
            return response;
        } catch (error) {
            if (i === maxRetries - 1) throw error;
            await new Promise(res => setTimeout(res, delay));
            delay *= 2;
        }
    }
}

// --- 1. التبديل بين الشاشات ---
function showView(viewName) {
    const views = ['translate', 'analyzer', 'learn', 'chat'];
    views.forEach(v => {
        const section = document.getElementById(v + 'View');
        const btn = document.getElementById('nav-' + v);
        
        if(v === viewName) {
            section.classList.remove('hidden-view');
            if(v === 'chat') section.classList.add('flex');
            btn.classList.replace('text-slate-400', 'text-indigo-600');
        } else {
            section.classList.add('hidden-view');
            if(v === 'chat') section.classList.remove('flex');
            btn.classList.replace('text-indigo-600', 'text-slate-400');
        }
    });
    
    if(viewName === 'learn' && document.getElementById('grammarGrid').innerHTML === "") {
        renderGrammarGrid();
    }
}

// --- دالة مساعدة للاتصال بـ Gemini ---
async function askGeminiAPI(prompt, isJson = false) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    const payload = {
        contents: [{ parts: [{ text: prompt }] }]
    };

    if (isJson) {
        payload.generationConfig = { responseMimeType: "application/json" };
    }

    const response = await fetchWithRetry(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    
    const data = await response.json();
    let text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    
    if (isJson) {
        text = text.replace(/```json/gi, '').replace(/```/g, '').trim();
        return JSON.parse(text);
    }
    return text;
}

// --- 2. المترجم وصانع الصور ---
async function runTranslation() {
    const input = document.getElementById('userInput').value.trim();
    if(!input) return;

    const btnText = document.getElementById('actionBtnText');
    const resultBox = document.getElementById('resultBox');
    const transText = document.getElementById('transText');
    const explText = document.getElementById('explText');
    const loader = document.getElementById('imgLoader');
    const img = document.getElementById('resImg');

    document.getElementById('actionBtn').disabled = true;
    btnText.innerText = "جاري الترجمة...";
    resultBox.classList.remove('hidden');
    resultBox.classList.add('flex');
    loader.classList.remove('hidden');
    img.classList.add('hidden');

    try {
        const prompt = `Translate this Arabic text to English and explain the English grammar or vocabulary briefly in Arabic: "${input}". Return ONLY a JSON object: {"t": "the english translation", "e": "arabic explanation"}`;
        const result = await askGeminiAPI(prompt, true);
        
        transText.innerText = result.t || "Error";
        explText.innerText = result.e || "";

        btnText.innerText = "جاري رسم الصورة...";

        const imagenUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`;
        const imgRes = await fetchWithRetry(imagenUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                instances: { prompt: `Clean, educational illustration of: ${result.t}` },
                parameters: { sampleCount: 1 }
            })
        });
        
        const imgData = await imgRes.json();
        const base64 = imgData.predictions[0].bytesBase64Encoded;
        
        img.src = `data:image/png;base64,${base64}`;
        img.onload = () => {
            loader.classList.add('hidden');
            img.classList.remove('hidden');
        };

    } catch (err) {
        transText.innerText = "فشل الاتصال";
        explText.innerText = "يرجى المحاولة مرة أخرى.";
        loader.innerHTML = `<span class="text-red-500 font-bold text-sm">تعذر توليد الصورة</span>`;
    } finally {
        document.getElementById('actionBtn').disabled = false;
        btnText.innerText = "ترجمة وتوليد صورة";
    }
}

// --- 3. مفكك الكلمات ---
async function analyzeCompoundWord() {
    const word = document.getElementById('wordInput').value.trim();
    if(!word) return;

    const btn = document.getElementById('analyzeBtn');
    const btnText = document.getElementById('analyzeBtnText');
    const output = document.getElementById('analyzerOutput');
    
    btn.disabled = true;
    btnText.innerText = "جاري التحليل...";
    output.classList.add('hidden');

    try {
        const prompt = `Analyze the English word "${word}". Split it and provide usage. Return JSON: {"p1": "part1", "p2": "part2", "en": "sentence", "ar": "arabic"}`;
        const result = await askGeminiAPI(prompt, true);
        
        document.getElementById('w-part1').innerText = result.p1 || word;
        document.getElementById('w-part2').innerText = result.p2 || "";
        document.getElementById('outEn').innerText = result.en || "";
        document.getElementById('outAr').innerText = result.ar || "";
        
        output.classList.remove('hidden');
    } catch (error) {
        alert("حدث خطأ.");
    } finally {
        btn.disabled = false;
        btnText.innerText = "تحليل وتفكيك الكلمة";
    }
}

// --- 4. مكتبة الجرامر ---
const comprehensiveGrammar = [
    {en: "Present Simple", ar: "المضارع البسيط", desc: "الحقائق والعادات", rule: "Subject + V1 (s/es)", ex: "He plays tennis.", exAr: "هو يلعب التنس."},
    {en: "Present Continuous", ar: "المضارع المستمر", desc: "يحدث الآن", rule: "am/is/are + V-ing", ex: "I am reading.", exAr: "أنا أقرأ الآن."},
    {en: "Past Simple", ar: "الماضي البسيط", desc: "انتهى في الماضي", rule: "Subject + V2 (ed)", ex: "We visited Cairo.", exAr: "زرنا القاهرة."},
    {en: "Future Simple", ar: "المستقبل البسيط", desc: "قرارات وتنبؤات", rule: "will + V1", ex: "I will help you.", exAr: "سوف أساعدك."}
];

function renderGrammarGrid() {
    const grid = document.getElementById('grammarGrid');
    grid.innerHTML = comprehensiveGrammar.map((g, i) => `
        <div onclick="openGrammar(${i})" class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm cursor-pointer hover:shadow-xl transition-all">
            <h4 class="font-black text-indigo-600 text-xl mb-2" dir="ltr">${g.en}</h4>
            <span class="text-xs bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg font-bold inline-block mb-3">${g.ar}</span>
            <p class="text-sm text-slate-500 font-medium">${g.desc}</p>
        </div>
    `).join('');
}

function openGrammar(index) {
    const g = comprehensiveGrammar[index];
    document.getElementById('modalTitle').innerText = g.en;
    document.getElementById('modalContent').innerHTML = `
        <div class="bg-indigo-50 p-6 rounded-2xl border border-indigo-100"><code class="text-2xl font-black" dir="ltr">${g.rule}</code></div>
        <div class="bg-slate-50 p-6 rounded-2xl border border-slate-100 mt-4"><p dir="ltr">${g.ex}</p><p>${g.exAr}</p></div>
    `;
    document.getElementById('detailModal').classList.replace('hidden', 'flex');
}

function closeModal() { document.getElementById('detailModal').classList.replace('flex', 'hidden'); }

// --- 5. المعلم الذكي (Chat) ---
async function chatWithTeacher() {
    const input = document.getElementById('chatInput');
    const history = document.getElementById('chatHistory');
    const btnText = document.getElementById('chatBtnText');
    const msg = input.value.trim();
    if(!msg) return;

    history.innerHTML += `<div class="flex flex-col"><div class="bg-indigo-600 text-white p-4 rounded-3xl self-end max-w-[70%]"><p>${msg}</p></div></div>`;
    input.value = "";
    history.scrollTop = history.scrollHeight;
    
    document.getElementById('chatBtn').disabled = true;
    btnText.innerText = "...";

    try {
        const reply = await askGeminiAPI(`أنت معلم لغة إنجليزية محترف. سؤال الطالب: ${msg}`);
        history.innerHTML += `<div class="flex flex-col animate-view"><div class="bg-slate-50 p-5 rounded-3xl self-start max-w-[70%]"><p>${reply.replace(/\n/g, '<br>')}</p></div></div>`;
    } catch (e) {
        history.innerHTML += `<div class="text-red-500 text-center text-xs">خطأ في الاتصال</div>`;
    } finally {
        document.getElementById('chatBtn').disabled = false;
        btnText.innerText = "إرسال";
        history.scrollTop = history.scrollHeight;
    }
}

// تشغيل عند الضغط على Enter
document.getElementById('userInput').addEventListener('keypress', (e) => { if (e.key === 'Enter') runTranslation(); });
document.getElementById('chatInput').addEventListener('keypress', (e) => { if (e.key === 'Enter') chatWithTeacher(); });

// البداية
showView('translate');