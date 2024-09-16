import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import Contact from "../components/Contact";

const Home: NextPage = () => {

    const EnvelopeIcon = () => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 className="bi bi-envelope me-1" viewBox="0 0 16 16">
                <path
                    d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"
                />
            </svg>
        )
    }

    const ContentTechLink = ({href, children}: {href: string, children: React.ReactNode}) => {
        return (
            <a href={href} className="link-primary text-decoration-none fw-bold">
                {children}
            </a>
        )
    }

    const FooterTechLink = ({href, children}: {href: string, children: React.ReactNode}) => {
        return (
            <a href={href} className="text-reset text-decoration-none">
                {children}
            </a>
        )
    }

    const SpecializationsCard = (
        {children}: {children: React.ReactNode}
    ) => {
        return (
            <div className="specializations-card border-0 card mb-4">
                <div className="card-body">
                    <h3 className="card-title text-uppercase text-secondary fw-bold h4 mb-3">
                        Specializations
                    </h3>
                    <div className="px-2 pt-2 pb-0">
                        {children}
                    </div>
                </div>
            </div>
        )
    }

    const ProjectCard = (
        {title, imageName, children, imagePriority = false}:
            {title: string, imageName: string, children: React.ReactNode, imagePriority?: boolean}
    ) => {

        const ProjectCardHeading = () => {
            return (
                <h3 className="card-title text-uppercase text-success fw-bold h4 mb-3">
                    {title}
                </h3>
            )
        }

        const ProjectCardImage = () => {
            return (
                <div className="project-image-container">
                    <Image
                        priority={imagePriority}
                        width={600}
                        height={400}
                        src={`/projects/${imageName}`}
                        alt={`${title} project image`}
                        layout="responsive"
                    />
                </div>
            )
        }

        return (
            <div className="project-card border-0 card mb-4">
                <div className="card-body">
                    <ProjectCardHeading/>
                    <ProjectCardImage/>
                    <div className="px-2 pt-3 pb-0">
                        {children}
                    </div>
                </div>
            </div>
        )
    }

    const PageColumn = ({children}: {children: React.ReactNode}) => {
        return (
            <div className="row justify-content-center">
                <div className="col-sm-12 col-lg-9 col-xl-7">
                    {children}
                </div>
            </div>
        )
    }

    return (
        <React.Fragment>
            <Head>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <title>Projects by Brian Post, Web Application Developer</title>
                <meta
                    name="description"
                    content="Brian Post is a full stack web application developer who builds websites and applications using React, Next.js, TypeScript, PHP, Symfony, and MariaDB"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header>
                <div className="container">
                    <PageColumn>
                        <div className="row">
                            <div className="col-12 text-end pt-3">
                                <a href={'#Contact'}
                                   className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center">
                                    <EnvelopeIcon/> Contact me
                                </a>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 text-center mt-4 mb-2">
                            <h1 className="h2">
                                    Brian Post
                                    <small className="text-muted d-block h5">Full-Stack Developer</small>
                                </h1>
                            </div>
                        </div>

                    </PageColumn>
                </div>
            </header>

            <main>
                <div className="container">

                    <section id="Specializations">
                        <PageColumn>
                            <SpecializationsCard>
                                <ul>
                                    <li>PHP Website & Application Development
                                        <ul>
                                            <li>Content Management Systems
                                                <ul>
                                                    <li>Drupal - custom theme, module, and distribution development</li>
                                                    <li>WordPress - custom plugin development</li>
                                                </ul>
                                            </li>
                                            <li>PHP MVC Frameworks
                                                <ul>
                                                    <li>Symfony, Yii, CakePHP - custom applications</li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>

                                    <li>API Development & Integrations
                                        <ul>
                                            <li>REST and custom endpoints</li>
                                            <li>API Platform (Symfony)</li>
                                            <li>Third-party integrations - various including payment gateways</li>
                                        </ul>
                                    </li>

                                    <li>Front-End Development
                                        <ul>
                                            <li>React, Material UI, Next.js</li>
                                            <li>JavaScript, TypeScript, jQuery, Gulp</li>
                                            <li>CSS, SCSS, Bootstrap</li>
                                            <li>Accessibility (WCAG)</li>
                                        </ul>
                                    </li>

                                    <li>Databases
                                        <ul>
                                            <li>MariaDB, MySQL, SQL Server, MongoDB</li>
                                            <li>Advanced SQL</li>
                                        </ul>
                                    </li>
                                </ul>
                            </SpecializationsCard>
                        </PageColumn>
                    </section>

                    <section className="mt-4 mb-3">
                        <PageColumn>
                            <div className="row">
                                <div className="col-12 text-center">
                                    <h2 className="h3">Featured Projects</h2>
                                    <p className="small"><em>Past projects I&apos;ve developed independently.</em></p>
                                </div>
                            </div>
                        </PageColumn>
                        <PageColumn>
                            <ProjectCard title="DealHeroGames" imageName="dealherogames.png" imagePriority={true}>
                                <p>DealHeroGames helps you discover deals on top Steam games.</p>
                                <p>Built with React, Next.js, TypeScript, Bootstrap, Symfony, and MariaDB.</p>
                                <a href="https://www.dealhero.games/" className="btn btn-sm btn-secondary">
                                    View DealHeroGames site
                                </a>
                            </ProjectCard>
                            <ProjectCard title="Northwestern University Law Review" imageName="nulr.png" imagePriority={true}>
                                <p>Built and led the previous redesign of Northwestern University Law Review. Developed using Drupal 7.</p>
                            </ProjectCard>
                            <ProjectCard title="SmartParticipation" imageName="smartparticipation.png">
                                <p>SmartParticipation is a custom discussion platform developed by the Cornell e-Rulemaking Initiative at Cornell University Law School.</p>
                                <p>I worked as Programmer for the project from 2011-2014, then Lead Technologist from 2014-2017.</p>
                                <p>The platform is a Drupal 7 distribution, and includes several custom modules.</p>
                                <p>While the CeRI project has ended, I continue to maintain the open source code.</p>
                                <a href="http://smartparticipation.com/" className="btn btn-sm btn-secondary">
                                    View SmartParticipation project site
                                </a>
                            </ProjectCard>
                            <ProjectCard title="Politiki" imageName="politiki.gif">
                                <p>Politiki breaks down political issues into easy to follow pro/con arguments.</p>
                                <p>Developed all aspects of site using CakePHP, MySQL, and JavaScript.</p>
                                <a href="https://politiki.us/" className="btn btn-sm btn-secondary">
                                    View archived Politiki site
                                </a>
                            </ProjectCard>
                            <ProjectCard title="Lucky Liquors Invoice Manager" imageName="invoicemanager.gif">
                                <p>Developed application to simplify invoice to inventory data entry.  Integrates with third-party inventory tracking software.</p>
                                <p>Built using CakePHP, MySQL, and JavaScript.</p>
                            </ProjectCard>
                            <ProjectCard title="Boston University Dear Abbeys" imageName="dearabbeys.gif">
                                <p>Converted earlier version of public site for use with WordPress.  Included blog and content management.</p>
                                <p>Designed and developed members only website.  This includes access control, alumni profiles, alumni search, message board, newsletter, event management, and more.</p>
                                <p>The members site was developed using CakePHP, MySQL, and integrates with phpBB, poMMo, and WordPress.</p>
                            </ProjectCard>
                        </PageColumn>
                    </section>

                    <section>
                        <PageColumn>
                            <div id="Contact" className="contact bg-primary text-light p-4 rounded mb-5">
                                <Contact/>
                            </div>
                        </PageColumn>
                    </section>

                </div>
            </main>

            <footer className="bg-black text-white mt-auto">
                <div className="container">
                    <PageColumn>
                        <div className="text-center p-1">
                            Made with <FooterTechLink href="https://nextjs.org/">Next.js</FooterTechLink>
                            , <FooterTechLink href="https://www.typescriptlang.org/">TypeScript</FooterTechLink>
                            , <FooterTechLink href="https://getbootstrap.com/">Bootstrap</FooterTechLink>
                            , and <FooterTechLink href="https://nodemailer.com/about/">Nodemailer</FooterTechLink>.
                            <a href="https://github.com/brianpost/portfolio-next" className="link-light ms-3">View source</a>
                        </div>
                    </PageColumn>
                </div>
            </footer>

        </React.Fragment>
    )
}

export default Home
