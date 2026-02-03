import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Tools: React.FC = () => {
    const [jsonInput, setJsonInput] = useState('');
    const [jsonOutput, setJsonOutput] = useState('');
    const [error, setError] = useState('');

    const formatJSON = () => {
        try {
            const parsed = JSON.parse(jsonInput);
            setJsonOutput(JSON.stringify(parsed, null, 2));
            setError('');
        } catch (e) {
            setError('Invalid JSON');
            setJsonOutput('');
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold mb-8">Developer Tools</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* JSON Formatter */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card border border-border rounded-xl p-6 shadow-sm"
                >
                    <h2 className="text-xl font-semibold mb-4">JSON Formatter</h2>
                    <div className="space-y-4">
                        <div>
                            <textarea
                                className="w-full h-40 bg-input p-4 rounded-md font-mono text-sm focus:outline-none focus:ring-1 focus:ring-foreground resize-none"
                                placeholder="Paste messy JSON here..."
                                value={jsonInput}
                                onChange={(e) => setJsonInput(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={formatJSON}
                            className="bg-foreground text-background px-4 py-2 rounded-md font-medium text-sm hover:opacity-90 transition-opacity"
                        >
                            Format
                        </button>
                        {error && <div className="text-red-500 text-sm">{error}</div>}
                        {jsonOutput && (
                             <div className="relative">
                                <textarea
                                    readOnly
                                    className="w-full h-60 bg-input p-4 rounded-md font-mono text-sm focus:outline-none resize-none"
                                    value={jsonOutput}
                                />
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Placeholder for more tools */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col items-center justify-center text-center opacity-50"
                >
                    <h2 className="text-xl font-semibold mb-2">More Tools Coming Soon</h2>
                    <p className="text-sm">JWT Decoder, Regex Tester, and more.</p>
                </motion.div>
            </div>
        </div>
    );
};

export default Tools;
