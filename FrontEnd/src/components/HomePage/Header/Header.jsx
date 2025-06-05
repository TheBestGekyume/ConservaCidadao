import { FaMapMarkerAlt, FaThumbsUp, FaComment,  FaBullhorn } from 'react-icons/fa';
import './Header.scss';

const Header = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-conteudo" data-anime="left">
            <h2>Transforme sua cidade com a comunidade</h2>
            <p>O Fala Cidadão é a rede social que empodera cidadãos a reportarem problemas urbanos, acompanharem soluções e se conectarem com outros agentes de transformação.</p>
          </div>
          <div className="hero-ilustracao" data-anime="right">
            <div className="feed-social">
              <div className="post">
                <div className="post-cabecalho">
                  <div className="post-avatar">JL</div>
                  <div>
                    <div className="post-usuario">Joana Lima</div>
                    <div className="post-tempo">há 2 horas</div>
                  </div>
                </div>
                <div className="post-conteudo">
                  Reportei um problema de iluminação pública na praça central. Já temos 15 apoiadores!
                </div>
                <div className="post-local">
                  <FaMapMarkerAlt /> Praça da Matriz
                </div>
                <div className="post-acoes">
                  <div className="post-acao"><FaThumbsUp /> 15</div>
                  <div className="post-acao"><FaComment /> 3</div>
                </div>
              </div>
              <div className="post">
                <div className="post-cabecalho">
                  <div className="post-avatar">MC</div>
                  <div>
                    <div className="post-usuario">Marcos Costa</div>
                    <div className="post-tempo">ontem</div>
                  </div>
                </div>
                <div className="post-conteudo">
                  Problema de lixo acumulado no parque foi resolvido em 48h! Ótimo trabalho da prefeitura.
                </div>
                <div className="post-local">
                  <FaMapMarkerAlt /> Parque Municipal
                </div>
                <div className="post-acoes">
                  <div className="post-acao"><FaThumbsUp /> 42</div>
                  <div className="post-acao"><FaComment /> 7</div>
                </div>
              </div>
              <div className="post-destaque">
                <FaBullhorn /> 127 problemas reportados esta semana
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;