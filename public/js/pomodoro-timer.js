/**
 * Pomodoro Timer for Coding Practice
 * 
 * A timer that implements the Pomodoro Technique for effective coding practice:
 * - Focus sessions (default 25 minutes)
 * - Short breaks (default 5 minutes)
 * - Long breaks (default 15 minutes) after a set number of focus sessions
 * - Session tracking and statistics
 */

class PomodoroTimer {
    constructor() {
        // Timer states
        this.timerType = 'focus'; // 'focus', 'shortBreak', 'longBreak'
        this.isRunning = false;
        this.isPaused = false;
        this.startTime = 0;
        this.remaining = 0;
        this.timer = null;
        
        // Settings with defaults (in milliseconds)
        this.settings = {
            focusTime: 25 * 60 * 1000, // 25 minutes
            shortBreakTime: 5 * 60 * 1000, // 5 minutes
            longBreakTime: 15 * 60 * 1000, // 15 minutes
            longBreakAfter: 4, // Long break after 4 focus sessions
            autoStartBreaks: true,
            autoStartPomodoros: false,
            sound: true
        };
        
        // Statistics
        this.stats = {
            totalFocusTime: 0,
            sessionsCompleted: 0,
            currentStreak: 0,
            longestStreak: 0,
            todayFocusTime: 0,
            lastFocusDay: null,
            history: []
        };
        
        // Initialize
        this.loadSettings();
        this.loadStats();
        this.updateDisplay();
        this.initSounds();
        this.setupEventListeners();
    }
    
    // Initialize audio elements
    initSounds() {
        this.focusSound = new Audio('/assets/sounds/focus-start.mp3');
        this.breakSound = new Audio('/assets/sounds/break-start.mp3');
        this.completedSound = new Audio('/assets/sounds/session-completed.mp3');
        
        // Fallback to beep sounds if custom sounds fail to load
        this.focusSound.onerror = () => this.focusSound = this.createBeep(880, 0.5);
        this.breakSound.onerror = () => this.breakSound = this.createBeep(659.25, 0.5);
        this.completedSound.onerror = () => this.completedSound = this.createBeep(587.33, 1);
    }
    
