import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock } from 'lucide-react';
import { AnimatedClockFrame } from './components/AnimatedClockFrame';
import { Link } from 'react-router-dom';

export default function Timer() {
    const [isDark, setIsDark] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [appMode, setAppMode] = useState<'pomodoro' | 'timer' | 'clock'>('pomodoro');
    const [mode, setMode] = useState<'work' | 'break'>('work');
    const [workMinutes, setWorkMinutes] = useState(25);
    const [breakMinutes, setBreakMinutes] = useState(5);
    const [timerMinutes, setTimerMinutes] = useState(10);
    const [currentRound, setCurrentRound] = useState(1);
    const [timeLeft, setTimeLeft] = useState(workMinutes * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [showClock, setShowClock] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
    const intervalRef = useRef<number | null>(null);

    // Common timezones list
    const timezones = [
        'America/New_York',
        'America/Chicago',
        'America/Denver',
        'America/Los_Angeles',
        'America/Anchorage',
        'Pacific/Honolulu',
        'Europe/London',
        'Europe/Paris',
        'Europe/Berlin',
        'Europe/Moscow',
        'Asia/Dubai',
        'Asia/Kolkata',
        'Asia/Shanghai',
        'Asia/Tokyo',
        'Asia/Seoul',
        'Australia/Sydney',
        'Pacific/Auckland',
    ];

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    // Update live clock every second
    useEffect(() => {
        const clockInterval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(clockInterval);
    }, []);

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            intervalRef.current = window.setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        setIsRunning(false);
                        setIsCompleted(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning, timeLeft]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const formatClock = () => {
        try {
            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone: timezone,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
            });
            return formatter.format(currentTime);
        } catch (e) {
            return currentTime.toLocaleTimeString('en-US', { hour12: false });
        }
    };

    const handleSpaceBar = (e: KeyboardEvent) => {
        if (e.code === 'Space' && !showMenu && appMode !== 'clock') {
            e.preventDefault();
            if (timeLeft === 0) {
                handleReset();
            } else {
                setIsRunning(!isRunning);
            }
        } else if (e.code === 'KeyM') {
            e.preventDefault();
            setShowMenu(!showMenu);
        } else if (e.code === 'KeyR' && !showMenu && appMode !== 'clock') {
            e.preventDefault();
            handleReset();
        } else if (e.code === 'KeyD') {
            e.preventDefault();
            setIsDark(!isDark);
        } else if (e.code === 'KeyC') {
            e.preventDefault();
            setShowClock(!showClock);
        } else if (e.code === 'Escape') {
            e.preventDefault();
            if (showMenu) {
                setShowMenu(false);
            }
        } else if (e.code === 'Enter' && isCompleted && appMode === 'pomodoro') {
            e.preventDefault();
            handleNextRound();
        } else if (e.code === 'Digit1') {
            e.preventDefault();
            handleModeSwitch('pomodoro');
        } else if (e.code === 'Digit2') {
            e.preventDefault();
            handleModeSwitch('timer');
        } else if (e.code === 'Digit3') {
            e.preventDefault();
            handleModeSwitch('clock');
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleSpaceBar);
        return () => window.removeEventListener('keydown', handleSpaceBar);
    }, [isRunning, timeLeft, showMenu, isDark, showClock, isCompleted]);

    const handleReset = () => {
        setIsRunning(false);
        setIsCompleted(false);
        const minutes = mode === 'work' ? workMinutes : breakMinutes;
        setTimeLeft(minutes * 60);
    };

    const handleModeSwitch = (newMode: 'pomodoro' | 'timer' | 'clock') => {
        setAppMode(newMode);
        setIsRunning(false);
        setIsCompleted(false);

        if (newMode === 'pomodoro') {
            setMode('work');
            setTimeLeft(workMinutes * 60);
            setShowClock(false);
        } else if (newMode === 'timer') {
            setTimeLeft(timerMinutes * 60);
            setShowClock(false);
        } else if (newMode === 'clock') {
            setShowClock(true);
        }
    };

    const handleNextRound = () => {
        if (mode === 'work') {
            setMode('break');
            setTimeLeft(breakMinutes * 60);
        } else {
            setMode('work');
            setCurrentRound(currentRound + 1);
            setTimeLeft(workMinutes * 60);
        }
        setIsCompleted(false);
        setIsRunning(false);
    };

    const handleWorkMinutesChange = (value: string) => {
        const num = parseInt(value);
        if (!isNaN(num) && num >= 1 && num <= 1440) {
            setWorkMinutes(num);
            if (mode === 'work' && !isRunning) {
                setTimeLeft(num * 60);
            }
        }
    };

    const handleBreakMinutesChange = (value: string) => {
        const num = parseInt(value);
        if (!isNaN(num) && num >= 1 && num <= 1440) {
            setBreakMinutes(num);
            if (mode === 'break' && !isRunning && appMode === 'pomodoro') {
                setTimeLeft(num * 60);
            }
        }
    };

    const handleTimerMinutesChange = (value: string) => {
        const num = parseInt(value);
        if (!isNaN(num) && num >= 1 && num <= 1440) {
            setTimerMinutes(num);
            if (!isRunning && appMode === 'timer') {
                setTimeLeft(num * 60);
            }
        }
    };

    // Split time for animation
    const timeString = appMode === 'clock' ? formatClock() : formatTime(timeLeft);
    const [min1, min2, , sec1, sec2] = timeString.split('');

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-3 sm:p-6 md:p-8 relative transition-colors duration-200 rounded-[2px] overflow-x-hidden">
            {/* Back to Home Link */}
            <Link
                to="/"
                className="absolute top-2 xs:top-3 sm:top-4 left-2 xs:left-3 sm:left-4 z-30 text-xs opacity-60 hover:opacity-100 transition-opacity"
            >
                ← Home
            </Link>

            {/* Mode Menubar */}
            <div className="absolute top-2 xs:top-3 sm:top-6 md:top-8 left-1/2 -translate-x-1/2 z-30">
                <div className="flex items-center justify-center gap-3 xs:gap-4 sm:gap-6">
                    {[
                        { id: 'pomodoro', label: 'POMODORO', key: '1', shortLabel: 'POMO' },
                        { id: 'timer', label: 'TIMER', key: '2', shortLabel: 'TIMER' },
                        { id: 'clock', label: 'CLOCK', key: '3', shortLabel: 'CLOCK' }
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleModeSwitch(item.id as 'pomodoro' | 'timer' | 'clock')}
                            className={`tracking-wider text-[10px] xs:text-xs sm:text-sm transition-opacity whitespace-nowrap hover:opacity-60 ${appMode === item.id
                                    ? 'font-bold opacity-100'
                                    : 'opacity-40'
                                }`}
                            style={{ fontWeight: appMode === item.id ? 'bold' : 'normal' }}
                        >
                            <span className="hidden xs:inline">[{item.key}] {item.label}</span>
                            <span className="xs:hidden">{item.shortLabel}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Timer Display */}
            <div className="flex flex-col items-center justify-center space-y-3 xs:space-y-4 sm:space-y-6 md:space-y-8 mt-8 xs:mt-10 sm:mt-0">
                {/* Timer with animated digits and clock frame */}
                <div
                    className="cursor-pointer select-none relative"
                    onClick={() => {
                        if (appMode === 'clock') return;
                        if (timeLeft === 0) {
                            handleReset();
                        } else {
                            setIsRunning(!isRunning);
                        }
                    }}
                >
                    {/* Animated Clock Frame */}
                    <AnimatedClockFrame isRunning={isRunning} currentTime={currentTime} showClock={appMode === 'clock'} />

                    <div className="flex items-center justify-center tabular-nums relative z-10" style={{ fontFamily: 'monospace' }}>
                        <motion.span
                            key={`min1-${min1}`}
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-5xl xs:text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] leading-none tracking-tighter"
                        >
                            {min1}
                        </motion.span>
                        <motion.span
                            key={`min2-${min2}`}
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-5xl xs:text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] leading-none tracking-tighter"
                        >
                            {min2}
                        </motion.span>
                        <span className="text-5xl xs:text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] leading-none tracking-tighter">:</span>
                        <motion.span
                            key={`sec1-${sec1}`}
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="text-5xl xs:text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] leading-none tracking-tighter"
                        >
                            {sec1}
                        </motion.span>
                        <motion.span
                            key={`sec2-${sec2}`}
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="text-5xl xs:text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] leading-none tracking-tighter"
                        >
                            {sec2}
                        </motion.span>
                    </div>
                </div>

                {/* Mode and Status */}
                {appMode !== 'clock' && (
                    <motion.div
                        className="flex flex-col items-center space-y-1 xs:space-y-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="flex items-center gap-2 xs:gap-2 sm:gap-3 tracking-wider text-xs xs:text-sm sm:text-base">
                            {appMode === 'pomodoro' ? (
                                <>
                                    <span className="uppercase">
                                        POMODORO {mode === 'work' ? 'WORK' : 'BREAK'}
                                    </span>
                                    <span className="text-sm xs:text-base sm:text-lg">
                                        [{isCompleted ? 'x' : ' '}]
                                    </span>
                                </>
                            ) : (
                                <>
                                    <span className="uppercase">TIMER</span>
                                    <span className="text-sm xs:text-base sm:text-lg">
                                        [{isCompleted ? 'x' : ' '}]
                                    </span>
                                </>
                            )}
                        </div>
                        {appMode === 'pomodoro' && (
                            <div className="tracking-wider text-xs xs:text-sm sm:text-base">
                                ROUND {currentRound}
                            </div>
                        )}
                    </motion.div>
                )}

                {appMode === 'clock' && (
                    <motion.div
                        className="text-center space-y-0.5 xs:space-y-1 px-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="text-[10px] xs:text-xs sm:text-sm opacity-60 truncate max-w-[90vw]">
                            {timezone.replace(/_/g, ' ')}
                        </div>
                        <div className="text-[9px] xs:text-[10px] sm:text-xs opacity-40 max-w-[90vw]">
                            {currentTime.toLocaleDateString('en-US', {
                                timeZone: timezone,
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Menu Button */}
            <div className="absolute bottom-2 xs:bottom-3 sm:bottom-6 md:bottom-8 left-2 xs:left-3 sm:left-6 md:left-8">
                <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="tracking-wider hover:opacity-60 transition-opacity text-[10px] xs:text-xs sm:text-sm md:text-base"
                >
                    [m]enu +
                </button>
            </div>

            {/* Dark Mode Toggle */}
            <div className="absolute top-2 xs:top-3 sm:top-6 md:top-8 right-2 xs:right-3 sm:right-6 md:right-8">
                <button
                    onClick={() => setIsDark(!isDark)}
                    className="tracking-wider hover:opacity-60 transition-opacity text-[10px] xs:text-xs sm:text-sm md:text-base"
                >
                    [d] {isDark ? 'LIGHT' : 'DARK'}
                </button>
            </div>

            {/* Menu Panel */}
            <AnimatePresence>
                {showMenu && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-background z-50 overflow-y-auto"
                    >
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -50, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="p-3 xs:p-4 sm:p-6 md:p-8"
                        >
                            <div className="max-w-2xl mx-auto">
                                {/* Header */}
                                <div className="flex justify-between items-center mb-6 xs:mb-8 sm:mb-12">
                                    <h2 className="tracking-wider uppercase text-base xs:text-lg sm:text-xl">Settings</h2>
                                    <button
                                        onClick={() => setShowMenu(false)}
                                        className="tracking-wider hover:opacity-60 transition-opacity text-[10px] xs:text-xs sm:text-sm md:text-base"
                                    >
                                        [esc] close
                                    </button>
                                </div>

                                {/* Settings */}
                                <div className="space-y-4 xs:space-y-5 sm:space-y-6 md:space-y-8">
                                    {/* Timer Settings */}
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.1 }}
                                        className="space-y-3 xs:space-y-4"
                                    >
                                        <h3 className="tracking-wider uppercase mb-3 xs:mb-4 text-xs xs:text-sm sm:text-base">Timer Duration</h3>

                                        <div className="space-y-2 xs:space-y-3">
                                            <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 xs:gap-4">
                                                <label className="tracking-wider text-xs xs:text-sm sm:text-base">Work Time (minutes)</label>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    max="1440"
                                                    value={workMinutes}
                                                    onChange={(e) => handleWorkMinutesChange(e.target.value)}
                                                    className="w-full xs:w-20 sm:w-24 px-2 sm:px-3 py-1.5 xs:py-2 bg-transparent border border-foreground/20 focus:border-foreground/40 outline-none text-center tabular-nums text-xs xs:text-sm sm:text-base transition-colors rounded-full"
                                                />
                                            </div>

                                            <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 xs:gap-4">
                                                <label className="tracking-wider text-xs xs:text-sm sm:text-base">Break Time (minutes)</label>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    max="1440"
                                                    value={breakMinutes}
                                                    onChange={(e) => handleBreakMinutesChange(e.target.value)}
                                                    className="w-full xs:w-20 sm:w-24 px-2 sm:px-3 py-1.5 xs:py-2 bg-transparent border border-foreground/20 focus:border-foreground/40 outline-none text-center tabular-nums text-xs xs:text-sm sm:text-base transition-colors rounded-full"
                                                />
                                            </div>

                                            <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 xs:gap-4">
                                                <label className="tracking-wider text-xs xs:text-sm sm:text-base">Timer Duration (minutes)</label>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    max="1440"
                                                    value={timerMinutes}
                                                    onChange={(e) => handleTimerMinutesChange(e.target.value)}
                                                    className="w-full xs:w-20 sm:w-24 px-2 sm:px-3 py-1.5 xs:py-2 bg-transparent border border-foreground/20 focus:border-foreground/40 outline-none text-center tabular-nums text-xs:text-base transition-colors rounded-full"
                                                />
                                            </div>
                                        </div>

                                        <p className="text-[10px] xs:text-xs sm:text-sm opacity-60 mt-2">
                                            Maximum: 1440 minutes (24 hours)
                                        </p>
                                    </motion.div>

                                    {/* Quick Presets */}
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.15 }}
                                        className="space-y-3 xs:space-y-4"
                                    >
                                        <h3 className="tracking-wider uppercase mb-3 xs:mb-4 text-xs xs:text-sm sm:text-base">Quick Presets</h3>
                                        <div className="grid grid-cols-2 gap-1.5 xs:gap-2 sm:gap-3">
                                            {[
                                                { name: 'CLASSIC', shortName: 'CLASS', work: 25, break: 5 },
                                                { name: 'LONG', shortName: 'LONG', work: 50, break: 10 },
                                                { name: 'SHORT', shortName: 'SHORT', work: 15, break: 3 },
                                                { name: 'DEEP WORK', shortName: 'DEEP', work: 45, break: 15 }
                                            ].map((preset, index) => (
                                                <motion.button
                                                    key={preset.name}
                                                    initial={{ scale: 0.9, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    transition={{ delay: 0.2 + index * 0.05 }}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => {
                                                        setWorkMinutes(preset.work);
                                                        setBreakMinutes(preset.break);
                                                        if (!isRunning) {
                                                            setTimeLeft(mode === 'work' ? preset.work * 60 : preset.break * 60);
                                                        }
                                                    }}
                                                    className="px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-3 border border-foreground/20 hover:bg-foreground/5 transition-colors tracking-wider text-[10px] xs:text-xs sm:text-sm rounded-full"
                                                >
                                                    <span className="hidden xs:inline">{preset.name} ({preset.work}/{preset.break})</span>
                                                    <span className="xs:hidden">{preset.shortName}<br />({preset.work}/{preset.break})</span>
                                                </motion.button>
                                            ))}
                                        </div>
                                    </motion.div>

                                    {/* Clock Timezone */}
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="space-y-3 xs:space-y-4"
                                    >
                                        <h3 className="tracking-wider uppercase mb-3 xs:mb-4 text-xs xs:text-sm sm:text-base">Clock Settings</h3>
                                        <div className="space-y-2 xs:space-y-3">
                                            <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 xs:gap-4">
                                                <label className="tracking-wider text-xs xs:text-sm sm:text-base">Timezone</label>
                                                <select
                                                    value={timezone}
                                                    onChange={(e) => setTimezone(e.target.value)}
                                                    className="w-full xs:w-auto px-2 sm:px-3 py-1.5 xs:py-2 bg-transparent border border-foreground/20 focus:border-foreground/40 outline-none text-[10px] xs:text-xs sm:text-sm transition-colors xs:min-w-[200px] rounded-full"
                                                >
                                                    {timezones.map((tz) => (
                                                        <option key={tz} value={tz} className="bg-background">
                                                            {tz.replace(/_/g, ' ')}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Theme */}
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.25 }}
                                        className="space-y-3 xs:space-y-4"
                                    >
                                        <h3 className="tracking-wider uppercase mb-3 xs:mb-4 text-xs xs:text-sm sm:text-base">Appearance</h3>
                                        <div className="flex gap-1.5 xs:gap-2 sm:gap-3">
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => setIsDark(false)}
                                                className={`px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-3 border transition-colors tracking-wider flex-1 text-[10px] xs:text-xs sm:text-sm rounded-full ${!isDark
                                                        ? 'border-foreground bg-foreground text-background'
                                                        : 'border-foreground/20 hover:bg-foreground/5'
                                                    }`}
                                            >
                                                LIGHT
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => setIsDark(true)}
                                                className={`px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-3 border transition-colors tracking-wider flex-1 text-[10px] xs:text-xs sm:text-sm rounded-full ${isDark
                                                        ? 'border-foreground bg-foreground text-background'
                                                        : 'border-foreground/20 hover:bg-foreground/5'
                                                    }`}
                                            >
                                                DARK
                                            </motion.button>
                                        </div>
                                    </motion.div>

                                    {/* Controls */}
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="space-y-3 xs:space-y-4"
                                    >
                                        <h3 className="tracking-wider uppercase mb-3 xs:mb-4 text-xs xs:text-sm sm:text-base">Keyboard Shortcuts</h3>
                                        <div className="space-y-1 xs:space-y-2 text-[10px] xs:text-xs sm:text-sm opacity-60">
                                            <p>[1] - Pomodoro mode</p>
                                            <p>[2] - Timer mode</p>
                                            <p>[3] - Clock mode</p>
                                            <p>[SPACE] - Start / Pause</p>
                                            <p>[R] - Reset timer</p>
                                            <p>[M] - Open / Close menu</p>
                                            <p>[D] - Toggle dark mode</p>
                                            <p>[ESC] - Close menu</p>
                                            <p>[ENTER] - Next round (Pomodoro only)</p>
                                            <p>Click timer to start / pause</p>
                                        </div>
                                    </motion.div>

                                    {/* Actions */}
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.35 }}
                                        className="space-y-1.5 xs:space-y-2 sm:space-y-3 pt-3 xs:pt-4 border-t border-foreground/20"
                                    >
                                        <motion.button
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                            onClick={handleReset}
                                            className="w-full px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-3 border border-foreground/20 hover:bg-foreground/5 transition-colors tracking-wider text-[10px] xs:text-xs sm:text-sm rounded-full"
                                        >
                                            RESET TIMER
                                        </motion.button>
                                        {isCompleted && (
                                            <motion.button
                                                initial={{ scale: 0.9, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                whileHover={{ scale: 1.01 }}
                                                whileTap={{ scale: 0.99 }}
                                                onClick={handleNextRound}
                                                className="w-full px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-3 border border-foreground bg-foreground text-background hover:opacity-90 transition-opacity tracking-wider text-[10px] xs:text-xs sm:text-sm rounded-full"
                                            >
                                                NEXT {mode === 'work' ? 'BREAK' : 'ROUND'}
                                            </motion.button>
                                        )}
                                        <motion.button
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                            onClick={() => {
                                                setCurrentRound(1);
                                                setMode('work');
                                                setTimeLeft(workMinutes * 60);
                                                setIsRunning(false);
                                                setIsCompleted(false);
                                            }}
                                            className="w-full px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-3 border border-foreground/20 hover:bg-foreground/5 transition-colors tracking-wider text-[10px] xs:text-xs sm:text-sm rounded-full"
                                        >
                                            RESET ROUNDS
                                        </motion.button>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Completion Message */}
            <AnimatePresence>
                {isCompleted && !showMenu && appMode === 'pomodoro' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="absolute bottom-2 xs:bottom-3 sm:bottom-6 md:bottom-8 right-2 xs:right-3 sm:right-6 md:right-8 z-20"
                    >
                        <motion.button
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            onClick={handleNextRound}
                            className="tracking-wider hover:opacity-60 transition-opacity text-[10px] xs:text-xs sm:text-sm md:text-base"
                        >
                            [enter] next
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
