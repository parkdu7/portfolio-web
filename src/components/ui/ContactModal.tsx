'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle, AlertCircle, Loader2, Mail } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useLang } from '@/contexts/LanguageContext';

type FormState = 'idle' | 'loading' | 'success' | 'error';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { t } = useLang();
  const [formState, setFormState] = useState<FormState>('idle');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setFormState('idle');
        setName('');
        setContact('');
        setMessage('');
        setErrorMsg('');
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    setErrorMsg('');

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          name,
          message: `연락처: ${contact}\n\n${message}`,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setFormState('success');
    } catch {
      setErrorMsg(t.contact.form.error);
      setFormState('error');
    }
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl bg-[var(--bg)] border border-[var(--card-border)] ' +
    'text-[var(--fg)] text-sm placeholder:text-[var(--fg-muted)] ' +
    'focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 ' +
    'transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop — no blur, GPU-friendly */}
          <motion.div
            key="contact-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 bg-black/55 z-40"
          />

          {/* Click-outside wrapper */}
          <div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            onClick={onClose}
          >
            {/* Modal — y+opacity only, no scale for smooth performance */}
            <motion.div
              key="contact-modal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
              className="glass-card rounded-2xl w-full max-w-md relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-xl text-[var(--fg-muted)]
                           hover:text-[var(--fg)] hover:bg-[var(--border)] transition-colors z-10"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              <div className="p-8">
                {/* Header */}
                <div className="mb-6">
                  <div className="w-11 h-11 rounded-xl bg-primary-500/15 flex items-center justify-center mb-4">
                    <Mail size={20} className="text-primary-500" />
                  </div>
                  <h2 className="text-xl font-bold mb-1">{t.contact.form.title}</h2>
                  <p className="text-sm text-[var(--fg-muted)]">{t.contact.form.subtitle}</p>
                </div>

                <AnimatePresence mode="wait">
                  {formState === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col items-center gap-4 py-8"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 22, delay: 0.05 }}
                        className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center"
                      >
                        <CheckCircle size={32} className="text-emerald-500" />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.12 }}
                        className="text-center"
                      >
                        <p className="font-semibold text-[var(--fg)] mb-1">
                          {t.contact.form.successTitle}
                        </p>
                        <p className="text-sm text-[var(--fg-muted)]">
                          {t.contact.form.successMsg}
                        </p>
                      </motion.div>
                      <motion.button
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ scale: 1.03, y: -1 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={onClose}
                        className="mt-2 px-6 py-2.5 rounded-xl bg-primary-500 text-white
                                   font-semibold text-sm hover:bg-primary-600 transition-colors"
                      >
                        {t.contact.form.close}
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-4"
                    >
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-semibold text-[var(--fg-muted)] uppercase tracking-wider mb-1.5">
                          {t.contact.form.name}
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          disabled={formState === 'loading'}
                          className={inputClass}
                        />
                      </div>

                      {/* Contact info */}
                      <div>
                        <label className="block text-xs font-semibold text-[var(--fg-muted)] uppercase tracking-wider mb-1.5">
                          {t.contact.form.contactInfo}
                        </label>
                        <input
                          type="text"
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                          required
                          disabled={formState === 'loading'}
                          placeholder={t.contact.form.contactPlaceholder}
                          className={inputClass}
                        />
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-xs font-semibold text-[var(--fg-muted)] uppercase tracking-wider mb-1.5">
                          {t.contact.form.message}
                        </label>
                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          required
                          rows={4}
                          disabled={formState === 'loading'}
                          className={inputClass + ' resize-none'}
                        />
                      </div>

                      <AnimatePresence>
                        {formState === 'error' && (
                          <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2 text-red-500 text-sm"
                          >
                            <AlertCircle size={15} />
                            <span>{errorMsg}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <motion.button
                        type="submit"
                        disabled={formState === 'loading'}
                        whileHover={formState !== 'loading' ? { scale: 1.02, y: -1 } : {}}
                        whileTap={formState !== 'loading' ? { scale: 0.97 } : {}}
                        className="flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl
                                   bg-primary-500 text-white font-semibold text-sm
                                   shadow-lg shadow-primary-500/25 hover:bg-primary-600
                                   transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {formState === 'loading' ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            {t.contact.form.sending}
                          </>
                        ) : (
                          <>
                            <Send size={16} />
                            {t.contact.form.send}
                          </>
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
