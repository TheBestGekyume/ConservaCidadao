import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash, faUser } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Auth.scss';

function Auth() {
    const { login } = useAuth();
    const { mode } = useParams();
    const navigate = useNavigate();

    const [modoLogin, setModoLogin] = useState(true);
    const [form, setForm] = useState({ nome: '', email: '', senha: '' });
    const [mensagemErro, setMensagemErro] = useState('');
    const [mensagemSucesso, setMensagemSucesso] = useState('');
    const [senhaVisivel, setSenhaVisivel] = useState(false);

    useEffect(() => {
        if (mode === 'login') setModoLogin(true);
        else if (mode === 'register') setModoLogin(false);
        else navigate('/auth/login');
    }, [mode, navigate]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensagemErro('');
        setMensagemSucesso('');

        const url = `http://localhost:3001/${modoLogin ? 'login' : 'register'}`;
        const payload = modoLogin ? { email: form.email, senha: form.senha } : form;

        try {
            const { data } = await axios.post(url, payload);

            if (modoLogin) {
                const { id, nome, role } = data.usuario;
                login({ id, nome, role });
                localStorage.setItem('token', data.token);

                if (role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/posts');
                }
            }


            setMensagemSucesso(data.mensagem);
        } catch (erro) {
            const mensagem = erro.response?.data?.mensagem || 'Erro na autenticação.';
            setMensagemErro(mensagem);
        }
    };

    const alternarModo = () => {
        navigate(modoLogin ? '/auth/register' : '/auth/login');
        setForm({ nome: '', email: '', senha: '' });
        setMensagemErro('');
        setMensagemSucesso('');
        setSenhaVisivel(false);
    };

    return (
        <div className="container-fluid min-vh-100 d-md-flex align-items-center p-0">
            <div
                className="col-md-6 d-flex flex-column justify-content-between 
                align-items-center p-5 text-white text-center lado"
            >
                <div 
                className="d-flex flex-column justify-content-center 
                align-items-center flex-grow-1"
                >
                    <img src="/logo.png" alt="logo" className="mb-4 mx-auto" />
                    <h1 className="fw-bold mb-3">Bem-vindo</h1>
                    <p className="text-light">
                        Conecte-se com outros cidadãos para reportar problemas urbanos e acompanhar soluções em tempo real.
                    </p>
                </div>

               
            </div>


            <section className="d-flex justify-content-center flex-fill px-5">
                <div className="w-75 auth-container">
                    <div className="auth-card p-4">
                        <h5 className="text-center fw-semibold mb-3">{modoLogin ? 'Entrar na conta' : 'Criar nova conta'}</h5>

                        <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
                            {!modoLogin && (
                                <Input
                                    id="nome"
                                    label="Nome"
                                    type="text"
                                    icon={faUser}
                                    value={form.nome}
                                    onChange={handleChange}
                                />
                            )}

                            <Input
                                id="email"
                                label="E-mail"
                                type="email"
                                icon={faEnvelope}
                                value={form.email}
                                onChange={handleChange}
                            />

                            <Input
                                id="senha"
                                label="Senha"
                                type={senhaVisivel ? 'text' : 'password'}
                                icon={faLock}
                                value={form.senha}
                                onChange={handleChange}
                                toggleSenha={() => setSenhaVisivel(!senhaVisivel)}
                                senhaVisivel={senhaVisivel}
                            />

                           

                            {mensagemErro && <div className="alert alert-danger">{mensagemErro}</div>}
                            {mensagemSucesso && <div className="alert alert-success">{mensagemSucesso}</div>}

                            <button type="submit" className="auth-button">
                                {modoLogin ? 'Entrar' : 'Cadastrar'}
                            </button>

                            <div className="text-center">
                                {modoLogin ? 'Não tem uma conta?': 'Já tem uma conta?'}
                                <button type="button" className="link-button" onClick={alternarModo}>
                                    {modoLogin ? 'Cadastre-se' : 'Entrar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}

function Input({ id, label, type, icon, value, onChange, toggleSenha, senhaVisivel }) {
    return (
        <div>
            <label htmlFor={id} className="form-label">{label}</label>
            <div className="position-relative">
                <FontAwesomeIcon icon={icon} className="icon" />
                <input
                    className="w-100"
                    type={type}
                    id={id}
                    placeholder={label}
                    value={value}
                    onChange={onChange}
                    required
                />
                {id === 'senha' && (
                    <button
                        type="button"
                        className="password-toggle"
                        onClick={toggleSenha}
                    >
                        <FontAwesomeIcon icon={senhaVisivel ? faEyeSlash : faEye} />
                    </button>
                )}
            </div>
        </div>
    );
}

export default Auth;
