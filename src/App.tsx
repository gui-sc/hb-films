import {
    type FormEvent,
    type ReactNode,
    type VideoHTMLAttributes,
    useEffect,
    useRef,
    useState,
} from "react";
import logo from "../assets/img/logo.png";
import logoMark from "../assets/img/logohb.png";
import director from "../assets/img/foto_henrique.png";
import focusGraphic from "../assets/img/texto-gira.png";

const whatsappUrl = "https://wa.me/5548999188549";
const contactHref = `${whatsappUrl}?text=${encodeURIComponent("Olá, gostaria de conversar sobre um projeto audiovisual.")}`;

const videos = {
    elos: "https://storage.googleapis.com/hbfilms/elos.mp4",
    mauricio: "https://storage.googleapis.com/hbfilms/mauricio_recursos.mp4",
    farmagnus: "https://storage.googleapis.com/hbfilms/farmagnus.mp4",
    king: "https://storage.googleapis.com/hbfilms/king.mp4",
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
        category: "Institucional",
        title: "Uma operação que merece ser compreendida.",
        client: "Farmagnus",
        description:
            "Um filme institucional para apresentar a operação com clareza, presença e uma narrativa fácil de lembrar.",
        source: videos.farmagnus,
        format: "Filme institucional",
    },
    {
        code: "021",
        category: "Marca",
        title: "Clareza para quem precisa decidir.",
        client: "Elos Contabilidade",
        description:
            "Uma presença audiovisual pensada para explicar valor, aproximar pessoas e dar escala à percepção da marca.",
        source: videos.elos,
        format: "Filme de marca",
    },
    {
        code: "032",
        category: "Corporativo",
        title: "Clareza para quem precisa avançar.",
        client: "Maurício Recursos de Multas",
        description:
            "Conteúdo corporativo pensado para explicar um serviço, aproximar pessoas e dar mais presença à marca.",
        source: videos.mauricio,
        format: "Conteúdo corporativo",
    },
];

const capabilities = [
    [
        "Filmes corporativos",
        "Para apresentar uma empresa, uma operação ou uma nova fase com clareza.",
    ],
    [
        "Filmes de marca",
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

function Arrow({ direction = "right" }: { direction?: "right" | "left" }) {
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
        node.muted = true;
        node.defaultMuted = true;
        node.volume = 0;
        if (eager) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setLoaded(true);
                    node.play().catch(() => undefined);
                } else {
                    node.pause();
                }
            },
            { rootMargin: "320px 0px" },
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, [eager]);

    return (
        <video
            ref={ref}
            className={`lazy-video ${loaded ? "is-loaded" : ""} ${className}`}
            src={loaded ? source : undefined}
            preload={eager ? "auto" : "metadata"}
            onLoadedData={(event) => {
                event.currentTarget.muted = true;
                event.currentTarget.defaultMuted = true;
                event.currentTarget.volume = 0;
                event.currentTarget.play().catch(() => undefined);
            }}
            {...props}
        />
    );
}

