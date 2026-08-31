import {
    type ReactNode,
    type VideoHTMLAttributes,
    useEffect,
    useRef,
    useState,
} from "react";
import logoMark from "../assets/img/logohb.png";

const whatsappUrl = "https://wa.me/5548999188549";
const contactHref = `${whatsappUrl}?text=${encodeURIComponent("Olá, gostaria de conversar sobre um projeto audiovisual.")}`;

const videos = {
    hero: "https://storage.googleapis.com/hbfilms/king.mp4",
    chefDoDisco: "https://storage.googleapis.com/hbfilms/chefdisco.MP4",
    eventos: "https://storage.googleapis.com/hbfilms/eventos.MP4",
    paoDeLo: "https://storage.googleapis.com/hbfilms/paodelo.mp4",
    atletas: "https://storage.googleapis.com/hbfilms/atletas.MP4",
    imobiliario: "https://storage.googleapis.com/hbfilms/corretor.MP4",
};

type Project = {
    code: string;
    category: string;
    title: string;
    client: string;
    description: string;
    source: string;
    format: string;
};

const projects: Project[] = [
    {
        code: "014",
        category: "Gastronomia",
        title: "Conteúdo Gastronômico",
        client: "Chef do Disco",
        description:
            "Vídeos estratégicos para gerar desejo, engajamento e alcance no Instagram e TikTok.",
        source: videos.chefDoDisco,
        format: "Conteúdo gastronômico",
    },
    {
        code: "021",
        category: "Atletas",
        title: "Vídeos para Atletas",
        client: "Futevôlei",
        description:
            "Conteúdos individuais que destacam os melhores lances, a habilidade e a performance de cada atleta.",
        source: videos.atletas,
        format: "Vídeos para atletas",
    },
    {
        code: "032",
        category: "Imobiliário",
        title: "Conteúdos imobiliários",
        client: "Ramo Imobiliário",
        description:
            "Vídeos que apresentam cada detalhe do imóvel de forma estratégica, valorizando o espaço e atraindo compradores.",
        source: videos.imobiliario,
        format: "Conteúdos imobiliários",
    },
    {
        code: "027",
        category: "Eventos",
        title: "Cobertura de Eventos",
        client: "Monise",
        description:
            "Registros que transformam aniversários, celebrações e momentos especiais em memórias para sempre.",
        source: videos.eventos,
        format: "Cobertura de eventos",
    },
    {
        code: "018",
        category: "Comercial",
        title: "Conteúdo Comercial",
        client: "Pão de Ló",
        description:
            "Vídeos que apresentam os produtos, despertam o desejo e atraem clientes para o estabelecimento.",
        source: videos.paoDeLo,
        format: "Conteúdo comercial",
    },
];

const capabilities = [
    [
        "Vídeos corporativos",
        "Para apresentar uma empresa, uma operação ou uma nova fase com clareza.",
    ],
    [
        "Vídeos de marca",
        "Para dar forma, tom e presença ao que uma marca quer dizer.",
    ],
    [
        "Produto e indústria",
        "Para mostrar como algo funciona sem reduzir a história ao manual.",
    ],
    [
        "Eventos e esporte",
        "Para registrar ritmo, escala e a energia que não cabe em uma foto.",
    ],
    [
        "Conteúdo para redes",
        "Cortes verticais e peças curtas que mantêm a campanha em movimento.",
    ],
];

function Arrow({
    direction = "right",
}: {
    direction?: "right" | "left" | "down";
}) {
    return <span className={`arrow arrow-${direction}`} aria-hidden="true" />;
}

function Viewfinder() {
    return (
        <span className="viewfinder" aria-hidden="true">
            <i className="viewfinder-corner corner-top-left" />
            <i className="viewfinder-corner corner-top-right" />
            <i className="viewfinder-corner corner-bottom-left" />
            <i className="viewfinder-corner corner-bottom-right" />
        </span>
    );
}

function Reveal({
    children,
    className = "",
}: {
    children: ReactNode;
    className?: string;
}) {
    const [visible, setVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.12 },
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`reveal ${visible ? "is-visible" : ""} ${className}`}
        >
            {children}
        </div>
    );
}

type LazyVideoProps = VideoHTMLAttributes<HTMLVideoElement> & {
    source: string;
    eager?: boolean;
};

