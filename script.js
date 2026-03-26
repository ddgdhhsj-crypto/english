// مفتاح الـ API الخاص بك
const apiKey="AIzaSyDHandrFQ40qRG1hvwxIjnC0G9-yPUQ57M"; 

// ==========================================
// 1. نظام تغيير لغة واجهة الموقع (Localization)
// ==========================================
let currentAppLang = 'ar';
const i18n = {
    ar: {
        navAnalyzer: "التحليل", navGrammar: "القواعد", navTutor: "المعلم", langToggle: "English",
        analyzerTitle: "المُحلل الذكي ⚡", labelSource: "من (Source)", labelTarget: "إلى (Target)",
        inputPlaceholder: "اكتب الكلمة، أو الجملة الطويلة للترجمة والتحليل...", btnAnalyze: "تحليل النص وتوليد الصورة",
        loadingText: "جاري الترجمة والتحليل...", badgeResult: "النتيجة والتحليل", btnSpeak: "استماع",
        labelPronounce: "النطق الصوتي (Pronunciation):", labelExample: "مثال تطبيقي (Example)",
        imgPlaceholder: "سيتم توليد الصورة بالذكاء الاصطناعي وعرضها هنا", grammarTitle: "موسوعة القواعد <span class='text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400'>الشاملة</span>",
        grammarDesc: "أكثر من 40 قاعدة إنجليزية مشروحة بالتفصيل مع الأمثلة.", chatTitle: "المعلم الذكي (AI Tutor)",
        chatDesc: "متصل الآن - اطرح سؤالك أو اكتب جملة لتصحيحها.", chatWelcome: "أهلاً بك يا بطل! أنا هنا لمساعدتك. اكتب أي جملة لأقوم بتصحيحها، أو اسألني عن أي قاعدة.",
        chatInput: "اكتب سؤالك هنا...", btnSend: "إرسال", ruleFormula: "تكوين القاعدة (Formula)", ruleExamples: "أمثلة (Examples)"
    },
    en: {
        navAnalyzer: "Analyzer", navGrammar: "Grammar", navTutor: "Tutor", langToggle: "العربية",
        analyzerTitle: "Smart Analyzer ⚡", labelSource: "From", labelTarget: "To",
        inputPlaceholder: "Type a word, sentence, or text to translate and analyze...", btnAnalyze: "Analyze Text & Generate Image",
        loadingText: "Translating and analyzing...", badgeResult: "Result & Analysis", btnSpeak: "Listen",
        labelPronounce: "Phonetic Pronunciation:", labelExample: "Practical Example",
        imgPlaceholder: "AI generated image will appear here", grammarTitle: "Comprehensive <span class='text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400'>Grammar</span>",
        grammarDesc: "Over 40 English grammar rules explained in detail with examples.", chatTitle: "AI Tutor 🤖",
        chatDesc: "Online - Ask a question or submit a sentence for correction.", chatWelcome: "Hello champion! I am here to help. Write any sentence for correction, or ask about any grammar rule.",
        chatInput: "Type your question here...", btnSend: "Send", ruleFormula: "Formula", ruleExamples: "Examples"
    }
};

