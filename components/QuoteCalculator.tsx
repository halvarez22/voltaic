import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

interface QuoteCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

interface QuoteData {
  // Información Básica
  propertyType: string;
  location: string;
  availableArea: string;
  
  // Consumo Eléctrico
  billFrequency: string;
  monthlySpend: string;
  peakHours: string;
  
  // Objetivos
  desiredSavings: string;
  budget: string;
  timeline: string;
  
  // Contacto
  fullName: string;
  phone: string;
  email: string;
  bestTime: string;
}

const QuoteCalculator: React.FC<QuoteCalculatorProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [quoteData, setQuoteData] = useState<QuoteData>({
    propertyType: '',
    location: '',
    availableArea: '',
    billFrequency: '',
    monthlySpend: '',
    peakHours: '',
    desiredSavings: '',
    budget: '',
    timeline: '',
    fullName: '',
    phone: '',
    email: '',
    bestTime: ''
  });

  const [calculations, setCalculations] = useState({
    estimatedSavings: 0,
    recommendedPower: 0,
    estimatedInvestment: 0,
    paybackPeriod: 0
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Calcular estimaciones en tiempo real
  useEffect(() => {
    if (quoteData.monthlySpend && quoteData.desiredSavings) {
      const monthlySpend = parseFloat(quoteData.monthlySpend.replace(/[^0-9]/g, ''));
      const desiredSavings = parseFloat(quoteData.desiredSavings);
      
      if (monthlySpend > 0 && desiredSavings > 0) {
        const estimatedSavings = monthlySpend * (desiredSavings / 100);
        const recommendedPower = Math.ceil(monthlySpend / 1000 * 1.2); // kW aproximado
        const estimatedInvestment = recommendedPower * 25000; // $25k por kW
        const paybackPeriod = Math.ceil(estimatedInvestment / (estimatedSavings * 12));
        
        setCalculations({
          estimatedSavings: Math.round(estimatedSavings),
          recommendedPower: recommendedPower,
          estimatedInvestment: Math.round(estimatedInvestment),
          paybackPeriod: paybackPeriod
        });
      }
    }
  }, [quoteData.monthlySpend, quoteData.desiredSavings]);

  const handleInputChange = (field: keyof QuoteData, value: string) => {
    setQuoteData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Enviar por EmailJS
      const templateParams = {
        from_name: quoteData.fullName,
        from_email: quoteData.email,
        phone: quoteData.phone,
        property_type: quoteData.propertyType,
        location: quoteData.location,
        monthly_spend: quoteData.monthlySpend,
        desired_savings: quoteData.desiredSavings,
        estimated_savings: calculations.estimatedSavings,
        recommended_power: calculations.recommendedPower,
        estimated_investment: calculations.estimatedInvestment,
        payback_period: calculations.paybackPeriod,
        best_time: quoteData.bestTime,
        to_email: 'contacto@ade-voltaic.mx',
        reply_to: quoteData.email,
        message: `Nueva cotización desde la calculadora solar:
        
Tipo de propiedad: ${quoteData.propertyType}
Ubicación: ${quoteData.location}
Gasto mensual: ${quoteData.monthlySpend}
Ahorro deseado: ${quoteData.desiredSavings}%
Mejor horario: ${quoteData.bestTime}

Estimaciones calculadas:
- Ahorro estimado: $${calculations.estimatedSavings.toLocaleString()} pesos mensuales
- Potencia recomendada: ${calculations.recommendedPower} kW
- Inversión aproximada: $${calculations.estimatedInvestment.toLocaleString()} pesos
- Recuperación: ${calculations.paybackPeriod} años`
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setSubmitSuccess(true);
      setTimeout(() => {
        onClose();
        setSubmitSuccess(false);
        setCurrentStep(1);
        setQuoteData({
          propertyType: '',
          location: '',
          availableArea: '',
          billFrequency: '',
          monthlySpend: '',
          peakHours: '',
          desiredSavings: '',
          budget: '',
          timeline: '',
          fullName: '',
          phone: '',
          email: '',
          bestTime: ''
        });
      }, 3000);

    } catch (error) {
      console.error('Error sending quote:', error);
      // Fallback: enviar a endpoint personalizado
      try {
        await fetch('/api/quote', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...quoteData, calculations })
        });
        setSubmitSuccess(true);
      } catch (fallbackError) {
        console.error('Fallback error:', fallbackError);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { number: 1, title: 'Información Básica', icon: '🏠' },
    { number: 2, title: 'Consumo Eléctrico', icon: '⚡' },
    { number: 3, title: 'Objetivos', icon: '🎯' },
    { number: 4, title: 'Contacto', icon: '📞' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-neutral-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-1 sm:p-2 md:p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[98vh] sm:max-h-[95vh] md:max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-yellow to-yellow-400 p-4 sm:p-6 rounded-t-xl">
          <div className="flex justify-between items-center">
            <div className="flex-1 pr-4">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-neutral-900 leading-tight">
                🧮 Calculadora Solar Voltaic
              </h2>
              <p className="text-neutral-700 mt-1 text-sm sm:text-base">
                Obtén tu precotización en 24 horas
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-neutral-600 hover:text-neutral-900 transition-colors flex-shrink-0"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 bg-neutral-50">
          <div className="flex items-center justify-between mb-2 overflow-x-auto">
            {steps.map((step) => (
              <div key={step.number} className="flex items-center flex-shrink-0">
                <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold ${
                  currentStep >= step.number 
                    ? 'bg-brand-yellow text-neutral-900' 
                    : 'bg-neutral-300 text-neutral-600'
                }`}>
                  {step.number}
                </div>
                <span className={`ml-1 sm:ml-2 text-xs sm:text-sm font-medium whitespace-nowrap ${
                  currentStep >= step.number ? 'text-neutral-900' : 'text-neutral-500'
                }`}>
                  {step.title}
                </span>
                {step.number < 4 && (
                  <div className={`w-4 sm:w-8 h-0.5 mx-1 sm:mx-2 ${
                    currentStep > step.number ? 'bg-brand-yellow' : 'bg-neutral-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-2">
            <div 
              className="bg-brand-yellow h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6">
          {submitSuccess ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-green-600 mb-2">¡Cotización Enviada!</h3>
              <p className="text-neutral-600 mb-4">
                Recibirás tu precotización detallada en 24 horas
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-left">
                <h4 className="font-semibold text-green-800 mb-2">Estimaciones calculadas:</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-green-700">Ahorro estimado:</span>
                    <span className="font-bold text-green-800 ml-2">
                      ${calculations.estimatedSavings.toLocaleString()}/mes
                    </span>
                  </div>
                  <div>
                    <span className="text-green-700">Potencia recomendada:</span>
                    <span className="font-bold text-green-800 ml-2">
                      {calculations.recommendedPower} kW
                    </span>
                  </div>
                  <div>
                    <span className="text-green-700">Inversión aproximada:</span>
                    <span className="font-bold text-green-800 ml-2">
                      ${calculations.estimatedInvestment.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-green-700">Recuperación:</span>
                    <span className="font-bold text-green-800 ml-2">
                      {calculations.paybackPeriod} años
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Step 1: Información Básica */}
              {currentStep === 1 && (
                <div className="space-y-4 sm:space-y-6">
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-3 sm:mb-4">🏠 Información Básica</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Tipo de propiedad *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {['Residencial', 'Comercial', 'Industrial'].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => handleInputChange('propertyType', type)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            quoteData.propertyType === type
                              ? 'border-brand-yellow bg-yellow-50 text-brand-yellow'
                              : 'border-neutral-300 hover:border-neutral-400'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Ubicación *
                    </label>
                    <input
                      type="text"
                      value={quoteData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="Ciudad, Estado"
                      className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent bg-white text-neutral-900 placeholder-neutral-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Superficie disponible aproximada
                    </label>
                    <select
                      value={quoteData.availableArea}
                      onChange={(e) => handleInputChange('availableArea', e.target.value)}
                      className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent bg-white text-neutral-900"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="menos-50">Menos de 50 m²</option>
                      <option value="50-100">50 - 100 m²</option>
                      <option value="100-200">100 - 200 m²</option>
                      <option value="200-500">200 - 500 m²</option>
                      <option value="mas-500">Más de 500 m²</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 2: Consumo Eléctrico */}
              {currentStep === 2 && (
                <div className="space-y-4 sm:space-y-6">
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-3 sm:mb-4">⚡ Consumo Eléctrico</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Frecuencia de recibo CFE *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {['Mensual', 'Bimestral'].map((freq) => (
                        <button
                          key={freq}
                          type="button"
                          onClick={() => handleInputChange('billFrequency', freq)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            quoteData.billFrequency === freq
                              ? 'border-brand-yellow bg-yellow-50 text-brand-yellow'
                              : 'border-neutral-300 hover:border-neutral-400'
                          }`}
                        >
                          {freq}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Gasto promedio mensual *
                    </label>
                    <select
                      value={quoteData.monthlySpend}
                      onChange={(e) => handleInputChange('monthlySpend', e.target.value)}
                      className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent bg-white text-neutral-900"
                      required
                    >
                      <option value="">Selecciona tu gasto mensual</option>
                      <option value="500-1000">$500 - $1,000</option>
                      <option value="1000-3000">$1,000 - $3,000</option>
                      <option value="3000-5000">$3,000 - $5,000</option>
                      <option value="5000-7000">$5,000 - $7,000</option>
                      <option value="7000-10000">$7,000 - $10,000</option>
                      <option value="10000-20000">$10,000 - $20,000</option>
                      <option value="mas-20000">Más de $20,000</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Horarios de mayor consumo
                    </label>
                    <select
                      value={quoteData.peakHours}
                      onChange={(e) => handleInputChange('peakHours', e.target.value)}
                      className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent bg-white text-neutral-900"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="mañana">Mañana (6:00 - 12:00)</option>
                      <option value="tarde">Tarde (12:00 - 18:00)</option>
                      <option value="noche">Noche (18:00 - 24:00)</option>
                      <option value="todo-dia">Todo el día</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 3: Objetivos */}
              {currentStep === 3 && (
                <div className="space-y-4 sm:space-y-6">
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-3 sm:mb-4">🎯 Objetivos</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Ahorro deseado (%) *
                    </label>
                    <select
                      value={quoteData.desiredSavings}
                      onChange={(e) => handleInputChange('desiredSavings', e.target.value)}
                      className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent bg-white text-neutral-900"
                      required
                    >
                      <option value="">Selecciona tu objetivo de ahorro</option>
                      <option value="30">30%</option>
                      <option value="50">50%</option>
                      <option value="70">70%</option>
                      <option value="90">90%</option>
                      <option value="100">100% (Independencia total)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Presupuesto aproximado
                    </label>
                    <select
                      value={quoteData.budget}
                      onChange={(e) => handleInputChange('budget', e.target.value)}
                      className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent bg-white text-neutral-900"
                    >
                      <option value="">Selecciona tu presupuesto</option>
                      <option value="50-100k">$50,000 - $100,000</option>
                      <option value="100-200k">$100,000 - $200,000</option>
                      <option value="200-500k">$200,000 - $500,000</option>
                      <option value="500k-1m">$500,000 - $1,000,000</option>
                      <option value="mas-1m">Más de $1,000,000</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Tiempo de implementación deseado
                    </label>
                    <select
                      value={quoteData.timeline}
                      onChange={(e) => handleInputChange('timeline', e.target.value)}
                      className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent bg-white text-neutral-900"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="inmediato">Inmediato</option>
                      <option value="1-3-meses">1 - 3 meses</option>
                      <option value="3-6-meses">3 - 6 meses</option>
                      <option value="6-12-meses">6 - 12 meses</option>
                      <option value="mas-1-ano">Más de 1 año</option>
                    </select>
                  </div>

                  {/* Cálculos en tiempo real */}
                  {calculations.estimatedSavings > 0 && (
                    <div className="bg-gradient-to-r from-brand-yellow/10 to-yellow-400/10 border border-brand-yellow/20 rounded-lg p-3 sm:p-4">
                      <h4 className="font-semibold text-neutral-900 mb-2 sm:mb-3 text-sm sm:text-base">📊 Estimaciones calculadas:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center">
                          <span className="text-neutral-600">Ahorro estimado:</span>
                          <span className="font-bold text-brand-yellow sm:ml-2">
                            ${calculations.estimatedSavings.toLocaleString()}/mes
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center">
                          <span className="text-neutral-600">Potencia recomendada:</span>
                          <span className="font-bold text-brand-yellow sm:ml-2">
                            {calculations.recommendedPower} kW
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center">
                          <span className="text-neutral-600">Inversión aproximada:</span>
                          <span className="font-bold text-brand-yellow sm:ml-2">
                            ${calculations.estimatedInvestment.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center">
                          <span className="text-neutral-600">Recuperación:</span>
                          <span className="font-bold text-brand-yellow sm:ml-2">
                            {calculations.paybackPeriod} años
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 4: Contacto */}
              {currentStep === 4 && (
                <div className="space-y-4 sm:space-y-6">
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-3 sm:mb-4">📞 Información de Contacto</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        value={quoteData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="Tu nombre completo"
                      className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent bg-white text-neutral-900 placeholder-neutral-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Teléfono *
                      </label>
                      <input
                        type="tel"
                        value={quoteData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="(55) 1234-5678"
                      className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent bg-white text-neutral-900 placeholder-neutral-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={quoteData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="tu@email.com"
                      className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent bg-white text-neutral-900 placeholder-neutral-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Mejor horario para contactarte
                    </label>
                    <select
                      value={quoteData.bestTime}
                      onChange={(e) => handleInputChange('bestTime', e.target.value)}
                      className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent bg-white text-neutral-900"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="mañana">Mañana (9:00 - 12:00)</option>
                      <option value="tarde">Tarde (12:00 - 17:00)</option>
                      <option value="noche">Noche (17:00 - 20:00)</option>
                      <option value="cualquiera">Cualquier horario</option>
                    </select>
                  </div>

                  {/* Resumen final */}
                  <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-3 sm:p-4">
                    <h4 className="font-semibold text-neutral-900 mb-2 sm:mb-3 text-sm sm:text-base">📋 Resumen de tu cotización:</h4>
                    <div className="space-y-2 text-xs sm:text-sm">
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <span className="text-neutral-600">Tipo de propiedad:</span>
                        <span className="font-medium text-neutral-900">{quoteData.propertyType}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <span className="text-neutral-600">Ubicación:</span>
                        <span className="font-medium text-neutral-900">{quoteData.location}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <span className="text-neutral-600">Gasto mensual:</span>
                        <span className="font-medium text-neutral-900">{quoteData.monthlySpend}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <span className="text-neutral-600">Ahorro deseado:</span>
                        <span className="font-medium text-neutral-900">{quoteData.desiredSavings}%</span>
                      </div>
                      {calculations.estimatedSavings > 0 && (
                        <>
                          <div className="border-t pt-2 mt-2">
                            <div className="flex flex-col sm:flex-row sm:justify-between text-brand-yellow font-bold">
                              <span>Ahorro estimado:</span>
                              <span>${calculations.estimatedSavings.toLocaleString()}/mes</span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 pt-4 sm:pt-6 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all text-sm sm:text-base ${
                    currentStep === 1
                      ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                      : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
                  }`}
                >
                  Anterior
                </button>

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-brand-yellow text-neutral-900 rounded-lg font-medium hover:bg-yellow-300 transition-all text-sm sm:text-base"
                  >
                    Siguiente
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-medium transition-all text-sm sm:text-base ${
                      isSubmitting
                        ? 'bg-neutral-400 text-white cursor-not-allowed'
                        : 'bg-brand-yellow text-neutral-900 hover:bg-yellow-300'
                    }`}
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar Cotización'}
                  </button>
                )}
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default QuoteCalculator;