function playMutedVideo(node: HTMLVideoElement) {
    node.muted = true;
    node.defaultMuted = true;
    node.volume = 0;
    node.play().catch(() => undefined);
}

function LazyVideo({
    source,
    eager = false,
    className = "",
    ...props
}: LazyVideoProps) {
    const [loaded, setLoaded] = useState(eager);
    const ref = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        if (eager) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setLoaded(true);
                } else {
                    node.pause();
                }
            },
            { rootMargin: "320px 0px" },
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, [eager]);

    useEffect(() => {
        const node = ref.current;
        if (!node || !loaded) return;

        const retryAutoplay = () => playMutedVideo(node);
        const retryWhenVisible = () => {
            if (document.visibilityState === "visible") {
                retryAutoplay();
            }
        };

        node.addEventListener("loadedmetadata", retryAutoplay);
        node.addEventListener("loadeddata", retryAutoplay);
        node.addEventListener("canplay", retryAutoplay);
        document.addEventListener("visibilitychange", retryWhenVisible);
        retryAutoplay();

        return () => {
            node.removeEventListener("loadedmetadata", retryAutoplay);
            node.removeEventListener("loadeddata", retryAutoplay);
            node.removeEventListener("canplay", retryAutoplay);
            document.removeEventListener("visibilitychange", retryWhenVisible);
        };
    }, [loaded, source]);

    return (
        <video
            ref={ref}
            className={`lazy-video ${loaded ? "is-loaded" : ""} ${className}`}
            src={loaded ? source : undefined}
            preload={eager ? "auto" : "metadata"}
            {...props}
            muted
            onLoadedMetadata={(event) => playMutedVideo(event.currentTarget)}
            onLoadedData={(event) => playMutedVideo(event.currentTarget)}
            onCanPlay={(event) => playMutedVideo(event.currentTarget)}
        />
    );
}

function CaseVideo({ source }: { source: string }) {
    const ref = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const playWithSound = () => {
            node.muted = false;
            node.defaultMuted = false;
            node.volume = 1;
            node.play().catch(() => undefined);
        };

        node.addEventListener("loadeddata", playWithSound);
        if (node.readyState >= 2) playWithSound();

        return () => {
            node.pause();
            node.currentTime = 0;
            node.removeEventListener("loadeddata", playWithSound);
        };
    }, [source]);

    return (
        <video
            ref={ref}
            className="case-video"
            src={source}
            autoPlay
            controls
            playsInline
            preload="auto"
        />
    );
}

function ProjectCard({
    project,
    featured,
    onSelect,
}: {
    project: Project;
    featured?: boolean;
    onSelect: () => void;
}) {
    return (
        <article
            className={`project-card ${featured ? "project-card-featured" : ""}`}
        >
            <button
                className="project-media"
                type="button"
                onClick={onSelect}
                aria-label={`Abrir projeto ${project.client}`}
            >
                <LazyVideo
                    source={project.source}
                    muted
                    autoPlay
                    loop
                    playsInline
                    aria-hidden="true"
                />
                <span className="project-media-overlay" />
                <Viewfinder />
                <span className="project-play">
                    ver vídeo <Arrow />
                </span>
            </button>
            <div className="project-caption">
                <div>
                    <p className="eyebrow">{project.category}</p>
                    <h3>{project.title}</h3>
                </div>
                <div className="project-meta">
                    <span>{project.client}</span>
                </div>
            </div>
        </article>
    );
}

function OpeningSequence({ onFinish }: { onFinish: () => void }) {
    useEffect(() => {
        const timeout = window.setTimeout(onFinish, 850);
        return () => window.clearTimeout(timeout);
    }, [onFinish]);
    return (
        <div
            className="opening-sequence"
            aria-label="Abertura hb produtora audiovisual"
        >
            <div className="opening-line" />
            <div className="opening-content">
                <span className="opening-time">00:00:00:00</span>
                <span className="opening-title">Uma produtora audiovisual</span>
            </div>
        </div>
    );
}

