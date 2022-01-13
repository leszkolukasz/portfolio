import { FaLinkedin, FaGithub } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import './contact.css';

function Contact() {
    return (
        <div className="container-contact">
            <section className='black-section-contact'>
                <header>
                    <div>
                        <hr></hr>
                    </div>
                    <div>
                        Contact
                    </div>
                </header>
                <section>
                    <a href='https://www.linkedin.com/in/leszkolukasz/' target='_blank'><FaLinkedin  style={{height: '0.6em'}}/></a>
                    <a href='https://github.com/leszkolukasz' target='_blank'><FaGithub  style={{height: '0.6em'}}/></a>
                    <a href='mailto:leszko.lucas@gmail.com' target='_blank'><IoIosMail style = {{height: '0.8em', position: 'relative', top: '0.12em'}} /></a>
                </section>
                <footer>Copyright &copy; {new Date().getFullYear()} Łukasz Leszko. All rights reserverd</footer>
            </section>
        </div>
    );
}

export default Contact;
