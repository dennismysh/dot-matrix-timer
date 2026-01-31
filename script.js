class DotMatrixTimer {
    constructor() {
        this.yearEnd = new Date('2026-12-31T23:59:59');
        this.intervalId = null;
        
        // Month data for 2026 (not a leap year)
        this.monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        this.monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 
                         'july', 'august', 'september', 'october', 'november', 'december'];
        
        this.init();
    }

    init() {
        this.createMatrices();
        this.updateTimer();
        this.startTimer();
    }

    createMatrices() {
        // Create days matrix (365 days in 2026)
        this.createMatrix('daysMatrix', 365, 23, 16);
        
        // Create months matrices
        this.createMonthMatrices();
        
        // Create hours matrix (24 hours)
        this.createMatrix('hoursMatrix', 24, 6, 4);
        
        // Create minutes matrix (60 minutes)
        this.createMatrix('minutesMatrix', 60, 10, 6);
        
        // Create seconds matrix (60 seconds)
        this.createMatrix('secondsMatrix', 60, 10, 6);
    }

    createMatrix(containerId, totalDots, cols, rows) {
        const container = document.getElementById(containerId);
        const matrix = document.createElement('div');
        matrix.className = 'matrix';
        matrix.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.dataset.index = i;
            matrix.appendChild(dot);
        }
        
        container.appendChild(matrix);
        return container;
    }

    createMonthMatrices() {
        for (let i = 0; i < 12; i++) {
            const daysInMonth = this.monthDays[i];
            const monthName = this.monthNames[i];
            
            // Calculate optimal grid dimensions for month
            const cols = Math.ceil(Math.sqrt(daysInMonth));
            const rows = Math.ceil(daysInMonth / cols);
            
            this.createMatrix(`${monthName}Matrix`, daysInMonth, cols, rows);
        }
    }

    updateTimer() {
        const now = new Date();
        const timeRemaining = this.calculateTimeRemaining(now);
        
        // Update digital display
        this.updateDigitalDisplay(timeRemaining);
        
        // Calculate elapsed time for each unit
        const yearStart = new Date('2026-01-01T00:00:00');
        const daysPassed = Math.floor((now - yearStart) / (1000 * 60 * 60 * 24));
        const hoursPassed = now.getHours();
        const minutesPassed = now.getMinutes();
        const secondsPassed = now.getSeconds();
        
        // Update matrices (all showing elapsed time now)
        this.updateMatrix('daysMatrix', daysPassed, 365);
        
        // Update month matrices
        this.updateMonthMatrices(now);
        
        this.updateMatrix('hoursMatrix', hoursPassed, 24);
        this.updateMatrix('minutesMatrix', minutesPassed, 60);
        this.updateMatrix('secondsMatrix', secondsPassed, 60);
    }

    calculateTimeRemaining(now) {
        const diff = this.yearEnd - now;
        
        if (diff <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        return { days, hours, minutes, seconds };
    }

    updateDigitalDisplay(timeRemaining) {
        // Calculate elapsed time in 2026
        const yearStart = new Date('2026-01-01T00:00:00');
        const now = new Date();
        const elapsedMs = now - yearStart;
        
        const elapsedDays = Math.floor(elapsedMs / (1000 * 60 * 60 * 24));
        const elapsedHours = Math.floor(elapsedMs / (1000 * 60 * 60)) % 24;
        const elapsedMinutes = Math.floor(elapsedMs / (1000 * 60)) % 60;
        const elapsedSeconds = Math.floor(elapsedMs / 1000) % 60;
        
        // Update elapsed timer display (first one)
        document.getElementById('elapsedDays').textContent = String(elapsedDays).padStart(3, '0');
        document.getElementById('elapsedHours').textContent = String(elapsedHours).padStart(2, '0');
        document.getElementById('elapsedMinutes').textContent = String(elapsedMinutes).padStart(2, '0');
        document.getElementById('elapsedSeconds').textContent = String(elapsedSeconds).padStart(2, '0');
        
        // Update remaining time display (second one)
        document.getElementById('days').textContent = String(timeRemaining.days).padStart(3, '0');
        document.getElementById('hours').textContent = String(timeRemaining.hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(timeRemaining.minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(timeRemaining.seconds).padStart(2, '0');
        
        // Calculate and update year progress percentage
        const yearEnd = new Date('2026-12-31T23:59:59');
        const totalYearMs = yearEnd - yearStart;
        const yearProgress = Math.min((elapsedMs / totalYearMs) * 100, 100);
        const yearRemaining = Math.max(100 - yearProgress, 0);
        
        document.querySelector('.progress-value').textContent = yearProgress.toFixed(1) + '%';
        document.querySelector('.remaining-value').textContent = yearRemaining.toFixed(1) + '%';
    }

    updateMatrix(containerId, activeCount, totalDots) {
        const container = document.getElementById(containerId);
        const dots = container.querySelectorAll('.dot');
        
        dots.forEach((dot, index) => {
            if (index < activeCount) {
                dot.classList.add('active');
                dot.classList.remove('inactive');
            } else {
                dot.classList.remove('active');
                dot.classList.add('inactive');
            }
        });
    }

    updateMonthMatrices(now) {
        const currentMonth = now.getMonth(); // 0-11
        const currentDay = now.getDate(); // 1-31
        
        for (let i = 0; i < 12; i++) {
            const matrixId = `${this.monthNames[i]}Matrix`;
            const container = document.getElementById(matrixId);
            if (!container) continue;
            
            const dots = container.querySelectorAll('.dot');
            
            dots.forEach((dot, index) => {
                if (i < currentMonth) {
                    // Month is fully passed
                    dot.classList.add('active');
                    dot.classList.remove('inactive');
                } else if (i === currentMonth) {
                    // Current month - show elapsed days
                    if (index < currentDay) {
                        dot.classList.add('active');
                        dot.classList.remove('inactive');
                    } else {
                        dot.classList.remove('active');
                        dot.classList.add('inactive');
                    }
                } else {
                    // Future month
                    dot.classList.remove('active');
                    dot.classList.add('inactive');
                }
            });
        }
    }

    startTimer() {
        // Update every second for smooth animations
        this.intervalId = setInterval(() => {
            this.updateTimer();
        }, 1000);
    }

    stopTimer() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new DotMatrixTimer();
});

// Add interactive features
document.addEventListener('DOMContentLoaded', () => {
    const timer = new DotMatrixTimer();
    
    // Add click interaction to individual dots
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('dot')) {
            e.target.style.transform = 'scale(1.5)';
            setTimeout(() => {
                e.target.style.transform = '';
            }, 300);
        }
    });
    
    // Add hover effects
    document.addEventListener('mouseover', (e) => {
        if (e.target.classList.contains('dot')) {
            e.target.style.transform = 'scale(1.2)';
        }
    });
    
    document.addEventListener('mouseout', (e) => {
        if (e.target.classList.contains('dot')) {
            e.target.style.transform = '';
        }
    });
    
    // Add keyboard controls
    document.addEventListener('keydown', (e) => {
        if (e.key === ' ') {
            e.preventDefault();
            document.body.classList.toggle('minimal-mode');
        } else if (e.key === 'r' || e.key === 'R') {
            // Reset animation
            location.reload();
        }
    });
    
    // Add fullscreen toggle
    document.addEventListener('dblclick', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    });
});

// Add visibility change handling to save resources
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Page hidden - timer continues in background');
    } else {
        console.log('Page visible - timer resumed');
    }
});