import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Database, Slack, Trello, Server } from 'lucide-react';

const Settings = () => {
    const [integrations, setIntegrations] = useState([
        { name: 'GitHub', icon: Github, connected: true, description: 'Sync snippets and gists automatically.' },
        { name: 'MongoDB Atlas', icon: Database, connected: true, description: 'Database cluster connection status.' },
        { name: 'Slack', icon: Slack, connected: false, description: 'Get notifications in your team channel.' },
        { name: 'Trello', icon: Trello, connected: false, description: 'Create cards from todo snippets.' },
        { name: 'AWS', icon: Server, connected: false, description: 'Deploy serverless functions directly.' },
    ]);

    const toggle = (index: number) => {
        const newIntegrations = [...integrations];
        newIntegrations[index].connected = !newIntegrations[index].connected;
        setIntegrations(newIntegrations);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings & Integrations</h1>
                <p className="text-gray-500 mt-1">Manage your connected accounts and preferences.</p>
            </div>

            <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="p-6 border-b border-border">
                    <h2 className="font-semibold text-lg">Connected Apps</h2>
                    <p className="text-sm text-gray-500">Supercharge your workflow by connecting your favorite tools.</p>
                </div>
                <div className="divide-y divide-border">
                    {integrations.map((app, i) => (
                        <div key={app.name} className="p-6 flex items-center justify-between hover:bg-muted/20 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-lg bg-input flex items-center justify-center">
                                    <app.icon className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-medium">{app.name}</h3>
                                    <p className="text-sm text-gray-500">{app.description}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => toggle(i)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                    app.connected 
                                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                                        : 'bg-input text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                            >
                                {app.connected ? 'Connected' : 'Connect'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="font-semibold text-lg mb-4">Account Preferences</h2>
                <div className="space-y-4 max-w-md">
                     <div className="flex justify-between items-center">
                         <span className="text-sm font-medium">Email Notifications</span>
                         <input type="checkbox" className="toggle" defaultChecked />
                     </div>
                     <div className="flex justify-between items-center">
                         <span className="text-sm font-medium">Public Profile</span>
                         <input type="checkbox" className="toggle" />
                     </div>
                     <div className="flex justify-between items-center">
                         <span className="text-sm font-medium">Beta Features</span>
                         <input type="checkbox" className="toggle" defaultChecked />
                     </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
