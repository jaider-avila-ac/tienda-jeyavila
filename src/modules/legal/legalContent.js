import { NEGOCIO } from '../../data/negocio'
import { fmt } from '../../utils/format'

// Cada documento: { titulo, descripcion, secciones: [{ titulo, parrafos?: [], items?: [] }] }.
// "ctx" trae lo que cambia desde el panel (hoy: el mínimo de envío gratis).

function envioGratisTexto(ctx) {
  if (ctx?.envioGratisActivo && ctx?.envioGratisDesde > 0) {
    return `Si el valor de tu compra llega a ${fmt(ctx.envioGratisDesde)} o más, el envío es gratis: ${NEGOCIO.nombre} asume el costo del transporte y no pagas nada al recibir tu pedido. El carrito te muestra cuánto te falta para alcanzarlo.`
  }
  return 'En este momento no hay un monto mínimo de compra para envío gratis.'
}

export function getLegalDoc(slug, ctx = {}) {
  const docs = {
    terminos: {
      titulo: 'Términos y condiciones',
      descripcion: `Condiciones de uso del sitio y de compra en ${NEGOCIO.nombre}.`,
      secciones: [
        {
          titulo: '1. Quién vende',
          parrafos: [
            `Este sitio es operado por ${NEGOCIO.nombre}, ${NEGOCIO.naturaleza} con domicilio en ${NEGOCIO.ciudad}. Dirección: ${NEGOCIO.direccion}. Correo: ${NEGOCIO.email}. WhatsApp: ${NEGOCIO.whatsappVisible}.`,
          ],
        },
        {
          titulo: '2. Aceptación',
          parrafos: [
            'Al navegar por el sitio, crear una cuenta o hacer un pedido aceptas estos términos, la Política de privacidad, la Política de envíos y la Política de cambios y devoluciones. Si no estás de acuerdo con alguno, te pedimos no usar el sitio.',
          ],
        },
        {
          titulo: '3. Cuenta de usuario y mayoría de edad',
          items: [
            'Para comprar es necesario crear una cuenta.',
            'Debes dar información real y mantenerla actualizada (nombre, correo, teléfono, dirección de envío y documento de identidad).',
            'Eres responsable de la confidencialidad de tu contraseña y de lo que se haga con tu cuenta.',
            'Las compras solo pueden hacerlas personas mayores de edad. No vendemos a menores de edad sin la intervención de un adulto responsable, y nuestros productos no están pensados específicamente para menores.',
          ],
        },
        {
          titulo: '4. Productos',
          parrafos: [
            'Todos los productos que vendemos son nuevos.',
            'Las fotografías son referenciales: el color y la talla pueden verse levemente distintos al producto real por la pantalla, la iluminación o la tela.',
          ],
        },
        {
          titulo: '5. Precios y pago',
          items: [
            'Los precios están en pesos colombianos (COP).',
            `${NEGOCIO.nombre} no factura IVA, por lo que el precio publicado no lleva impuestos adicionales.`,
            'El precio que ves al confirmar tu pedido es el que se te cobra; no lo modificamos sin avisarte antes de la compra.',
            'El pago se hace por los medios habilitados en el proceso de compra, procesados a través de la pasarela de pagos Wompi.',
          ],
        },
        {
          titulo: '6. Confirmación del pedido',
          parrafos: [
            'Tu pedido queda confirmado cuando el pago es aprobado o, si aplica, cuando aceptamos el pedido contra entrega. Te avisaremos por el sitio y por los datos de contacto que registraste. Si algún producto ya no tiene existencias, te lo informaremos y, si ya habías pagado, te devolveremos el dinero.',
          ],
        },
        {
          titulo: '7. Envíos, cambios y devoluciones',
          parrafos: [
            'El detalle de cobertura, tiempos y costos está en la Política de envíos. Las condiciones para cambios, devoluciones y reclamos están en la Política de cambios y devoluciones. Ambas hacen parte de estos términos.',
          ],
        },
        {
          titulo: '8. Propiedad intelectual',
          parrafos: [
            `El nombre, logo, fotografías, textos y diseño del sitio son de ${NEGOCIO.nombre} o se usan con autorización. No puedes copiarlos ni usarlos con fines comerciales sin permiso escrito.`,
          ],
        },
        {
          titulo: '9. Responsabilidad',
          parrafos: [
            'Hacemos lo posible por mantener el sitio disponible y la información correcta, pero pueden presentarse interrupciones o errores puntuales. Nada de lo dispuesto en estos términos limita los derechos que la ley colombiana reconoce a los consumidores, en especial la Ley 1480 de 2011 (Estatuto del Consumidor).',
          ],
        },
        {
          titulo: '10. Datos personales',
          parrafos: [
            'El tratamiento de tus datos se rige por nuestra Política de privacidad.',
          ],
        },
        {
          titulo: '11. Ley aplicable y reclamos',
          parrafos: [
            `Estos términos se rigen por las leyes de la República de Colombia. Para cualquier duda o reclamo escríbenos a ${NEGOCIO.email} o por WhatsApp al ${NEGOCIO.whatsappVisible}. Si no llegamos a una solución, puedes acudir a la Superintendencia de Industria y Comercio (SIC).`,
          ],
        },
        {
          titulo: '12. Cambios a estos términos',
          parrafos: [
            'Podemos actualizar estos términos. La versión vigente es la publicada en esta página, con su fecha de actualización. Los pedidos ya realizados se rigen por la versión vigente al momento de la compra.',
          ],
        },
      ],
    },

    privacidad: {
      titulo: 'Política de privacidad',
      descripcion: `Cómo ${NEGOCIO.nombre} recolecta, usa y protege tus datos personales.`,
      secciones: [
        {
          titulo: '1. Responsable del tratamiento',
          parrafos: [
            `${NEGOCIO.nombre}, ${NEGOCIO.naturaleza}, ${NEGOCIO.ciudad}. Dirección: ${NEGOCIO.direccion}. Correo: ${NEGOCIO.email}. WhatsApp: ${NEGOCIO.whatsappVisible}. Esta política se elabora conforme a la Ley 1581 de 2012 y sus normas reglamentarias (Habeas Data).`,
          ],
        },
        {
          titulo: '2. Datos que recolectamos',
          items: [
            'Al registrarte o comprar: nombre completo, correo electrónico, número de teléfono, dirección de envío y número de documento de identidad.',
            'Si inicias sesión con Google: el nombre y el correo asociados a esa cuenta.',
            'Información de tus pedidos y de tu actividad en la cuenta (favoritos, carrito, preguntas y reseñas).',
            'Datos de uso del sitio, descritos en la sección de cookies y analítica.',
          ],
        },
        {
          titulo: '3. Para qué usamos tus datos',
          items: [
            'Procesar y entregar tus pedidos, y gestionar pagos, cambios, devoluciones y reclamos.',
            'Comunicarnos contigo sobre el estado de tu compra y atender tus solicitudes.',
            'Enviarte por correo electrónico o WhatsApp promociones y novedades. Puedes pedir que dejemos de hacerlo en cualquier momento.',
            'Entender cuántas personas visitan el sitio y qué productos se ven más, para mejorarlo.',
            'Cumplir obligaciones legales.',
          ],
        },
        {
          titulo: '4. Con quién compartimos tus datos',
          parrafos: [
            'No vendemos tus datos. Los compartimos solo con quienes son necesarios para prestarte el servicio:',
          ],
          items: [
            'Wompi, para procesar los pagos.',
            'Las transportadoras con las que trabajamos (Inter Rapidísimo y Envía), para entregar tu pedido.',
            'Proveedores tecnológicos que permiten operar el sitio (alojamiento y envío de correos).',
            'Autoridades, cuando la ley lo exija.',
          ],
        },
        {
          titulo: '5. Cookies y analítica',
          parrafos: [
            'El sitio guarda un identificador anónimo en tu navegador para saber cuántas personas entran y qué productos se ven más. Junto con él se registra el tipo de dispositivo (móvil o escritorio), las páginas y productos que ves y si agregas algo al carrito. Si tienes la sesión iniciada, esa actividad puede asociarse a tu cuenta.',
            'Al entrar por primera vez te mostramos un aviso con la opción de desactivar este registro. Si lo desactivas, dejamos de registrar tu actividad de navegación.',
            'Las cookies y datos locales necesarios para que el sitio funcione (por ejemplo, mantener tu sesión) se usan siempre.',
          ],
        },
        {
          titulo: '6. Tus derechos',
          parrafos: ['Como titular de tus datos puedes, en cualquier momento:'],
          items: [
            'Conocer, actualizar y rectificar tus datos.',
            'Solicitar prueba de la autorización que nos diste.',
            'Ser informado del uso que damos a tus datos.',
            'Revocar tu autorización y pedir la supresión de tus datos cuando no exista un deber legal o contractual de conservarlos.',
            'Acceder de forma gratuita a tus datos.',
            'Presentar quejas ante la Superintendencia de Industria y Comercio.',
          ],
        },
        {
          titulo: '7. Cómo ejercer tus derechos',
          parrafos: [
            `Escríbenos a ${NEGOCIO.email} o por WhatsApp al ${NEGOCIO.whatsappVisible} indicando tu nombre, tu solicitud y los datos de tu cuenta. Respondemos las consultas en máximo 10 días hábiles y los reclamos en máximo 15 días hábiles.`,
          ],
        },
        {
          titulo: '8. Menores de edad',
          parrafos: [
            'El sitio no está dirigido a menores de edad y no permitimos que compren directamente. Si crees que un menor nos entregó datos, escríbenos para eliminarlos.',
          ],
        },
        {
          titulo: '9. Seguridad y conservación',
          parrafos: [
            'Aplicamos medidas razonables para proteger tu información. Conservamos tus datos mientras tengas una cuenta o mientras la ley nos obligue a hacerlo.',
          ],
        },
        {
          titulo: '10. Cambios a esta política',
          parrafos: [
            'Si esta política cambia, publicaremos la nueva versión en esta página con su fecha de actualización.',
          ],
        },
      ],
    },

    envios: {
      titulo: 'Política de envíos',
      descripcion: `Cobertura, tiempos y costos de envío de ${NEGOCIO.nombre}.`,
      secciones: [
        {
          titulo: '1. Cobertura',
          parrafos: ['Enviamos a todo Colombia.'],
        },
        {
          titulo: '2. Transportadoras',
          parrafos: ['Trabajamos con Inter Rapidísimo y Envía.'],
        },
        {
          titulo: '3. Tiempo de entrega',
          parrafos: [
            'El tiempo estimado de entrega es de 3 a 5 días hábiles. Puede variar según la ciudad de destino y la operación de la transportadora.',
          ],
        },
        {
          titulo: '4. Costo del envío',
          items: [
            'El envío es contra entrega: no lo pagas en el sitio, se lo pagas directamente a la transportadora cuando recibes tu pedido.',
            envioGratisTexto(ctx),
          ],
        },
        {
          titulo: '5. Datos de entrega',
          parrafos: [
            'Revisa que tu dirección y tu teléfono estén correctos antes de confirmar. Si la transportadora no logra contactarte o entregar por datos incorrectos, el pedido puede demorarse o devolverse.',
          ],
        },
        {
          titulo: '6. Cuando recibes tu pedido',
          parrafos: [
            'Graba un video desde el momento en que abres el paquete, mostrando todo el proceso y contando las prendas que recibes. Este video es necesario si más adelante tienes que hacer un reclamo. Más detalle en la Política de cambios y devoluciones.',
          ],
        },
        {
          titulo: '7. Dudas',
          parrafos: [
            `Escríbenos por WhatsApp al ${NEGOCIO.whatsappVisible} (${NEGOCIO.horario}).`,
          ],
        },
      ],
    },

    cambios: {
      titulo: 'Política de cambios y devoluciones',
      descripcion: `Condiciones para cambios, devoluciones y reclamos en ${NEGOCIO.nombre}.`,
      secciones: [
        {
          titulo: '1. Regla general',
          parrafos: [
            'No hacemos cambios ni devoluciones por gusto, talla o color. Por eso te recomendamos revisar bien el producto antes de comprar. Los productos en descuento tampoco tienen cambio ni devolución por estos motivos.',
            'Sí atendemos reclamos cuando el pedido llega con prendas faltantes, con desperfectos o con inconsistencias frente a lo que compraste, siguiendo las condiciones de esta página.',
          ],
        },
        {
          titulo: '2. Plazo',
          parrafos: [
            'Debes avisarnos dentro de los 3 días siguientes a la entrega del pedido.',
          ],
        },
        {
          titulo: '3. Condiciones de la prenda',
          items: [
            'Sin usar y sin lavar.',
            'Con las etiquetas originales puestas.',
            'Con la factura o el comprobante de compra.',
          ],
        },
        {
          titulo: '4. Video obligatorio al abrir el paquete',
          parrafos: [
            'Para poder revisar tu reclamo necesitamos un video que muestre el paquete completo ANTES de destaparlo, todo el proceso de apertura y el conteo de las prendas que recibes, sin cortes y con el paquete visible todo el tiempo.',
            'No podemos responder reclamos por prendas faltantes, desperfectos o inconsistencias si no se entrega este video, o si el video es de un paquete ya abierto o no muestra claramente todo el proceso.',
          ],
        },
        {
          titulo: '5. Costos de envío del reclamo',
          parrafos: [
            `Cuando aplica un cambio, el costo se reparte por partes iguales: tú pagas el envío de regreso de la prenda a ${NEGOCIO.nombre} y ${NEGOCIO.nombre} paga el envío de la prenda de cambio.`,
          ],
        },
        {
          titulo: '6. Reembolsos',
          parrafos: [
            'Cuando corresponde un reembolso, se hace al mismo medio de pago con el que compraste. Lo procesamos dentro de las 24 horas siguientes a su aprobación; el tiempo en que se refleje en tu cuenta depende de tu banco o entidad financiera.',
          ],
        },
        {
          titulo: '7. Tus derechos como consumidor',
          parrafos: [
            'Lo dispuesto en esta política no limita los derechos que la Ley 1480 de 2011 (Estatuto del Consumidor) te reconoce, como la garantía legal y, en compras a distancia, el derecho de retracto en los términos que la ley establece.',
          ],
        },
        {
          titulo: '8. Cómo hacer un reclamo',
          parrafos: [
            `Escríbenos por WhatsApp al ${NEGOCIO.whatsappVisible} o al correo ${NEGOCIO.email}, con tu número de pedido y el video. Atendemos ${NEGOCIO.horario}.`,
          ],
        },
      ],
    },
  }

  return docs[slug] ?? null
}
