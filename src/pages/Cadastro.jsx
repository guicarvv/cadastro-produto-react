import React, { useState } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import './Cadastro.css';

const Cadastro = () => {
    const [projetos, setProjetos] = useState([]);
    const [mensagem, setMensagem] = useState('');

    // Função para enviar dados ao servidor
    const enviarDados = async (novoProjeto) => {
        try {
            const response = await axios.post('http://localhost:8080/projetos', novoProjeto);
            console.log(response);
            setMensagem('Projeto cadastrado com sucesso!');
            // Atualiza a lista de projetos
            setProjetos((prevProjetos) => [...prevProjetos, response.data]);
        } catch (error) {
            console.error('Erro ao cadastrar projeto:', error);
            setMensagem('Erro ao cadastrar projeto. Tente novamente.');
        }
    };

    return (
        <div className="cadastro-container">
            <h1>Cadastrar Projeto</h1>
            {mensagem && <div className="mensagem">{mensagem}</div>}
            <Formik
                initialValues={{
                    id: 0,
                    nomeProjeto: '',
                    integrantes: '',
                    rmIntegrantes: '',
                    proposta: '',
                    statusProj: 'ATIVO'
                }}
                onSubmit={(values, { resetForm }) => {
                    if (values.nomeProjeto) {
                        enviarDados({
                            id: values.id,
                            nomeProjeto: values.nomeProjeto,
                            integrantes: values.integrantes,
                            rmIntegrantes: values.rmIntegrantes,
                            proposta: values.proposta,
                            statusProj: values.statusProj
                        });
                        resetForm();
                    } else {
                        setMensagem('Favor preencher informações!');
                    }
                }}
            >
                {props => (
                    <form onSubmit={props.handleSubmit}>
                        <div className="form-group">
                            <input
                                type="number"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.id}
                                placeholder="0"
                                name="id"
                                disabled
                            />
                            {props.errors.id && <div className="feedback">{props.errors.id}</div>}
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.nomeProjeto}
                                placeholder="Nome do projeto"
                                name="nomeProjeto"
                                required
                            />
                            {props.errors.nomeProjeto && <div className="feedback">{props.errors.nomeProjeto}</div>}
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.integrantes}
                                name="integrantes"
                                placeholder="Nome dos Integrantes"
                                required
                            />
                            {props.errors.integrantes && <div className="feedback">{props.errors.integrantes}</div>}
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.rmIntegrantes}
                                name="rmIntegrantes"
                                placeholder="RM dos Integrantes"
                                required
                            />
                            {props.errors.rmIntegrantes && <div className="feedback">{props.errors.rmIntegrantes}</div>}
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.proposta}
                                name="proposta"
                                placeholder="Proposta"
                                required
                            />
                            {props.errors.proposta && <div className="feedback">{props.errors.proposta}</div>}
                        </div>

                        <button type="submit">SALVAR</button>
                    </form>
                )}
            </Formik>

            <h2>Projetos Cadastrados:</h2>
            <ul className="lista-projetos">
                {projetos.map((projeto, index) => (
                    <li key={index} className="projeto-item">
                        <p><strong>ID:</strong> {projeto.id}</p>
                        <p><strong>Nome do Projeto:</strong> {projeto.nomeProjeto}</p>
                        <p><strong>Integrantes:</strong> {projeto.integrantes}</p>
                        <p><strong>RM dos Integrantes:</strong> {projeto.rmIntegrantes}</p>
                        <p><strong>Proposta:</strong> {projeto.proposta}</p>
                        <p><strong>Status do Projeto:</strong> {projeto.statusProj}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Cadastro;
