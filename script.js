document.addEventListener('DOMContentLoaded', () => {
    const toolCards = document.querySelectorAll('.tool-card');
    const tabBtns = document.querySelectorAll('.tab-btn');

    // --- 日期顯示 ---
    const dateDisplay = document.getElementById('date-display');
    if (dateDisplay) {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
        const weekday = weekdays[now.getDay()];
        dateDisplay.innerText = `${year}/${month}/${day} (${weekday})`;
    }

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
