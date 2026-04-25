import {
  Activity,
  BadgeCheck,
  Camera,
  Cpu,
  Fingerprint,
  Globe,
  Headset,
  Network,
  ShieldCheck,
  Workflow,
} from "lucide-react";

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Sobre Nós", href: "/sobre-nos" },
  { label: "Serviços", href: "/servicos" },
  { label: "Soluções", href: "/solucoes" },
  { label: "Projetos", href: "/projetos" },
  { label: "Contato", href: "/contato" },
];

export const stats = [
  { value: 150, suffix: "+", label: "Clientes atendidos" },
  { value: 500, suffix: "+", label: "Projetos concluídos" },
  { value: 10, suffix: "+", label: "Anos de experiência" },
  { value: 24, suffix: "/7", label: "Suporte especializado" },
];

export const services = [
  {
    icon: Globe,
    title: "Desenvolvimento Web",
    description:
      "Sites institucionais, lojas virtuais, sistemas web sob medida e painéis administrativos com foco em performance.",
  },
  {
    icon: Camera,
    title: "Segurança Eletrônica",
    description:
      "Instalação de câmeras, DVR, NVR, monitoramento em TV e celular com acabamento profissional.",
  },
  {
    icon: Network,
    title: "Redes e Infraestrutura",
    description:
      "Cabeamento estruturado, organização de rack, roteadores, switches e Wi‑Fi empresarial confiável.",
  },
  {
    icon: Workflow,
    title: "Sistemas e Automação",
    description:
      "Automação de processos, integrações, APIs, relatórios inteligentes e soluções sob medida.",
  },
  {
    icon: Headset,
    title: "Suporte e Manutenção",
    description:
      "Suporte remoto e presencial, manutenção preventiva, formatação e otimização com atendimento ágil.",
  },
  {
    icon: Fingerprint,
    title: "Acesso e IA",
    description:
      "Controle de acesso, reconhecimento facial, monitoramento inteligente e segurança integrada.",
  },
];

export const differentialItems = [
  "Atendimento personalizado",
  "Soluções sob medida",
  "Experiência prática em campo",
  "Integração entre tecnologia e segurança",
  "Organização, clareza e foco em resultado",
  "Suporte rápido e confiável",
];

export const techPartners = [
  "Intelbras",
  "MikroTik",
  "Zabbix",
  "GLPI",
  "Fortinet",
  "Dell",
  "HP",
  "cPanel",
];

export const adminModules = [
  { icon: Activity, title: "Dashboard", href: "/sistema-kalion-x9/painel" },
  { icon: BadgeCheck, title: "Clientes", href: "/sistema-kalion-x9/painel/clientes" },
  { icon: Cpu, title: "Produtos e Serviços", href: "/sistema-kalion-x9/painel/servicos" },
  { icon: ShieldCheck, title: "Orçamentos", href: "/sistema-kalion-x9/painel/orcamentos" },
  { icon: ShieldCheck, title: "Pedidos", href: "/sistema-kalion-x9/painel/pedidos" },
  { icon: ShieldCheck, title: "Garantias", href: "/sistema-kalion-x9/painel/garantias" },
  { icon: Globe, title: "Projetos", href: "/sistema-kalion-x9/painel/projetos" },
];
