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
            const response = await axios.post('http://localhost:8080/projeto', novoProjeto);
            console.log(response);
            setMensagem('Projeto cadastrado com sucesso!');
            // Atualiza a lista de projetos
            setProjetos(prevProjetos => [...prevProjetos, response.data]);
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
                    nome_projeto: '',
                    integrantes: '',
                    rm_integrantes: '',
                    proposta: '',
                    statusProj: 'ATIVO'
                }}
                onSubmit={(values, { resetForm }) => {
                    if (values.nome_projeto) {
                        enviarDados({
                            id: values.id,
                            nome_projeto: values.nome_projeto,
                            integrantes: values.integrantes,
                            rm_integrantes: values.rm_integrantes,
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
                                value={props.values.nome_projeto}
                                placeholder="Nome do projeto"
                                name="nome_projeto"
                                required
                            />
                            {props.errors.nome_projeto && <div className="feedback">{props.errors.nome_projeto}</div>}
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
                                value={props.values.rm_integrantes}
                                name="rm_integrantes"
                                placeholder="RM dos Integrantes"
                                required
                            />
                            {props.errors.rm_integrantes && <div className="feedback">{props.errors.rm_integrantes}</div>}
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
                        <p><strong>Nome do Projeto:</strong> {projeto.nome_projeto}</p>
                        <p><strong>Integrantes:</strong> {projeto.integrantes}</p>
                        <p><strong>RM dos Integrantes:</strong> {projeto.rm_integrantes}</p>
                        <p><strong>Proposta:</strong> {projeto.proposta}</p>
                        <p><strong>Status do Projeto:</strong> {projeto.statusProj}</p>
                    </li>
                ))}
            </ul>
        </div>
    );

};

export default Cadastro;