function App() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [introVisible, setIntroVisible] = useState(true);
    const [selectedProject, setSelectedProject] = useState<Project | null>(
        null,
    );
    const [activeCapability, setActiveCapability] = useState(0);
    const [backToTopVisible, setBackToTopVisible] = useState(false);
    const heroRef = useRef<HTMLElement>(null);

    useEffect(() => {
        document.body.classList.toggle("menu-is-open", menuOpen);
        return () => document.body.classList.remove("menu-is-open");
    }, [menuOpen]);

    useEffect(() => {
        document.body.classList.toggle(
            "case-is-open",
            Boolean(selectedProject),
        );
        return () => document.body.classList.remove("case-is-open");
    }, [selectedProject]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setMenuOpen(false);
                setSelectedProject(null);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        const hero = heroRef.current;
        if (!hero) return;
        const observer = new IntersectionObserver(
            ([entry]) => setBackToTopVisible(!entry.isIntersecting),
            { threshold: 0.1 },
        );
        observer.observe(hero);
        return () => observer.disconnect();
    }, []);

    const closeMenu = () => setMenuOpen(false);

    return (
        <div className="site-shell">
            {introVisible && (
                <OpeningSequence onFinish={() => setIntroVisible(false)} />
            )}

            <header className="site-header">
                <a
                    className="brand-lockup"
                    href="#inicio"
                    onClick={closeMenu}
                    aria-label="hb produtora audiovisual, início"
                >
                    <img src={logoMark} alt="hb produtora audiovisual" />
                </a>
                <nav className="desktop-nav" aria-label="Navegação principal">
                    <a href="#portfolio">Trabalhos</a>
                    <a href="#processo">Processo</a>
                    <a href="#contato">Contato</a>
                </nav>
                <div className="header-side">
                    <span className="header-status">
                        <span className="status-mark" /> disponível para
                        projetos
                    </span>
                    <button
                        className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
                        type="button"
                        aria-expanded={menuOpen}
                        aria-controls="site-menu"
                        onClick={() => setMenuOpen((open) => !open)}
                    >
                        <span>{menuOpen ? "fechar" : "menu"}</span>
                        <i className="menu-lines" aria-hidden="true" />
                    </button>
                </div>
            </header>

            <div
                id="site-menu"
                className={`menu-panel ${menuOpen ? "is-open" : ""}`}
                aria-hidden={!menuOpen}
            >
                <div className="menu-panel-inner">
                    <p className="eyebrow">Navegação</p>
                    <nav className="menu-links" aria-label="Menu expandido">
                        <a href="#portfolio" onClick={closeMenu}>
                            <span>01</span> Trabalhos <Arrow />
                        </a>
                        <a href="#processo" onClick={closeMenu}>
                            <span>02</span> Processo <Arrow />
                        </a>
                        <a href="#contato" onClick={closeMenu}>
                            <span>03</span> Começar um projeto <Arrow />
                        </a>
                    </nav>
                    <div className="menu-panel-footer">
                        <span>hb produtora audiovisual</span>
                        <a href={contactHref} target="_blank" rel="noreferrer">
                            WhatsApp <Arrow />
                        </a>
                    </div>
                </div>
            </div>

            <main id="conteudo">
                <section id="inicio" ref={heroRef} className="hero-section">
                    <div className="hero-media" aria-hidden="true">
                        <LazyVideo
                            source={videos.hero}
                            eager
                            muted
                            autoPlay
                            loop
                            playsInline
                        />
                        <div className="hero-media-shade" />
                    </div>
                    <div className="hero-content page-width">
                        <div className="hero-kicker">
                            <span className="recording-mark">
                                <span /> REC
                            </span>
                        </div>
                        <div className="hero-copy">
                            <p className="hero-label">
                                hb produtora audiovisual / produção audiovisual
                                para negócios
                            </p>
                            <h1>
                                Captando <span>momentos</span> que contam{" "}
                                <span>histórias</span>
                            </h1>
                            <div className="hero-actions">
                                <a
                                    className="button button-light button-down"
                                    href="#portfolio"
                                    aria-label="Ver trabalhos"
                                >
                                    <Arrow direction="down" />
                                </a>
                            </div>
                        </div>
                        <div className="hero-footer">
                            <span>sombrio, sc</span>
                        </div>
                    </div>
                </section>

                <section
                    id="portfolio"
                    className="work-section section-dark"
                    aria-labelledby="work-title"
                >
                    <div className="page-width">
                        <Reveal className="section-intro">
                            <h2 id="work-title">
                                <span>Portfólio</span>
                            </h2>
                        </Reveal>
                        <div className="project-grid">
                            {projects.map((project, index) => (
                                <Reveal
                                    key={project.code}
                                    className={`project-reveal project-reveal-${index}`}
                                >
                                    <ProjectCard
                                        project={project}
                                        featured={index === 0}
                                        onSelect={() =>
                                            setSelectedProject(project)
                                        }
                                    />
                                </Reveal>
                            ))}
                        </div>
                        <div className="work-footer-line">
                            <span>frames disponíveis para assistir</span>
                            <a
                                className="text-link text-link-light"
                                href={contactHref}
                                target="_blank"
                                rel="noreferrer"
                            >
                                solicitar portfólio completo <Arrow />
                            </a>
                        </div>
                    </div>
                </section>

                <section
                    id="diferenciais"
                    className="business-section section-paper"
                    aria-labelledby="business-title"
                >
                    <div className="page-width business-grid">
                        <Reveal className="business-title-wrap">
                            <p className="eyebrow">O valor do vídeo</p>
                            <h2 id="business-title">
                                Vídeo bonito chama atenção. Vídeo claro move a
                                conversa.
                            </h2>
                        </Reveal>
                        <Reveal className="business-copy">
                            <a className="text-link" href="#contato">
                                trazer um briefing <Arrow />
                            </a>
                        </Reveal>
                    </div>
                    <div
                        className="page-width value-list"
                        aria-label="O que conduz cada produção"
                    >
                        <div className="value-list-heading">
                            <span>O vídeo precisa</span>
                            <span>para funcionar</span>
                        </div>
                        <div className="value-list-items">
                            <div>
                                <span>01</span>
                                <strong>ser entendido</strong>
                                <p>Roteiro e direção a serviço da mensagem.</p>
                            </div>
                            <div>
                                <span>02</span>
                                <strong>ser sentido</strong>
                                <p>
                                    Imagem, som e ritmo com uma intenção clara.
                                </p>
                            </div>
                            <div>
                                <span>03</span>
                                <strong>ser usado</strong>
                                <p>
                                    Entregas prontas para cada canal e momento.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    id="capabilities"
                    className="capabilities-section section-dark"
                    aria-labelledby="capabilities-title"
                >
                    <div className="page-width capabilities-grid">
                        <Reveal className="capabilities-heading">
                            <h2 id="capabilities-title">
                                Quais trabalhos produzimos?
                            </h2>
                        </Reveal>
                        <div className="capability-list">
                            {capabilities.map(([title, description], index) => (
                                <button
                                    key={title}
                                    className={`capability-row ${activeCapability === index ? "is-active" : ""}`}
                                    type="button"
                                    onMouseEnter={() =>
                                        setActiveCapability(index)
                                    }
                                    onFocus={() => setActiveCapability(index)}
                                    onClick={() => setActiveCapability(index)}
                                >
                                    <span className="capability-number">
                                        0{index + 1}
                                    </span>
                                    <span className="capability-title">
                                        {title}
                                    </span>
                                    <span className="capability-description">
                                        {description}
                                    </span>
                                    <Arrow />
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                <section
                    className="credits-section section-paper"
                    aria-labelledby="credits-title"
                >
                    <div className="page-width credits-grid">
                        <Reveal className="credits-heading">
                            <h2 id="credits-title">
                                Empresas que confiaram no nosso trabalho.
                            </h2>
                        </Reveal>
                        <Reveal className="credits-list">
                            <div className="credit-row">
                                <span>Chef do Disco</span>
                                <small>conteúdo gastronômico</small>
                            </div>
                            <div className="credit-row">
                                <span>Surfs Scream</span>
                                <small>Vídeos publicitários</small>
                            </div>
                            <div className="credit-row">
                                <span>Pão de Ló</span>
                                <small>Conteúdos comerciais</small>
                            </div>
                        </Reveal>
                    </div>
                </section>

                <section
                    id="processo"
                    className="process-section section-dark"
                    aria-labelledby="process-title"
                >
                    <div className="page-width process-grid">
                        <Reveal className="process-heading">
                            <h2 id="process-title">
                                Um bom vídeo tem um bom processo por trás.
                            </h2>
                        </Reveal>
                        <Reveal className="process-timeline">
                            <div className="timeline-line" />
                            <div className="timeline-item is-current">
                                <span className="timeline-time">00:00</span>
                                <div>
                                    <strong>Briefing</strong>
                                    <p>O que precisa ser entendido.</p>
                                </div>
                            </div>
                            <div className="timeline-item">
                                <span className="timeline-time">00:12</span>
                                <div>
                                    <strong>Roteiro e direção</strong>
                                    <p>Como transformar a ideia em cena.</p>
                                </div>
                            </div>
                            <div className="timeline-item">
                                <span className="timeline-time">00:28</span>
                                <div>
                                    <strong>Produção</strong>
                                    <p>
                                        O plano sai do papel e ganha presença.
                                    </p>
                                </div>
                            </div>
                            <div className="timeline-item">
                                <span className="timeline-time">01:04</span>
                                <div>
                                    <strong>Pós-produção</strong>
                                    <p>
                                        O material encontra ritmo, som e forma.
                                    </p>
                                </div>
                            </div>
                            <div className="timeline-item">
                                <span className="timeline-time">01:32</span>
                                <div>
                                    <strong>Entrega</strong>
                                    <p>
                                        O vídeo pronto para cumprir seu papel.
                                    </p>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </section>

                <section
                    id="contato"
                    className="contact-section section-paper"
                    aria-labelledby="contact-title"
                >
                    <div className="page-width contact-grid">
                        <Reveal className="contact-heading">
                            <p className="eyebrow">Próxima cena</p>
                            <h2 id="contact-title">
                                Tem uma história que precisa sair do papel?
                            </h2>
                            <p>
                                Conte o que sua empresa precisa comunicar. A
                                gente responde com o próximo passo, não com uma
                                apresentação genérica.
                            </p>
                            <a
                                className="contact-whatsapp"
                                href={contactHref}
                                target="_blank"
                                rel="noreferrer"
                            >
                                falar pelo WhatsApp <Arrow />
                            </a>
                        </Reveal>
                    </div>
                </section>
            </main>

            <footer className="site-footer section-dark">
                <div className="page-width footer-top">
                    <div
                        className="footer-brand"
                        aria-label="hb produtora audiovisual"
                    >
                        <img src={logoMark} alt="" />
                        <span>
                            hb produtora
                            <br />
                            audiovisual
                        </span>
                    </div>
                    <div className="footer-cta">
                        <span>Quando estiver pronto, a gente dá o rec.</span>
                        <a
                            className="button button-light"
                            href={contactHref}
                            target="_blank"
                            rel="noreferrer"
                        >
                            começar um projeto <Arrow />
                        </a>
                    </div>
                </div>
                <div className="page-width footer-bottom">
                    <span>hb produtora audiovisual / Sombrio, SC</span>
                    <div>
                        <a
                            href="https://www.instagram.com/hb.filmsbr/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Instagram
                        </a>
                        <a href={contactHref} target="_blank" rel="noreferrer">
                            WhatsApp
                        </a>
                    </div>
                    <span>
                        © {new Date().getFullYear()} hb produtora audiovisual
                    </span>
                </div>
            </footer>

            {backToTopVisible && (
                <a
                    className="back-to-top"
                    href="#inicio"
                    aria-label="Voltar ao início"
                >
                    <Arrow direction="left" /> topo
                </a>
            )}

            {selectedProject && (
                <div
                    className="case-overlay"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="case-title"
                >
                    <div className="case-dialog">
                        <button
                            className="case-close"
                            type="button"
                            onClick={() => setSelectedProject(null)}
                        >
                            fechar <span>×</span>
                        </button>
                        <div className="case-dialog-media">
                            <CaseVideo
                                source={selectedProject.source}
                            />
                        </div>
                        <div className="case-dialog-content">
                            <div>
                                <p className="eyebrow">
                                    {selectedProject.category}
                                </p>
                                <h2 id="case-title">{selectedProject.title}</h2>
                            </div>
                            <div className="case-dialog-info">
                                <p>{selectedProject.description}</p>
                                <dl>
                                    <div>
                                        <dt>cliente</dt>
                                        <dd>{selectedProject.client}</dd>
                                    </div>
                                    <div>
                                        <dt>formato</dt>
                                        <dd>{selectedProject.format}</dd>
                                    </div>
                                </dl>
                                <a
                                    className="text-link text-link-light"
                                    href={contactHref}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    fazer um projeto assim <Arrow />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
