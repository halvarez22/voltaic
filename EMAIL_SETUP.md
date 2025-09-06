# 📧 Configuración de Envío de Emails

## ✅ Formulario de Contacto con Envío Real

El formulario de contacto ahora está configurado para enviar emails reales a `contacto@ade-voltaic.mx` usando EmailJS.

### 🚀 Funcionalidades Implementadas

- **Envío real de emails** a contacto@ade-voltaic.mx
- **Soporte para archivos adjuntos** (recibos de luz)
- **Sistema de fallback** si EmailJS falla
- **Validación de formulario** mejorada
- **Mensajes de confirmación** y error

### 🔧 Configuración Requerida

Para activar el envío de emails, necesitas configurar EmailJS:

#### 1. Crear cuenta en EmailJS
- Ve a: https://www.emailjs.com/
- Crea una cuenta gratuita
- Verifica tu email

#### 2. Configurar servicio de email
- En el dashboard, ve a "Email Services"
- Agrega tu proveedor de email (Gmail, Outlook, etc.)
- Configura la cuenta de contacto@ade-voltaic.mx

#### 3. Crear templates de email
- Ve a "Email Templates"
- Crea un template llamado "template_voltaic" con:
  ```
  Asunto: Nueva consulta de {{from_name}} - Voltaic
  
  De: {{from_name}} <{{from_email}}>
  Teléfono: {{phone}}
  
  Mensaje:
  {{message}}
  
  Archivo adjunto: {{bill_attached}}
  
  ---
  Responder a: {{reply_to}}
  ```

#### 4. Obtener credenciales
- Ve a "Account" > "General"
- Copia tu:
  - **Service ID**
  - **Template ID** 
  - **Public Key**

#### 5. Actualizar .env.local
```env
VITE_EMAILJS_SERVICE_ID=tu_service_id_aqui
VITE_EMAILJS_TEMPLATE_ID=tu_template_id_aqui
VITE_EMAILJS_PUBLIC_KEY=tu_public_key_aqui
```

### 📋 Datos que se Envían

El formulario envía la siguiente información:

- **Nombre completo** del cliente
- **Email** para respuesta
- **Teléfono** (opcional)
- **Mensaje** de consulta
- **Archivo adjunto** (recibo de luz, opcional)
- **Timestamp** de envío

### 🔄 Flujo de Envío

1. **Usuario completa** el formulario
2. **Sistema valida** los datos
3. **EmailJS envía** el email principal
4. **Si hay archivo:** envía email adicional con archivo
5. **Si falla:** intenta API fallback
6. **Si todo falla:** muestra error con contacto directo

### 🛠️ Configuración Alternativa

Si prefieres no usar EmailJS, puedes:

1. **Configurar un webhook** en `/api/contact`
2. **Usar un servicio como Formspree** o Netlify Forms
3. **Implementar un backend** personalizado

### 📧 Email de Destino

Todos los emails se envían a: **contacto@ade-voltaic.mx**

### 🚨 Notas Importantes

- **Límites de EmailJS:** 200 emails/mes en plan gratuito
- **Archivos adjuntos:** Se envían por separado
- **Spam:** EmailJS incluye protección anti-spam
- **Privacidad:** Los datos se procesan según políticas de EmailJS

### ✅ Estado Actual

- ✅ **Formulario implementado**
- ✅ **EmailJS integrado**
- ⚠️ **Configuración pendiente** (necesita credenciales reales)
- ✅ **Sistema de fallback** activo

¡Una vez configurado EmailJS, el formulario enviará emails reales a contacto@ade-voltaic.mx!
