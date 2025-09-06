# 🧮 Calculadora Solar Voltaic - Manual de Implementación

## 📋 Índice
1. [Descripción General](#descripción-general)
2. [Arquitectura del Componente](#arquitectura-del-componente)
3. [Configuración Inicial](#configuración-inicial)
4. [Estructura de Datos](#estructura-de-datos)
5. [Flujo de Usuario](#flujo-de-usuario)
6. [Cálculos en Tiempo Real](#cálculos-en-tiempo-real)
7. [Integración con EmailJS](#integración-con-emailjs)
8. [Responsividad](#responsividad)
9. [Personalización](#personalización)
10. [Troubleshooting](#troubleshooting)

---

## 🎯 Descripción General

La **Calculadora Solar Voltaic** es un componente React que permite a los usuarios obtener una precotización personalizada de sistemas de energía solar a través de un formulario interactivo de 4 pasos.

### ✨ Características Principales
- **Formulario de 4 pasos** con navegación intuitiva
- **Cálculos en tiempo real** de ahorro e inversión
- **Diseño responsivo** para todos los dispositivos
- **Integración con EmailJS** para envío de cotizaciones
- **Validación en tiempo real** de campos requeridos
- **Animaciones suaves** entre pasos

---

## 🏗️ Arquitectura del Componente

### 📁 Estructura de Archivos
```
components/
├── QuoteCalculator.tsx          # Componente principal
├── ContactFormModal.tsx         # Modal de contacto (existente)
└── CTASection.tsx              # Sección CTA (modificada)
```

### 🔧 Dependencias Requeridas
```json
{
  "@emailjs/browser": "^4.3.2",
  "react": "^18.2.0",
  "typescript": "^5.0.0"
}
```

---

## ⚙️ Configuración Inicial

### 1. **Instalación de Dependencias**
```bash
npm install @emailjs/browser
```

### 2. **Variables de Entorno**
Crear archivo `.env.local`:
```env
VITE_EMAILJS_SERVICE_ID=tu_service_id
VITE_EMAILJS_TEMPLATE_ID=tu_template_id
VITE_EMAILJS_PUBLIC_KEY=tu_public_key
```

### 3. **Configuración de EmailJS**
1. Crear cuenta en [emailjs.com](https://www.emailjs.com/)
2. Configurar servicio de email (Gmail, Outlook, etc.)
3. Crear template de email
4. Obtener credenciales de la cuenta

---

## 📊 Estructura de Datos

### **Interface QuoteData**
```typescript
interface QuoteData {
  // Información Básica
  propertyType: string;        // 'Residencial' | 'Comercial' | 'Industrial'
  location: string;            // Ciudad, Estado
  availableArea: string;       // Rango de superficie
  
  // Consumo Eléctrico
  billFrequency: string;       // 'Mensual' | 'Bimestral'
  monthlySpend: string;        // Rango de gasto mensual
  peakHours: string;          // Horarios de mayor consumo
  
  // Objetivos
  desiredSavings: string;      // Porcentaje de ahorro deseado
  budget: string;             // Rango de presupuesto
  timeline: string;           // Tiempo de implementación
  
  // Contacto
  fullName: string;           // Nombre completo
  phone: string;              // Teléfono
  email: string;              // Email
  bestTime: string;           // Mejor horario para contactar
}
```

### **Interface Calculations**
```typescript
interface Calculations {
  estimatedSavings: number;    // Ahorro estimado mensual
  recommendedPower: number;    // Potencia recomendada en kW
  estimatedInvestment: number; // Inversión aproximada
  paybackPeriod: number;       // Período de recuperación en años
}
```

---

## 🎮 Flujo de Usuario

### **Paso 1: Información Básica**
```typescript
// Campos requeridos
- Tipo de propiedad (Residencial/Comercial/Industrial)
- Ubicación (Ciudad, Estado)
- Superficie disponible (opcional)

// Validación
- Ubicación: campo de texto requerido
- Tipo de propiedad: selección obligatoria
```

### **Paso 2: Consumo Eléctrico**
```typescript
// Campos requeridos
- Frecuencia de recibo CFE (Mensual/Bimestral)
- Gasto promedio mensual (rango)
- Horarios de mayor consumo (opcional)

// Validación
- Gasto mensual: selección obligatoria
- Frecuencia: selección obligatoria
```

### **Paso 3: Objetivos**
```typescript
// Campos requeridos
- Ahorro deseado (%)
- Presupuesto aproximado (opcional)
- Tiempo de implementación (opcional)

// Cálculos automáticos
- Ahorro estimado mensual
- Potencia recomendada
- Inversión aproximada
- Período de recuperación
```

### **Paso 4: Contacto**
```typescript
// Campos requeridos
- Nombre completo
- Teléfono
- Email
- Mejor horario (opcional)

// Resumen final
- Datos ingresados
- Estimaciones calculadas
```

---

## 🧮 Cálculos en Tiempo Real

### **Algoritmo de Cálculo**
```typescript
useEffect(() => {
  if (quoteData.monthlySpend && quoteData.desiredSavings) {
    const monthlySpend = parseFloat(quoteData.monthlySpend.replace(/[^0-9]/g, ''));
    const desiredSavings = parseFloat(quoteData.desiredSavings);
    
    if (monthlySpend > 0 && desiredSavings > 0) {
      const estimatedSavings = monthlySpend * (desiredSavings / 100);
      const recommendedPower = Math.ceil(monthlySpend / 1000 * 1.2);
      const estimatedInvestment = recommendedPower * 25000;
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
```

### **Fórmulas Utilizadas**
- **Ahorro estimado:** `Gasto mensual × (Ahorro deseado / 100)`
- **Potencia recomendada:** `(Gasto mensual / 1000) × 1.2 kW`
- **Inversión aproximada:** `Potencia recomendada × $25,000`
- **Período de recuperación:** `Inversión / (Ahorro mensual × 12)`

---

## 📧 Integración con EmailJS

### **Configuración del Template**
```javascript
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
  message: `Nueva cotización desde la calculadora solar...`
};
```

### **Envío de Email**
```typescript
await emailjs.send(
  import.meta.env.VITE_EMAILJS_SERVICE_ID,
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  templateParams,
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY
);
```

---

## 📱 Responsividad

### **Breakpoints Utilizados**
```css
/* Móviles */
sm: 640px   /* Small devices */

/* Tablets */
md: 768px   /* Medium devices */

/* Desktop */
lg: 1024px  /* Large devices */
```

### **Adaptaciones por Dispositivo**

#### **Móviles (320px - 640px)**
- Modal: pantalla completa (`max-h-[95vh]`)
- Botones: apilados verticalmente (`flex-col`)
- Texto: tamaño reducido (`text-xs sm:text-sm`)
- Padding: mínimo (`p-2 sm:p-4`)

#### **Tablets (640px - 1024px)**
- Modal: tamaño intermedio
- Botones: layout horizontal (`sm:flex-row`)
- Grid: 2 columnas (`sm:grid-cols-2`)
- Espaciado: balanceado

#### **Desktop (1024px+)**
- Modal: tamaño completo (`max-w-4xl`)
- Layout: horizontal completo
- Efectos: hover y tooltips
- Espaciado: generoso

---

## 🎨 Personalización

### **Colores del Tema**
```css
/* Colores principales */
--brand-yellow: #FCD34D
--neutral-900: #171717
--neutral-800: #262626
--neutral-700: #404040
--neutral-600: #525252
--neutral-300: #D4D4D4
```

### **Modificar Cálculos**
```typescript
// Cambiar costo por kW
const estimatedInvestment = recommendedPower * 25000; // $25k por kW

// Ajustar factor de potencia
const recommendedPower = Math.ceil(monthlySpend / 1000 * 1.2); // Factor 1.2
```

### **Personalizar Pasos**
```typescript
const steps = [
  { number: 1, title: 'Información Básica', icon: '🏠' },
  { number: 2, title: 'Consumo Eléctrico', icon: '⚡' },
  { number: 3, title: 'Objetivos', icon: '🎯' },
  { number: 4, title: 'Contacto', icon: '📞' }
];
```

---

## 🔧 Integración en la Aplicación

### **1. Importar el Componente**
```typescript
import QuoteCalculator from './components/QuoteCalculator';
```

### **2. Agregar Estado**
```typescript
const [isQuoteOpen, setIsQuoteOpen] = useState(false);
const handleOpenQuote = useCallback(() => setIsQuoteOpen(true), []);
const handleCloseQuote = useCallback(() => setIsQuoteOpen(false), []);
```

### **3. Renderizar el Modal**
```typescript
<QuoteCalculator isOpen={isQuoteOpen} onClose={handleCloseQuote} />
```

### **4. Conectar con Botones**
```typescript
// En Hero Section
<Component id={id} onCTAClick={handleOpenQuote} />

// En CTA Section
<Component id={id} onOpenQuote={handleOpenQuote} />
```

---

## 🐛 Troubleshooting

### **Problemas Comunes**

#### **1. Campos no visibles**
```css
/* Solución: Agregar colores explícitos */
className="bg-white text-neutral-900 placeholder-neutral-500"
```

#### **2. Cálculos no se actualizan**
```typescript
// Verificar dependencias del useEffect
useEffect(() => {
  // Cálculos aquí
}, [quoteData.monthlySpend, quoteData.desiredSavings]);
```

#### **3. EmailJS no funciona**
```typescript
// Verificar variables de entorno
console.log(import.meta.env.VITE_EMAILJS_SERVICE_ID);
console.log(import.meta.env.VITE_EMAILJS_TEMPLATE_ID);
console.log(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
```

#### **4. Responsividad rota**
```css
/* Verificar breakpoints */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
```

### **Debugging**
```typescript
// Agregar logs para debugging
console.log('Quote Data:', quoteData);
console.log('Calculations:', calculations);
console.log('Current Step:', currentStep);
```

---

## 📈 Optimizaciones de Performance

### **1. Lazy Loading**
```typescript
// El componente se monta solo cuando se abre
if (!isOpen) return null;
```

### **2. Memoización**
```typescript
// Usar useCallback para funciones
const handleInputChange = useCallback((field: keyof QuoteData, value: string) => {
  setQuoteData(prev => ({ ...prev, [field]: value }));
}, []);
```

### **3. Debounce en Cálculos**
```typescript
// Evitar cálculos excesivos
useEffect(() => {
  const timeoutId = setTimeout(() => {
    // Cálculos aquí
  }, 300);
  
  return () => clearTimeout(timeoutId);
}, [quoteData.monthlySpend, quoteData.desiredSavings]);
```

---

## 🚀 Despliegue

### **Variables de Entorno en Vercel**
```bash
VITE_EMAILJS_SERVICE_ID=service_xxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxx
```

### **Build de Producción**
```bash
npm run build
```

### **Verificación Post-Despliegue**
- [ ] Modal se abre correctamente
- [ ] Cálculos funcionan en tiempo real
- [ ] EmailJS envía emails
- [ ] Responsividad en todos los dispositivos
- [ ] Validación de campos funciona

---

## 📚 Recursos Adicionales

### **Documentación de EmailJS**
- [EmailJS Docs](https://www.emailjs.com/docs/)
- [Template Variables](https://www.emailjs.com/docs/template-variables/)

### **Tailwind CSS**
- [Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [Flexbox](https://tailwindcss.com/docs/flexbox)

### **React Hooks**
- [useState](https://reactjs.org/docs/hooks-state.html)
- [useEffect](https://reactjs.org/docs/hooks-effect.html)
- [useCallback](https://reactjs.org/docs/hooks-reference.html#usecallback)

---

## 🎯 Conclusión

La **Calculadora Solar Voltaic** es un componente robusto y escalable que proporciona una experiencia de usuario excepcional para la cotización de sistemas de energía solar. Su diseño responsivo, cálculos en tiempo real y integración con EmailJS la convierten en una herramienta valiosa para la generación de leads calificados.

### **Características Destacadas:**
- ✅ **UX Intuitiva:** Formulario de 4 pasos fácil de completar
- ✅ **Cálculos Precisos:** Estimaciones en tiempo real
- ✅ **Responsividad Total:** Funciona perfectamente en todos los dispositivos
- ✅ **Integración Completa:** EmailJS para envío automático
- ✅ **Código Limpio:** Fácil de mantener y extender
- ✅ **Performance Optimizada:** Carga rápida y fluida

¡La calculadora está lista para capturar leads y generar conversiones! 🚀⚡
