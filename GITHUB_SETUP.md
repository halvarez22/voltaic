# 🚀 Instrucciones para GitHub y Vercel

## ✅ Aplicación Lista para Despliegue

La aplicación Voltaic está completamente preparada para ser subida a GitHub y desplegada en Vercel.

### 📋 Checklist Completado

- ✅ **Código optimizado** y sin errores
- ✅ **Build exitoso** para producción
- ✅ **Git inicializado** con commit inicial
- ✅ **Archivos de configuración** creados
- ✅ **Documentación completa** incluida

## 🔧 Pasos para GitHub

### 1. Crear Repositorio en GitHub

1. Ve a [github.com](https://github.com)
2. Haz clic en "New repository"
3. Nombre: `voltaic-website`
4. Descripción: `Sitio web de Voltaic - Soluciones Solares Modernas`
5. Marca como **Público**
6. **NO** inicialices con README (ya tenemos uno)
7. Haz clic en "Create repository"

### 2. Conectar Repositorio Local

```bash
# Agregar remote origin
git remote add origin https://github.com/TU-USUARIO/voltaic-website.git

# Cambiar a rama main
git branch -M main

# Subir código
git push -u origin main
```

### 3. Verificar en GitHub

- ✅ Todos los archivos subidos
- ✅ README.md se muestra correctamente
- ✅ .gitignore funciona
- ✅ Estructura del proyecto visible

## 🌐 Pasos para Vercel

### 1. Conectar con GitHub

1. Ve a [vercel.com](https://vercel.com)
2. Inicia sesión con GitHub
3. Haz clic en "New Project"
4. Importa el repositorio `voltaic-website`
5. Vercel detectará automáticamente que es Vite

### 2. Configurar Variables de Entorno

En el dashboard de Vercel, ve a Settings > Environment Variables:

```
VITE_GEMINI_API_KEY = tu_api_key_de_gemini
VITE_GROQ_API_KEY = tu_api_key_de_groq  
VITE_EMAILJS_SERVICE_ID = tu_service_id
VITE_EMAILJS_TEMPLATE_ID = tu_template_id
VITE_EMAILJS_PUBLIC_KEY = tu_public_key
```

### 3. Configuración del Proyecto

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Node.js Version**: 18.x

### 4. Despliegue

1. Haz clic en "Deploy"
2. Espera a que termine el build
3. Tu aplicación estará disponible en: `https://voltaic-website.vercel.app`

## 🔄 Flujo de Desarrollo Continuo

### Para Futuros Cambios

1. **Hacer cambios** en el código local
2. **Commit** los cambios:
   ```bash
   git add .
   git commit -m "Descripción del cambio"
   ```
3. **Push** a GitHub:
   ```bash
   git push origin main
   ```
4. **Vercel** desplegará automáticamente

### Pull Requests

1. Crear rama para feature:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
2. Hacer cambios y commit
3. Push la rama:
   ```bash
   git push origin feature/nueva-funcionalidad
   ```
4. Crear Pull Request en GitHub
5. Vercel creará preview deployment

## 📊 URLs de la Aplicación

- **Desarrollo Local**: `http://localhost:5173`
- **Producción**: `https://voltaic-website.vercel.app`
- **Custom Domain**: Configurable en Vercel

## 🛠️ Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build local
npm run build

# Preview build
npm run preview

# Git
git status
git log --oneline
git pull origin main
```

## 🚨 Troubleshooting

### Si el build falla en Vercel

1. Verifica las variables de entorno
2. Revisa los logs de build en Vercel
3. Asegúrate de que `npm run build` funciona localmente

### Si hay errores de dependencias

```bash
# Limpiar cache
npm cache clean --force

# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### Si el chatbot no funciona

1. Verifica las API keys en Vercel
2. Revisa la consola del navegador
3. Las respuestas predefinidas funcionan sin API keys

## ✅ Verificación Final

Antes de considerar el despliegue completo:

- [ ] Aplicación funciona en desarrollo local
- [ ] Build de producción exitoso
- [ ] Código subido a GitHub
- [ ] Variables de entorno configuradas en Vercel
- [ ] Despliegue exitoso en Vercel
- [ ] Formulario de contacto funcional
- [ ] Chatbot operativo
- [ ] WhatsApp button activo
- [ ] Diseño responsivo verificado

## 🎉 ¡Listo para Producción!

Tu aplicación Voltaic está completamente preparada para ser desplegada y recibir visitantes reales interesados en energía solar.

### Próximos Pasos

1. **Configurar EmailJS** para envío de emails
2. **Configurar APIs** de Gemini y Groq (opcional)
3. **Personalizar dominio** en Vercel
4. **Configurar analytics** (Google Analytics, etc.)
5. **SEO optimization** adicional

¡Felicitaciones! 🎊
