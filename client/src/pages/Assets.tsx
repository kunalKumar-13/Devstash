import React from 'react';
import { motion } from 'framer-motion';
import { Plus, FolderIcon, FileIcon, ImageIcon } from 'lucide-react';

const Assets = () => {
    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                 <div>
                    <h1 className="text-3xl font-bold tracking-tight">Assets</h1>
                    <p className="text-gray-500 mt-1">Manage your images, configs, and static files.</p>
                </div>
                <button className="flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-lg font-medium hover:opacity-90">
                    <Plus className="h-4 w-4" />
                    <span>Upload</span>
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {['Images', 'Configs', 'Docs', 'Scripts'].map((folder) => (
                    <motion.div 
                        key={folder}
                        whileHover={{ scale: 1.02 }}
                        className="p-4 bg-card border border-border rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:shadow-md transition-all"
                    >
                        <FolderIcon className="h-10 w-10 text-yellow-500 fill-yellow-500/20" />
                        <span className="font-medium text-sm">{folder}</span>
                    </motion.div>
                ))}
            </div>

             <div className="bg-card border border-border rounded-xl p-6">
                 <h3 className="font-semibold text-lg mb-4">Recent Files</h3>
                 <div className="space-y-4">
                     {[1, 2, 3].map((i) => (
                         <div key={i} className="flex items-center justify-between p-3 hover:bg-input rounded-lg transition-colors group cursor-pointer">
                             <div className="flex items-center gap-3">
                                 <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                     <FileIcon className="h-5 w-5 text-blue-500" />
                                 </div>
                                 <div>
                                     <div className="text-sm font-medium">config.json</div>
                                     <div className="text-xs text-gray-500">2.5 KB • Edited 2 hours ago</div>
                                 </div>
                             </div>
                             <button className="opacity-0 group-hover:opacity-100 px-3 py-1 text-xs border border-border rounded-md hover:bg-background">Download</button>
                         </div>
                     ))}
                 </div>
             </div>
        </div>
    );
};

export default Assets;
