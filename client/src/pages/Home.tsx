import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Shield, Zap, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-100 via-transparent to-transparent opacity-40 dark:from-gray-800 pointer-events-none" />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium text-gray-800 bg-gray-100 dark:text-gray-200 dark:bg-gray-800 mb-8 border border-gray-200 dark:border-gray-700">
                                <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                                v2.0 Now Available
                            </span>
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 dark:from-white dark:via-gray-300 dark:to-gray-500 pb-2">
                                Your Code. Organized. <br />
                                Available Everywhere.
                            </h1>
                            <p className="mt-6 text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
                                DevStash is the all-in-one workspace for developers to manage snippets,
                                share code, and access essential tools. Built for scale, designed for speed.
                            </p>
                            <div className="flex justify-center gap-4">
                                <Link
                                    to="/signup"
                                    className="px-8 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold hover:opacity-90 transition-all flex items-center gap-2"
                                >
                                    Get Started Free <ArrowRight className="h-4 w-4" />
                                </Link>
                                <Link
                                    to="/dashboard"
                                    className="px-8 py-3 rounded-full border border-gray-200 dark:border-gray-800 font-semibold hover:bg-gray-50 dark:hover:bg-gray-900 transition-all"
                                >
                                    Live Demo
                                </Link>
                            </div>
                        </motion.div>

                        {/* Hero Image / Preview */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="mt-20 relative rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden bg-white dark:bg-gray-900"
                        >
                           <div className="absolute top-0 left-0 right-0 h-10 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-4 gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                           </div>
                           <div className="pt-10 p-4 font-mono text-left text-sm md:text-base overflow-x-auto text-gray-800 dark:text-gray-300 opacity-80">
<pre>{`// DevStash v2.0 - Optimized for productivity

interface Developer {
  focus: "Flow State";
  tools: "DevStash";
  productivity: "10x";
}

const shipFaster = async (idea: Idea): Promise<Product> => {
  const stash = await DevStash.connect();
  return stash.deploy(idea);
};`}</pre>
                           </div>
                        </motion.div>
                    </div>
                </section>

                {/* Benton Grid Features */}
                <section className="py-24 bg-gray-50 dark:bg-black/20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold tracking-tight mb-4">Everything you need to ship faster</h2>
                            <p className="text-gray-500">Powerful features bundled in a beautiful interface.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                             {/* Card 1 */}
                            <div className="row-span-2 col-span-1 md:col-span-2 bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-shadow relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                                    <Code2 className="w-64 h-64" />
                                </div>
                                <div className="relative z-10">
                                    <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                                        <Code2 className="text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">Snippet Management</h3>
                                    <p className="text-gray-500 mb-6">Store your code snippets with syntax highlighting support for over 100+ languages. Tag, categorize, and search instantly.</p>
                                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                        <li className="flex items-center gap-2">✓ Monaco Editor Integration</li>
                                        <li className="flex items-center gap-2">✓ Smart Tagging System</li>
                                        <li className="flex items-center gap-2">✓ One-click Copy</li>
                                    </ul>
                                </div>
                            </div>
                            
                            {/* Card 2 */}
                             <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-shadow">
                                <div className="bg-purple-100 dark:bg-purple-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                                    <Zap className="text-purple-600 dark:text-purple-400" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Instant Search</h3>
                                <p className="text-gray-500">Find any piece of code in milliseconds with our fuzzy search engine.</p>
                            </div>

                            {/* Card 3 */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-shadow">
                                <div className="bg-green-100 dark:bg-green-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                                    <Shield className="text-green-600 dark:text-green-400" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Secure & Private</h3>
                                <p className="text-gray-500">Your snippets are encrypted and stored safely. Only you have access.</p>
                            </div>

                             {/* Card 4 - Upcoming */}
                             <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-shadow md:col-span-3">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                                    <div>
                                         <div className="bg-orange-100 dark:bg-orange-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                                            <Globe className="text-orange-600 dark:text-orange-400" />
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">Developer Tools</h3>
                                        <p className="text-gray-500">Access essential utilities without leaving your workspace. JSON Formatter, JWT Decoder, and more.</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <Link to="/tools" className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-mono hover:bg-gray-200 dark:hover:bg-gray-700 transition">Try Tools</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Footer */}
                <footer className="border-t border-gray-200 dark:border-gray-800 py-12 px-4">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-2">
                             <Code2 className="h-6 w-6" />
                             <span className="font-bold text-lg">DevStash</span>
                        </div>
                        <div className="text-sm text-gray-500">
                            © 2026 DevStash Inc. All rights reserved.
                        </div>
                         <div className="flex gap-6">
                            <a href="#" className="text-gray-500 hover:text-black dark:hover:text-white transition">Twitter</a>
                            <a href="#" className="text-gray-500 hover:text-black dark:hover:text-white transition">GitHub</a>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default Home;
