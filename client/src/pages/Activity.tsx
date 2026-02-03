import React from 'react';
import { motion } from 'framer-motion';
import { GitBranch, GitCommit, GitMerge, User } from 'lucide-react';

const Activity = () => {
    const activities = [
        { type: 'commit', user: 'Alex', action: 'pushed to', target: 'main', time: '2h ago', icon: GitCommit },
        { type: 'merge', user: 'Sarah', action: 'merged branch', target: 'feature/auth', time: '4h ago', icon: GitMerge },
        { type: 'create', user: 'You', action: 'created snippet', target: 'Auth Middleware', time: '1d ago', icon: GitBranch },
    ];

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Activity</h1>
                <p className="text-gray-500 mt-1">What's happening in your team.</p>
            </div>

            <div className="space-y-8 relative">
                 <div className="absolute left-6 top-8 bottom-0 w-px bg-border -z-10" />
                 {activities.map((activity, i) => (
                     <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i} 
                        className="flex gap-6"
                    >
                        <div className="w-12 h-12 rounded-full border-4 border-background bg-input flex items-center justify-center shrink-0">
                            <activity.icon className="h-5 w-5 text-gray-500" />
                        </div>
                        <div className="pt-2">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-sm">{activity.user}</span>
                                <span className="text-gray-500 text-sm">{activity.action}</span>
                                <span className="font-medium text-sm text-foreground">{activity.target}</span>
                            </div>
                            <span className="text-xs text-gray-400">{activity.time}</span>
                        </div>
                     </motion.div>
                 ))}
                 
                 <div className="p-4 bg-muted/30 rounded-lg text-center text-sm text-gray-500">
                     End of activity feed for the last 30 days.
                 </div>
            </div>
        </div>
    );
};

export default Activity;