    // Create a beep sound as fallback
    createBeep(frequency, duration) {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const beep = {
                play: () => {
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    
                    oscillator.frequency.value = frequency;
                    oscillator.type = 'sine';
                    
                    gainNode.gain.value = 0.5;
                    
                    oscillator.start();
                    
                    setTimeout(() => {
                        oscillator.stop();
                    }, duration * 1000);
                }
            };
            return beep;
        } catch (e) {
            console.error('Audio context not supported');
            return { play: () => console.log('Beep!') };
        }
    }
    
    // Set up event listeners for timer controls
    setupEventListeners() {
        // Handle start button click
        document.getElementById('pomodoro-start').addEventListener('click', () => {
            if (this.isRunning && !this.isPaused) {
                this.pauseTimer();
            } else if (this.isRunning && this.isPaused) {
                this.resumeTimer();
            } else {
                this.startTimer();
            }
        });
        
        // Handle reset button click
        document.getElementById('pomodoro-reset').addEventListener('click', () => {
            this.resetTimer();
        });
        
        // Handle skip button click
        document.getElementById('pomodoro-skip').addEventListener('click', () => {
            this.skipTimer();
        });
        
        // Handle timer type selection
        document.getElementById('timer-type-focus').addEventListener('click', () => {
            if (!this.isRunning) {
                this.setTimerType('focus');
            }
        });
        
        document.getElementById('timer-type-short-break').addEventListener('click', () => {
            if (!this.isRunning) {
                this.setTimerType('shortBreak');
            }
        });
        
        document.getElementById('timer-type-long-break').addEventListener('click', () => {
            if (!this.isRunning) {
                this.setTimerType('longBreak');
            }
        });
        
        // Handle settings form submission
        document.getElementById('pomodoro-settings-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveSettings();
        });
        
        // Handle settings button click
        document.getElementById('pomodoro-settings-button').addEventListener('click', () => {
            this.toggleSettingsPanel();
        });
        
        // Handle stats button click
        document.getElementById('pomodoro-stats-button').addEventListener('click', () => {
            this.toggleStatsPanel();
        });
    }
    
    // Start the timer
    startTimer() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.isPaused = false;
        
        // Set the duration based on timer type
        let duration;
        switch (this.timerType) {
            case 'focus':
                duration = this.settings.focusTime;
                if (this.settings.sound) this.focusSound.play();
                break;
            case 'shortBreak':
                duration = this.settings.shortBreakTime;
                if (this.settings.sound) this.breakSound.play();
                break;
            case 'longBreak':
                duration = this.settings.longBreakTime;
                if (this.settings.sound) this.breakSound.play();
                break;
        }
        
        this.startTime = Date.now();
        this.remaining = duration;
        
        // Update button text
        document.getElementById('pomodoro-start').innerHTML = 
            '<i class="fas fa-pause"></i><span>Pause</span>';
        
        // Add active class to timer
        document.getElementById('pomodoro-timer').classList.add('active');
        
        // Start the timer
        this.updateTimerDisplay();
        this.timer = setInterval(() => this.updateTimerDisplay(), 100);
        
        // Log start in history
        this.logHistoryEvent('start', this.timerType);
    }
    
    // Pause the timer
    pauseTimer() {
        if (!this.isRunning || this.isPaused) return;
        
        this.isPaused = true;
        this.remaining -= (Date.now() - this.startTime);
        clearInterval(this.timer);
        
        // Update button text
        document.getElementById('pomodoro-start').innerHTML = 
            '<i class="fas fa-play"></i><span>Resume</span>';
        
        // Add paused class to timer
        document.getElementById('pomodoro-timer').classList.add('paused');
        
        // Log pause in history
        this.logHistoryEvent('pause', this.timerType);
    }
    
    // Resume the timer
    resumeTimer() {
        if (!this.isRunning || !this.isPaused) return;
        
        this.isPaused = false;
        this.startTime = Date.now();
        
        // Update button text
        document.getElementById('pomodoro-start').innerHTML = 
            '<i class="fas fa-pause"></i><span>Pause</span>';
        
        // Remove paused class from timer
        document.getElementById('pomodoro-timer').classList.remove('paused');
        
        // Restart the timer
        this.timer = setInterval(() => this.updateTimerDisplay(), 100);
        
        // Log resume in history
        this.logHistoryEvent('resume', this.timerType);
    }
    
    // Reset the timer
    resetTimer() {
        clearInterval(this.timer);
        this.isRunning = false;
        this.isPaused = false;
        
        // Update button text
        document.getElementById('pomodoro-start').innerHTML = 
            '<i class="fas fa-play"></i><span>Start</span>';
        
        // Remove active and paused classes from timer
        document.getElementById('pomodoro-timer').classList.remove('active', 'paused');
        
        // Reset timer display
        this.updateDisplay();
        
        // Log reset in history
        this.logHistoryEvent('reset', this.timerType);
    }
    
    // Skip to the next timer phase
    skipTimer() {
        // Log skip in history
        this.logHistoryEvent('skip', this.timerType);
        
        // If focused session is being skipped, don't count it as completed
        if (this.timerType !== 'focus') {
            this.completeTimer(true);
        } else {
            // If we're skipping a focus session, just move to the next phase
            this.determineNextTimerType();
            this.resetTimer();
        }
    }
    
    // Set the timer type (focus, short break, long break)
    setTimerType(type) {
        this.timerType = type;
        
        // Update active button
        document.querySelectorAll('.timer-type-button').forEach(button => {
            button.classList.remove('active');
        });
        document.getElementById(`timer-type-${type.replace(/([A-Z])/g, '-$1').toLowerCase()}`).classList.add('active');
        
        // Update UI
        this.updateDisplay();
    }
    
    // Update the timer display during countdown
    updateTimerDisplay() {
        if (this.isPaused) return;
        
        const elapsed = Date.now() - this.startTime;
        const remaining = Math.max(0, this.remaining - elapsed);
        
        // Calculate minutes and seconds
        const minutes = Math.floor(remaining / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);
        
        // Format time display
        const timeDisplay = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('timer-display').textContent = timeDisplay;
        
        // Update progress bar
        let totalTime;
        switch (this.timerType) {
            case 'focus':
                totalTime = this.settings.focusTime;
                break;
            case 'shortBreak':
                totalTime = this.settings.shortBreakTime;
                break;
            case 'longBreak':
                totalTime = this.settings.longBreakTime;
                break;
        }
        
        const progress = 100 - (remaining / totalTime * 100);
        document.getElementById('timer-progress').style.width = `${progress}%`;
        
        // When the timer completes
        if (remaining === 0) {
            this.completeTimer();
        }
        
        // Update document title with time remaining
        document.title = `${timeDisplay} - ${this.timerType === 'focus' ? 'Focus' : 'Break'} - Pomodoro Timer`;
    }
    
    // Timer completion handler
    completeTimer(wasSkipped = false) {
        clearInterval(this.timer);
        
        // Play completion sound if not skipped
        if (!wasSkipped && this.settings.sound) {
            this.completedSound.play();
        }
        
        // Update stats if completing a focus session
        if (this.timerType === 'focus' && !wasSkipped) {
            this.updateStatsAfterFocusSession();
            
            // Show completion notification
            this.showNotification(
                'Focus Session Completed',
                'Great job! You completed a focus session.'
            );
        }
        
        // Determine next timer type
        this.determineNextTimerType();
        
        // Reset timer
        this.resetTimer();
        
        // Auto-start next timer if settings allow
        if (!wasSkipped) {
            if (
                (this.timerType !== 'focus' && this.settings.autoStartPomodoros) ||
                (this.timerType === 'focus' && this.settings.autoStartBreaks)
            ) {
                setTimeout(() => this.startTimer(), 1000);
            }
        }
        
        // Log completion in history
        this.logHistoryEvent('complete', this.timerType, wasSkipped);
    }
    
    // Determine the next timer type based on session count
    determineNextTimerType() {
        if (this.timerType === 'focus') {
            // After focus session, determine break type
            if (this.stats.currentStreak % this.settings.longBreakAfter === 0) {
                this.setTimerType('longBreak');
            } else {
                this.setTimerType('shortBreak');
            }
        } else {
            // After any break, go back to focus
            this.setTimerType('focus');
        }
    }
    
    // Update timer display based on settings
    updateDisplay() {
        let timeToDisplay;
        switch (this.timerType) {
            case 'focus':
                timeToDisplay = this.settings.focusTime;
                break;
            case 'shortBreak':
                timeToDisplay = this.settings.shortBreakTime;
                break;
            case 'longBreak':
                timeToDisplay = this.settings.longBreakTime;
                break;
        }
        
        // Calculate minutes and seconds
        const minutes = Math.floor(timeToDisplay / 60000);
        const seconds = Math.floor((timeToDisplay % 60000) / 1000);
        
        // Format time display
        const timeDisplay = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('timer-display').textContent = timeDisplay;
        
        // Reset progress bar
        document.getElementById('timer-progress').style.width = '0%';
        
        // Update timer appearance based on type
        const timerElement = document.getElementById('pomodoro-timer');
        timerElement.className = 'pomodoro-timer'; // Reset all classes
        timerElement.classList.add(this.timerType); // Add class for current timer type
        
        // Update timer label
        let label;
        switch (this.timerType) {
            case 'focus':
                label = 'Focus Time';
                break;
            case 'shortBreak':
                label = 'Short Break';
                break;
            case 'longBreak':
                label = 'Long Break';
                break;
        }
        document.getElementById('timer-label').textContent = label;
        
        // Update title
        document.title = `${timeDisplay} - ${label} - Pomodoro Timer`;
    }
    
    // Update stats after completing a focus session
    updateStatsAfterFocusSession() {
        // Update total focus time
        this.stats.totalFocusTime += this.settings.focusTime;
        
        // Increment sessions completed
        this.stats.sessionsCompleted++;
        
        // Update streak
        this.stats.currentStreak++;
        
        // Update longest streak if current streak is longer
        if (this.stats.currentStreak > this.stats.longestStreak) {
            this.stats.longestStreak = this.stats.currentStreak;
        }
        
        // Update today's focus time
        const today = new Date().toLocaleDateString();
        if (this.stats.lastFocusDay !== today) {
            this.stats.todayFocusTime = 0;
            this.stats.lastFocusDay = today;
        }
        this.stats.todayFocusTime += this.settings.focusTime;
        
        // Save stats
        this.saveStats();
        
        // Update stats display
        this.updateStatsDisplay();
    }
    
    // Log events in history
    logHistoryEvent(action, timerType, wasSkipped = false) {
        this.stats.history.push({
            action,
            timerType,
            timestamp: new Date().toISOString(),
            wasSkipped
        });
        
        // Limit history length to prevent excessive storage
        if (this.stats.history.length > 100) {
            this.stats.history = this.stats.history.slice(-100);
        }
        
        // Save stats
        this.saveStats();
    }
    
    // Update stats display
    updateStatsDisplay() {
        // Format time display for total focus time
        const totalHours = Math.floor(this.stats.totalFocusTime / 3600000);
        const totalMinutes = Math.floor((this.stats.totalFocusTime % 3600000) / 60000);
        
        document.getElementById('stats-total-focus-time').textContent = 
            `${totalHours}h ${totalMinutes}m`;
        
        // Format time display for today's focus time
        const todayHours = Math.floor(this.stats.todayFocusTime / 3600000);
        const todayMinutes = Math.floor((this.stats.todayFocusTime % 3600000) / 60000);
        
        document.getElementById('stats-today-focus-time').textContent = 
            `${todayHours}h ${todayMinutes}m`;
        
        // Update other stats
        document.getElementById('stats-sessions-completed').textContent = 
            this.stats.sessionsCompleted;
        
        document.getElementById('stats-current-streak').textContent = 
            this.stats.currentStreak;
        
        document.getElementById('stats-longest-streak').textContent = 
            this.stats.longestStreak;
    }
    
    // Toggle settings panel visibility
    toggleSettingsPanel() {
        const settingsPanel = document.getElementById('pomodoro-settings');
        settingsPanel.classList.toggle('visible');
        
        if (settingsPanel.classList.contains('visible')) {
            // Update form fields with current settings
            document.getElementById('setting-focus-time').value = 
                this.settings.focusTime / 60000;
            
            document.getElementById('setting-short-break').value = 
                this.settings.shortBreakTime / 60000;
            
            document.getElementById('setting-long-break').value = 
                this.settings.longBreakTime / 60000;
            
            document.getElementById('setting-long-break-after').value = 
                this.settings.longBreakAfter;
            
            document.getElementById('setting-auto-breaks').checked = 
                this.settings.autoStartBreaks;
            
            document.getElementById('setting-auto-pomodoros').checked = 
                this.settings.autoStartPomodoros;
            
            document.getElementById('setting-sound').checked = 
                this.settings.sound;
        }
    }
    
    // Toggle stats panel visibility
    toggleStatsPanel() {
        const statsPanel = document.getElementById('pomodoro-stats-panel');
        statsPanel.classList.toggle('visible');
        
        if (statsPanel.classList.contains('visible')) {
            this.updateStatsDisplay();
        }
    }
    
    // Save settings from form
    saveSettings() {
        this.settings.focusTime = 
            parseInt(document.getElementById('setting-focus-time').value) * 60000;
        
        this.settings.shortBreakTime = 
            parseInt(document.getElementById('setting-short-break').value) * 60000;
        
        this.settings.longBreakTime = 
            parseInt(document.getElementById('setting-long-break').value) * 60000;
        
        this.settings.longBreakAfter = 
            parseInt(document.getElementById('setting-long-break-after').value);
        
        this.settings.autoStartBreaks = 
            document.getElementById('setting-auto-breaks').checked;
        
        this.settings.autoStartPomodoros = 
            document.getElementById('setting-auto-pomodoros').checked;
        
        this.settings.sound = 
            document.getElementById('setting-sound').checked;
        
        // Save settings to localStorage
        localStorage.setItem('pomodoroSettings', JSON.stringify(this.settings));
        
        // Update timer display
        this.updateDisplay();
        
        // Hide settings panel
        document.getElementById('pomodoro-settings').classList.remove('visible');
    }
    
    // Load settings from localStorage
    loadSettings() {
        const savedSettings = localStorage.getItem('pomodoroSettings');
        if (savedSettings) {
            this.settings = { ...this.settings, ...JSON.parse(savedSettings) };
        }
    }
    
    // Load stats from localStorage
    loadStats() {
        const savedStats = localStorage.getItem('pomodoroStats');
        if (savedStats) {
            this.stats = { ...this.stats, ...JSON.parse(savedStats) };
            
            // Check if it's a new day and reset today's focus time if needed
            const today = new Date().toLocaleDateString();
            if (this.stats.lastFocusDay !== today) {
                this.stats.todayFocusTime = 0;
                this.stats.lastFocusDay = today;
                this.saveStats();
            }
        }
    }
    
    // Save stats to localStorage
    saveStats() {
        localStorage.setItem('pomodoroStats', JSON.stringify(this.stats));
    }
    
    // Show a notification
    showNotification(title, message) {
        // If the browser supports notifications
        if ('Notification' in window) {
            // Check if permission is granted
            if (Notification.permission === 'granted') {
                new Notification(title, { 
                    body: message,
                    icon: '/assets/favicon.png'
                });
            }
            // Otherwise, request permission and show notification if granted
            else if (Notification.permission !== 'denied') {
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                        new Notification(title, { 
                            body: message,
                            icon: '/assets/favicon.png'
                        });
                    }
                });
            }
        }
    }
}

// Initialize Pomodoro timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Request notification permission when the page loads
    if ('Notification' in window && Notification.permission !== 'denied') {
        Notification.requestPermission();
    }
    
    // Initialize the timer
    const pomodoroTimer = new PomodoroTimer();
});