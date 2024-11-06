import React, {useState, useEffect} from 'react';
import './Listagem.css';
import { Formik } from 'formik';
import axios from 'axios';
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import logo from '../assets/react.svg';
import lixo from '../assets/delete.png';
import trash from '../assets/trash.svg';


const Listagem = () => {

    const [dados, setDados] = useState([])
    const [itemApagado, setItemApagado] = useState(false)

    function receberDados(){
        axios.get('http://localhost:8080/projetos'
        ).then(response => {
            console.log(response.data)
            setDados(response.data)
        })
        .catch(error => console.log(error))
    }

    async function apagarDados(produto){
        axios.delete('http://localhost:8080/projetos',
        {
            data : produto,
            headers: {                  
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, Content-Type, Accept, Authorization", 
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE" ,
                "Content-Type": "application/json;charset=UTF-8"                   
            },
        })
        .then(response => {
            console.log(response)
            console.log('Dados apagados!')
            setItemApagado(true)
        })
        .catch(error => console.log(error))
    }
    
    useEffect(()=>{
        receberDados()
    }, [])

    useEffect(()=>{
        if(itemApagado)
            receberDados()
        return() =>{
            setItemApagado(false)
        }
    }, [itemApagado])

    const ItensLista = () => dados.map(
        produto => 
        <li key={projeto.id} >
            <Card className="card-product">
                <Card.Img className="garbage"
                    onClick={async ()=>{
                        await apagarDados(JSON.stringify(produto))
                    }} 
                    src={trash} />
                <Card.Img className="img-product" variant="top" src={logo} />
                <Card.Body>
                    <Card.Title>{projeto.nome_projeto}</Card.Title>
                    <Card.Text>
                        {projeto.Integrantes}
                    </Card.Text>
                    <Card.Text>
                        {projeto.proposta}
                    </Card.Text>
                    <Link to="/detalhe" state={{projeto: projeto}}>
                        Detalhe do projeto
                    </Link>
                </Card.Body>
            </Card>
        </li>
    )

    
    return (
    <div>
        <h1>Cadastrar projeto</h1>
        <Link to={"/cadastro"}>
            CADASTRO
        </Link>

        <ul className="row">
            <ItensLista />
        </ul>

    </div>
    );
}

export default Listagem