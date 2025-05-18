import React, { useState, useEffect } from 'react';

interface Habit {
    id: string;
    name: string;
    streak: number;
    lastChecked: string | null;
    createdAt: string;
}

export default function HabitTracker() {
    const [habits, setHabits] = useState<Habit[]>([]);
    const [newHabitName, setNewHabitName] = useState('');

    // Load habits from localStorage on mount
    useEffect(() => {
        const savedHabits = localStorage.getItem('habits');
        if (savedHabits) {
            setHabits(JSON.parse(savedHabits));
        }
    }, []);

    // Save habits to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('habits', JSON.stringify(habits));
    }, [habits]);

    const addHabit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newHabitName.trim()) return;

        const newHabit: Habit = {
            id: Date.now().toString(),
            name: newHabitName.trim(),
            streak: 0,
            lastChecked: null,
            createdAt: new Date().toISOString()
        };

        setHabits(prev => [...prev, newHabit]);
        setNewHabitName('');
    };

    const deleteHabit = (id: string) => {
        setHabits(prev => prev.filter(habit => habit.id !== id));
    };

    const checkHabit = (habit: Habit) => {
        const today = new Date().toISOString().split('T')[0];
        const lastCheck = habit.lastChecked?.split('T')[0];

        let newStreak = habit.streak;
        if (lastCheck !== today) {
            if (lastCheck === new Date(Date.now() - 86400000).toISOString().split('T')[0]) {
                // If last check was yesterday, increment streak
                newStreak++;
            } else if (lastCheck !== null) {
                // If last check was before yesterday, reset streak
                newStreak = 1;
            } else {
                // First time checking
                newStreak = 1;
            }
        }

        setHabits(prev => prev.map(h => 
            h.id === habit.id 
                ? { ...h, streak: newStreak, lastChecked: today + 'T00:00:00.000Z' }
                : h
        ));
    };

    return (
        <div className="container mx-auto p-6">
            <div className="glass rounded-lg p-6 mb-8">
                <h1 className="text-3xl font-bold font-secondary text-txt-p dark:text-darkmode-txt-p mb-6">
                    Habit Tracker
                </h1>

                <form onSubmit={addHabit} className="mb-6">
                    <div className="flex gap-4">
                        <input
                            type="text"
                            value={newHabitName}
                            onChange={(e) => setNewHabitName(e.target.value)}
                            placeholder="Enter a new habit..."
                            className="flex-1 rounded-lg px-4 py-2 bg-transparent border border-border dark:border-darkmode-border text-txt-p dark:text-darkmode-txt-p placeholder-txt-s dark:placeholder-darkmode-txt-s focus:outline-none focus:ring-2 focus:ring-accent dark:focus:ring-darkmode-accent"
                        />
                        <button
                            type="submit"
                            className="px-6 py-2 bg-accent dark:bg-darkmode-accent text-white rounded-lg hover:bg-accent/80 dark:hover:bg-darkmode-accent/80 transition-colors"
                        >
                            Add Habit
                        </button>
                    </div>
                </form>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {habits.map(habit => (
                    <div key={habit.id} className="glass rounded-lg p-6 relative group">
                        <button
                            onClick={() => deleteHabit(habit.id)}
                            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700"
                        >
                            ✕
                        </button>
                        
                        <h3 className="text-xl font-semibold font-secondary text-txt-p dark:text-darkmode-txt-p mb-2">
                            {habit.name}
                        </h3>
                        
                        <div className="flex items-center gap-4 mb-4">
                            <div className="text-txt-s dark:text-darkmode-txt-s">
                                Streak: <span className="text-accent dark:text-darkmode-accent font-bold">{habit.streak}</span> days
                            </div>
                        </div>

                        <button
                            onClick={() => checkHabit(habit)}
                            disabled={habit.lastChecked?.split('T')[0] === new Date().toISOString().split('T')[0]}
                            className={`w-full py-2 rounded-lg transition-colors ${
                                habit.lastChecked?.split('T')[0] === new Date().toISOString().split('T')[0]
                                    ? 'bg-green-500/50 cursor-not-allowed'
                                    : 'bg-accent dark:bg-darkmode-accent hover:bg-accent/80 dark:hover:bg-darkmode-accent/80'
                            } text-white`}
                        >
                            {habit.lastChecked?.split('T')[0] === new Date().toISOString().split('T')[0]
                                ? 'Completed Today ✓'
                                : 'Mark Complete'}
                        </button>
                    </div>
                ))}
            </div>

            {habits.length === 0 && (
                <div className="glass rounded-lg p-12 text-center">
                    <p className="text-txt-s dark:text-darkmode-txt-s">
                        No habits added yet. Add your first habit to get started!
                    </p>
                </div>
            )}
        </div>
    );
} 