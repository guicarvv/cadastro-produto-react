import React, { useState } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import './Cadastro.css';

const Cadastro = () => {
    const [dados, setDados] = useState([]);
    const [mensagem, setMensagem] = useState('');

    // Função para enviar dados ao servidor
    const enviarDados = async (novoProjeto) => {
        try {
            const response = await axios.post('http://localhost:8080/projeto', novoProjeto);
            console.log(response);
            setMensagem('Projeto cadastrado com sucesso!');
            // Atualiza a lista de projetos
            setDados(prevDados => [...prevDados, novoProjeto]);
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
                onSubmit={(values) => {
                    if (values.nome_projeto) {
                        enviarDados({
                            id: values.id,
                            nome_projeto: values.nome_projeto,
                            integrantes: values.integrantes,
                            rm_integrantes: values.rm_integrantes,
                            proposta: values.proposta,
                            statusProj: values.statusProj
                        });
                    } else {
                        setMensagem('Favor preencher informações!');
                    }
                }}
            >
                {props => (
                    <form onSubmit={props.handleSubmit}>
                        <div>
                            <input
                                type="number"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.id}
                                placeholder="0"
                                name="id"
                                disabled
                            />
                        </div>

                        <div>
                            <input
                                type="text"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.nome_projeto}
                                placeholder="Nome do projeto"
                                name="nome_projeto"
                            />
                        </div>

                        <div>
                            <input
                                type="text"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.integrantes}
                                name="integrantes"
                                placeholder="Nome dos Integrantes"
                            />
                        </div>

                        <div>
                            <input
                                type="text"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.rm_integrantes}
                                name="rm_integrantes"
                                placeholder="RM dos Integrantes"
                            />
                        </div>

                        <div>
                            <input
                                type="text"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.proposta}
                                name="proposta"
                                placeholder="Proposta"
                            />
                        </div>

                        <button type="submit">SALVAR</button>
                    </form>
                )}
            </Formik>

            <h2>Projetos Cadastrados:</h2>
            <ul>
                {dados.map((projeto, index) => (
                    <li key={index}>
                        {projeto.nome_projeto} - {projeto.integrantes} - {projeto.rm_integrantes} - {projeto.proposta}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Cadastro;
