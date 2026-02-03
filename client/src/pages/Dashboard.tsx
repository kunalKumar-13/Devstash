import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus, Clock, Search, Code, Folder, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface Snippet {
  _id: string;
  title: string;
  code: string;
  language: string;
  tags: string[];
  createdAt: string;
}

const Dashboard: React.FC = () => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchSnippets();
  }, []);

  const fetchSnippets = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/snippets');
      setSnippets(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const chartData = [
    { name: 'Mon', value: 4 },
    { name: 'Tue', value: 3 },
    { name: 'Wed', value: 7 },
    { name: 'Thu', value: 2 },
    { name: 'Fri', value: 5 },
    { name: 'Sat', value: 8 },
    { name: 'Sun', value: 6 },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome & Action */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
           <p className="text-gray-500 mt-1">Welcome back to your workspace. Here's what's happening.</p>
        </div>
        <Link
            to="/create"
            className="flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-lg font-medium hover:opacity-90 shadow-sm"
          >
            <Plus className="h-4 w-4" />
            <span>New Snippet</span>
          </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Chart Card */}
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="col-span-1 md:col-span-2 bg-card border border-border rounded-xl p-6 shadow-sm"
        >
            <div className="flex justify-between items-center mb-6">
                 <h3 className="font-semibold text-lg">Productivity Trend</h3>
                 <select className="bg-input border-none text-xs rounded-md px-2 py-1">
                     <option>This Week</option>
                     <option>Last Week</option>
                 </select>
            </div>
            <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="currentColor" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="currentColor" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#888'}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#888'}} />
                        <Tooltip 
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="value" 
                            stroke="currentColor" 
                            className="text-foreground"
                            strokeWidth={2}
                            fillOpacity={1} 
                            fill="url(#colorValue)" 
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
        >
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Total Snippets</span>
                    <Code className="h-4 w-4 text-gray-400" />
                </div>
                <div className="text-3xl font-bold">{snippets.length}</div>
                <div className="text-xs text-green-500 flex items-center mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    <span>+12% from last month</span>
                </div>
            </div>

             <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Active Projects</span>
                    <Folder className="h-4 w-4 text-gray-400" />
                </div>
                <div className="text-3xl font-bold">3</div>
                 <div className="text-xs text-gray-400 mt-1">
                    <span>Last active 2 hours ago</span>
                </div>
            </div>
        </motion.div>
      </div>

      {/* Recent Snippets Table */}
      <motion.div
         initial={{ opacity: 0, y: 10 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.2 }}
         className="bg-card border border-border rounded-xl overflow-hidden shadow-sm"
      >
          <div className="p-6 border-b border-border flex justify-between items-center">
              <h3 className="font-semibold text-lg">Recent Snippets</h3>
              <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-9 pr-4 py-1.5 bg-input border-none rounded-md text-sm focus:ring-1 focus:ring-foreground"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
              </div>
          </div>
          <div className="overflow-x-auto">
              <table className="w-full">
                  <thead className="bg-muted/50 text-xs text-gray-500 uppercase">
                      <tr>
                          <th className="text-left px-6 py-3 font-medium">Title</th>
                          <th className="text-left px-6 py-3 font-medium">Language</th>
                          <th className="text-left px-6 py-3 font-medium">Tags</th>
                          <th className="text-left px-6 py-3 font-medium">Created</th>
                          <th className="text-right px-6 py-3 font-medium">Actions</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                      {snippets.filter(s => s.title.toLowerCase().includes(searchTerm.toLowerCase())).map((snippet) => (
                          <tr key={snippet._id} className="group hover:bg-muted/30 transition-colors">
                              <td className="px-6 py-4">
                                  <div className="flex items-center gap-3">
                                      <div className="p-2 rounded bg-blue-100 dark:bg-blue-900/20 text-blue-600">
                                          <Code className="h-4 w-4" />
                                      </div>
                                      <span className="font-medium text-sm">{snippet.title}</span>
                                  </div>
                              </td>
                               <td className="px-6 py-4">
                                  <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-xs font-medium font-mono">
                                      {snippet.language}
                                  </span>
                              </td>
                               <td className="px-6 py-4">
                                   <div className="flex gap-1">
                                       {snippet.tags.slice(0, 2).map((tag, i) => (
                                           <span key={i} className="text-xs text-gray-500">#{tag}</span>
                                       ))}
                                   </div>
                              </td>
                              <td className="px-6 py-4">
                                  <div className="flex items-center text-gray-500 text-xs">
                                      <Clock className="h-3 w-3 mr-1" />
                                      {new Date(snippet.createdAt).toLocaleDateString()}
                                  </div>
                              </td>
                              <td className="px-6 py-4 text-right">
                                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <Link to={`/edit/${snippet._id}`} className="p-2 hover:bg-input rounded-md">
                                          <ArrowUpRight className="h-4 w-4 text-gray-500" />
                                      </Link>
                                  </div>
                              </td>
                          </tr>
                      ))}
                      {snippets.length === 0 && (
                          <tr>
                              <td colSpan={5} className="text-center py-8 text-gray-500">No snippets found</td>
                          </tr>
                      )}
                  </tbody>
              </table>
          </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
