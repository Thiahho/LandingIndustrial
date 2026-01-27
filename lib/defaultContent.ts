import type { LandingContent } from "@/lib/types";

export const defaultContent: LandingContent = {
  hero: {
    eyebrow: "Seguridad física + seguridad electrónica",
    title: "Solidez operativa con tecnología aplicada a la protección real.",
    lead:
      "Diseñamos, monitoreamos y ejecutamos estrategias de seguridad integrales para hogares, comercios, empresas y operaciones logísticas.",
    primaryCta: "Seguridad física",
    secondaryCta: "Seguridad electrónica",
    contactCta: "Contacto inmediato",
    imagePublicId: "",
    highlights: [
      { title: "Central 24/7", text: "Monitoreo activo y respuesta coordinada." },
      { title: "Operación real", text: "Recursos, móviles y protocolos auditables." },
      { title: "Tecnología", text: "Integración entre personas, datos y dispositivos." }
    ]
  },
  guidance: {
    eyebrow: "Asesoramiento orientativo",
    title: "¿Qué solución es para vos?",
    text: "Te guiamos con recomendaciones claras según tu contexto. Sin tecnicismos, sin vueltas, con foco en resolver.",
    tags: ["Hogar", "Comercio", "Empresa", "Flota"]
  },
  services: [
    {
      title: "Central de Monitoreo",
      description: "Información accionable en tiempo real para prevenir y responder.",
      items: ["Monitoreo de cámaras", "Monitoreo de alarmas", "Análisis logístico", "Seguimiento satelital"]
    },
    {
      title: "Vigilancia Física",
      description: "Presencia profesional con protocolos claros y supervisión activa.",
      items: [
        "Vigilancia fija",
        "Custodia de mercaderías en tránsito",
        "Custodia personal",
        "Prevención de incendios"
      ]
    },
    {
      title: "Seguridad Electrónica",
      description: "Tecnología integrada para detectar, alertar y auditar cada evento.",
      items: ["Alarmas", "Cámaras de vigilancia (CCTV)", "Control de accesos", "Cerco eléctrico"]
    },
    {
      title: "Seguridad Patrimonial",
      description: "Cuidamos activos críticos y el cumplimiento normativo.",
      items: ["Seguridad e higiene", "Seguridad medioambiental"]
    },
    {
      title: "Investigaciones",
      description: "Información confiable para tomar decisiones y reducir riesgos.",
      items: ["Investigación de fraude", "Informes ambientales", "Capacitaciones", "Siniestros"]
    },
    {
      title: "Servicios Complementarios",
      description: "Refuerzos específicos para elevar el estándar operativo.",
      items: ["Control de pérdidas"]
    }
  ],
  solutions: [
    {
      tag: "Hogar",
      title: "Protección simple y visible",
      text: "Alarmas, CCTV y monitoreo con respuesta inmediata. Ideal para familias que buscan tranquilidad diaria."
    },
    {
      tag: "Comercio",
      title: "Control + prevención",
      text: "Control de accesos, cámaras y protocolos de apertura/cierre. Recomendado para locales con flujo constante."
    },
    {
      tag: "Empresa",
      title: "Operación auditada",
      text: "Vigilancia física, monitoreo y reportes claros. Pensado para estructuras con múltiples áreas y turnos."
    },
    {
      tag: "Flota",
      title: "Trazabilidad total",
      text: "Seguimiento satelital y análisis logístico para saber qué pasa y actuar rápido ante desvíos."
    }
  ],
  technology: [
    {
      title: "Central inteligente",
      text: "Eventos priorizados, protocolos activos y coordinación entre equipos físicos y electrónicos.",
      meta: "Operación 24/7",
      imagePublicId: ""
    },
    {
      title: "Datos para decidir",
      text: "Indicadores, reportes y visualización simple para tomar decisiones con respaldo.",
      meta: "Visibilidad real",
      imagePublicId: ""
    },
    {
      title: "Equipamiento validado",
      text: "Tecnología probada en campo para sostener continuidad operativa.",
      meta: "Implementación confiable",
      imagePublicId: ""
    }
  ],
  products: [
    {
      name: "Sistema CCTV inteligente",
      category: "Video vigilancia",
      description: "Cámaras con analítica, grabación segura y acceso remoto.",
      imagePublicId: ""
    },
    {
      name: "Control de accesos",
      category: "Accesos",
      description: "Gestión segura de ingresos con credenciales físicas o biométricas.",
      imagePublicId: ""
    },
    {
      name: "Alarmas perimetrales",
      category: "Perímetro",
      description: "Detección temprana con sensores inteligentes y alertas inmediatas.",
      imagePublicId: ""
    }
  ],
  company: [
    {
      value: "+20",
      label: "Años de experiencia",
      text: "Trayectoria en operaciones críticas y entornos exigentes."
    },
    {
      value: "24/7",
      label: "Cobertura operativa",
      text: "Supervisión activa con protocolos definidos y escalables."
    },
    {
      value: "100%",
      label: "Cumplimiento legal",
      text: "Habilitaciones, normativa vigente y procesos auditables."
    },
    {
      value: "360°",
      label: "Seguridad integral",
      text: "Personas, tecnología y metodología integradas en un mismo plan."
    }
  ],
  news: [
    {
      id: "news-1",
      date: "Actualización tecnológica",
      title: "Nueva capa de monitoreo preventivo",
      text: "Sumamos análisis de eventos para anticipar desvíos y reducir tiempos de respuesta.",
      imagePublicId: ""
    },
    {
      id: "news-2",
      date: "Operación",
      title: "Refuerzo de móviles y supervisión",
      text: "Ampliamos cobertura territorial con más recursos y trazabilidad en tiempo real.",
      imagePublicId: ""
    },
    {
      id: "news-3",
      date: "Clientes",
      title: "Bienvenida a nuevas cuentas corporativas",
      text: "Seguimos creciendo con estructuras que exigen solidez operativa y visibilidad total.",
      imagePublicId: ""
    }
  ],
  contact: {
    eyebrow: "Contacto directo",
    title: "Hablemos hoy.",
    text: "Unificamos tus necesidades de seguridad y te proponemos una solución clara, escalable y ejecutable.",
    whatsapp: "https://wa.me/5490000000000",
    commercialEmail: "comercial@amseguridad.com.ar",
    channels: [
      { label: "Clientes", value: "clientes@amseguridad.com.ar" },
      { label: "Teléfono", value: "+54 9 0000 0000" },
      { label: "Horario", value: "Atención + operación 24/7" }
    ],
    resources: [
      {
        id: "resource-1",
        title: "Carta de presentación (PDF)",
        href: "#",
        description: "Documento corporativo para compartir con áreas de compras y operaciones."
      },
      {
        id: "resource-2",
        title: "Ver servicios clave",
        href: "#servicios",
        description: "Recorré la cobertura integral por capas operativas."
      },
      {
        id: "resource-3",
        title: "Ver tecnología",
        href: "#tecnologia",
        description: "Entendé cómo combinamos datos, protocolos y equipamiento."
      }
    ]
  },
  jobs: {
    eyebrow: "Trabajá con nosotros",
    title: "Sumate a un equipo operativo y profesional.",
    text: "Postulate de forma simple. Un canal dedicado para recursos humanos.",
    points: ["Procesos claros y seguimiento.", "Roles operativos y técnicos.", "Capacitación continua."]
  }
};
