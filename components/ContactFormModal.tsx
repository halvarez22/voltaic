
import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactFormModal: React.FC<ContactFormModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [billFile, setBillFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setBillFile(e.target.files[0]);
    } else {
      setBillFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Configurar EmailJS (estos valores deben configurarse en .env.local)
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_voltaic';
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_voltaic';
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key';

      // Preparar los datos del email
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'No proporcionado',
        message: formData.message,
        to_email: 'contacto@ade-voltaic.mx',
        bill_attached: billFile ? `Sí - ${billFile.name}` : 'No',
        reply_to: formData.email
      };

      console.log('Enviando email con EmailJS...', templateParams);

      // Enviar email usando EmailJS
      const result = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      console.log('Email enviado exitosamente:', result);
      
      // Si hay archivo adjunto, enviarlo por separado (EmailJS no maneja archivos directamente)
      if (billFile) {
        // Crear un segundo email con el archivo adjunto
        const attachmentParams = {
          from_name: formData.name,
          from_email: formData.email,
          message: `Recibo de luz adjunto para: ${formData.name}\n\nMensaje original: ${formData.message}`,
          to_email: 'contacto@ade-voltaic.mx',
          file_name: billFile.name,
          file_type: billFile.type,
          reply_to: formData.email
        };

        await emailjs.send(
          serviceId,
          'template_attachment', // Template separado para archivos
          attachmentParams,
          publicKey
        );
      }

      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Cerrar modal después de 3 segundos
      setTimeout(() => {
        handleClose();
      }, 3000);

    } catch (error) {
      console.error('Error al enviar email:', error);
      
      // Fallback: enviar datos a un webhook o API personalizada
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            hasFile: !!billFile,
            fileName: billFile?.name
          })
        });

        if (response.ok) {
          console.log('Email enviado via API fallback');
          setIsSubmitting(false);
          setSubmitSuccess(true);
          setTimeout(() => handleClose(), 3000);
          return;
        }
      } catch (apiError) {
        console.error('Error en API fallback:', apiError);
      }

      // Si todo falla, mostrar mensaje de error pero mantener el formulario abierto
      alert('Hubo un error al enviar tu mensaje. Por favor, contacta directamente al 55 3259 5798 o envía un email a contacto@ade-voltaic.mx');
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    // Reset form state on close after transition
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', message: '' });
      setBillFile(null);
      setSubmitSuccess(false);
    }, 300);
    onClose();
  };
  
  const backdropClasses = `fixed inset-0 bg-neutral-950/70 backdrop-blur-sm z-50 flex items-center justify-center transition-opacity duration-300 p-4 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`;
  const modalClasses = `relative bg-neutral-800 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto transition-all duration-300 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`;

  return (
    <div 
      className={backdropClasses} 
      onClick={handleClose} 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="contact-modal-title"
    >
      <div className={modalClasses} onClick={e => e.stopPropagation()}>
        <button 
          onClick={handleClose} 
          className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors z-10"
          aria-label="Cerrar formulario de contacto"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="p-8">
          {submitSuccess ? (
             <div className="text-center py-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 id="contact-modal-title" className="text-2xl font-bold mt-4">¡Gracias!</h2>
                <p className="text-neutral-300 mt-2">Hemos recibido tu mensaje. Nos pondremos en contacto contigo pronto.</p>
             </div>
          ) : (
            <>
              <h2 id="contact-modal-title" className="text-2xl font-bold mb-1">Hablemos de tu Proyecto</h2>
              <p className="text-neutral-400 mb-6">Completa el formulario y un asesor se pondrá en contacto.</p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-1">Nombre Completo</label>
                  <input type="text" name="name" id="name" required value={formData.name} onChange={handleInputChange} className="w-full bg-neutral-700 border-neutral-600 rounded-md px-3 py-2 text-white focus:ring-brand-yellow focus:border-brand-yellow transition" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-1">Correo Electrónico</label>
                  <input type="email" name="email" id="email" required value={formData.email} onChange={handleInputChange} className="w-full bg-neutral-700 border-neutral-600 rounded-md px-3 py-2 text-white focus:ring-brand-yellow focus:border-brand-yellow transition" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-neutral-300 mb-1">Teléfono (Opcional)</label>
                  <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-neutral-700 border-neutral-600 rounded-md px-3 py-2 text-white focus:ring-brand-yellow focus:border-brand-yellow transition" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-1">Mensaje</label>
                  <textarea name="message" id="message" rows={4} required value={formData.message} onChange={handleInputChange} className="w-full bg-neutral-700 border-neutral-600 rounded-md px-3 py-2 text-white focus:ring-brand-yellow focus:border-brand-yellow transition"></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">Recibo de Luz (Opcional)</label>
                  <label
                      htmlFor="billFile-input"
                      className="w-full flex items-center justify-center bg-neutral-700 border-2 border-dashed border-neutral-600 rounded-md px-3 py-3 text-neutral-300 cursor-pointer hover:bg-neutral-600 hover:border-neutral-500 transition"
                  >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      <span>Adjuntar archivo (PDF, JPG, PNG)</span>
                  </label>
                  <input
                      type="file"
                      name="billFile"
                      id="billFile-input"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      className="hidden"
                  />
                  {billFile && (
                      <p className="text-sm text-neutral-400 mt-2">
                          Archivo seleccionado: <span className="font-medium text-neutral-200">{billFile.name}</span>
                      </p>
                  )}
                </div>

                <div>
                  <button type="submit" disabled={isSubmitting} className="w-full bg-brand-yellow text-neutral-950 font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-300 transition-all duration-300 disabled:bg-yellow-800 disabled:cursor-not-allowed">
                    {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactFormModal;
