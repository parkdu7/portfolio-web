'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import { ContactModal } from '@/components/ui/ContactModal';

interface ContactModalContextType {
  openContact: () => void;
}

const ContactModalContext = createContext<ContactModalContextType>({
  openContact: () => {},
});

export function useContactModal() {
  return useContext(ContactModalContext);
}

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ContactModalContext.Provider value={{ openContact: () => setIsOpen(true) }}>
      {children}
      <ContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </ContactModalContext.Provider>
  );
}
