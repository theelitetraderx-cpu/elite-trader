'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';
import { Copy, Check, Send, ArrowLeft, ShieldCheck, Zap, Globe } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function EnrolContent() {
  const searchParams = useSearchParams();
  const planName = searchParams.get('plan') || 'Pro Master';
  const planPrice = searchParams.get('price') || '$249';

  const [copied, setCopied] = useState(null);

  const cryptoAddresses = [
    {
      network: 'USDT (BEP-20)',
      address: '0xBE12Ed2f8A8650393D912b55e18A70c32189b148',
      type: 'Binance Smart Chain',
      color: '#F3BA2F'
    },
    {
      network: 'USDT (ERC-20)',
      address: '0xBE12Ed2f8A8650393D912b55e18A70c32189b148',
      type: 'Ethereum Network',
      color: '#627EEA'
    },
    {
      network: 'USDT (TRC-20)',
      address: 'T9zwe28th6ZPHNPJvuFwgUG2b5j6gw9eVs',
      type: 'Tron Network',
      color: '#FF0013'
    }
  ];

  const handleCopy = (address, network) => {
    navigator.clipboard.writeText(address);
    setCopied(network);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-gold-500 selection:text-black pt-24 pb-20 overflow-hidden relative">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gold-600/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gold-600/5 rounded-full blur-[150px] pointer-events-none translate-y-1/2"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Link href="/#pricing" className="inline-flex items-center gap-2 text-gold-500/80 hover:text-gold-400 transition-colors mb-8 group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium uppercase tracking-widest">Back to Pricing</span>
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Complete Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">Enrollment</span>
              </h1>
              <p className="text-slate-400 max-w-xl text-lg">
                Secure your lifetime access to the <span className="text-white font-medium">{planName}</span> path. Follow the instructions below to finalize your payment.
              </p>
            </div>
            <div className="bg-white/[0.03] border border-gold-500/20 rounded-2xl p-6 backdrop-blur-md">
              <div className="text-xs text-slate-500 uppercase tracking-[0.2em] mb-1 font-bold">Total Investment</div>
              <div className="text-4xl font-bold text-gold-400">{planPrice}</div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Crypto Payment Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                <Zap size={120} className="text-gold-500" />
              </div>
              
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center border border-gold-500/20">
                  <Globe className="text-gold-500" size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Cryptocurrency Payment</h2>
                  <p className="text-slate-500 text-sm">Send USDT to any of the verified addresses below</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cryptoAddresses.map((crypto, idx) => (
                  <motion.div 
                    key={crypto.network}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex flex-col items-center bg-black/40 border border-white/5 rounded-2xl p-6 hover:border-gold-500/30 transition-all group"
                  >
                    <div className="text-sm font-bold mb-4 tracking-wider" style={{ color: crypto.color }}>{crypto.network}</div>
                    
                    <div className="bg-white p-2.5 rounded-xl mb-6 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                      <QRCodeSVG 
                        value={crypto.address} 
                        size={140}
                        level="H"
                        includeMargin={false}
                      />
                    </div>

                    <div className="w-full space-y-3">
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest text-center">Network: {crypto.type}</div>
                      <button 
                        onClick={() => handleCopy(crypto.address, crypto.network)}
                        className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                          copied === crypto.network 
                          ? 'bg-green-500/10 text-green-400 border border-green-500/30' 
                          : 'bg-white/[0.05] text-slate-300 border border-white/10 hover:border-gold-500/40 hover:text-gold-400'
                        }`}
                      >
                        {copied === crypto.network ? <Check size={14} /> : <Copy size={14} />}
                        {copied === crypto.network ? 'Copied!' : 'Copy Address'}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-4 rounded-xl bg-gold-500/5 border border-gold-500/10 flex items-start gap-4">
                <ShieldCheck className="text-gold-400 shrink-0 mt-0.5" size={18} />
                <p className="text-xs text-slate-400 leading-relaxed">
                  <span className="text-gold-400 font-bold uppercase tracking-wider">Note:</span> Please ensure you select the correct network in your wallet before sending funds. Incorrect network transfers may result in permanent loss of funds. After payment, send a screenshot to support.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar Info/Alternative */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-gold-600 to-gold-700 rounded-3xl p-8 text-black"
            >
              <div className="w-12 h-12 rounded-2xl bg-black/10 flex items-center justify-center mb-6">
                <Send size={24} />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight mb-4">Inr & Other<br />Payment Methods</h3>
              <p className="text-black/70 text-sm font-medium mb-8 leading-relaxed">
                If you prefer to pay in INR (Unified Payments Interface) or other local methods, please contact our support directly on Telegram.
              </p>
              <a 
                href="https://t.me/Elitefuturetrades" 
                target="_blank"
                className="w-full py-4 rounded-2xl bg-black text-white font-bold tracking-widest uppercase text-sm flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-black/20"
              >
                <Send size={18} />
                Contact Support
              </a>
            </motion.div>

            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8">
              <h4 className="text-sm font-bold uppercase tracking-widest text-gold-500 mb-6 flex items-center gap-2">
                <div className="w-1 h-1 bg-gold-500 rounded-full"></div> Step-by-Step
              </h4>
              <ul className="space-y-6 text-sm">
                {[
                  { step: '01', text: 'Select your preferred USDT network' },
                  { step: '02', text: 'Scan the QR code or copy the address' },
                  { step: '03', text: 'Complete the transfer from your wallet' },
                  { step: '04', text: 'Finalize by sending the receipt to Telegram' }
                ].map((item, id) => (
                  <li key={id} className="flex gap-4">
                    <span className="text-gold-500/40 font-black text-lg leading-none">{item.step}</span>
                    <span className="text-slate-300 font-medium leading-relaxed">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EnrolPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-gold-500">Initializing...</div>}>
      <Navbar />
      <EnrolContent />
      <Footer />
    </Suspense>
  );
}
