import React from 'react';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800"></div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold bg-gradient-to-br from-teal-300 via-teal-400 to-teal-500 bg-clip-text text-transparent mb-4">
            404
          </h1>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-teal-400 to-transparent"></div>
        </div>

        {/* Error Message */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed max-w-md mx-auto">
            Oops! The page you're looking for seems to have wandered off into the digital void.
          </p>
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <Link href="/">
            <button className="group flex items-center gap-2 px-6 py-3 rounded-lg border border-teal-500/30 bg-gradient-to-br from-teal-500/10 to-teal-600/10 text-teal-300 hover:border-teal-400/50 hover:from-teal-500/20 hover:to-teal-600/20 transition-all duration-300 font-medium">
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
