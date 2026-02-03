import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Analytics = () => {
    const languageData = [
        { name: 'JavaScript', value: 45, color: '#f7df1e' },
        { name: 'TypeScript', value: 30, color: '#3178c6' },
        { name: 'Python', value: 15, color: '#3776ab' },
        { name: 'HTML/CSS', value: 10, color: '#e34c26' },
    ];

    const activityData = [
        { day: 'Mon', snippets: 2 },
        { day: 'Tue', snippets: 5 },
        { day: 'Wed', snippets: 8 },
        { day: 'Thu', snippets: 3 },
        { day: 'Fri', snippets: 6 },
        { day: 'Sat', snippets: 1 },
        { day: 'Sun', snippets: 0 },
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
                <p className="text-gray-500 mt-1">Insights into your coding habits and productivity.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Language Breakdown */}
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                    <h3 className="font-semibold text-lg mb-6">Top Languages</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={languageData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {languageData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-4 mt-4">
                        {languageData.map((entry) => (
                            <div key={entry.name} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                                <span className="text-sm text-gray-500">{entry.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Activity Chart */}
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                    <h3 className="font-semibold text-lg mb-6">Snippet Creation Activity</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={activityData}>
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
                                <Tooltip cursor={{ fill: 'transparent' }} />
                                <Bar dataKey="snippets" fill="currentColor" radius={[4, 4, 0, 0]} className="text-foreground" barSize={30} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
