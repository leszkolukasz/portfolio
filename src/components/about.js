import { DiPython, DiGit, DiLinux } from "react-icons/di";
import { CgCPlusPlus } from "react-icons/cg";
import './about.css'

function About() {
    return (
        <section className='white-section-about'>
            <header>
                <div>
                    About
                </div>
                <div>
                    <hr></hr>
                </div>
            </header>
            <article>
                <p>I am a software engineer specializing in machine learning. Currently pursuing bachelor's degree in Computer Science at <strong>University of Warsaw</strong>.</p>

                <p>Computer science and mathematics have always been my passion that has driven me to spend hours upon hours solving complex problems, and discovering new ways to create a better software. Throughout he last decade I have tried many different fields of computer science: imperative programming, functional programming, web development, microcontroller programming, blockchain, quantum computing, yet application of algorithms has always been dearest to my heart. Because of that I have spend whole high school preparing for Polish Olympiad in Informatics and participating in competitive programming contests. This is also where my interest in AI stemmed from. Machine learinng is a combination of both algorithmic knowledge and mathematics, which is why it engrossed me so much and is my main point of interest till today.</p>
            </article>
            <div className='skills-header'>
                <div><hr></hr></div>
                <div>Skills</div>
                <div><hr></hr></div>
            </div>
            <div className='skills'>
                <DiPython/>
                <CgCPlusPlus/>
                <DiGit/>
                <DiLinux style = {{height: "0.85em"}}/>
            </div>
        </section>
    );
}

export default About;
