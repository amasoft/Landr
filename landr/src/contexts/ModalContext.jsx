// contexts/ModalContext.js
import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalProps, setModalProps] = useState({});

  const openModal = (content, props = {}) => {
    setModalContent(content);
    setModalProps(props);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
    setModalProps({});
  };

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal, modalContent, modalProps }}>
      {children}
      <GlobalModal />
    </ModalContext.Provider>
  );
};

// Global Modal Component
const GlobalModal = () => {
  const { isOpen, closeModal, modalContent, modalProps } = useModal();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700/45">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm relative">
        {React.cloneElement(modalContent, { ...modalProps, closeModal })}
      </div>
    </div>
  );
};