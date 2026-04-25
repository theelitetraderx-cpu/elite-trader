'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';
import { Copy, Check, Send, ArrowLeft, ShieldCheck, Zap, Globe, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '@/components/Footer';
import BorderGlow from '@/components/BorderGlow';

import { PLANS } from '@/lib/plans';
import PaymentNotificationForm from '@/components/PaymentNotificationForm';

function EnrolContent() {
  const searchParams = useSearchParams();
  const planNameQuery = searchParams.get('plan') || 'Pro Master';
  
  // Find the selected plan from our shared PLANS data
  const selectedPlan = PLANS.find(p => p.name.toLowerCase() === planNameQuery.toLowerCase()) || PLANS[1];
  const planPrice = searchParams.get('price') || selectedPlan.price;

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-gold-500 selection:text-black pt-24 pb-20 overflow-hidden relative">
      {/* Background Gradients */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05] 
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gold-600/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2"
      ></motion.div>
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.08, 0.05] 
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gold-600/5 rounded-full blur-[150px] pointer-events-none translate-y-1/2"
      ></motion.div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mb-12"
        >
          <motion.div variants={itemVariants}>
            <Link href="/#pricing" className="inline-flex items-center gap-2 text-gold-500/80 hover:text-gold-400 transition-colors mb-8 group">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium uppercase tracking-widest">Back to Pricing</span>
            </Link>
          </motion.div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Complete Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">Enrollment</span>
              </h1>
              <p className="text-slate-400 max-w-xl text-lg">
                Secure your lifetime access to the <span className="text-white font-medium">{selectedPlan.name}</span> path. Follow the instructions below to finalize your payment.
              </p>
            </motion.div>
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden group"
            >
              <BorderGlow
                borderRadius={20}
                backgroundColor="#0a0a0a"
                glowColor={selectedPlan.glowColor}
                colors={selectedPlan.colors}
                glowIntensity={1.2}
                fillOpacity={0}
                className="w-full"
              >
                <div className="p-6 backdrop-blur-md">
                  <div className="text-xs text-slate-500 uppercase tracking-[0.2em] mb-1 font-bold">Total Investment</div>
                  <div className="text-4xl font-bold text-gold-400">{planPrice}</div>
                </div>
              </BorderGlow>
            </motion.div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Program Highlights Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="group"
            >
              <BorderGlow
                borderRadius={32}
                backgroundColor="#0a0a0a"
                glowColor={selectedPlan.glowColor}
                colors={selectedPlan.colors}
                glowIntensity={0.8}
                fillOpacity={0}
              >
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center border border-gold-500/20 text-gold-500">
                      <Zap size={20} />
                    </div>
                    <h2 className="text-xl font-bold">Program Highlights: {selectedPlan.name}</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedPlan.features.map((feature, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + idx * 0.05 }}
                        className="flex items-start gap-3 text-sm text-slate-300"
                      >
                        <ShieldCheck className="text-gold-500/60 shrink-0 mt-0.5" size={16} />
                        <span>{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </BorderGlow>
            </motion.div>

            {/* Crypto Payment Section */}
            {/* Crypto Payment Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 relative overflow-hidden"
            >
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

              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {cryptoAddresses.map((crypto, idx) => (
                  <motion.div 
                    key={crypto.network}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <BorderGlow
                      borderRadius={24}
                      backgroundColor="#0a0a0a"
                      glowColor={selectedPlan.glowColor}
                      colors={selectedPlan.colors}
                      glowIntensity={0.6}
                      fillOpacity={0}
                    >
                      <div className="flex flex-col items-center p-6 transition-colors relative">
                        <div className="text-sm font-bold mb-4 tracking-wider" style={{ color: crypto.color }}>{crypto.network}</div>
                        
                        <motion.div 
                          whileHover={{ scale: 1.05 }}
                          className="bg-white p-2.5 rounded-xl mb-6 shadow-[0_0_20px_rgba(255,255,255,0.05)] cursor-pointer"
                        >
                          <QRCodeSVG 
                            value={crypto.address} 
                            size={140}
                            level="H"
                            includeMargin={false}
                          />
                        </motion.div>

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
                      </div>
                    </BorderGlow>
                  </motion.div>
                ))}
              </motion.div>

              <div className="mt-8 p-4 rounded-xl bg-gold-500/5 border border-gold-500/10 flex items-start gap-4">
                <ShieldCheck className="text-gold-400 shrink-0 mt-0.5" size={18} />
                <p className="text-xs text-slate-400 leading-relaxed">
                  <span className="text-gold-400 font-bold uppercase tracking-wider">Note:</span> Please ensure you select the correct network in your wallet before sending funds. Incorrect network transfers may result in permanent loss of funds. After payment, submit your details below.
                </p>
              </div>
            </motion.div>

            {/* Payment Notification Form */}
            <PaymentNotificationForm 
              planName={selectedPlan.name} 
              planPrice={planPrice} 
            />
          </div>

          {/* Sidebar Info/Alternative */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Elite Upsell Nudge - High Impact */}
            {selectedPlan.name !== "Elite" && (
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="relative bg-gradient-to-br from-gold-500 via-gold-600 to-gold-700 rounded-3xl p-8 text-black shadow-2xl shadow-gold-900/20 overflow-hidden"
              >
                {/* Animated highlights */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 pointer-events-none"
                  animate={{ x: ['-200%', '300%'] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-black/10 rounded-2xl">
                      <Star size={24} className="fill-black" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Master's Choice</span>
                  </div>

                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none mb-6 font-outfit">
                    The Elite <br /> Advantage
                  </h3>
                  
                  <p className="text-black/80 text-sm font-bold mb-8 leading-relaxed italic">
                    "Knowledge is common. Execution is rare. Build your execution edge with personal mentorship."
                  </p>

                  <div className="space-y-4 mb-8">
                     <div className="flex items-center gap-2 group">
                        <div className="w-1.5 h-1.5 bg-black rounded-full" />
                        <span className="text-[11px] font-black uppercase tracking-wider">1-on-1 Mentorship</span>
                     </div>
                     <div className="flex items-center gap-2 group">
                        <div className="w-1.5 h-1.5 bg-black rounded-full" />
                        <span className="text-[11px] font-black uppercase tracking-wider">Direct Execution Guidance</span>
                     </div>
                     <div className="flex items-center gap-2 group">
                        <div className="w-1.5 h-1.5 bg-black rounded-full" />
                        <span className="text-[11px] font-black uppercase tracking-wider">Account Scaling Strategy</span>
                     </div>
                  </div>

                  <Link
                    href="/enrol?plan=Elite&price=$499"
                    className="w-full py-4 rounded-2xl bg-black text-white font-black tracking-[0.2em] uppercase text-xs flex items-center justify-center gap-3 shadow-xl shadow-black/20"
                  >
                    Upgrade to Elite – $499
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            )}

            {/* If they are already Elite, show them a trust box */}
            {selectedPlan.name === "Elite" && (
              <div className="bg-gold-500/10 border border-gold-500/20 rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                   <div className="w-12 h-12 rounded-2xl bg-gold-500 flex items-center justify-center text-black">
                      <ShieldCheck size={24} />
                   </div>
                   <div>
                      <h3 className="text-xl font-bold uppercase tracking-tight">Institutional Enrollment</h3>
                      <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Verified Priority Pass</p>
                   </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">
                  You have selected the most complete professional path. As an Elite member, you get priority access to mentorship slots and direct performance reviews.
                </p>
                <div className="flex items-center gap-2 text-gold-500 text-[10px] font-black uppercase tracking-widest">
                   <div className="w-2 h-2 bg-gold-500 rounded-full animate-pulse" />
                   Priority Processing Active
                </div>
              </div>
            )}

            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8">
              <h4 className="text-sm font-bold uppercase tracking-widest text-gold-500 mb-6 flex items-center gap-2">
                <div className="w-1 h-1 bg-gold-500 rounded-full animate-pulse"></div> Step-by-Step
              </h4>
              <ul className="space-y-6 text-sm">
                {[
                  { step: '01', text: 'Select your preferred USDT network' },
                  { step: '02', text: 'Scan the QR code or copy the address' },
                  { step: '03', text: 'Complete the transfer from your wallet' },
                  { step: '04', text: 'Finalize by sending the receipt' }
                ].map((item, id) => (
                  <motion.li 
                    key={id} 
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + id * 0.1 }}
                    className="flex gap-4 group"
                  >
                    <span className="text-gold-500/40 font-black text-lg leading-none group-hover:text-gold-500/80 transition-colors uppercase">{item.step}</span>
                    <span className="text-slate-300 font-medium leading-relaxed group-hover:text-white transition-colors">{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function EnrolPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-gold-500">Initializing...</div>}>
      <EnrolContent />
      <Footer />
    </Suspense>
  );
}
