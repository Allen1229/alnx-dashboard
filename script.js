document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const userProfile = document.getElementById('user-profile');
    const toolCards = document.querySelectorAll('.tool-card');
    const tabBtns = document.querySelectorAll('.tab-btn');

    // --- 鎖定系統 ---
    const updateLockState = (isLoggedIn) => {
        const type2Cards = document.querySelectorAll('.tool-card.type2');
        type2Cards.forEach(card => {
            if (isLoggedIn) {
                card.classList.remove('locked');
                card.classList.add('unlocked');
                card.querySelector('.tool-btn').innerText = '立即啟動';
            } else {
                card.classList.add('locked');
                card.classList.remove('unlocked');
                card.querySelector('.tool-btn').innerText = '需要授權';
            }
        });
    };

    // --- 登入控制 ---
    loginBtn.addEventListener('click', () => {
        // 模擬 Google 登入流程
        loginBtn.classList.add('loading');
        loginBtn.innerHTML = '<span class="loader"></span> 串接中...';
        
        setTimeout(() => {
            loginBtn.classList.add('hidden');
            userProfile.classList.remove('hidden');
            updateLockState(true);
            
            // 系統音效或震動模擬 (僅視覺反饋)
            console.log('User authenticated successfully.');
        }, 1200);
    });

    logoutBtn.addEventListener('click', () => {
        userProfile.classList.add('hidden');
        loginBtn.classList.remove('hidden');
        loginBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3"/></svg> Google 登入';
        updateLockState(false);
    });

    // --- 篩選系統 ---
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            
            // UI 切換
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // 列表過濾
            toolCards.forEach(card => {
                if (filter === 'all' || card.dataset.type === filter) {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeIn 0.5s ease-forward';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- 按鈕點擊效果 ---
    toolCards.forEach(card => {
        const btn = card.querySelector('.tool-btn');
        btn.addEventListener('click', (e) => {
            if (card.classList.contains('locked')) {
                // 晃動動畫
                card.animate([
                    { transform: 'translateX(0)' },
                    { transform: 'translateX(-5px)' },
                    { transform: 'translateX(5px)' },
                    { transform: 'translateX(0)' }
                ], { duration: 200, iterations: 2 });
                return;
            }
            
            // 啟動工具動畫 (模擬)
            const icon = card.querySelector('.tool-icon');
            icon.animate([
                { transform: 'scale(1)' },
                { transform: 'scale(1.2) rotate(10deg)' },
                { transform: 'scale(1)' }
            ], { duration: 300 });

            console.log('Starting tool: ' + card.querySelector('h3').innerText);
        });
    });
});

// 添加簡單的漸入動畫
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .loader {
        width: 14px;
        height: 14px;
        border: 2px solid #000;
        border-bottom-color: transparent;
        border-radius: 50%;
        display: inline-block;
        animation: rotation 1s linear infinite;
    }
    @keyframes rotation {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);
