export type ServiceDetail = {
  slug: string;
  title: string;
  summary: string;
  image: string;
  itemsDetails: ServiceItemDetail[];
  descripcion: string;
  problems: string[];
  steps: string[];
  includes: string[];
  idealFor: string[];
  technologies: string[];
  cases: string[];
  faqs: { question: string; answer: string }[];
  gallery: string[];
};

export type ServiceItemDetail = {
  slug: string;
  title: string;
  description: string;
};

export type SectorDetail = {
  slug: string;
  title: string;
  image: string;
  risks: string[];
  services: string[];
  technologies: string[];
  cases: string[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  sector: string;
  services: string[];
  summary: string;
  result: string;
  image: string;
};

export type TechnologySection = {
  slug: string;
  title: string;
  description: string;
  items: { title: string; description: string; image: string }[];
};

export type NewsPost = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
};

export const mission =
  "Convertirnos en socios estratégicos de nuestros clientes, conocer en profundidad sus necesidades y brindarles sólidas alternativas en materia de seguridad.";

export const vision =
  "Ser una Empresa de Soluciones, reconocida por el cumplimiento de los compromisos, por la calidad de sus Servicios y por el constante espíritu de superación y pronta respuesta.";

export const values = [
  {
    title: "Vocación de servicio",
    text: "Sólo al satisfacer las expectativas de nuestros clientes sentimos que nuestra tarea es exitosa."
  },
  {
    title: "Dedicación",
    text: "Todo el esfuerzo y el empeño posible puesto al servicio del cumplimiento de los objetivos de corto, mediano y largo plazo."
  },
  {
    title: "Superación",
    text: "Optimizamos nuestro desempeño y vencemos obstáculos para lograr mejora continua como organización y como grupo humano."
  },
  {
    title: "Trabajo en equipo",
    text: "Agregamos valor a los procesos y compartimos metas para alcanzar el objetivo común."
  }
];

