import React, { useState } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import './Cadastro.css';

const Cadastro = () => {
    const [projetos, setProjetos] = useState([]);
    const [mensagem, setMensagem] = useState('');
    const [projetoEditando, setProjetoEditando] = useState(null);  // Estado para controle do projeto em edição

    // Função para enviar dados ao servidor (criar novo projeto ou editar existente)
    const enviarDados = async (novoProjeto) => {
        try {
            let response;
            if (novoProjeto.id) {
                // Se id estiver presente, editamos o projeto
                response = await axios.put(`http://localhost:8080/projetos/${novoProjeto.id}`, novoProjeto);
                setMensagem('Projeto atualizado com sucesso!');
            } else {
                // Se não houver id, criamos um novo projeto
                response = await axios.post('http://localhost:8080/projetos', novoProjeto);
                setMensagem('Projeto cadastrado com sucesso!');
            }
            
            // Atualiza a lista de projetos
            setProjetos((prevProjetos) => {
                if (novoProjeto.id) {
                    return prevProjetos.map(projeto => projeto.id === novoProjeto.id ? response.data : projeto);
                } else {
                    return [...prevProjetos, response.data];
                }
            });
        } catch (error) {
            console.error('Erro ao cadastrar/atualizar projeto:', error);
            setMensagem('Erro ao salvar projeto. Tente novamente.');
        }
    };

    // Função para excluir projeto
    const excluirProjeto = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/projetos/${id}`);
            setMensagem('Projeto excluído com sucesso!');
            setProjetos((prevProjetos) => prevProjetos.filter(projeto => projeto.id !== id));
        } catch (error) {
            console.error('Erro ao excluir projeto:', error);
            setMensagem('Erro ao excluir projeto. Tente novamente.');
        }
    };

    // Função para carregar dados no formulário para edição
    const editarProjeto = (projeto) => {
        setProjetoEditando(projeto);
    };

    // Função para limpar o formulário (caso esteja editando)
    const limparFormulario = () => {
        setProjetoEditando(null);
    };

    return (
        <div className="cadastro-container">
            <h1>{projetoEditando ? 'Editar Projeto' : 'Cadastrar Projeto'}</h1>
            {mensagem && <div className="mensagem">{mensagem}</div>}

            <Formik
                initialValues={{
                    id: projetoEditando ? projetoEditando.id : 0,
                    nomeProjeto: projetoEditando ? projetoEditando.nomeProjeto : '',
                    integrantes: projetoEditando ? projetoEditando.integrantes : '',
                    proposta: projetoEditando ? projetoEditando.proposta : '',
                    statusProj: projetoEditando ? projetoEditando.statusProj : 'ATIVO',
                }}
                enableReinitialize
                onSubmit={(values, { resetForm }) => {
                    if (values.nomeProjeto) {
                        enviarDados({
                            id: values.id,
                            nomeProjeto: values.nomeProjeto,
                            integrantes: values.integrantes,
                            proposta: values.proposta,
                            statusProj: values.statusProj,
                        });
                        resetForm();
                        limparFormulario();
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
                        </div>

                        <button type="submit">{projetoEditando ? 'Atualizar' : 'Salvar'}</button>
                        {projetoEditando && <button type="button" onClick={limparFormulario}>Cancelar</button>}
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
                        <p><strong>Proposta:</strong> {projeto.proposta}</p>
                        <p><strong>Status do Projeto:</strong> {projeto.statusProj}</p>
                        <button onClick={() => editarProjeto(projeto)}>Editar</button>
                        <button onClick={() => excluirProjeto(projeto.id)}>Excluir</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Cadastro;
