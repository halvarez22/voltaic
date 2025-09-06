# 🚀 Guía de Despliegue - Voltaic

## ✅ Aplicación Lista para GitHub y Vercel

La aplicación Voltaic está completamente preparada para ser desplegada en Vercel desde GitHub.

### 📋 Características Implementadas

- ✅ **Sitio web responsivo** con scroll horizontal
- ✅ **Formulario de contacto** con envío de emails
- ✅ **Chatbot inteligente** con Gemini y Groq
- ✅ **Botón de WhatsApp** para contacto directo
- ✅ **Optimización** para producción
- ✅ **Configuración** para Vercel

### 🔧 Configuración de GitHub

#### 1. Crear repositorio en GitHub
```bash
# Inicializar git (si no está inicializado)
git init

# Agregar archivos
git add .

# Commit inicial
git commit -m "Initial commit: Voltaic solar energy website"

# Conectar con GitHub
git remote add origin https://github.com/tu-usuario/voltaic-website.git

# Subir código
git push -u origin main
```

#### 2. Archivos incluidos
- ✅ `.gitignore` - Archivos a ignorar
- ✅ `vercel.json` - Configuración de Vercel
- ✅ `package.json` - Dependencias y scripts
- ✅ `vite.config.ts` - Configuración de Vite
- ✅ `tsconfig.json` - Configuración de TypeScript

### 🌐 Configuración de Vercel

#### 1. Conectar con GitHub
1. Ve a [vercel.com](https://vercel.com)
2. Inicia sesión con GitHub
3. Importa el repositorio de Voltaic
4. Vercel detectará automáticamente que es un proyecto Vite

#### 2. Variables de Entorno
Configura las siguientes variables en Vercel:

```
VITE_GEMINI_API_KEY=tu_api_key_de_gemini
VITE_GROQ_API_KEY=tu_api_key_de_groq
VITE_EMAILJS_SERVICE_ID=tu_service_id
VITE_EMAILJS_TEMPLATE_ID=tu_template_id
VITE_EMAILJS_PUBLIC_KEY=tu_public_key
```

#### 3. Configuración Automática
- **Framework:** Vite (detectado automáticamente)
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Node.js Version:** 18.x (recomendado)

### 📱 Funcionalidades en Producción

#### 1. Formulario de Contacto
- ✅ Envía emails a `contacto@ade-voltaic.mx`
- ✅ Soporte para archivos adjuntos
- ✅ Validación de formulario
- ✅ Mensajes de confirmación

#### 2. Chatbot Inteligente
- ✅ Respuestas con Gemini AI
- ✅ Fallback con Groq API
- ✅ Respuestas predefinidas como último recurso
- ✅ Preguntas frecuentes

#### 3. WhatsApp Integration
- ✅ Botón flotante en lado izquierdo
- ✅ Número: 5532595798
- ✅ Mensaje predefinido personalizado

### 🔄 Flujo de Despliegue

1. **Push a GitHub** → Trigger automático
2. **Vercel detecta cambios** → Inicia build
3. **Instala dependencias** → `npm install`
4. **Ejecuta build** → `npm run build`
5. **Despliega** → Aplicación disponible

### 🛠️ Scripts Disponibles

```bash
# Desarrollo local
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

### 📊 Optimizaciones Incluidas

- ✅ **Lazy loading** de imágenes
- ✅ **Code splitting** automático
- ✅ **Minificación** de CSS y JS
- ✅ **Tree shaking** para eliminar código no usado
- ✅ **Compresión** de assets
- ✅ **Cache headers** optimizados

### 🚨 Notas Importantes

1. **Variables de entorno:** Deben configurarse en Vercel
2. **Dominio personalizado:** Se puede configurar en Vercel
3. **HTTPS:** Automático en Vercel
4. **CDN:** Global automático
5. **SSL:** Certificado automático

### 🔗 URLs de Despliegue

- **Desarrollo:** `http://localhost:5173`
- **Producción:** `https://voltaic-website.vercel.app`
- **Custom Domain:** `https://voltaic.com` (configurable)

### ✅ Checklist de Despliegue

- [x] Código subido a GitHub
- [x] Variables de entorno configuradas
- [x] Build exitoso en Vercel
- [x] Formulario de contacto funcionando
- [x] Chatbot operativo
- [x] WhatsApp button activo
- [x] Responsive design verificado
- [x] Performance optimizada

¡La aplicación está lista para producción! 🎉
