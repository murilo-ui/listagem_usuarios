import { useEffect, useState } from "react";
import axios from "axios";

const filtrarUsuariosPorTermo = (termo) => (usuario) => {
    const termoLower = termo.toLowerCase();


    return (
        usuario.name.toLowerCase().includes(termoLower) ||
        usuario.email.toLowerCase().includes(termoLower) ||
        usuario.username.toLowerCase().includes(termoLower)
    )
};

function App() {
    const url = "https://jsonplaceholder.typicode.com";
    const [usuarios, setUsuarios] = useState([]);
    const [erro, setErro] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [busca, setBusca] = useState('');

    const usuariosFiltrados = usuarios.filter(filtrarUsuariosPorTermo(busca));

    async function buscaUsuarios() {
        try {
            setCarregando(true);
            const response = await axios.get(`${url}/users`);
            const data = response.data;
            setUsuarios(data);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
            setErro(`Não foi possível buscar os usuários. Código: ${error.message}`);
            setUsuarios([]);
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        buscaUsuarios();
    }, []);

    return (
        <div>
            <h1>Catálogo de Usuários</h1>

            <input
                type="text"
                placeholder="Filtrar usuários..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
            />




            {carregando && (<p>Carregando usuários...</p>)}
            
        <p>
            Usuários encontrados: {usuariosFiltrados.length} 
        </p>

        {erro && (
            <p>{erro}</p>
        )}

        {!carregando && !erro && (
            <>
                <p>
                    {usuariosFiltrados.length} usuarios encontrados(s).
                </p>

                {usuariosFiltrados.length > 0 ? (
                    <ul>
                        {usuariosFiltrados.map((usuario) => (
                            <li key={usuario.id}>
                                <hr />
                                <strong>Nome:</strong> {usuario.name} <br />
                                <strong>Email:</strong> {usuario.email}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nenhum usuário encontrado.</p>
                )}
            </>
        )}


        </div>
    );
}

export default App;