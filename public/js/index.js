// public/js/index.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('Frontend da Loja AWS carregado');
    
    // Só faz requisições se não estiver no ambiente de teste
    if (process.env.NODE_ENV !== 'test') {
        // Função para cadastrar produto
        const form = document.querySelector('form');
        if (form) {
            form.addEventListener('submit', async (event) => {
                event.preventDefault();
                
                const nome = document.querySelector('input[name="nome"]').value;
                const preco = document.querySelector('input[name="preco"]').value;
                const estoque = document.querySelector('input[name="estoque"]').value;
                
                try {
                    const response = await fetch('/api/produtos', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ nome, preco: parseFloat(preco), estoque: parseInt(estoque) })
                    });
                    
                    if (response.ok) {
                        alert('Produto cadastrado com sucesso!');
                        form.reset();
                        // Recarregar a lista de produtos
                        carregarProdutos();
                    } else {
                        alert('Erro ao cadastrar produto');
                    }
                } catch (error) {
                    console.error('Erro:', error);
                    alert('Erro ao cadastrar produto');
                }
            });
        }
        
        // Função para carregar produtos na tabela
        async function carregarProdutos() {
            try {
                const response = await fetch('/api/produtos');
                const produtos = await response.json();
                
                const tbody = document.querySelector('table tbody');
                if (tbody) {
                    tbody.innerHTML = '';
                    
                    produtos.forEach(produto => {
                        const row = tbody.insertRow();
                        row.insertCell(0).textContent = produto.id;
                        row.insertCell(1).textContent = produto.nome;
                        row.insertCell(2).textContent = produto.preco;
                        row.insertCell(3).textContent = produto.estoque;
                        
                        // Botão de editar
                        const editCell = row.insertCell(4);
                        const editButton = document.createElement('button');
                        editButton.textContent = 'Editar';
                        editButton.onclick = () => editarProduto(produto);
                        editCell.appendChild(editButton);
                        
                        // Botão de excluir
                        const deleteCell = row.insertCell(5);
                        const deleteButton = document.createElement('button');
                        deleteButton.textContent = 'Excluir';
                        deleteButton.onclick = () => excluirProduto(produto.id);
                        deleteCell.appendChild(deleteButton);
                    });
                }
            } catch (error) {
                console.error('Erro ao carregar produtos:', error);
            }
        }
        
        // Função para editar produto
        function editarProduto(produto) {
            document.querySelector('input[name="nome"]').value = produto.nome;
            document.querySelector('input[name="preco"]').value = produto.preco;
            document.querySelector('input[name="estoque"]').value = produto.estoque;
        }
        
        // Função para excluir produto
        async function excluirProduto(id) {
            if (confirm('Tem certeza que deseja excluir este produto?')) {
                try {
                    const response = await fetch(`/api/produtos/${id}`, {
                        method: 'DELETE'
                    });
                    
                    if (response.ok) {
                        alert('Produto excluído com sucesso!');
                        carregarProdutos();
                    } else {
                        alert('Erro ao excluir produto');
                    }
                } catch (error) {
                    console.error('Erro:', error);
                    alert('Erro ao excluir produto');
                }
            }
        }
        
        // Carregar produtos ao iniciar
        carregarProdutos();
    }
    
    console.log('Eventos inicializados');
});