function toggleAppLanguage() {
    currentAppLang = currentAppLang === 'ar' ? 'en' : 'ar';
    const s = i18n[currentAppLang];
    
    document.getElementById('htmlTag').dir = currentAppLang === 'ar' ? 'rtl' : 'ltr';
    document.body.className = currentAppLang === 'en' ? 'flex flex-col selection:bg-indigo-500 selection:text-white overflow-x-hidden en-mode' : 'flex flex-col selection:bg-indigo-500 selection:text-white overflow-x-hidden';
    
    document.getElementById('ui-lang-toggle').innerText = s.langToggle;
    document.getElementById('ui-nav-analyzer').innerText = s.navAnalyzer;
    document.getElementById('ui-nav-grammar').innerText = s.navGrammar;
    document.getElementById('ui-nav-tutor').innerText = s.navTutor;
    
    document.getElementById('ui-analyzer-title').innerHTML = s.analyzerTitle;
    document.getElementById('ui-label-source').innerText = s.labelSource;
    document.getElementById('ui-label-target').innerText = s.labelTarget;
    document.getElementById('userInput').placeholder = s.inputPlaceholder;
    document.getElementById('ui-btn-analyze').innerText = s.btnAnalyze;
    
    document.getElementById('ui-loading-text').innerText = s.loadingText;
    document.getElementById('ui-badge-result').innerText = s.badgeResult;
    document.getElementById('ui-btn-speak').innerText = s.btnSpeak;
    document.getElementById('ui-label-pronounce').innerText = s.labelPronounce;
    document.getElementById('ui-label-example').innerText = s.labelExample;
    document.getElementById('ui-img-placeholder').innerText = s.imgPlaceholder;
    
    document.getElementById('ui-grammar-title').innerHTML = s.grammarTitle;
    document.getElementById('ui-grammar-desc').innerText = s.grammarDesc;
    
    document.getElementById('ui-chat-title').innerText = s.chatTitle;
    document.getElementById('ui-chat-desc').innerText = s.chatDesc;
    document.getElementById('ui-chat-welcome').innerText = s.chatWelcome;
    document.getElementById('chatInput').placeholder = s.chatInput;
    document.getElementById('ui-btn-send').innerText = s.btnSend;

    if(!document.getElementById('learnView').classList.contains('hidden-view')) loadGrammar();
}

// تبديل لغة المترجم (أسهم)
function swapLangs() {
    const src = document.getElementById('sourceLang');
    const tgt = document.getElementById('targetLang');
    if(src.value !== 'Auto') {
        const temp = src.value;
        src.value = tgt.value;
        tgt.value = temp;
    }
}

