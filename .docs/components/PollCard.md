# PollCard Component

## Descrição

O `PollCard` é um componente que exibe informações básicas de uma enquete, como título, descrição, data de expiração, nome do criador e categoria. Além disso, o componente possui botões de ação para editar compartilhar ou arquivar a enquete.

<div align="center">
  <img src="https://github.com/HiveSoft-UEFS/votaai-frontend/assets/96327378/ec8e84cb-24ac-4ad5-b22c-c819452c385d" width="30%">
</div>

## Propriedades (Props)

| Propriedade       | Tipo       | Obrigatório | Descrição                                                  |
|-------------------|------------|-------------|------------------------------------------------------------|
| `id`              | `int`      | Sim         | Identificador único da enquete.                            |
| `title`           | `string`   | Sim         | Título da enquete.                                         |
| `description`     | `string`   | Sim         | Descrição da enquete.                                      |
| `tags`            | `list`     | Sim         | Lista de categorias da enquete.                            |
| `expirationDate`  | `datetime` | Sim         | Data de expiração da enquete.                              |
| `creatorName`     | `string`   | Sim         | Nome do criador da enquete.                                |
| `onEditCallback`  | `function` | Não         | Função a ser executada ao clicar no botão de editar.       |
| `onShareCallback` | `function` | Não         | Função a ser executada ao clicar no botão de compartilhar. |

## Estado e Eventos

### Estado Interno

| Propriedade           | Tipo       | Descrição                                                      |
|-----------------------|------------|----------------------------------------------------------------|
| `isMenuOpen`          | `boolean`  | Indica se o menu de overflow está aberto.                      |


### Eventos

| Evento    | Descrição                                            |
|-----------|------------------------------------------------------|
| `onEdit`  | Evento disparado ao clicar no botão de editar.       |
| `onShare` | Evento disparado ao clicar no botão de compartilhar. |

## Exemplo de Uso

```jsx
import React from 'react';
import UserCard from './components/PollCard';

const Example = () => {
  const handleEdit = () => {
    console.log(`Clicou no botão de editar!`);
  };
  
  const handleShare = (pollId) => {
    CopyToClipboard(`https://votaai.com/poll/${pollId}`);
  };
  
  return (
    <PollCard
      pollId={1}
      title="Qual é o seu filme favorito?"
      description="Vote no seu filme favorito de todos os tempos!"
      tags={['Filmes', 'Cinema']}
      expirationDate={new Date('2021-12-31')}
      creatorName="João da Silva"
      onEditCallback={handleEdit}
      onShareCallback={handleShare}
    />
  );
};

export default Example;
```