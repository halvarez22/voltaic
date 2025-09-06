import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! Soy el asistente virtual de Voltaic. ¿En qué puedo ayudarte con tu proyecto de energía solar?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const getFallbackResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('ahorro') || message.includes('ahorrar')) {
      return 'Con energía solar puedes ahorrar entre 70-90% en tu factura eléctrica. El ahorro depende del tamaño del sistema y tu consumo actual. En Voltaic realizamos un estudio personalizado para calcular tu ahorro exacto.';
    }
    
    if (message.includes('instalación') || message.includes('instalar')) {
      return 'Nuestro proceso de instalación incluye: diseño del sistema, permisos, instalación de paneles, inversores y conexión a la red. El tiempo promedio es de 3-7 días dependiendo del tamaño del proyecto.';
    }
    
    if (message.includes('financiamiento') || message.includes('financiar') || message.includes('costo')) {
      return 'Ofrecemos múltiples opciones: PPA (Power Purchase Agreement), arrendamiento, préstamos bancarios y pago de contado. El costo varía según el tamaño del sistema, pero típicamente se recupera en 3-5 años.';
    }
    
    if (message.includes('tiempo') || message.includes('duración')) {
      return 'La instalación completa toma entre 3-7 días laborales. El proceso total desde la consulta inicial hasta la puesta en marcha puede ser de 2-4 semanas, incluyendo permisos y trámites.';
    }
    
    if (message.includes('mantenimiento')) {
      return 'Los sistemas solares requieren mínimo mantenimiento. Recomendamos limpieza de paneles cada 3-6 meses y revisión técnica anual. Ofrecemos servicios de O&M para mantener el máximo rendimiento.';
    }
    
    if (message.includes('viabilidad') || message.includes('factible')) {
      return 'Evaluamos la viabilidad considerando: orientación del techo, sombras, consumo eléctrico, espacio disponible y regulaciones locales. Ofrecemos consultoría gratuita para determinar si tu propiedad es apta.';
    }
    
    return 'Gracias por tu consulta. Para información detallada sobre energía solar, te recomiendo contactar directamente con nuestro equipo de expertos al 55 3259 5798 o escribir a contacto@ade-voltaic.mx';
  };

  const fetchGroqResponse = async (userMessage: string): Promise<string> => {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    
    console.log('Groq API Key configurada:', apiKey ? 'Sí' : 'No');
    
    if (!apiKey) {
      throw new Error('Groq API key no configurada');
    }

    const prompt = `Eres un asistente virtual especializado en energía solar fotovoltaica para la empresa Voltaic. 
    
    Información sobre Voltaic:
    - Empresa especializada en soluciones de energía solar
    - Servicios: Desarrollo de proyectos, EPC Solar, Instalación, Financiamiento, Mantenimiento, Consultoría
    - Ubicación: León, Guanajuato, México
    - Contacto: contacto@ade-voltaic.mx, 55 3259 5798
    - Proyectos destacados: KIA Motors (2.3 MWp), Gobierno de El Salvador (3.0 MWp), Club Necaxa (600 KWp)
    
    Responde de manera profesional, amigable y técnica sobre:
    - Beneficios de la energía solar
    - Procesos de instalación
    - Opciones de financiamiento
    - Mantenimiento de sistemas
    - Viabilidad de proyectos
    - Ahorros energéticos
    
    Si la pregunta no está relacionada con energía solar, redirige cortésmente al tema.
    
    Usuario pregunta: ${userMessage}
    
    Responde en español de manera concisa (máximo 200 palabras):`;

    try {
      console.log('Enviando solicitud a Groq API...');
      
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [
            {
              role: 'system',
              content: 'Eres un asistente virtual especializado en energía solar fotovoltaica para la empresa Voltaic. Responde de manera profesional, amigable y técnica sobre energía solar.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 300,
          temperature: 0.7,
          stream: false
        })
      });

      console.log('Respuesta de Groq API:', response.status, response.statusText);

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Error de Groq API:', errorData);
        throw new Error(`Error de Groq API: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Datos recibidos de Groq:', data);
      
      const responseText = data.choices?.[0]?.message?.content;
      
      if (!responseText) {
        console.error('No se recibió texto en la respuesta de Groq:', data);
        throw new Error('Respuesta vacía de Groq API');
      }
      
      return responseText;
    } catch (error) {
      console.error('Error en fetchGroqResponse:', error);
      throw error;
    }
  };

  const fetchGeminiResponse = async (userMessage: string): Promise<string> => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    console.log('Gemini API Key configurada:', apiKey ? 'Sí' : 'No');
    
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      throw new Error('Gemini API key no configurada');
    }

    const prompt = `Eres un asistente virtual especializado en energía solar fotovoltaica para la empresa Voltaic. 
    
    Información sobre Voltaic:
    - Empresa especializada en soluciones de energía solar
    - Servicios: Desarrollo de proyectos, EPC Solar, Instalación, Financiamiento, Mantenimiento, Consultoría
    - Ubicación: León, Guanajuato, México
    - Contacto: contacto@ade-voltaic.mx, 55 3259 5798
    - Proyectos destacados: KIA Motors (2.3 MWp), Gobierno de El Salvador (3.0 MWp), Club Necaxa (600 KWp)
    
    Responde de manera profesional, amigable y técnica sobre:
    - Beneficios de la energía solar
    - Procesos de instalación
    - Opciones de financiamiento
    - Mantenimiento de sistemas
    - Viabilidad de proyectos
    - Ahorros energéticos
    
    Si la pregunta no está relacionada con energía solar, redirige cortésmente al tema.
    
    Usuario pregunta: ${userMessage}
    
    Responde en español de manera concisa (máximo 200 palabras):`;

    try {
      console.log('Enviando solicitud a Gemini API...');
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 300,
          }
        })
      });

      console.log('Respuesta de Gemini API:', response.status, response.statusText);

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Error de Gemini API:', errorData);
        throw new Error(`Error de Gemini API: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Datos recibidos de Gemini:', data);
      
      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!responseText) {
        console.error('No se recibió texto en la respuesta de Gemini:', data);
        throw new Error('Respuesta vacía de Gemini API');
      }
      
      return responseText;
    } catch (error) {
      console.error('Error en fetchGeminiResponse:', error);
      throw error;
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Intentar primero con Gemini
      let response: string;
      try {
        response = await fetchGeminiResponse(text.trim());
        console.log('Respuesta exitosa de Gemini');
      } catch (geminiError) {
        console.log('Gemini falló, intentando con Groq...', geminiError);
        try {
          response = await fetchGroqResponse(text.trim());
          console.log('Respuesta exitosa de Groq');
        } catch (groqError) {
          console.log('Groq también falló, usando respuestas predefinidas...', groqError);
          response = getFallbackResponse(text.trim());
        }
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      
      // Usar respuestas predefinidas como último recurso
      const fallbackResponse = getFallbackResponse(text.trim());
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: fallbackResponse,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputText);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputText);
    }
  };

  const quickQuestions = [
    "¿Cuánto puedo ahorrar con energía solar?",
    "¿Qué incluye la instalación?",
    "¿Hay opciones de financiamiento?",
    "¿Cuánto tiempo dura la instalación?"
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 h-[500px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col">
      {/* Header */}
      <div className="bg-brand-yellow text-neutral-900 p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="font-semibold">Asistente Voltaic</span>
        </div>
        <button
          onClick={onClose}
          className="text-neutral-700 hover:text-neutral-900 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.isUser
                  ? 'bg-brand-yellow text-neutral-900'
                  : 'bg-white text-gray-800 border border-gray-200'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString('es-ES', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 border border-gray-200 p-3 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      {messages.length === 1 && (
        <div className="p-4 bg-gray-100 border-t">
          <p className="text-xs text-gray-600 mb-2">Preguntas frecuentes:</p>
          <div className="grid grid-cols-2 gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => sendMessage(question)}
                className="text-xs bg-white text-gray-700 p-2 rounded border hover:bg-gray-50 transition-colors text-left"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t bg-white rounded-b-lg">
        <div className="flex space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu mensaje..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="bg-brand-yellow text-neutral-900 px-4 py-2 rounded-lg hover:bg-yellow-300 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chatbot;