// ==========================================
// 2. موسوعة القواعد العملاقة
// ==========================================
const grammarData = [
    { id: 1, en: "Present Simple", ar: "المضارع البسيط", desc: "للحقائق الثابتة، والعادات، والجداول الزمنية.", examples: [ { en: "The earth goes round the sun.", ar: "الأرض تدور حول الشمس." }, { en: "The train leaves at 8 PM.", ar: "يغادر القطار في الثامنة." } ], rule: "Subject + Verb(s/es for he/she/it)" },
    { id: 2, en: "Present Continuous", ar: "المضارع المستمر", desc: "أحداث تحدث الآن، أو خطط مستقبلية تم الترتيب لها.", examples: [ { en: "I am reading a book now.", ar: "أنا أقرأ كتاباً الآن." } ], rule: "Subject + am/is/are + Verb(ing)" },
    { id: 3, en: "Past Simple", ar: "الماضي البسيط", desc: "حدث بدأ وانتهى في وقت محدد في الماضي.", examples: [ { en: "She visited London in 2010.", ar: "زارت لندن عام 2010." } ], rule: "Subject + Verb(ed) / Irregular" },
    { id: 4, en: "Past Continuous", ar: "الماضي المستمر", desc: "حدث كان مستمراً في الماضي وتم قطعه بحدث آخر.", examples: [ { en: "I was sleeping when the phone rang.", ar: "كنت نائماً عندما رن الهاتف." } ], rule: "Subject + was/were + Verb(ing)" },
    { id: 5, en: "Present Perfect", ar: "المضارع التام", desc: "حدث وقع في الماضي وله نتيجة في الحاضر.", examples: [ { en: "I have lost my keys.", ar: "لقد فقدت مفاتيحي (وما زلت أبحث عنها)." } ], rule: "Subject + have/has + Past Participle (V3)" },
    { id: 6, en: "Present Perfect Continuous", ar: "المضارع التام المستمر", desc: "حدث بدأ في الماضي وما زال مستمراً، نركز فيه على طول المدة.", examples: [ { en: "I have been working for 5 hours.", ar: "أنا أعمل منذ 5 ساعات." } ], rule: "Subject + have/has + been + Verb(ing)" },
    { id: 7, en: "Past Perfect", ar: "الماضي التام", desc: "الحدث الأقدم في الماضي (حدث قبل حدث آخر في الماضي).", examples: [ { en: "When I arrived, the train had left.", ar: "عندما وصلت، كان القطار قد غادر (المغادرة هي الأقدم)." } ], rule: "Subject + had + Past Participle (V3)" },
    { id: 8, en: "Past Perfect Continuous", ar: "الماضي التام المستمر", desc: "حدث كان مستمراً لفترة في الماضي قبل وقوع حدث آخر.", examples: [ { en: "He had been driving for hours before the accident.", ar: "كان يقود لساعات قبل الحادث." } ], rule: "Subject + had + been + Verb(ing)" },
    { id: 9, en: "Future Simple (Will)", ar: "المستقبل البسيط (Will)", desc: "لقرارات لحظية، وعود، وتنبؤات بلا دليل.", examples: [ { en: "I will call you later.", ar: "سأتصل بك لاحقاً." } ], rule: "Subject + will + Verb (inf)" },
    { id: 10, en: "Future (Going to)", ar: "المستقبل (الخطط والتنبؤات)", desc: "للخطط والنوايا، ولتنبؤ مبني على دليل مرئي.", examples: [ { en: "Look at the clouds! It is going to rain.", ar: "انظر للغيوم! سوف تمطر." } ], rule: "Subject + am/is/are + going to + Verb" },
    { id: 11, en: "Future Continuous", ar: "المستقبل المستمر", desc: "حدث سيكون مستمراً في وقت معين في المستقبل.", examples: [ { en: "At 8 PM tomorrow, I will be watching TV.", ar: "غداً في الثامنة، سأكون أشاهد التلفاز." } ], rule: "Subject + will be + Verb(ing)" },
    { id: 12, en: "Future Perfect", ar: "المستقبل التام", desc: "حدث سيكون قد اكتمل تماماً قبل وقت محدد في المستقبل.", examples: [ { en: "By next year, I will have graduated.", ar: "بحلول العام القادم، سأكون قد تخرجت." } ], rule: "Subject + will have + Past Participle" },
    { id: 13, en: "Zero Conditional", ar: "قاعدة If (الصفرية)", desc: "للحقائق العلمية والأشياء التي تحدث دائماً.", examples: [ { en: "If you heat water to 100 degrees, it boils.", ar: "إذا سخنت الماء لـ 100 درجة، يغلي." } ], rule: "If + Present Simple, Present Simple" },
    { id: 14, en: "First Conditional", ar: "قاعدة If (الأولى)", desc: "أشياء محتملة جداً أن تحدث في المستقبل.", examples: [ { en: "If I have money, I will buy a car.", ar: "إذا توفر لدي مال، سأشتري سيارة." } ], rule: "If + Present Simple, will + Verb" },
    { id: 15, en: "Second Conditional", ar: "قاعدة If (الثانية)", desc: "مواقف خيالية أو مستبعدة في الحاضر/المستقبل.", examples: [ { en: "If I won the lottery, I would buy an island.", ar: "لو فزت باليانصيب، لاشتريت جزيرة." } ], rule: "If + Past Simple, would + Verb" },
    { id: 16, en: "Third Conditional", ar: "قاعدة If (الثالثة)", desc: "الندم أو تخيل تغيير شيء حدث بالفعل في الماضي.", examples: [ { en: "If I had studied harder, I would have passed.", ar: "لو كنت قد درست بجد، لكنت قد نجحت." } ], rule: "If + Past Perfect, would have + V3" },
    { id: 17, en: "Mixed Conditionals", ar: "الشرطية المختلطة", desc: "مزيج بين حالات If لربط ماضٍ بحاضر.", examples: [ { en: "If I had slept early (past), I wouldn't be tired now (present).", ar: "لو نمت مبكراً، لما كنت متعباً الآن." } ], rule: "If + Past Perfect, would + Verb" },
    { id: 18, en: "Passive Voice (Present/Past)", ar: "المبني للمجهول (بسيط)", desc: "عندما يكون المفعول به أهم من الفاعل.", examples: [ { en: "The window was broken yesterday.", ar: "كُسرت النافذة البارحة." } ], rule: "Object + be (is/are/was/were) + V3" },
    { id: 19, en: "Passive (Continuous/Perfect)", ar: "المبني للمجهول (متقدم)", desc: "تطبيق المجهول مع الأزمنة المستمرة والتامة.", examples: [ { en: "The car is being repaired.", ar: "السيارة تُصلح الآن." }, { en: "The letter has been sent.", ar: "تم إرسال الرسالة." } ], rule: "Obj + is being/has been + V3" },
    { id: 20, en: "Reported Statements", ar: "الكلام المنقول (خبري)", desc: "لنقل ما قاله شخص (يتم تحويل الزمن للماضي).", examples: [ { en: "He said (that) he was hungry.", ar: "قال إنه كان جائعاً." } ], rule: "Change present to past, past to past perfect" },
    { id: 21, en: "Reported Questions", ar: "السؤال المنقول", desc: "نقل سؤال، ويتحول إلى صيغة جملة خبرية (بدون تقديم الفعل).", examples: [ { en: "She asked where I lived.", ar: "سألتني أين أعيش." } ], rule: "Subject + asked + Wh + Subj + Verb" },
    { id: 22, en: "Modals (Ability & Permission)", ar: "أفعال الاستطاعة والإذن", desc: "Can, Could, May.", examples: [ { en: "You can leave now.", ar: "يمكنك المغادرة الآن." }, { en: "Could you help me?", ar: "هل يمكنك مساعدتي؟" } ], rule: "Modal + Verb (Infinitive)" },
    { id: 23, en: "Modals (Obligation & Advice)", ar: "الإلزام والنصيحة", desc: "Must, Have to, Should.", examples: [ { en: "You must wear a seatbelt.", ar: "يجب أن ترتدي حزام أمان." }, { en: "You should sleep early.", ar: "ينبغي أن تنام مبكراً." } ], rule: "Must/Should + Verb (Infinitive)" },
    { id: 24, en: "Modals of Deduction", ar: "أفعال الاستنتاج", desc: "للتأكد (Must)، للاستحالة (Can't)، للاحتمال (Might).", examples: [ { en: "He owns a Ferrari. He must be rich.", ar: "يمتلك فيراري. لابد أنه غني." } ], rule: "Must/Can't/Might + Verb" },
    { id: 25, en: "Relative Clauses (Defining)", ar: "ضمائر الوصل (الأساسية)", desc: "who, which, that - تحدد عن من نتحدث ولا يمكن حذفها.", examples: [ { en: "The man who stole the bag was caught.", ar: "الرجل الذي سرق الحقيبة تم القبض عليه." } ], rule: "Noun + who/which/that + Clause" },
    { id: 26, en: "Relative Clauses (Non-defining)", ar: "ضمائر الوصل (الإضافية)", desc: "تعطي معلومات إضافية توضع بين فاصلتين.", examples: [ { en: "My brother, who lives in NY, is a doctor.", ar: "أخي، الذي يعيش في نيويورك، طبيب." } ], rule: "Noun, who/which + Clause," },
    { id: 27, en: "Gerunds (Verb+ing)", ar: "المصدر المنتهي بـ ing", desc: "الفعل عندما يعمل كاسم في الجملة.", examples: [ { en: "Swimming is good for you.", ar: "السباحة مفيدة لك." }, { en: "I enjoy reading.", ar: "أستمتع بالقراءة." } ], rule: "Verb + ing" },
    { id: 28, en: "Infinitives (to + Verb)", ar: "المصدر المسبوق بـ To", desc: "يأتي بعد أفعال معينة أو لبيان الغرض.", examples: [ { en: "I went to the store to buy milk.", ar: "ذهبت للمتجر لأشتري الحليب." }, { en: "I want to sleep.", ar: "أريد أن أنام." } ], rule: "to + Verb (Infinitive)" },
    { id: 29, en: "The Causative (Have/Get)", ar: "السببية", desc: "أن تدفع/تطلب من شخص آخر القيام بخدمة لك.", examples: [ { en: "I had my hair cut.", ar: "قصصت شعري (شخص آخر قصه لي)." } ], rule: "Subject + have/get + Object + Past Participle" },
    { id: 30, en: "Wish / If only (Present)", ar: "التمني (الحاضر)", desc: "تمني شيء عكس الواقع الآن (نستخدم الماضي).", examples: [ { en: "I wish I had a car.", ar: "أتمنى لو كان لدي سيارة (لكن ليس لدي)." } ], rule: "Wish + Past Simple" },
    { id: 31, en: "Wish / If only (Past)", ar: "الندم (الماضي)", desc: "تمني تغير شيء في الماضي (نستخدم الماضي التام).", examples: [ { en: "I wish I had studied.", ar: "أتمنى لو كنت قد درست (لكنني لم أفعل)." } ], rule: "Wish + Past Perfect" },
    { id: 32, en: "Question Tags", ar: "الأسئلة المذيلة", desc: "سؤال قصير في النهاية لطلب التأكيد.", examples: [ { en: "You are a doctor, aren't you?", ar: "أنت طبيب، أليس كذلك؟" }, { en: "He didn't go, did he?", ar: "لم يذهب، أليس كذلك؟" } ], rule: "Statement, Auxiliary + Pronoun?" },
    { id: 33, en: "Used to", ar: "اعتاد على", desc: "عادات كانت تحدث في الماضي وتوقفت تماماً.", examples: [ { en: "I used to play tennis when I was young.", ar: "كنت ألعب التنس عندما كنت صغيراً." } ], rule: "Subject + used to + Verb" },
    { id: 34, en: "Be/Get used to", ar: "يعتاد على شيء جديد", desc: "التأقلم مع شيء أو عادة مستمرة.", examples: [ { en: "I am getting used to the cold weather.", ar: "أنا أعتاد تدريجياً على الطقس البارد." } ], rule: "Subject + be/get + used to + Noun/V(ing)" },
    { id: 35, en: "Comparatives", ar: "المقارنة (بين اثنين)", desc: "مقارنة الصفات بين شيئين أو شخصين.", examples: [ { en: "A car is faster than a bike.", ar: "السيارة أسرع من الدراجة." }, { en: "It is more beautiful than I thought.", ar: "إنها أجمل مما اعتقدت." } ], rule: "Adj+er than / more + Adj + than" },
    { id: 36, en: "Superlatives", ar: "التفضيل (الأعلى)", desc: "تفضيل شيء على مجموعة كاملة.", examples: [ { en: "He is the tallest boy in class.", ar: "إنه أطول ولد في الفصل." }, { en: "This is the most expensive phone.", ar: "هذا أغلى هاتف." } ], rule: "The + Adj+est / The most + Adj" },
    { id: 37, en: "Articles (A/An/The)", ar: "أدوات التعريف والنكرة", desc: "استخدام The للشيء المعرف، و A/An للنكرة المفردة.", examples: [ { en: "I saw a cat. The cat was black.", ar: "رأيت قطة. القطة كانت سوداء." } ], rule: "A/An + Noun (singular) / The + Specific Noun" },
    { id: 38, en: "Quantifiers", ar: "محددات الكمية", desc: "Some, Any, Much, Many, A lot of.", examples: [ { en: "I have some money. Do you have any questions?", ar: "لدي بعض المال. هل لديك أية أسئلة؟" } ], rule: "Some (Positive) / Any (Negative/Questions)" },
    { id: 39, en: "Prepositions of Time", ar: "حروف جر الزمان", desc: "In (أشهر/سنين), On (أيام), At (ساعات).", examples: [ { en: "I was born in May, on Monday, at 5 PM.", ar: "ولدت في مايو، يوم الإثنين، الساعة 5." } ], rule: "In + Month/Year | On + Day | At + Time" },
    { id: 40, en: "Inversion", ar: "تقديم الفعل على الفاعل", desc: "تُستخدم للتأكيد أو عند بدء الجملة بكلمة نفي (Never, Rarely).", examples: [ { en: "Never have I seen such a beautiful place.", ar: "لم يسبق لي أبداً أن رأيت مكاناً بهذا الجمال." } ], rule: "Negative Adverb + Auxiliary + Subject + Verb" }
];

