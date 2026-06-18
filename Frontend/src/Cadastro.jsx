import { useForm } from 'react-hook-form';
import axios from 'axios';

export function Cadastro() {
  // Inicializa os métodos necessários do React Hook Form (Requisito 2)
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  // Acompanha o campo de senha para poder comparar na confirmação
  const senhaValor = watch("senha");

  // Função executada após o formulário passar por todas as validações (Requisito 6)
  const onSubmit = async (dados) => {
    try {
      // Envia os dados via POST para o nosso Backend na porta 5000
      const resposta = await axios.post('http://localhost:5000/api/cadastro', dados);
      alert(resposta.data.mensagem); // Mensagem descritiva de sucesso
    } catch (erro) {
      // Tratamento de falhas explícito no bloco catch (Requisito 5 e 6)
      const mensagemErro = erro.response?.data?.erro || 'Falha na comunicação com o servidor.';
      alert(`Erro: ${mensagemErro}`);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', fontFamily: 'sans-serif' }}>
      <h2>Cadastro de Usuário</h2>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Campo Nome (Requisito 3 e 4) */}
        <div style={{ marginBottom: '15px' }}>
          <label>Nome:</label>
          <input 
            type="text" 
            style={{ width: '100%', padding: '8px', display: 'block' }}
            {...register("nome", { required: "O campo Nome é obrigatório." })} 
          />
          {errors.nome && <span style={{ color: 'red' }}>{errors.nome.message}</span>}
        </div>

        {/* Campo E-mail (Requisito 3 e 4) */}
        <div style={{ marginBottom: '15px' }}>
          <label>E-mail:</label>
          <input 
            type="text" 
            style={{ width: '100%', padding: '8px', display: 'block' }}
            {...register("email", { 
              required: "O campo E-mail é obrigatório.",
              pattern: { value: /^\S+@\S+\.\S+$/, message: "Insira um e-mail válido." }
            })} 
          />
          {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}
        </div>

        {/* Campo Senha (Requisito 3 e 4) */}
        <div style={{ marginBottom: '15px' }}>
          <label>Senha:</label>
          <input 
            type="password" 
            style={{ width: '100%', padding: '8px', display: 'block' }}
            {...register("senha", { 
              required: "O campo Senha é obrigatório.",
              minLength: { value: 8, message: "A senha deve ter no mínimo 8 caracteres." }
            })} 
          />
          {errors.senha && <span style={{ color: 'red' }}>{errors.senha.message}</span>}
        </div>

        {/* Campo Confirmação de Senha (Requisito 3 e 4) */}
        <div style={{ marginBottom: '15px' }}>
          <label>Confirmação de Senha:</label>
          <input 
            type="password" 
            style={{ width: '100%', padding: '8px', display: 'block' }}
            {...register("confirmarSenha", { 
              required: "A confirmação de senha é obrigatória.",
              validate: (valor) => valor === senhaValor || "As senhas não coincidem."
            })} 
          />
          {errors.confirmarSenha && <span style={{ color: 'red' }}>{errors.confirmarSenha.message}</span>}
        </div>

        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>Cadastrar</button>
      </form>
    </div>
  );
}