'use client';

import { motion } from 'motion/react';
import { Mail, Github, Linkedin, ArrowUpRight } from 'lucide-react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { useLang } from '@/contexts/LanguageContext';

const contactLinks = [
  {
    key: 'email' as const,
    href: 'mailto:hello@example.com',
    label: 'hello@example.com',
    icon: Mail,
    color: '#3b82f6',
  },
  {
    key: 'github' as const,
    href: 'https://github.com/example',
    label: 'github.com/example',
    icon: Github,
    color: '#6366f1',
  },
  {
    key: 'linkedin' as const,
    href: 'https://linkedin.com/in/example',
    label: 'linkedin.com/in/example',
    icon: Linkedin,
    color: '#0ea5e9',
  },
];

export function Contact() {
  const { t } = useLang();

  return (
    <SectionWrapper id="contact" title={t.sections.contact}>
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-3">{t.contact.title}</h3>
          <p className="text-[var(--fg-muted)] leading-relaxed">{t.contact.subtitle}</p>
        </div>

        {/* Contact links */}
        <div className="grid gap-4">
          {contactLinks.map((link, i) => {
            const Icon = link.icon;
            const labelKey = link.key as keyof typeof t.contact;
            return (
              <motion.a
                key={link.key}
                href={link.href}
                target={link.key !== 'email' ? '_blank' : undefined}
                rel={link.key !== 'email' ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ x: 6, scale: 1.01 }}
                className="glass-card rounded-2xl p-5 flex items-center gap-4 group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${link.color}20` }}
                >
                  <Icon size={22} style={{ color: link.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-[var(--fg-muted)] mb-0.5">
                    {typeof t.contact[labelKey] === 'string' ? t.contact[labelKey] as string : ''}
                  </div>
                  <div className="text-sm font-medium truncate">{link.label}</div>
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-[var(--fg-muted)] group-hover:text-primary-500 transition-colors shrink-0"
                />
              </motion.a>
            );
          })}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-xs text-[var(--fg-muted)] mt-12"
        >
          © 2025 홍길동. Built with Next.js & Tailwind CSS
        </motion.p>
      </div>
    </SectionWrapper>
  );
}