// ==========================================
// 3. التحكم في التبديل بين الشاشات
// ==========================================
function showView(viewName) {
    document.querySelectorAll('.view-section').forEach(s => {
        s.classList.remove('active-view');
        s.classList.add('hidden-view');
    });
    
    const activeSection = document.getElementById(`${viewName}View`);
    activeSection.classList.remove('hidden-view');
    void activeSection.offsetWidth; // إعادة تشغيل الحركة
    activeSection.classList.add('active-view');

    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('text-indigo-400', 'bg-indigo-500/20');
        item.classList.add('text-slate-400');
    });
    const activeBtn = document.getElementById(`nav-${viewName}`);
    if(activeBtn){
        activeBtn.classList.remove('text-slate-400');
        activeBtn.classList.add('text-indigo-400', 'bg-indigo-500/20');
    }
    
    if(viewName === 'learn') loadGrammar();
}

// ==========================================
// 4. عرض وتفاصيل القواعد
// ==========================================
function loadGrammar() {
    const container = document.getElementById('categoryContent');
    container.innerHTML = grammarData.map(item => `
        <div onclick="openDetail(${item.id})" class="glass-panel p-6 rounded-3xl border border-slate-700 shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-2 transition-all cursor-pointer flex flex-col h-full group relative overflow-hidden">
            <div class="absolute -top-10 -start-10 w-24 h-24 bg-indigo-500/20 rounded-full blur-2xl group-hover:bg-purple-500/30 transition-all duration-500"></div>
            <h4 class="font-black text-indigo-300 text-xl md:text-2xl mb-1 relative z-10">${item.en}</h4>
            <h5 class="font-bold text-slate-300 text-xs md:text-sm bg-slate-800/80 border border-slate-600 inline-block px-3 py-1.5 rounded-lg mb-4 mt-2 w-max relative z-10">${item.ar}</h5>
            <p class="text-sm text-slate-400 mt-auto leading-relaxed relative z-10">${item.desc}</p>
        </div>
    `).join('');
}

