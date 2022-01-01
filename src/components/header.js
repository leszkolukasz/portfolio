import './header.css'
import avatar from '.././img/avatar.png'

function Header() {
    return (
      <section className='black-section-intro'>
          <header className='container'>
              <div style = {{width: '10vw'}}></div>
              <div className='intro'>
                  <div>
                      <span style = {{color: '#05caa5'}}>Hi</span>, I am
                  </div>
                  <div>
                    <span style = {{color: '#05caa5'}}>Ł</span>ukasz
                  </div>
                  <div>
                    <span style = {{color: '#05caa5'}}>L</span>eszko
                  </div>
                  <div>
                      <br/><br/>
                      machine learning engineer | competitive programmer
                  </div>
              </div>
              <div className='avatar'>
                    <img src={avatar}></img>
              </div>
          </header>
      </section>
    );
  }
  
export default Header;
  