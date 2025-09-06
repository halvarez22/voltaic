# 🤖 Configuración del Chatbot Inteligente

## ✅ Chatbot Implementado

El chatbot inteligente ya está integrado en la aplicación Voltaic con las siguientes características:

### 🚀 Funcionalidades
- **Asistente virtual especializado** en energía solar
- **Integración con Gemini AI** para respuestas inteligentes
- **Interfaz moderna** con botón flotante
- **Preguntas frecuentes** predefinidas
- **Respuestas contextuales** sobre servicios de Voltaic
- **Diseño responsivo** y accesible

### 🔧 Configuración Requerida

Para activar el chatbot, necesitas configurar la API key de Gemini:

1. **Obtén tu API key de Gemini:**
   - Ve a: https://makersuite.google.com/app/apikey
   - Crea una nueva API key
   - Copia la clave generada

2. **Crea el archivo de configuración:**
   - Crea un archivo llamado `.env.local` en la raíz del proyecto
   - Agrega la siguiente línea:
   ```
   VITE_GEMINI_API_KEY=tu_api_key_aqui
   ```

3. **Reinicia el servidor:**
   ```bash
   npm run dev
   ```

### 🎯 Características del Chatbot

#### **Conocimiento Especializado:**
- Información sobre servicios de Voltaic
- Beneficios de la energía solar
- Procesos de instalación
- Opciones de financiamiento
- Mantenimiento de sistemas
- Viabilidad de proyectos

#### **Interfaz de Usuario:**
- **Botón flotante** en la esquina inferior derecha
- **Chat modal** con diseño moderno
- **Preguntas rápidas** para iniciar conversación
- **Indicador de escritura** durante respuestas
- **Timestamps** en mensajes
- **Cierre con ESC** o clic fuera del modal

#### **Preguntas Frecuentes Incluidas:**
- "¿Cuánto puedo ahorrar con energía solar?"
- "¿Qué incluye la instalación?"
- "¿Hay opciones de financiamiento?"
- "¿Cuánto tiempo dura la instalación?"

### 🔄 Flujo de Conversación

1. **Usuario hace clic** en el botón del chatbot
2. **Chatbot saluda** con mensaje de bienvenida
3. **Usuario escribe** su pregunta
4. **Sistema procesa** con Gemini AI
5. **Respuesta contextual** sobre energía solar
6. **Conversación continua** hasta cerrar

### 🛠️ Personalización

El chatbot está configurado para:
- Responder en español
- Máximo 200 palabras por respuesta
- Temperatura de 0.7 para respuestas naturales
- Redirigir preguntas no relacionadas con energía solar
- Incluir información de contacto de Voltaic

### 🚨 Notas Importantes

- **Sin API key:** El chatbot mostrará error de configuración
- **Límites de API:** Gemini tiene límites de uso gratuito
- **Privacidad:** Los mensajes se envían a Google Gemini
- **Costo:** Consulta los precios de Gemini API

### 📱 Uso en Dispositivos Móviles

El chatbot es completamente responsivo y funciona en:
- ✅ Desktop
- ✅ Tablet
- ✅ Móvil
- ✅ Touch devices

¡El chatbot está listo para usar una vez configurada la API key!
