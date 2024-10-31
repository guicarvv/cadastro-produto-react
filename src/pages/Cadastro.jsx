import React, {useState, useEffect} from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import './Cadastro.css'

const Cadastro = () => {

    const [dados, setDados] = useState({})
    const [clicou, setClicou] = useState(false)

    function enviarDados(){
        axios.post('http://localhost:8080/projeto', 
            dados
        ).then(response => console.log(response))
        .then(dados => alert('Dados enviados com sucesso'))
        .catch(error => console.log(error))
    }
    
    useEffect(()=>{
       clicou ? enviarDados() : console.log('app no ar')
       return (()=>setClicou(false))
    }, [clicou])
    
    return (
    <div>
        <h1>Cadastrar Projeto</h1>
        <Formik
            initialValues={{
                id: 0,
                nome_projeto: '',
                integrantes: '',
                proposta: '',
                statusProj: 'ATIVO'
            }}
            onSubmit={(values, actions) => {

                if(values.nome.length > 0){
                        setTimeout(() => {
                        setDados({
                            id: values.id,
                            nome_projeto: values.nome_projeto,
                            integrantes: values.integrantes,
                            proposta: values.proposta
                        })
                        setClicou(true)
                        // alert(JSON.stringify(values, null, 2));
                        // console.log(JSON.stringify(values, null, 2));
                        // actions.setSubmitting(false);
                    }, 1000);
                } else {
                    alert('Favor preencher informações!')
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
                            value={projeto.id}
                            placeholder='0'
                            name="id"
                            disabled
                        />
                        {props.errors.id && <div id="feedback">{props.errors.id}</div>}
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
                        {props.errors.nome && <div id="feedback">{props.errors.nome}</div>}
                    </div>

                    <div>
                        <input
                            type="text"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.descricao}
                            name="proposta"
                            placeholder="Proposta"
                        />
                        {props.errors.descricao && <div id="feedback">{props.errors.descricao}</div>}
                    </div>
                    

                    
                    

                               
                    <button type="submit">SALVAR</button>
                </form>
            )}
        </Formik>
    </div>
    );
}

export default Cadastro