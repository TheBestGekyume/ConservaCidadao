import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="rodape">
      <div className="container">
        <div className="rodape-conteudo">
          <div className="rodape-sobre">
            <div className="rodape-logo">
            
              <span>Fala Cidadão</span>
            </div>
            <p>Conectando cidadãos e poder público para cidades mais humanas e sustentáveis.</p>
          </div>
          <div className="rodape-links">
            <h4>Links</h4>
            <ul>
              <li><a href="#">Início</a></li>
              <li><a href="#recursos">Recursos</a></li>
              <li><a href="#depoimentos">Depoimentos</a></li>
              <li><a href="#sobre">Sobre</a></li>
            </ul>
          </div>
          <div className="rodape-links">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Termos de uso</a></li>
              <li><a href="#">Política de privacidade</a></li>
              <li><a href="#">Cookies</a></li>
            </ul>
          </div>
          <div className="rodape-redes">
            <h4>Conecte-se</h4>
            <div className="rodape-redes-links">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>
        <div className="rodape-copyright">
          <p>© 2025 Fala Cidadão. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;