function openDetail(id) {
    const item = grammarData.find(i => i.id === id);
    const s = i18n[currentAppLang];
    
    document.getElementById('modalTitle').innerHTML = `
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">${item.en}</span>
        <span class="text-slate-600 font-light px-2">|</span> 
        <span class="text-slate-300 text-2xl">${item.ar}</span>
    `;
    
    document.getElementById('modalContent').innerHTML = `
        <div class="bg-indigo-900/40 p-6 rounded-3xl border border-indigo-500/40 mb-8 shadow-inner">
            <p class="text-sm font-bold text-indigo-300 mb-3 uppercase tracking-widest">${s.ruleFormula}</p>
            <code class="text-indigo-100 font-black text-xl tracking-wide break-words bg-slate-900/50 px-4 py-2 rounded-xl block w-max max-w-full" dir="ltr">${item.rule}</code>
        </div>
        <div class="space-y-4">
            <p class="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">${s.ruleExamples}</p>
            ${item.examples.map(ex => `
                <div class="bg-slate-800/80 p-6 rounded-3xl border border-slate-700 border-s-4 border-s-purple-500">
                    <p class="text-indigo-200 font-black text-xl md:text-2xl mb-3 break-words" dir="ltr">${ex.en}</p>
                    <p class="text-slate-300 text-lg border-t border-slate-700 pt-3 break-words">${ex.ar}</p>
                </div>
            `).join('')}
        </div>
    `;
    const modal = document.getElementById('detailModal');
    modal.classList.remove('hidden'); modal.classList.add('flex');
}

