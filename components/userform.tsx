'use client'
import { useState } from 'react';
const UserForm = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    arquivo: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      arquivo: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('nome', formData.nome);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('telefone', formData.telefone);
    formDataToSend.append('cpf', formData.cpf);
    formDataToSend.append('avatar', formData.arquivo);

    try {
      const response = await fetch('http://localhost:3001/', {
        method: 'POST',
        body: formDataToSend,
      });

      const responseData = await response.json();
      console.log('Resposta do servidor:', responseData);
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
    }
  };
  return (
    <div>
      <h1>Formulário</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input type="text" name="nome" value={formData.nome} onChange={handleInputChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
        </div>
        <div>
          <label>Telefone:</label>
          <input type="tel" name="telefone" value={formData.telefone} onChange={handleInputChange} />
        </div>
        <div>
          <label>CPF:</label>
          <input type="text" name="cpf" value={formData.cpf} onChange={handleInputChange} />
        </div>
        <div>
          <label>Arquivo:</label>
          <input type="file" name="arquivo" accept="image/*" onChange={handleFileChange} />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default UserForm;