export const services: ServiceDetail[] = [
  {
    slug: "vigilancia-fisica",
    title: "Vigilancia física",
    summary:
      "Presencia profesional en campo para disuadir, prevenir y responder con protocolos claros.",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2070&auto=format&fit=crop",
    itemsDetails: [
      {
        slug: "vigilancia-fija",
        title: "Vigilancia fija",
        description:
          "Cobertura permanente con puestos estratégicos, rondas y control de accesos."
      },
      {
        slug: "custodias-logisticas",
        title: "Custodias logísticas",
        description:
          "Acompañamiento operativo para traslados críticos con protocolos auditables."
      },
      {
        slug: "prevencion-incidentes",
        title: "Prevención de incidentes",
        description:
          "Planificación preventiva para mitigar riesgos y coordinar respuestas rápidas."
      }
    ],
    problems: [
      "Necesidad de presencia permanente en áreas críticas.",
      "Control de ingresos y egresos sin fricciones.",
      "Prevención de incidentes en horarios sensibles."
    ],
    steps: [
      "Relevamiento de riesgos y puntos críticos.",
      "Asignación de personal y definición de protocolos.",
      "Supervisión activa y reportes continuos."
    ],
    includes: [
      "Vigiladores habilitados.",
      "Rondas y controles internos.",
      "Coordinación con central de monitoreo."
    ],
    idealFor: [
      "Empresas grandes con perímetros complejos.",
      "Plantas industriales y logística.",
      "Oficinas con alto flujo de visitantes."
    ],
    technologies: ["/tecnologia", "/tecnologia/equipos"],
    cases: ["operacion-logistica-24-7", "planta-industrial-segura"],
    faqs: [
      {
        question: "¿Cómo se define la dotación necesaria?",
        answer:
          "Determinamos la dotación según el mapa de riesgos, la operación y los turnos críticos."
      },
      {
        question: "¿Puedo sumar tecnología al servicio?",
        answer:
          "Sí. Integramos CCTV, control de accesos y monitoreo remoto para elevar la cobertura."
      }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    slug: "monitoreo",
    title: "Monitoreo y centro de control",
    summary:
      "Supervisión 24/7 con alertas inteligentes, protocolos de respuesta y trazabilidad operativa.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
    itemsDetails: [
      {
        slug: "monitoreo-24-7",
        title: "Monitoreo 24/7",
        description:
          "Operadores especializados con respuesta inmediata y trazabilidad completa."
      },
      {
        slug: "protocolos-respuesta",
        title: "Protocolos de respuesta",
        description:
          "Escalamiento y coordinación con recursos en campo según criticidad."
      },
      {
        slug: "reportes-ejecutivos",
        title: "Reportes ejecutivos",
        description:
          "Informes para auditorías, compliance y toma de decisiones."
      }
    ],
    problems: [
      "Eventos críticos sin respuesta inmediata.",
      "Falta de visibilidad sobre lo que ocurre en sedes remotas.",
      "Necesidad de reportes para auditoría."
    ],
    steps: [
      "Integración de señales, cámaras y alarmas.",
      "Configuración de protocolos por tipo de evento.",
      "Seguimiento y reportes en tiempo real."
    ],
    includes: [
      "Operadores 24/7.",
      "Protocolos escalables.",
      "Dashboards y reportes ejecutivos."
    ],
    idealFor: [
      "Empresas con múltiples sedes.",
      "Operaciones logísticas.",
      "Retail con apertura/cierre coordinado."
    ],
    technologies: ["/tecnologia", "/tecnologia/software"],
    cases: ["control-accesos-corporativo"],
    faqs: [
      {
        question: "¿Qué tipo de alertas se pueden configurar?",
        answer:
          "Configuramos alertas por intrusión, accesos no autorizados, humo, incendio o eventos personalizados."
      }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556155092-8707de31f9c4?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    slug: "seguridad-electronica",
    title: "Seguridad electrónica",
    summary:
      "Sensores, CCTV y alarmas integradas para anticipar riesgos y registrar evidencia.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
    itemsDetails: [
      {
        slug: "cctv-analitico",
        title: "CCTV con analítica",
        description:
          "Cobertura visual con detección inteligente y evidencia confiable."
      },
      {
        slug: "alarmas-monitoreadas",
        title: "Alarmas monitoreadas",
        description:
          "Alertas en tiempo real integradas con la central de monitoreo."
      },
      {
        slug: "control-perimetral",
        title: "Control perimetral",
        description:
          "Sensores y barreras para proteger perímetros críticos."
      }
    ],
    problems: [
      "Necesidad de detección temprana.",
      "Control de perímetros extensos.",
      "Registro de eventos críticos."
    ],
    steps: [
      "Diseño de arquitectura electrónica.",
      "Instalación y puesta en marcha.",
      "Integración con monitoreo y soporte."
    ],
    includes: [
      "CCTV con analítica.",
      "Alarmas monitoreadas.",
      "Mantenimiento preventivo."
    ],
    idealFor: [
      "Empresas medianas y grandes.",
      "Depósitos y centros de distribución.",
      "Edificios corporativos."
    ],
    technologies: ["/tecnologia/equipos"],
    cases: ["operacion-logistica-24-7"],
    faqs: [
      {
        question: "¿Qué cobertura puedo lograr?",
        answer:
          "Diseñamos cobertura por zonas críticas, perímetro y accesos para maximizar la detección temprana."
      }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    slug: "control-de-accesos",
    title: "Control de accesos",
    summary:
      "Gestión segura de ingresos con registros automáticos, credenciales y reportes.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
    itemsDetails: [
      {
        slug: "credenciales-seguras",
        title: "Credenciales seguras",
        description:
          "Accesos con tarjetas, biometría o móviles para validar ingresos."
      },
      {
        slug: "reportes-automaticos",
        title: "Reportes automáticos",
        description:
          "Históricos de accesos exportables para auditoría y compliance."
      },
      {
        slug: "integracion-cctv",
        title: "Integración con CCTV",
        description:
          "Registro visual de ingresos con trazabilidad inmediata."
      }
    ],
    problems: [
      "Ingresos sin trazabilidad.",
      "Necesidad de validar credenciales rápidamente.",
      "Integración con seguridad física."
    ],
    steps: [
      "Diagnóstico de flujos de acceso.",
      "Implementación de credenciales y lectores.",
      "Automatización de reportes y alertas."
    ],
    includes: [
      "Credenciales físicas o biométricas.",
      "Panel de administración.",
      "Integración con CCTV."
    ],
    idealFor: [
      "Oficinas corporativas.",
      "Plantas productivas.",
      "Centros logísticos."
    ],
    technologies: ["/tecnologia/software"],
    cases: ["control-accesos-corporativo"],
    faqs: [
      {
        question: "¿Se puede integrar con RRHH?",
        answer:
          "Sí, integraciones con sistemas de personal para trazabilidad y reportes."
      }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    slug: "investigaciones",
    title: "Investigaciones corporativas",
    summary:
      "Informes confiables y discretos para reducir riesgos y tomar decisiones informadas.",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop",
    itemsDetails: [
      {
        slug: "investigacion-fraudes",
        title: "Investigación de fraudes",
        description:
          "Análisis documental y de campo para esclarecer incidentes internos."
      },
      {
        slug: "informes-confidenciales",
        title: "Informes confidenciales",
        description:
          "Documentación clara para decisiones críticas y respaldo legal."
      },
      {
        slug: "recomendaciones-mejora",
        title: "Recomendaciones de mejora",
        description:
          "Plan de acción para mitigar riesgos futuros."
      }
    ],
    problems: [
      "Necesidad de evidencia ante incidentes.",
      "Verificación de antecedentes y procesos.",
      "Detección de fraudes internos."
    ],
    steps: [
      "Definición del alcance y objetivos.",
      "Trabajo de campo y análisis documental.",
      "Entrega de informe ejecutivo."
    ],
    includes: [
      "Informes confidenciales.",
      "Soporte legal y documental.",
      "Recomendaciones de mejora."
    ],
    idealFor: [
      "Empresas medianas y grandes.",
      "Áreas de compliance.",
      "Operaciones con riesgo reputacional."
    ],
    technologies: ["/tecnologia/integraciones"],
    cases: ["planta-industrial-segura"],
    faqs: [
      {
        question: "¿Qué nivel de confidencialidad manejan?",
        answer:
          "La información se gestiona con protocolos de confidencialidad y acceso restringido."
      }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    slug: "servicios-complementarios",
    title: "Servicios complementarios",
    summary:
      "Capacitaciones, auditorías y refuerzos operativos para elevar el estándar de seguridad.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
    itemsDetails: [
      {
        slug: "capacitaciones",
        title: "Capacitaciones",
        description:
          "Entrenamiento de equipos en protocolos y respuesta ante incidentes."
      },
      {
        slug: "auditorias-internas",
        title: "Auditorías internas",
        description:
          "Revisión de procesos para asegurar cumplimiento y mejora continua."
      },
      {
        slug: "control-perdidas",
        title: "Control de pérdidas",
        description:
          "Acciones preventivas para reducir desvíos en operaciones críticas."
      }
    ],
    problems: [
      "Necesidad de reforzar protocolos internos.",
      "Falta de procedimientos estandarizados.",
      "Mejora continua de la seguridad."
    ],
    steps: [
      "Diagnóstico operativo.",
      "Plan de mejora y capacitación.",
      "Seguimiento y auditoría."
    ],
    includes: [
      "Capacitaciones en seguridad.",
      "Auditorías internas.",
      "Plan de mejora continua."
    ],
    idealFor: [
      "Empresas con equipos internos.",
      "Organizaciones con normativas estrictas.",
      "Clientes que buscan mejora continua."
    ],
    technologies: ["/tecnologia"],
    cases: ["operacion-logistica-24-7"],
    faqs: [
      {
        question: "¿Se adaptan a nuestro protocolo?",
        answer:
          "Sí, trabajamos sobre los procedimientos existentes y proponemos mejoras según riesgos reales."
      }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1200&auto=format&fit=crop"
    ]
  }
];

export const sectors: SectorDetail[] = [
  {
    slug: "logistica",
    title: "Logística y depósitos",
    image:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=2070&auto=format&fit=crop",
    risks: [
      "Control de accesos en múltiples portones.",
      "Custodia de mercadería sensible.",
      "Operaciones 24/7 con turnos rotativos."
    ],
    services: ["vigilancia-fisica", "monitoreo", "seguridad-electronica"],
    technologies: ["CCTV inteligente", "Sensores perimetrales"],
    cases: ["operacion-logistica-24-7"]
  },
  {
    slug: "industria",
    title: "Industria y plantas productivas",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop",
    risks: [
      "Protección de activos críticos.",
      "Control de proveedores y visitas.",
      "Prevención de incidentes operativos."
    ],
    services: ["vigilancia-fisica", "control-de-accesos"],
    technologies: ["Control de accesos", "Monitoreo remoto"],
    cases: ["planta-industrial-segura"]
  },
  {
    slug: "oficinas",
    title: "Oficinas corporativas",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2070&auto=format&fit=crop",
    risks: [
      "Control de visitas y proveedores.",
      "Protección de información sensible.",
      "Gestión de evacuación y emergencias."
    ],
    services: ["control-de-accesos", "monitoreo"],
    technologies: ["Credenciales digitales", "CCTV en interiores"],
    cases: ["control-accesos-corporativo"]
  },
  {
    slug: "retail",
    title: "Retail y cadenas de locales",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
    risks: [
      "Aperturas y cierres simultáneos.",
      "Control de pérdidas.",
      "Supervisión de múltiples puntos de venta."
    ],
    services: ["monitoreo", "seguridad-electronica"],
    technologies: ["Alarmas monitoreadas", "Video analítica"],
    cases: ["operacion-logistica-24-7"]
  },
  {
    slug: "edificios",
    title: "Edificios corporativos",
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=2070&auto=format&fit=crop",
    risks: [
      "Flujo de visitantes y residentes.",
      "Control de perímetro y estacionamientos.",
      "Coordinación con consorcios."
    ],
    services: ["vigilancia-fisica", "control-de-accesos"],
    technologies: ["Video vigilancia", "Control perimetral"],
    cases: ["control-accesos-corporativo"]
  }
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "operacion-logistica-24-7",
    title: "Operación logística con monitoreo 24/7",
    sector: "Logística",
    services: ["monitoreo", "seguridad-electronica"],
    summary:
      "Centralizamos señales y cámaras de un centro de distribución con operaciones 24/7.",
    result: "Reducción del 35% en incidentes y mejor trazabilidad operativa.",
    image:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=2070&auto=format&fit=crop"
  },
  {
    slug: "planta-industrial-segura",
    title: "Planta industrial segura y auditada",
    sector: "Industria",
    services: ["vigilancia-fisica", "investigaciones"],
    summary:
      "Implementación de vigilancia física y protocolos de investigación ante incidentes.",
    result: "Cumplimiento normativo y reducción de desvíos internos.",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop"
  },
  {
    slug: "control-accesos-corporativo",
    title: "Control de accesos corporativo",
    sector: "Oficinas",
    services: ["control-de-accesos", "monitoreo"],
    summary:
      "Reemplazamos registros manuales por credenciales inteligentes y monitoreo.",
    result: "Mayor seguridad y reportes automáticos para auditorías.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2070&auto=format&fit=crop"
  }
];

export const technologySections: TechnologySection[] = [
  {
    slug: "equipos",
    title: "Equipos y dispositivos",
    description:
      "Hardware certificado para operar en ambientes críticos con continuidad garantizada.",
    items: [
      {
        title: "CCTV con analítica",
        description: "Cámaras con detección inteligente y evidencia en tiempo real.",
        image:
          "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=2070&auto=format&fit=crop"
      },
      {
        title: "Sensores perimetrales",
        description: "Alertas tempranas ante intrusiones o movimientos no autorizados.",
        image:
          "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=2070&auto=format&fit=crop"
      }
    ]
  },
  {
    slug: "software",
    title: "Plataformas y software",
    description:
      "Tableros, reportes y automatización para tomar decisiones rápidas.",
    items: [
      {
        title: "Dashboard operativo",
        description: "KPIs de seguridad y reportes exportables.",
        image:
          "https://images.unsplash.com/photo-1551281044-8b9a3c711d7b?q=80&w=2070&auto=format&fit=crop"
      },
      {
        title: "Gestión de accesos",
        description: "Trazabilidad completa de ingresos y salidas.",
        image:
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
      }
    ]
  },
  {
    slug: "integraciones",
    title: "Integraciones y proyectos especiales",
    description:
      "Conectamos seguridad física, electrónica y datos del negocio.",
    items: [
      {
        title: "Integración con ERP",
        description: "Automatización de alertas y reportes por área.",
        image:
          "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop"
      }
    ]
  }
];

export const newsPosts: NewsPost[] = [
  {
    slug: "buenas-practicas-cctv",
    title: "Buenas prácticas para gestionar CCTV empresarial",
    date: "12 Mar 2024",
    category: "Buenas prácticas",
    excerpt:
      "Checklist operativo para que tu CCTV tenga evidencia confiable y respuesta inmediata.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2070&auto=format&fit=crop"
  },
  {
    slug: "nuevas-integraciones",
    title: "Integraciones que aceleran la respuesta operativa",
    date: "28 Feb 2024",
    category: "Actualizaciones tecnológicas",
    excerpt:
      "Conectamos eventos críticos con la mesa de operaciones para escalar rápido.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
  },
  {
    slug: "expansion-casos-reales",
    title: "Casos reales: expansión en logística",
    date: "05 Feb 2024",
    category: "Noticias de la empresa",
    excerpt:
      "Nuevos contratos en centros de distribución con cobertura 24/7.",
    image:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=2070&auto=format&fit=crop"
  }
];

export const contactInfo = {
  whatsapp: "https://wa.me/5491156714600",
  commercialEmail: "comercial@amseguridad.com.ar",
  address: "Av. Corrientes 1234, CABA, Argentina",
  phone: "(011) 5671-4600",
  schedule: "Lun a Vie · 09:00 a 18:00 · Operación 24/7"
};

export type SegmentServiceItem = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  image: string;
  tips: string[];
};

export type SegmentCategory = {
  slug: string;
  title: string;
  description: string;
  items: SegmentServiceItem[];
};

export type SegmentDetail = {
  slug: string;
  title: string;
  description: string;
  heroImage: string;
  categories: SegmentCategory[];
};

export const segmentDetails: SegmentDetail[] = [
  {
    slug: "personas-hogar",
    title: "Personas y hogar",
    description:
      "Protección integral para viviendas, consorcios y barrios cerrados con foco en respuesta inmediata.",
    heroImage:
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=2000&auto=format&fit=crop",
    categories: [
      {
        slug: "monitoreo-remoto",
        title: "Sistemas de monitoreo remoto",
        description:
          "Central activa 24/7 con seguimiento de cámaras, alarmas y activos críticos.",
        items: [
          {
            slug: "monitoreo-camaras",
            title: "Monitoreo de cámaras",
            summary:
              "Supervisión continua con alertas y reporte de eventos relevantes.",
            description:
              "Integramos cámaras con la central para visualización en tiempo real y protocolos de respuesta.",
            image:
              "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop",
            tips: [
              "Recomendado para hogares y consorcios con accesos múltiples.",
              "Incluye seguimiento en horarios críticos.",
              "Alertas configurables por evento."
            ]
          },
          {
            slug: "monitoreo-alarmas",
            title: "Monitoreo de alarmas",
            summary:
              "Alarmas conectadas con operadores especializados y respuesta inmediata.",
            description:
              "Gestión de eventos de intrusión con verificación y escalamiento según protocolo.",
            image:
              "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1400&auto=format&fit=crop",
            tips: [
              "Ideal para viviendas y comercios familiares.",
              "Verificación rápida con respuesta coordinada.",
              "Reporte posterior del evento."
            ]
          },
          {
            slug: "analisis-logistico",
            title: "Análisis logístico",
            summary:
              "Cobertura del movimiento de activos y control de aperturas.",
            description:
              "Seguimiento de rutas, horarios y puntos sensibles para operaciones residenciales y pequeñas flotas.",
            image:
              "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1400&auto=format&fit=crop",
            tips: [
              "Alineado con entregas y recepción de mercadería.",
              "Reportes claros por evento.",
              "Control de accesos y aperturas."
            ]
          },
          {
            slug: "seguimiento-satelital",
            title: "Seguimiento satelital",
            summary:
              "Ubicación y control de activos con visibilidad total.",
            description:
              "Monitoreo de vehículos y activos móviles con alertas ante desvíos.",
            image:
              "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1400&auto=format&fit=crop",
            tips: [
              "Recomendado para vehículos familiares o de trabajo.",
              "Alertas por zonas y horarios.",
              "Acceso a reportes históricos."
            ]
          },
          {
            slug: "otros-servicios",
            title: "Otros servicios",
            summary: "Asesoramiento y servicios complementarios.",
            description:
              "Consultanos para soluciones específicas fuera del paquete estándar.",
            image:
              "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1400&auto=format&fit=crop",
            tips: [
              "Evaluación personalizada.",
              "Integraciones adicionales.",
              "Atención directa con el equipo técnico."
            ]
          }
        ]
      },
      {
        slug: "seguridad-electronica",
        title: "Seguridad electrónica",
        description:
          "Disuasión activa con sensores, CCTV y control perimetral.",
        items: [
          {
            slug: "alarmas",
            title: "Alarmas",
            summary: "Protección perimetral con alertas inmediatas.",
            description:
              "Sistemas de detección temprana integrados con monitoreo remoto.",
            image:
              "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1400&auto=format&fit=crop",
            tips: [
              "Configuraciones adaptadas al inmueble.",
              "Alertas con verificación previa.",
              "Mantenimiento preventivo."
            ]
          },
          {
            slug: "camaras-vigilancia",
            title: "Cámaras de vigilancia",
            summary: "CCTV con cobertura y registro permanente.",
            description:
              "Implementación de cámaras fijas o móviles con acceso remoto seguro.",
            image:
              "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1400&auto=format&fit=crop",
            tips: [
              "Monitoreo en tiempo real.",
              "Grabación y evidencias disponibles.",
              "Integración con alarmas."
            ]
          },
          {
            slug: "control-acceso",
            title: "Control de acceso",
            summary: "Gestión segura de ingresos y egresos.",
            description:
              "Sistemas de credenciales y control de visitantes para viviendas y consorcios.",
            image:
              "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1400&auto=format&fit=crop",
            tips: [
              "Registro automático de accesos.",
              "Compatibilidad con CCTV.",
              "Alertas por excepción."
            ]
          },
          {
            slug: "cerco-electrico",
            title: "Cerco eléctrico",
            summary: "Disuasión perimetral activa y segura.",
            description:
              "Instalación y mantenimiento de cercos eléctricos certificados.",
            image:
              "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1400&auto=format&fit=crop",
            tips: [
              "Ideal para perímetros vulnerables.",
              "Integración con alarmas.",
              "Cumplimiento normativo."
            ]
          }
        ]
      },
      {
        slug: "seguridad-fisica",
        title: "Seguridad física",
        description:
          "Presencia profesional para custodias y prevención en campo.",
        items: [
          {
            slug: "vigilancia-fisica",
            title: "Vigilancia física",
            summary: "Guardias con protocolos claros y supervisión activa.",
            description:
              "Cobertura presencial para eventos, consorcios y residencias.",
            image:
              "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1400&auto=format&fit=crop",
            tips: [
              "Dotación flexible según horarios.",
              "Supervisión permanente.",
              "Coordinación con monitoreo."
            ]
          },
          {
            slug: "custodia-mercaderias",
            title: "Custodia de mercaderías en tránsito",
            summary: "Seguimiento y custodia para traslados críticos.",
            description:
              "Protocolos de acompañamiento y seguimiento en rutas sensibles.",
            image:
              "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=1400&auto=format&fit=crop",
            tips: [
              "Monitoreo coordinado.",
              "Protocolos de desvío.",
              "Reporte posterior."
            ]
          },
          {
            slug: "custodia-personal",
            title: "Custodia personal",
            summary: "Protección personalizada para situaciones especiales.",
            description:
              "Cobertura discreta y profesional en traslados o eventos.",
            image:
              "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=1400&auto=format&fit=crop",
            tips: [
              "Equipo entrenado y habilitado.",
              "Planificación previa del recorrido.",
              "Coordinación con central."
            ]
          },
          {
            slug: "prevencion-incendios",
            title: "Prevención de incendios",
            summary: "Planes preventivos y respuesta coordinada.",
            description:
              "Inspección, protocolos y acompañamiento en situaciones de riesgo.",
            image:
              "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1400&auto=format&fit=crop",
            tips: [
              "Protocolos con normativa vigente.",
              "Capacitación en sitio.",
              "Control periódico."
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "negocios-comercios",
    title: "Negocios y comercios",
    description:
      "Cobertura integral para locales, depósitos y cadenas comerciales.",
    heroImage:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=2000&auto=format&fit=crop",
    categories: [
      {
        slug: "monitoreo-remoto",
        title: "Sistema de monitoreo remoto",
        description:
          "Alertas inteligentes y control de aperturas en tiempo real.",
        items: [
          {
            slug: "monitoreo-camaras",
            title: "Monitoreo de cámaras",
            summary: "Control visual para operaciones comerciales.",
            description:
              "Seguimiento continuo de cámaras con alertas por eventos críticos.",
            image:
              "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop",
            tips: [
              "Cobertura de cajas y accesos.",
              "Alertas ante movimientos fuera de horario.",
              "Reportes para auditoría."
            ]
          },
          {
            slug: "monitoreo-alarmas",
            title: "Monitoreo de alarmas",
            summary: "Protocolos de respuesta rápida y coordinada.",
            description:
              "Integración de alarmas con la central y escalamiento inmediato.",
            image:
              "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1400&auto=format&fit=crop",
            tips: [
              "Aperturas y cierres seguros.",
              "Notificación a responsables.",
              "Soporte 24/7."
            ]
          },
          {
            slug: "analisis-logistico",
            title: "Análisis logístico",
            summary: "Visibilidad sobre rutas y activos en movimiento.",
            description:
              "Monitoreo de entregas, horarios críticos y puntos sensibles.",
            image:
              "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1400&auto=format&fit=crop",
            tips: [
              "Seguimiento de entregas.",
              "Alertas ante desvíos.",
              "Reportes ejecutivos."
            ]
          },
          {
            slug: "seguimiento-satelital",
            title: "Seguimiento satelital",
            summary: "Control en tiempo real de flotas comerciales.",
            description:
              "Localización permanente con alertas por geocercas.",
            image:
              "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1400&auto=format&fit=crop",
            tips: [
              "Control de entregas.",
              "Optimización de rutas.",
              "Historial de recorridos."
            ]
          },
          {
            slug: "otros-servicios",
            title: "Otros servicios",
            summary: "Servicios adicionales para operaciones comerciales.",
            description:
              "Consultanos para cobertura adicional en eventos o campañas.",
            image:
              "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1400&auto=format&fit=crop",
            tips: [
              "Planes especiales.",
              "Refuerzos temporales.",
              "Cobertura flexible."
            ]
          }
        ]
      },
      {
        slug: "seguridad-fisica",
        title: "Vigilancia física",
        description:
          "Presencia en campo para prevenir incidentes en locales y depósitos.",
        items: [
          {
            slug: "vigilancia-fisica",
            title: "Vigilancia física",
            summary: "Guardias capacitados y protocolos claros.",
            description:
              "Cobertura presencial con rondas y control de accesos.",
            image:
              "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1400&auto=format&fit=crop",
            tips: [
              "Cobertura en horarios críticos.",
              "Supervisión permanente.",
              "Reportes de novedades."
            ]
          },
          {
            slug: "custodia-mercaderias",
            title: "Custodia de mercaderías en tránsito",
            summary: "Seguimiento de cargas y operaciones sensibles.",
            description:
              "Custodias con protocolos definidos para traslados críticos.",
            image:
              "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=1400&auto=format&fit=crop",
            tips: [
              "Coordinación con monitoreo.",
              "Protocolos ante desvíos.",
              "Cobertura nacional."
            ]
          },
          {
            slug: "custodia-personal",
            title: "Custodia personal",
            summary: "Protección discreta para ejecutivos y personal clave.",
            description:
              "Equipo entrenado para situaciones especiales y eventos.",
            image:
              "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=1400&auto=format&fit=crop",
            tips: [
              "Planificación previa.",
              "Equipo habilitado.",
              "Cobertura flexible."
            ]
          },
          {
            slug: "prevencion-incendios",
            title: "Prevención de incendios",
            summary: "Planes y protocolos para locales y depósitos.",
            description:
              "Inspecciones y capacitación preventiva con cumplimiento normativo.",
            image:
              "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1400&auto=format&fit=crop",
            tips: [
              "Planes de evacuación.",
              "Capacitación del personal.",
              "Control de riesgos."
            ]
          }
        ]
      },
      {
        slug: "investigaciones",
        title: "Investigaciones",
        description:
          "Informes para auditorías, compliance y toma de decisiones.",
        items: [
          {
            slug: "investigacion-fraude",
            title: "Investigación de fraude",
            summary: "Detección y análisis de irregularidades.",
            description:
              "Investigaciones confidenciales con reporte ejecutivo.",
            image:
              "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1400&auto=format&fit=crop",
            tips: [
              "Informe detallado.",
              "Confidencialidad total.",
              "Recomendaciones operativas."
            ]
          },
          {
            slug: "informe-ambiental",
            title: "Informe ambiental",
            summary: "Evaluaciones para entornos comerciales.",
            description:
              "Análisis de riesgos y recomendaciones de mejora.",
            image:
              "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1400&auto=format&fit=crop",
            tips: [
              "Cumplimiento normativo.",
              "Reporte ejecutivo.",
              "Planes preventivos."
            ]
          },
          {
            slug: "capacitaciones",
            title: "Capacitaciones",
            summary: "Entrenamiento para personal de operaciones.",
            description:
              "Programas de formación para reforzar protocolos.",
            image:
              "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1400&auto=format&fit=crop",
            tips: [
              "Contenido práctico.",
              "Equipos operativos y administrativos.",
              "Actualización constante."
            ]
          },
          {
            slug: "siniestros",
            title: "Siniestros",
            summary: "Informe y seguimiento de eventos críticos.",
            description:
              "Documentación, análisis y reporte de incidentes.",
            image:
              "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=1400&auto=format&fit=crop",
            tips: [
              "Informe detallado.",
              "Soporte para aseguradoras.",
              "Gestión documental."
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "empresa-instituciones",
    title: "Empresa e instituciones",
    description:
      "Seguridad patrimonial y cumplimiento normativo para organizaciones complejas.",
    heroImage:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=2000&auto=format&fit=crop",
    categories: [
      {
        slug: "seguridad-patrimonial",
        title: "Seguridad patrimonial",
        description:
          "Cobertura integral para operaciones críticas y cumplimiento legal.",
        items: [
          {
            slug: "seguridad-higiene",
            title: "Seguridad e higiene",
            summary: "Protocolos y auditorías de cumplimiento.",
            description:
              "Planes de seguridad internos y asesoramiento en normativa vigente.",
            image:
              "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1400&auto=format&fit=crop",
            tips: [
              "Diagnóstico inicial.",
              "Plan de mejoras.",
              "Seguimiento periódico."
            ]
          },
          {
            slug: "seguridad-medioambiental",
            title: "Seguridad medioambiental",
            summary: "Gestión de riesgos y cumplimiento ambiental.",
            description:
              "Evaluación de riesgos ambientales y planes de mitigación.",
            image:
              "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1400&auto=format&fit=crop",
            tips: [
              "Cumplimiento normativo.",
              "Reportes claros.",
              "Recomendaciones operativas."
            ]
          },
          {
            slug: "otros-servicios",
            title: "Otros servicios",
            summary: "Soluciones a medida para instituciones.",
            description:
              "Consultanos por necesidades específicas o coberturas especiales.",
            image:
              "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1400&auto=format&fit=crop",
            tips: [
              "Proyectos a medida.",
              "Equipo dedicado.",
              "Soporte continuo."
            ]
          }
        ]
      }
    ]
  }
];