function closeModal() {
    const modal = document.getElementById('detailModal');
    modal.classList.add('hidden'); modal.classList.remove('flex');
}

// ==========================================
// 5. الاتصال بذكاء جوجل وتوليد الصور
// ==========================================
async function fetchWithRetry(url, opts, retries = 2) {
    try { 
        const res = await fetch(url, opts); 
        if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
        return await res.json(); 
    }
    catch (e) { 
        if (retries > 0) {
            await new Promise(r => setTimeout(r, 1000));
            return fetchWithRetry(url, opts, retries - 1);
        }
        throw e; 
    }
}

document.getElementById('actionBtn').addEventListener('click', async () => {
    const text = document.getElementById('userInput').value.trim();
    if(!text) return;
    
    const btn = document.getElementById('actionBtn');
    const imgLoader = document.getElementById('imgLoader');
    const imgPlaceholder = document.getElementById('imgPlaceholder');
    const resImg = document.getElementById('resImg');
    
    const sourceLang = document.getElementById('sourceLang').value;
    const targetLang = document.getElementById('targetLang').value;
    
    const transText = document.getElementById('transText');
    const explText = document.getElementById('explText');
    const syllablesText = document.getElementById('syllablesText');
    const exampleText = document.getElementById('exampleText');
    const exampleTransText = document.getElementById('exampleTransText');
    
    btn.disabled = true; btn.classList.add('opacity-50');
    imgLoader.classList.remove('hidden'); imgLoader.classList.add('flex');
    resImg.classList.add('hidden');
    imgPlaceholder.classList.remove('hidden');
    
    try {
        const prompt = `Analyze: "${text}". Source language: ${sourceLang}. Target language: ${targetLang}.
        If it's a sentence, translate it to ${targetLang}, explain its grammar/meaning briefly in ${targetLang}, and provide a phonetic reading guide. 
        If it's a word, translate to ${targetLang}, explain in ${targetLang}, and provide phonetic syllables.
        Strictly return ONLY JSON format without markdown: 
        {"trans": "Translation in target language", "expl": "Explanation in target language", "syllables": "Phonetic reading/syllables of original text", "example": "Sentence using original text", "exampleTrans": "Translation of sentence to target language", "img": "One english word summarizing the text for image generation"}`;
        
        const geminiData = await fetchWithRetry(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST', headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseMimeType: "application/json" } })
        });
        
        let jsonStr = geminiData.candidates[0].content.parts[0].text;
        jsonStr = jsonStr.replace(/```json/g, '').replace(/```/g, '').trim(); 
        const result = JSON.parse(jsonStr);
        
        transText.innerText = result.trans;
        transText.classList.replace('text-slate-500', 'text-white');
        
        explText.innerText = result.expl;
        explText.classList.replace('text-slate-500', 'text-slate-300');
        explText.classList.replace('border-s-indigo-500/30', 'border-s-indigo-500');
        
        syllablesText.innerText = result.syllables || text;
        syllablesText.classList.replace('text-indigo-400/50', 'text-indigo-300');
        
        exampleText.innerText = `"${result.example}"`;
        exampleText.classList.replace('text-slate-600', 'text-white');
        
        exampleTransText.innerText = result.exampleTrans;
        exampleTransText.classList.replace('text-slate-600', 'text-slate-400');
        
        try {
            const imagenData = await fetchWithRetry(`https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict?key=${apiKey}`, {
                method: 'POST', headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ instances: { prompt: `Ultra high quality clean vector illustration of: ${result.img}, dark neon aesthetic background` }, parameters: { sampleCount: 1 } })
            });
            resImg.src = `data:image/png;base64,${imagenData.predictions[0].bytesBase64Encoded}`;
            resImg.onload = () => { 
                imgLoader.classList.remove('flex'); imgLoader.classList.add('hidden'); 
                imgPlaceholder.classList.add('hidden');
                resImg.classList.remove('hidden'); 
            };
        } catch(imgError) {
            document.getElementById('ui-loading-text').innerText = "تم التحليل (الصورة غير متاحة)";
            setTimeout(() => { imgLoader.classList.remove('flex'); imgLoader.classList.add('hidden'); }, 3000);
        }
        
    } catch (e) { 
        document.getElementById('ui-loading-text').innerText = "حدث خطأ! تأكد من اتصال الـ VPN.";
        setTimeout(() => { imgLoader.classList.remove('flex'); imgLoader.classList.add('hidden'); }, 3000);
    }
    finally { btn.disabled = false; btn.classList.remove('opacity-50'); }
});

