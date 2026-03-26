@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&family=Outfit:wght@400;600;700;900&display=swap');

body { 
    font-family: 'Cairo', 'Outfit', sans-serif; 
    background-color: #050b14; 
    background-image: radial-gradient(circle at 50% 0%, #1e1b4b 0%, transparent 50%);
    color: #e2e8f0;
    min-height: 100vh;
    overflow-x: hidden;
}

.en-mode { direction: ltr; font-family: 'Outfit', sans-serif; }

.glass-panel { 
    background: rgba(30, 41, 59, 0.4); 
    backdrop-filter: blur(20px); 
    -webkit-backdrop-filter: blur(20px);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.05);
}
.glass-nav { 
    background: rgba(15, 23, 42, 0.9); 
    backdrop-filter: blur(24px); 
    -webkit-backdrop-filter: blur(24px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.custom-scrollbar::-webkit-scrollbar { width: 8px; }
.custom-scrollbar::-webkit-scrollbar-track { background: rgba(15, 23, 42, 0.5); border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(79, 70, 229, 0.6); border-radius: 10px; }

.break-words {
    word-wrap: break-word;
    word-break: break-word;
    white-space: pre-wrap;
}

.hidden-view { display: none !important; }

.active-view { 
    display: flex !important; 
    animation: smoothReveal 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
}

@keyframes smoothReveal {
    0% { opacity: 0; transform: translateY(20px) scale(0.98); filter: blur(5px); }
    100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
}

.animate-pulse-slow { animation: pulse 3s ease-in-out infinite; }
@keyframes pulse { 
    0%, 100% { opacity: 1; transform: scale(1); } 
    50% { opacity: .8; transform: scale(0.97); } 
}

select {
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23818cf8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: left 1rem center;
    background-size: 1em;
}
html[dir="ltr"] select {
    background-position: right 1rem center;
}
select option {
    background-color: #0f172a;
    color: #fff;
}
