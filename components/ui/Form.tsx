import React, { useState } from 'react';
import Button from './Button';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await new Promise((r) => setTimeout(r, 800));
      setStatus('sent');
      setTimeout(() => {
        setStatus('idle');
        setName(''); 
        setEmail(''); 
        setMessage('');
      }, 3000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
            Name
          </label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full rounded-xl border-2 border-slate-200 dark:border-slate-700 px-4 py-3 bg-white dark:bg-slate-800/50 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
            Email
          </label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="w-full rounded-xl border-2 border-slate-200 dark:border-slate-700 px-4 py-3 bg-white dark:bg-slate-800/50 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
          Message
        </label>
        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="How can I help you?"
          className="w-full rounded-xl border-2 border-slate-200 dark:border-slate-700 px-4 py-3 bg-white dark:bg-slate-800/50 min-h-[150px] focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
        />
      </div>

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={status === 'sending' || status === 'sent'}>
          {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Sent!' : 'Send Message'}
        </Button>
        
        <AnimatePresence mode="wait">
          {status === 'sent' && (
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400"
            >
              <CheckCircle2 className="w-5 h-5" />
              Message sent successfully!
            </motion.span>
          )}
          {status === 'error' && (
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex items-center gap-2 text-sm font-medium text-red-600 dark:text-red-400"
            >
              <XCircle className="w-5 h-5" />
              Error sending message
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