function Timecode() {
    const [frame, setFrame] = useState(0);
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
            return;
        const interval = window.setInterval(
            () => setFrame((current) => (current + 1) % 24),
            1000,
        );
        return () => window.clearInterval(interval);
    }, []);
    return (
        <span className="timecode">
            HB.FILMS / 00:00:{String(frame).padStart(2, "0")}:12
        </span>
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
                    <span>Projeto {project.code}</span>
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
        <div className="opening-sequence" aria-label="Abertura HB.Films">
            <div className="opening-line" />
            <div className="opening-content">
                <span className="opening-time">00:00:00:00</span>
                <span className="opening-title">A film production studio</span>
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
    const [form, setForm] = useState({ name: "", email: "", brief: "" });
    const [formError, setFormError] = useState("");
    const [formSent, setFormSent] = useState(false);
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
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!form.name.trim() || !form.email.trim() || !form.brief.trim()) {
            setFormError(
                "Preencha nome, e-mail e uma breve descrição do projeto.",
            );
            setFormSent(false);
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            setFormError("Confira o formato do seu e-mail.");
            setFormSent(false);
            return;
        }
        setFormError("");
        setFormSent(true);
        const message = `Olá, sou ${form.name}. Meu e-mail é ${form.email}. Projeto: ${form.brief}`;
        window.open(
            `${whatsappUrl}?text=${encodeURIComponent(message)}`,
            "_blank",
            "noopener,noreferrer",
        );
    };

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
                    aria-label="HB.Films, início"
                >
                    <img src={logoMark} alt="HB.Films" />
                </a>
                <nav className="desktop-nav" aria-label="Navegação principal">
                    <a href="#portfolio">Trabalhos</a>
                    <a href="#processo">Processo</a>
                    <a href="#studio">Estúdio</a>
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
                        <a href="#studio" onClick={closeMenu}>
                            <span>02</span> Estúdio <Arrow />
                        </a>
                        <a href="#processo" onClick={closeMenu}>
                            <span>03</span> Processo <Arrow />
                        </a>
                        <a href="#contato" onClick={closeMenu}>
                            <span>04</span> Começar um projeto <Arrow />
                        </a>
                    </nav>
                    <div className="menu-panel-footer">
                        <span>HB.Films</span>
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
                            source={videos.king}
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
                            <Timecode />
                        </div>
                        <div className="hero-copy">
                            <p className="hero-label">
                                HB.Films / produção audiovisual para negócios
                            </p>
                            <h1>
                                Filmes para empresas que precisam ser vistas.
                            </h1>
                            <div className="hero-actions">
                                <a
                                    className="button button-light"
                                    href="#portfolio"
                                >
                                    ver trabalhos <Arrow />
                                </a>
                                <a
                                    className="text-link text-link-light"
                                    href={contactHref}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    falar sobre um projeto <Arrow />
                                </a>
                            </div>
                        </div>
                        <div className="hero-footer">
                            <span>direção / produção / pós</span>
                            <span>sombrio, sc</span>
                            <span className="hero-aspect">16:9</span>
                        </div>
                    </div>
                </section>

                <section
                    id="sobre"
                    className="manifesto-section section-paper"
                    aria-labelledby="manifesto-title"
                >
                    <div className="page-width manifesto-grid">
                        <Reveal className="manifesto-index">
                            <span className="eyebrow">
                                O filme começa antes da câmera
                            </span>
                            <span className="manifesto-rule" />
                            <span className="manifesto-note">
                                A imagem é o meio. A clareza é o trabalho.
                            </span>
                        </Reveal>
                        <Reveal className="manifesto-copy">
                            <h2 id="manifesto-title">
                                Corporate films <em>without</em> the corporate
                                look.
                            </h2>
                            <p>
                                Transformamos operações, pessoas e marcas em
                                filmes que ajudam empresas a serem entendidas e
                                lembradas.
                            </p>
                            <a className="text-link" href="#processo">
                                conheça nosso processo <Arrow />
                            </a>
                        </Reveal>
                    </div>
                </section>

                <section
                    id="portfolio"
                    className="work-section section-dark"
                    aria-labelledby="work-title"
                >
                    <div className="page-width">
                        <Reveal className="section-intro">
                            <p className="eyebrow">Trabalhos selecionados</p>
                            <h2 id="work-title">
                                Imagem com função.
                                <br />
                                Ritmo com propósito.
                            </h2>
                            <p className="section-intro-body">
                                Projetos institucionais, de marca e de evento
                                pensados para comunicar algo que importa.
                            </p>
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
                            <p className="eyebrow">O valor do filme</p>
                            <h2 id="business-title">
                                Vídeo bonito chama atenção. Vídeo claro move a
                                conversa.
                            </h2>
                        </Reveal>
                        <Reveal className="business-copy">
                            <p>
                                Não começamos pelo equipamento. Começamos pelo
                                que o público precisa entender, sentir e fazer
                                depois de assistir.
                            </p>
                            <div className="business-stat">
                                <strong>
                                    3<span>+</span>
                                </strong>
                                <span>
                                    anos transformando briefings em imagens com
                                    direção.
                                </span>
                            </div>
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
                            <span>O filme precisa</span>
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
                            <p className="eyebrow">O que fazemos</p>
                            <h2 id="capabilities-title">
                                Da ideia à entrega final.
                            </h2>
                            <p>
                                Um time para pensar, filmar, editar e deixar o
                                projeto pronto para circular.
                            </p>
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
                    id="studio"
                    className="studio-section section-paper"
                    aria-labelledby="studio-title"
                >
                    <div className="page-width studio-grid">
                        <Reveal className="studio-image-wrap">
                            <div className="studio-image">
                                <img
                                    src={director}
                                    alt="Henrique Brezolin segurando um gimbal durante uma filmagem"
                                />
                                <Viewfinder />
                                <span className="image-caption">
                                    direção em movimento
                                </span>
                            </div>
                            {/* <img
                                className="focus-graphic"
                                src={focusGraphic}
                                alt="HB.Films em composição circular"
                            /> */}
                        </Reveal>
                        <Reveal className="studio-copy">
                            <p className="eyebrow">Behind the frame</p>
                            <h2 id="studio-title">A câmera é só o começo.</h2>
                            <p>
                                O trabalho acontece entre o briefing e o corte
                                final. É ali que uma operação ganha ritmo, que
                                uma pessoa encontra sua voz e que uma marca
                                passa a ocupar espaço.
                            </p>
                            <div className="studio-notes">
                                <div>
                                    <span>01</span>
                                    <strong>Direção próxima</strong>
                                    <p>
                                        Decisões objetivas no set e cuidado com
                                        cada pessoa em cena.
                                    </p>
                                </div>
                                <div>
                                    <span>02</span>
                                    <strong>Produção organizada</strong>
                                    <p>
                                        Planejamento para o dia de filmagem
                                        render o que o projeto precisa.
                                    </p>
                                </div>
                                <div>
                                    <span>03</span>
                                    <strong>Pós com intenção</strong>
                                    <p>
                                        Montagem, som e versões que respeitam a
                                        história e o canal.
                                    </p>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                    <div
                        className="film-strip"
                        aria-label="Áreas de atuação da HB.Films"
                    >
                        <div className="film-strip-track">
                            <span>direção</span>
                            <i />
                            <span>produção</span>
                            <i />
                            <span>edição</span>
                            <i />
                            <span>motion</span>
                            <i />
                            <span>som</span>
                            <i />
                            <span>direção</span>
                            <i />
                            <span>produção</span>
                            <i />
                            <span>edição</span>
                            <i />
                            <span>motion</span>
                            <i />
                            <span>som</span>
                            <i />
                        </div>
                    </div>
                </section>

                <section
                    className="credits-section section-paper"
                    aria-labelledby="credits-title"
                >
                    <div className="page-width credits-grid">
                        <Reveal className="credits-heading">
                            <p className="eyebrow">Projetos no portfólio</p>
                            <h2 id="credits-title">
                                Empresas que confiaram suas histórias ao nosso
                                olhar.
                            </h2>
                        </Reveal>
                        <Reveal className="credits-list">
                            <div className="credit-row">
                                <span>Farmagnus</span>
                                <small>institucional</small>
                            </div>
                            <div className="credit-row">
                                <span>Elos Contabilidade</span>
                                <small>filme de marca</small>
                            </div>
                            <div className="credit-row">
                                <span>Maurício Recursos de Multas</span>
                                <small>conteúdo corporativo</small>
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
                            <p className="eyebrow">Director's notes</p>
                            <h2 id="process-title">
                                Um bom filme tem um bom processo por trás.
                            </h2>
                            <p>
                                Do primeiro entendimento à entrega, cada etapa
                                deixa o próximo corte mais preciso.
                            </p>
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
                                        O filme pronto para cumprir seu papel.
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
                        <Reveal className="contact-form-wrap">
                            <form
                                className="contact-form"
                                onSubmit={handleSubmit}
                                noValidate
                            >
                                <label>
                                    <span>Seu nome</span>
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={(event) =>
                                            setForm({
                                                ...form,
                                                name: event.target.value,
                                            })
                                        }
                                        placeholder="Como podemos chamar você?"
                                        autoComplete="name"
                                    />
                                </label>
                                <label>
                                    <span>Seu e-mail</span>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={(event) =>
                                            setForm({
                                                ...form,
                                                email: event.target.value,
                                            })
                                        }
                                        placeholder="nome@empresa.com"
                                        autoComplete="email"
                                    />
                                </label>
                                <label>
                                    <span>Sobre o projeto</span>
                                    <textarea
                                        name="brief"
                                        value={form.brief}
                                        onChange={(event) =>
                                            setForm({
                                                ...form,
                                                brief: event.target.value,
                                            })
                                        }
                                        placeholder="O que você quer colocar em movimento?"
                                        rows={4}
                                    />
                                </label>
                                {formError && (
                                    <p
                                        className="form-feedback form-error"
                                        role="alert"
                                    >
                                        {formError}
                                    </p>
                                )}
                                {formSent && (
                                    <p
                                        className="form-feedback form-success"
                                        role="status"
                                    >
                                        Briefing pronto. O WhatsApp foi aberto
                                        para você continuar a conversa.
                                    </p>
                                )}
                                <button
                                    className="button button-dark"
                                    type="submit"
                                >
                                    enviar briefing <Arrow />
                                </button>
                            </form>
                        </Reveal>
                    </div>
                </section>
            </main>

            <footer className="site-footer section-dark">
                <div className="page-width footer-top">
                    <img src={logo} alt="HB.Films" className="footer-logo" />
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
                    <span>HB.Films / Sombrio, SC</span>
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
                    <span>© {new Date().getFullYear()} HB.Films</span>
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
                            <LazyVideo
                                source={selectedProject.source}
                                eager
                                muted
                                autoPlay
                                playsInline
                            />
                        </div>
                        <div className="case-dialog-content">
                            <div>
                                <p className="eyebrow">
                                    {selectedProject.category} / projeto{" "}
                                    {selectedProject.code}
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
