import React, { useState, useEffect } from 'react';

interface Subscription {
    id: string;
    name: string;
    cost: number;
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom';
    nextPayment: string;
    category: string;
    importance: 'low' | 'medium' | 'high' | 'critical';
    notes?: string;
    // Custom frequency settings
    customDays?: number; // For custom repeat intervals
    specificDayOfMonth?: number; // For monthly on specific day
    specificDayOfWeek?: number; // 0-6 for weekly on specific day
    startDate: string; // When the subscription began
}

const CATEGORIES = [
    'Streaming',
    'Software',
    'Gaming',
    'News',
    'Music',
    'Cloud Storage',
    'AI Tools',
    'Productivity',
    'Entertainment',
    'Education',
    'Other'
];

const IMPORTANCE_LEVELS = {
    low: { label: 'Low', color: 'text-txt-light dark:text-darkmode-txt-light' },
    medium: { label: 'Medium', color: 'text-txt-s dark:text-darkmode-txt-s' },
    high: { label: 'High', color: 'text-txt-p dark:text-darkmode-txt-p' },
    critical: { label: 'Critical', color: 'text-red-500 dark:text-red-400' }
};

export default function SubscriptionTracker() {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [formData, setFormData] = useState<Partial<Subscription>>({
        name: '',
        cost: 0,
        frequency: 'monthly',
        category: 'Other',
        importance: 'medium',
        notes: '',
        startDate: new Date().toISOString().split('T')[0]
    });
    const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

    // Load subscriptions from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('subscriptions');
        if (saved) {
            setSubscriptions(JSON.parse(saved));
        }
    }, []);

    // Save subscriptions to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
    }, [subscriptions]);

    const calculateNextPayment = (
        frequency: Subscription['frequency'],
        startDate: string,
        customDays?: number,
        specificDayOfMonth?: number,
        specificDayOfWeek?: number
    ) => {
        const baseDate = new Date();
        const start = new Date(startDate);

        switch (frequency) {
            case 'daily':
                baseDate.setDate(baseDate.getDate() + 1);
                break;
            case 'weekly':
                if (specificDayOfWeek !== undefined) {
                    // Find next occurrence of specific day
                    while (baseDate.getDay() !== specificDayOfWeek) {
                        baseDate.setDate(baseDate.getDate() + 1);
                    }
                } else {
                    baseDate.setDate(baseDate.getDate() + 7);
                }
                break;
            case 'monthly':
                if (specificDayOfMonth !== undefined) {
                    // Set to specific day of next month
                    baseDate.setMonth(baseDate.getMonth() + 1);
                    baseDate.setDate(specificDayOfMonth);
                    // If the day doesn't exist in the month, use the last day
                    if (baseDate.getDate() !== specificDayOfMonth) {
                        baseDate.setDate(0);
                    }
                } else {
                    baseDate.setMonth(baseDate.getMonth() + 1);
                }
                break;
            case 'yearly':
                baseDate.setFullYear(baseDate.getFullYear() + 1);
                baseDate.setMonth(start.getMonth());
                baseDate.setDate(start.getDate());
                break;
            case 'custom':
                if (customDays) {
                    baseDate.setDate(baseDate.getDate() + customDays);
                }
                break;
        }
        return baseDate.toISOString().split('T')[0];
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.cost || !formData.startDate) return;

        const newSubscription: Subscription = {
            id: Date.now().toString(),
            name: formData.name,
            cost: Number(formData.cost),
            frequency: formData.frequency as Subscription['frequency'],
            startDate: formData.startDate,
            nextPayment: calculateNextPayment(
                formData.frequency as Subscription['frequency'],
                formData.startDate,
                formData.customDays,
                formData.specificDayOfMonth,
                formData.specificDayOfWeek
            ),
            category: formData.category || 'Other',
            importance: formData.importance as 'low' | 'medium' | 'high' | 'critical',
            notes: formData.notes,
            customDays: formData.customDays,
            specificDayOfMonth: formData.specificDayOfMonth,
            specificDayOfWeek: formData.specificDayOfWeek
        };

        setSubscriptions(prev => [...prev, newSubscription]);
        setFormData({
            name: '',
            cost: 0,
            frequency: 'monthly',
            category: 'Other',
            importance: 'medium',
            notes: '',
            startDate: new Date().toISOString().split('T')[0]
        });
        setShowAddForm(false);
        setShowAdvancedOptions(false);
    };

    const deleteSubscription = (id: string) => {
        setSubscriptions(prev => prev.filter(sub => sub.id !== id));
    };

    const calculateMonthlyTotal = () => {
        return subscriptions.reduce((total, sub) => {
            switch (sub.frequency) {
                case 'weekly':
                    return total + (sub.cost * 52) / 12;
                case 'monthly':
                    return total + sub.cost;
                case 'yearly':
                    return total + sub.cost / 12;
                default:
                    return total;
            }
        }, 0);
    };

    const calculateYearlyTotal = () => {
        return subscriptions.reduce((total, sub) => {
            switch (sub.frequency) {
                case 'weekly':
                    return total + (sub.cost * 52);
                case 'monthly':
                    return total + (sub.cost * 12);
                case 'yearly':
                    return total + sub.cost;
                default:
                    return total;
            }
        }, 0);
    };

    const getDaysUntilNextPayment = (nextPayment: string) => {
        const today = new Date();
        const next = new Date(nextPayment);
        const diffTime = next.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const getPaymentScheduleText = (sub: Subscription) => {
        switch (sub.frequency) {
            case 'daily':
                return 'Every day';
            case 'weekly':
                if (sub.specificDayOfWeek !== undefined) {
                    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    return `Every ${days[sub.specificDayOfWeek]}`;
                }
                return 'Every week';
            case 'monthly':
                if (sub.specificDayOfMonth !== undefined) {
                    return `Monthly on day ${sub.specificDayOfMonth}`;
                }
                return 'Monthly';
            case 'yearly':
                return `Yearly on ${new Date(sub.startDate).toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}`;
            case 'custom':
                return `Every ${sub.customDays} days`;
            default:
                return 'Unknown schedule';
        }
    };

    return (
        <div className="container mx-auto p-6">
            <div className="glass rounded-lg p-6 mb-8 intersect:animate-fadeUp opacity-0">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold font-secondary text-txt-p dark:text-darkmode-txt-p">
                        Subscription Tracker
                    </h1>
                    <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="px-4 py-2 bg-bg-s dark:bg-darkmode-bg-s text-txt-p dark:text-darkmode-txt-p rounded-lg hover:bg-bg-t dark:hover:bg-darkmode-bg-t transition-colors"
                    >
                        {showAddForm ? 'Cancel' : '+ Add Subscription'}
                    </button>
                </div>

                {showAddForm && (
                    <form onSubmit={handleSubmit} className="glass rounded-lg p-6 mb-6 intersect:animate-scale opacity-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-txt-s dark:text-darkmode-txt-s mb-2">Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    className="w-full rounded-lg px-4 py-2 bg-bg-s/50 dark:bg-darkmode-bg-s/50 border border-border dark:border-darkmode-border text-txt-p dark:text-darkmode-txt-p focus:outline-none focus:ring-2 focus:ring-border dark:focus:ring-darkmode-border"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-txt-s dark:text-darkmode-txt-s mb-2">Cost</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={formData.cost}
                                    onChange={(e) => setFormData(prev => ({ ...prev, cost: parseFloat(e.target.value) }))}
                                    className="w-full rounded-lg px-4 py-2 bg-bg-s/50 dark:bg-darkmode-bg-s/50 border border-border dark:border-darkmode-border text-txt-p dark:text-darkmode-txt-p focus:outline-none focus:ring-2 focus:ring-border dark:focus:ring-darkmode-border"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-txt-s dark:text-darkmode-txt-s mb-2">Frequency</label>
                                <select
                                    value={formData.frequency}
                                    onChange={(e) => {
                                        setFormData(prev => ({ 
                                            ...prev, 
                                            frequency: e.target.value as Subscription['frequency'],
                                            // Reset specific settings when changing frequency
                                            specificDayOfMonth: undefined,
                                            specificDayOfWeek: undefined,
                                            customDays: undefined
                                        }));
                                        setShowAdvancedOptions(e.target.value !== 'yearly');
                                    }}
                                    className="w-full rounded-lg px-4 py-2 bg-bg-s/50 dark:bg-darkmode-bg-s/50 border border-border dark:border-darkmode-border text-txt-p dark:text-darkmode-txt-p focus:outline-none focus:ring-2 focus:ring-border dark:focus:ring-darkmode-border"
                                >
                                    <option value="daily">Daily</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                    <option value="yearly">Yearly</option>
                                    <option value="custom">Custom</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-txt-s dark:text-darkmode-txt-s mb-2">Category</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                                    className="w-full rounded-lg px-4 py-2 bg-bg-s/50 dark:bg-darkmode-bg-s/50 border border-border dark:border-darkmode-border text-txt-p dark:text-darkmode-txt-p focus:outline-none focus:ring-2 focus:ring-border dark:focus:ring-darkmode-border"
                                >
                                    {CATEGORIES.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-txt-s dark:text-darkmode-txt-s mb-2">Importance</label>
                                <select
                                    value={formData.importance}
                                    onChange={(e) => setFormData(prev => ({ ...prev, importance: e.target.value as Subscription['importance'] }))}
                                    className="w-full rounded-lg px-4 py-2 bg-bg-s/50 dark:bg-darkmode-bg-s/50 border border-border dark:border-darkmode-border text-txt-p dark:text-darkmode-txt-p focus:outline-none focus:ring-2 focus:ring-border dark:focus:ring-darkmode-border"
                                >
                                    {Object.entries(IMPORTANCE_LEVELS).map(([value, { label }]) => (
                                        <option key={value} value={value}>{label}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-txt-s dark:text-darkmode-txt-s mb-2">Start Date</label>
                                <input
                                    type="date"
                                    value={formData.startDate}
                                    onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                                    className="w-full rounded-lg px-4 py-2 bg-bg-s/50 dark:bg-darkmode-bg-s/50 border border-border dark:border-darkmode-border text-txt-p dark:text-darkmode-txt-p focus:outline-none focus:ring-2 focus:ring-border dark:focus:ring-darkmode-border"
                                    required
                                />
                            </div>
                        </div>

                        {showAdvancedOptions && (
                            <div className="mb-4 p-4 border border-border dark:border-darkmode-border rounded-lg">
                                <h3 className="text-lg font-semibold text-txt-p dark:text-darkmode-txt-p mb-4">Advanced Options</h3>
                                {formData.frequency === 'weekly' && (
                                    <div>
                                        <label className="block text-txt-s dark:text-darkmode-txt-s mb-2">Specific Day of Week</label>
                                        <select
                                            value={formData.specificDayOfWeek}
                                            onChange={(e) => setFormData(prev => ({ ...prev, specificDayOfWeek: parseInt(e.target.value) }))}
                                            className="w-full rounded-lg px-4 py-2 bg-bg-s/50 dark:bg-darkmode-bg-s/50 border border-border dark:border-darkmode-border text-txt-p dark:text-darkmode-txt-p focus:outline-none focus:ring-2 focus:ring-border dark:focus:ring-darkmode-border"
                                        >
                                            <option value="">Any day</option>
                                            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => (
                                                <option key={day} value={index}>{day}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                                {formData.frequency === 'monthly' && (
                                    <div>
                                        <label className="block text-txt-s dark:text-darkmode-txt-s mb-2">Specific Day of Month</label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="31"
                                            value={formData.specificDayOfMonth || ''}
                                            onChange={(e) => setFormData(prev => ({ ...prev, specificDayOfMonth: parseInt(e.target.value) }))}
                                            className="w-full rounded-lg px-4 py-2 bg-bg-s/50 dark:bg-darkmode-bg-s/50 border border-border dark:border-darkmode-border text-txt-p dark:text-darkmode-txt-p focus:outline-none focus:ring-2 focus:ring-border dark:focus:ring-darkmode-border"
                                            placeholder="Enter day (1-31)"
                                        />
                                    </div>
                                )}
                                {formData.frequency === 'custom' && (
                                    <div>
                                        <label className="block text-txt-s dark:text-darkmode-txt-s mb-2">Days Between Payments</label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={formData.customDays || ''}
                                            onChange={(e) => setFormData(prev => ({ ...prev, customDays: parseInt(e.target.value) }))}
                                            className="w-full rounded-lg px-4 py-2 bg-bg-s/50 dark:bg-darkmode-bg-s/50 border border-border dark:border-darkmode-border text-txt-p dark:text-darkmode-txt-p focus:outline-none focus:ring-2 focus:ring-border dark:focus:ring-darkmode-border"
                                            placeholder="Enter number of days"
                                            required={formData.frequency === 'custom'}
                                        />
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="mb-4">
                            <label className="block text-txt-s dark:text-darkmode-txt-s mb-2">Notes</label>
                            <textarea
                                value={formData.notes}
                                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                                className="w-full rounded-lg px-4 py-2 bg-bg-s/50 dark:bg-darkmode-bg-s/50 border border-border dark:border-darkmode-border text-txt-p dark:text-darkmode-txt-p focus:outline-none focus:ring-2 focus:ring-border dark:focus:ring-darkmode-border"
                                rows={3}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 bg-bg-s dark:bg-darkmode-bg-s text-txt-p dark:text-darkmode-txt-p rounded-lg hover:bg-bg-t dark:hover:bg-darkmode-bg-t transition-colors"
                        >
                            Add Subscription
                        </button>
                    </form>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="glass rounded-lg p-4 intersect:animate-fadeLeft opacity-0">
                        <h3 className="text-lg font-semibold text-txt-s dark:text-darkmode-txt-s mb-2">Monthly Total</h3>
                        <p className="text-2xl font-bold text-txt-p dark:text-darkmode-txt-p">
                            ${calculateMonthlyTotal().toFixed(2)}
                        </p>
                    </div>
                    <div className="glass rounded-lg p-4 intersect:animate-fadeRight opacity-0">
                        <h3 className="text-lg font-semibold text-txt-s dark:text-darkmode-txt-s mb-2">Yearly Total</h3>
                        <p className="text-2xl font-bold text-txt-p dark:text-darkmode-txt-p">
                            ${calculateYearlyTotal().toFixed(2)}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {subscriptions.map((sub, index) => {
                    const daysUntil = getDaysUntilNextPayment(sub.nextPayment);
                    const importanceStyle = IMPORTANCE_LEVELS[sub.importance].color;
                    
                    return (
                        <div 
                            key={sub.id} 
                            className="glass rounded-lg p-6 relative group intersect:animate-fadeUp opacity-0"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <button
                                onClick={() => deleteSubscription(sub.id)}
                                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-txt-light hover:text-txt-p dark:text-darkmode-txt-light dark:hover:text-darkmode-txt-p"
                            >
                                ✕
                            </button>
                            
                            <div className={`absolute top-4 left-4 h-2 w-2 rounded-full ${importanceStyle}`} />
                            
                            <h3 className="text-xl font-semibold font-secondary text-txt-p dark:text-darkmode-txt-p mb-2 pl-4">
                                {sub.name}
                            </h3>
                            
                            <div className="space-y-2 mb-4">
                                <p className="text-txt-s dark:text-darkmode-txt-s">
                                    Cost: <span className="text-txt-p dark:text-darkmode-txt-p font-bold">${sub.cost}</span>
                                </p>
                                <p className="text-txt-s dark:text-darkmode-txt-s">
                                    Schedule: {getPaymentScheduleText(sub)}
                                </p>
                                <p className="text-txt-s dark:text-darkmode-txt-s">
                                    Category: {sub.category}
                                </p>
                                <p className={`${daysUntil <= 7 ? 'text-red-500 dark:text-red-400' : 'text-txt-s dark:text-darkmode-txt-s'}`}>
                                    Next Payment: {new Date(sub.nextPayment).toLocaleDateString()} 
                                    {daysUntil <= 7 && ` (${daysUntil} days)`}
                                </p>
                                {sub.notes && (
                                    <p className="text-txt-light dark:text-darkmode-txt-light text-sm italic">
                                        {sub.notes}
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {subscriptions.length === 0 && (
                <div className="glass rounded-lg p-12 text-center intersect:animate-fadeUp opacity-0">
                    <p className="text-txt-s dark:text-darkmode-txt-s">
                        No subscriptions added yet. Add your first subscription to get started!
                    </p>
                </div>
            )}
        </div>
    );
} 