document.getElementById('speakBtn').addEventListener('click', () => {
    const textToSpeak = document.getElementById('userInput').value;
    const utter = new SpeechSynthesisUtterance(textToSpeak);
    
    const srcLang = document.getElementById('sourceLang').value;
    if (srcLang === 'English') utter.lang = 'en-US';
    else if (srcLang === 'Arabic') utter.lang = 'ar-SA';
    else if (srcLang === 'French') utter.lang = 'fr-FR';
    else if (srcLang === 'Spanish') utter.lang = 'es-ES';
    else utter.lang = 'en-US'; 
    
    utter.rate = 0.9;
    speechSynthesis.speak(utter);
});

document.getElementById('sendChatBtn').addEventListener('click', async () => {
    const input = document.getElementById('chatInput'); 
    const q = input.value.trim();
    if(!q) return;

    const history = document.getElementById('chatHistory');
    
    history.innerHTML += `
        <div class="flex flex-col mb-4">
            <div class="bg-indigo-600 border border-indigo-500 p-5 rounded-3xl self-end me-2 rounded-tr-none max-w-[85%] shadow-lg break-words">
                <p class="text-white font-medium">${q}</p>
            </div>
        </div>`;
    input.value = ""; 
    history.scrollTop = history.scrollHeight;
    
    const loadingId = 'loading-' + Date.now();
    history.innerHTML += `<div id="${loadingId}" class="flex flex-col mb-4"><div class="bg-slate-800 border border-slate-700 py-4 px-6 rounded-3xl self-start ms-2 rounded-tl-none max-w-[85%] text-slate-400 text-sm animate-pulse">...</div></div>`;
    history.scrollTop = history.scrollHeight;
    
    try {
        const targetInterface = currentAppLang === 'ar' ? 'Arabic' : 'English';
        const data = await fetchWithRetry(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST', headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ contents: [{ parts: [{ text: `You are an expert Tutor. Answer in ${targetInterface}. Format nicely. Student says: ${q}` }] }] })
        });
        
        const loadingElement = document.getElementById(loadingId);
        if (loadingElement) loadingElement.remove();

        let reply = data.candidates[0].content.parts[0].text;
        reply = reply.replace(/\*\*(.*?)\*\*/g, '<span class="text-indigo-400 font-bold">$1</span>').replace(/\n/g, '<br>');
        
        history.innerHTML += `
            <div class="flex flex-col mb-4 active-view">
                <div class="bg-slate-800 border border-slate-700 p-5 rounded-3xl self-start ms-2 rounded-tl-none max-w-[85%] shadow-lg break-words">
                    <p class="text-slate-200 leading-relaxed font-medium">${reply}</p>
                </div>
            </div>`;
        history.scrollTop = history.scrollHeight;
        
    } catch(e) {
        const loadingElement = document.getElementById(loadingId);
        if (loadingElement) loadingElement.remove();
        history.innerHTML += `<div class="text-red-400 text-sm text-center my-4 font-bold bg-red-900/20 p-2 rounded-xl">خطأ في الاتصال. تأكد من الـ VPN.</div>`;
        history.scrollTop = history.scrollHeight;
    }
});

document.getElementById('chatInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') document.getElementById('sendChatBtn').click();
});

window.onload = () => {
    showView('translate'); 
};
