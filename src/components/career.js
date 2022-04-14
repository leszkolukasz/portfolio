import React, { useEffect, useState, useRef } from 'react';
import './career.css';


function Career() {
    const [achievements, setAchievements] = useState([
        { id: 1, title: '1st place (ex aequo) in the 1st round of the 28th Polish Olympiad in Informatics', link: 'https://oi.edu.pl/l/28oi_1etap_wyniki/'},
        { id: 2, title: 'Distinction in the 1st round of the 28th Polish Olympiad in Informatics', link: 'https://oi.edu.pl/l/28oi_1etap_wyroznieni/'},
        { id: 3, title: 'Finalist of the 4th edition of the Jagiellonian Mathematics Tournament', link: 'https://jtm.matinf.uj.edu.pl/pictures/finalisciJTMIV.htm'},
        
    ]);

    const [activities, setActivities] = useState([
        { id: 1, title: 'Open Source contributor (Libre Office)', link: 'https://gerrit.libreoffice.org/c/core/+/131711'},
        { id: 2, title: 'Competitive programmer (title of candidate master on Codeforces)', link: 'https://codeforces.com/profile/Whistleroosh'}
    ]);

    const [path, setPath] = useState([
        { date: '2018 - 2021', primary: 'Liceum im. Stefana Batorego w Warszawie', secondary: 'profile: mathematics - physics'},
        { date: '2021 - current', primary: 'University of Warsaw', secondary: 'bachelor\'s degree: Computer Science'}
    ]);

    const canvasRef = useRef(null);

    let draw = () => {
        if(draw.last_draw !== undefined && ((new Date()) - draw.last_draw)/1000 < 0.5)
            return;

        draw.last_draw = new Date();

        let height = 300;
        let width = window.innerWidth * 0.8;
        let font_size = 1;
        let shift = height/path.length*0.3;
        let shift_date = width/4;

        if(window.innerWidth < 950) {
            height = 250;
            shift = height/path.length*0.2;
            font_size = 1.2;
        }

        if(window.innerWidth < 500) {
            shift = height/path.length*0.2;
            shift_date = width/3;
            font_size = 0.7;
        }

        const canvas = canvasRef.current;
        canvas.width = width * 2;
        canvas.height = height * 2;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        const context = canvas.getContext('2d');
        context.scale(2, 2);
        context.lineCap = 'round';
        context.fillStyle = '#05caa5';
        context.strokeStyle = '#05caa5';
        context.lineWidth = 5;
        context.font = `${font_size*1.2}em Roboto`;


        let pos = [width/3, height*0.2];
        let last = pos[1];
        path.map(({ date, primary, secondary }) => {
            context.beginPath();
            context.arc(pos[0], pos[1], 10, 0, 2 * Math.PI);
            context.fill();
            context.moveTo(pos[0], last);
            context.lineTo(pos[0], pos[1]);
            context.stroke();

            context.fillText(date, pos[0]-shift_date, pos[1]+5);
            context.fillText(primary, pos[0]+width/8, pos[1]+5);
            context.fillStyle = '#bbbbbb';
            context.font = `${font_size}em Roboto`;
            context.fillText(secondary, pos[0]+width/6, pos[1]+shift);
            context.fillStyle = '#05caa5';
            context.font = `${font_size*1.2}em Roboto`;

            last = pos[1];
            pos[1] += (height*0.8-height*0.2)/(path.length-1);
        })
    }

    setTimeout(draw, 600);
    draw.last_draw = new Date();

    useEffect(() => {
        window.addEventListener('resize', draw);
        return _ => {window.removeEventListener('resize', draw)};
    }, []);

    return (
        <div className="container-career">
            <section className='black-section-career'>
                <header>
                    <div>
                        <hr></hr>
                    </div>
                    <div>
                        Career
                    </div>
                </header>
                <article>
                    <canvas ref={canvasRef} />
                </article>
                <div className='achievements-header'>
                    <div><hr></hr></div>
                    <div>Achievements</div>
                    <div><hr></hr></div>
                </div>
                <div className='achievements'>
                    <ul>
                        {achievements.map(({ id, title, link }) => <li key={id}>{title} <a href={link}>&lt;link&gt;</a></li>)}
                    </ul>
                </div>
                <div className='achievements-header'>
                    <div><hr></hr></div>
                    <div>Activities</div>
                    <div><hr></hr></div>
                </div>
                <div className='achievements'>
                    <ul>
                        {activities.map(({ id, title, link }) => <li key={id}>{title} <a href={link}>&lt;link&gt;</a></li>)}
                    </ul>
                </div>
            </section>
        </div>
    );
}

export default Career;
