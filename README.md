# 🌞 Voltaic - Soluciones Solares Modernas

<div align="center">
  <img width="1200" height="475" alt="Voltaic Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
  
  [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tu-usuario/voltaic-website)
  [![GitHub](https://img.shields.io/github/license/tu-usuario/voltaic-website)](https://github.com/tu-usuario/voltaic-website)
</div>

## 🚀 Características

- **🌐 Sitio web responsivo** con scroll horizontal fluido
- **🤖 Chatbot inteligente** con Gemini AI y Groq
- **📧 Formulario de contacto** con envío de emails reales
- **💬 WhatsApp integration** para contacto directo
- **⚡ Optimizado para producción** con Vite
- **🎨 Diseño moderno** con Tailwind CSS

## 🛠️ Tecnologías

- **React 19** - Framework principal
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Estilos
- **EmailJS** - Envío de emails
- **Gemini AI** - Chatbot inteligente
- **Groq API** - Fallback del chatbot

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/voltaic-website.git
   cd voltaic-website
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env.local
   ```
   
   Edita `.env.local` con tus API keys:
   ```env
   VITE_GEMINI_API_KEY=tu_api_key_de_gemini
   VITE_GROQ_API_KEY=tu_api_key_de_groq
   VITE_EMAILJS_SERVICE_ID=tu_service_id
   VITE_EMAILJS_TEMPLATE_ID=tu_template_id
   VITE_EMAILJS_PUBLIC_KEY=tu_public_key
   ```

4. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:5173
   ```

## 📦 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo

# Producción
npm run build        # Build para producción
npm run preview      # Preview del build

# Utilidades
npm run prebuild     # Copiar imágenes antes del build
```

## 🌐 Despliegue

### Vercel (Recomendado)

1. **Conectar con GitHub**
   - Ve a [vercel.com](https://vercel.com)
   - Importa este repositorio
   - Configura las variables de entorno

2. **Variables de entorno en Vercel**
   ```
   VITE_GEMINI_API_KEY
   VITE_GROQ_API_KEY
   VITE_EMAILJS_SERVICE_ID
   VITE_EMAILJS_TEMPLATE_ID
   VITE_EMAILJS_PUBLIC_KEY
   ```

3. **Despliegue automático**
   - Push a `main` → Deploy automático
   - Pull requests → Preview deployments

### Otros Proveedores

- **Netlify**: Compatible con Vite
- **GitHub Pages**: Requiere configuración adicional
- **AWS S3 + CloudFront**: Para casos avanzados

## 📱 Funcionalidades

### 🤖 Chatbot Inteligente
- Respuestas con **Gemini AI**
- Fallback con **Groq API**
- Respuestas predefinidas especializadas
- Preguntas frecuentes sobre energía solar

### 📧 Formulario de Contacto
- Envío de emails a `contacto@ade-voltaic.mx`
- Soporte para archivos adjuntos
- Validación de formulario
- Integración con EmailJS

### 💬 WhatsApp Integration
- Botón flotante en lado izquierdo
- Número: `5532595798`
- Mensaje predefinido personalizado

### 🎨 Diseño
- Scroll horizontal fluido
- Animaciones suaves
- Diseño responsivo
- Optimización de imágenes

## 📁 Estructura del Proyecto

```
voltaic-website/
├── components/           # Componentes React
│   ├── Chatbot.tsx      # Chatbot inteligente
│   ├── ContactFormModal.tsx
│   ├── WhatsAppButton.tsx
│   └── ...
├── images/              # Imágenes optimizadas
├── public/              # Assets públicos
├── src/                 # Código fuente
├── .env.local          # Variables de entorno
├── vercel.json         # Configuración de Vercel
└── package.json        # Dependencias
```

## 🔧 Configuración

### APIs Requeridas

1. **Gemini AI** - [Google AI Studio](https://makersuite.google.com/app/apikey)
2. **Groq** - [Groq Console](https://console.groq.com/)
3. **EmailJS** - [EmailJS](https://www.emailjs.com/)

### Variables de Entorno

| Variable | Descripción | Requerida |
|----------|-------------|-----------|
| `VITE_GEMINI_API_KEY` | API key de Gemini | Opcional |
| `VITE_GROQ_API_KEY` | API key de Groq | Opcional |
| `VITE_EMAILJS_SERVICE_ID` | Service ID de EmailJS | Sí |
| `VITE_EMAILJS_TEMPLATE_ID` | Template ID de EmailJS | Sí |
| `VITE_EMAILJS_PUBLIC_KEY` | Public key de EmailJS | Sí |

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Contacto

- **Email**: contacto@ade-voltaic.mx
- **Teléfono**: 55 3259 5798
- **WhatsApp**: [5532595798](https://wa.me/5532595798)

---

<div align="center">
  <p>Desarrollado con ❤️ para Voltaic - Soluciones Solares Modernas</p>
  <p>🌞 Energía Solar para un Futuro Sostenible ⚡</p>
</div>
