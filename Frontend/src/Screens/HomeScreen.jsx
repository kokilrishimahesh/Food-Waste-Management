import React from 'react';
import { Link } from 'react-router-dom';
import { CookingPot, Facebook, Twitter, Instagram, Linkedin, Soup, MonitorPlay, BookOpenText } from "lucide-react";

function HomeScreen() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <CookingPot color="#3e9392" size={30} />
                    <Link className="navbar-brand mx-2 headingColour" to="/">Donation Platform</Link>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/" onClick={() => scrollToSection('hero')}>
                                    <span className="nav-text">Home</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="#features" onClick={() => scrollToSection('features')}>
                                    <span className="nav-text">Features</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="#about" onClick={() => scrollToSection('about')}>
                                    <span className="nav-text">About Us</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="#contact" onClick={() => scrollToSection('contact')}>
                                    <span className="nav-text">Contact</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <section id="hero" className="hero">
                <div className="hero-background">
                    <div className='heroTextBackground container'>
                        <div className="flex items-end justify-end">
                            <h1>Welcome to Our Donation Platform</h1>
                            <p className="lead">Donate items like food, clothing, electronics, and more to help those in need.</p>
                            <Link className="btn btn-primary btn-lg buttonColor" to="/signup">Get Started</Link>
                        </div>
                    </div>
                </div>
            </section>


            <section id="features" className="section bg-light py-5">
                <div className="container py-2">
                    <h2 className="text-center mb-5 headingColour">Key Features</h2>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card text-center">
                                <div className="card-body">
                                    <Soup size={50} color="#3e9392" className="mb-3" />
                                    <h3 className="card-title">Donation Requests</h3>
                                    <p className="card-text">Specify the items you want to donate and send requests for pickup or drop-off.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card text-center">
                                <div className="card-body">
                                    <MonitorPlay size={50} color="#3e9392" className="mb-3" />
                                    <h3 className="card-title">Educational Resources</h3>
                                    <p className="card-text">Access educational content on the importance of donations and how they make a difference.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card text-center">
                                <div className="card-body">
                                    <BookOpenText size={50} color="#3e9392" className="mb-3" />
                                    <h3 className="card-title">Stories & Blogs</h3>
                                    <p className="card-text">Read inspiring stories and blogs about how donations impact communities.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section id="about" className="section bg-light py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 offset-md-2 text-center">
                            <h2 className="mb-4 headingColour">About Our Donation Platform</h2>
                            <p className="textColour">
                                Our Donation Platform aims to bring people together by making it easier to donate food, clothing, electronics, and other items. We are committed to creating a world where everyone can contribute to helping those in need.
                            </p>
                            <p className='textColour'>
                                Our mission is to connect donors with organizations and people who need it most. Every donation, big or small, helps make a positive impact on the lives of others.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            <section id="contact" className="section my-2">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <h2 className="text-center mb-4 headingColour">Contact Us</h2>
                            <form className="contact-form">
                                <div className="mb-3">
                                    <input type="text" className="form-control" placeholder="Your Name" required />
                                </div>
                                <div className="mb-3">
                                    <input type="email" className="form-control" placeholder="Your Email" required />
                                </div>
                                <div className="mb-3">
                                    <textarea className="form-control" rows="6" placeholder="Message" required></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary btn-block buttonColor">Send Message</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>


            <footer className="bg-dark">
                <div className="container text-center">
                    <p className='py-1'>&copy; 2024 Donation Platform. All rights reserved.</p>
                    <ul className="list-inline">
                        <li className="list-inline-item">
                            <a href="#">
                                <Facebook size={24} />
                                <span className="icon-text">Facebook</span>
                            </a>
                        </li>
                        <li className="list-inline-item">
                            <a href="#">
                                <Twitter size={24} />
                                <span className="icon-text">Twitter</span>
                            </a>
                        </li>
                        <li className="list-inline-item">
                            <a href="#">
                                <Instagram size={24} />
                                <span className="icon-text">Instagram</span>
                            </a>
                        </li>
                        <li className="list-inline-item">
                            <a href="#">
                                <Linkedin size={24} />
                                <span className="icon-text">LinkedIn</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </footer>
        </div>
    );
}

export default HomeScreen;
