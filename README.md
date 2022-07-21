
# Rentx - Aluguel de carros

Essa é um API completa de aluguel de carros. Criado em NodeJs, TypeScript e express. No Banco de Dados é usado Postegres junto com TypeORM. Além disso utiliza jest para testes automatizados e jwt token e refresh-token para autenticação.


## Casos de Uso

- [Contas e usuários](#contas-e-usuários)
    - [Cadastro de usuário](#cadastro-de-usuário)
    - [Autenticação de usuário](#autenticação-de-usuário)
- [Carros](#carros)
    - [Cadastrar carro](#cadastrar-carro)
    - [Listar carros](#listar-carros)
    - [Upload de imagem](#upload-de-imagem)
- [Aluguéis](#aluguéis)
    - [Criar aluguel](#criar-aluguel)
    - [Devolução e cobrança](#devolução-e-cobrança)

## Contas e usuários
### Cadastro de usuário

```https
  POST /users/
```
Para cadastrar um usuário a aplicação deve receber no **corpo** da requisição as seguintes propriedades:

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | Nome do usuário |
| `username` | `string` | Nome de identificação |
| `email` | `string` | E-mail do usuário |
| `password` | `string` | Senha  de acesso |
| `driver_license` | `string` | Número da carteira de habilitação |

#### Retorno

Caso a criação seja bem sucedida o usuário irá receber um `response` com status `201`

### Autenticação de usuário

A aplicação usa um token de acesso com duração de 15m e um refresh-token com duração de 30d que é usado para criar novos tokens de acesso.  
Quando um usuário faz login são gerados tanto o token de acesso quanto o refresh-token.

```https
    POST /sessions
```

Para que seja possível fazer login a aplicação deve receber no **corpo** da requisição as seguintes propriedades:

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | E-mail do usuário |
| `password` | `string` | Senha do usuário |

#### Retorno

Se o login for bem-sucedido o retorno será: `200`

```json
{
	"token": "(token de acesso)",
	"user": {
		"name": "Nome do usuário",
		"email": "Email do usuário"
	},
	"refresh_token": "(refresh-token)"
}
```

## Carros
### Cadastrar carro 

**RN:**  
- Não é possível cadastrar um carro com uma placa já existente.  
- O carro é terá o status 'disponivel' ao ser criado.
- O usuário responsável pelo cadastro deve ser um administrador.

```https
    POST /cars
```

Para cadastrar um carro a aplicação deve receber um token de um usuário administrador
e deve receber as seguintes propriedades no corpo da requisição:

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | Modelo do carro |
| `description` | `string` | Descrição do carro |
| `brand` | `string` | Marca do carro |
| `category_id` | `string` | Id da categoria que o carro pertence |
| `license_plate` | `string` | Placa do carro |
| `fine_amount` | `number` | Multa de atraso de devolução |
| `daily_rate` | `number` | Custo de aluguel diário |

#### Retorno

Caso a criação seja bem sucedida o retorno será: `201`

```json
{
	"id": "(id do carro gerado)",
	"available": true,
	"name": "Nome do carro",
	"description": "Descrição do carro",
	"daily_rate": 0,
	"license_plate": "ABC-1234",
	"fine_amount": 0,
	"brand": "Marca do carro",
	"category_id": "(id da categoria)",
	"created_at": "(data de criação)"
}
```

### Listar carros

Lista os carros disponiveis para aluguel. O usuário não precisa estar autenticado no sistema.

```https
    GET /cars/available
```

#### Retorno

O retorno deverá ser um `array` de objetos contendo as informações dos carros disponíveis.


### Upload de imagem

Para fazer o upload de uma imagem de um carro o usuário deve estar autenticado e ser um administrador  
Além disso, o id do carro deve ser recebido na **rota** (path) da requisição.

```https
    POST /cars/images/{car_id}
```

A imagem deve ser recebida no corpo da requisição como um **Multipart Form.**

#### Retorno

Caso o upload seja bem secedida o retorno será: `201`

## Aluguéis

### Criar aluguel

**RN:**
- Apenas um usuário autenticado pode alugar um carro.
- O aluguel deve ter duração mínima de 24 horas.
- Um usuário pode ter apenas 1 aluguel em aberto.
- Não é possivel alugar um carro que já está alugado.

```https
    POST /rentals
```

Para cadastrar um aluguel o usuário deve estar autenticado e a aplicação deve receber as seguintes propriedades no **corpo** da requisição: 

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `expected_return_date` | `string` | Data de devolução |
| `car_id` | `string` | Id do carro que será alugado |

#### Retorno

Caso o alguel seja criado com sucesso o retorno será: `201`

```json
{
	"id": "(id gerado do aluguel)",
	"car_id": "(id do carro)",
	"user_id": "(id do usuário)",
	"expected_return_date": "(data de devolução)",
	"created_at": "(data de criação)",
	"updated_at": "(data de atualização)"
}
```

### Devolução e cobrança

**RN:**

- Se o carro for devolvido em menos de 24h será cobrado a diária completa.
- Caso a data de entrega seja superior a data prevista de entrega será cobrado uma multa proporcional ao atraso.
- Caso haja multa, ela será somada ao total do aluguel.
- O usuário precisa estar autenticado para fazer uma devolução.

Para que uma devolução seja feita, o id do aluguel deve ser passado na **rota** (path) da requisição.
Além disso o usuário precisa estar autenticado.

```https
    POST /rentals/devolution/{rental_id}
```

#### Retorno

Caso a devolução seja feita com sucesso, o retorno deverá ser: `200`

```json
{
	"id": "(id do aluguel)",
	"car_id": "(id do carro)",
	"user_id": "(id do usuário)",
	"start_date": "(inicio do aluguel)",
	"end_date": "(fim do aluguel)",
	"expected_return_date": "(data de devolução esperada)",
	"total": 0,
	"created_at": "(data de criação)",
	"updated_at": "(data de atualização)"
}
```
## Stack utilizada

**Back-end:** Node, Express, jwt, TypeScript, TypeORM, Postgres, Docker, jest



# Recuperação de senha

**RF**
Deve ser possível o usuário recuperar a senha informando o e-mail
O usuário deve receber um e-mail com o passo a passo para a recuperação de senha
O usuário deve conseguir inserir uma nova senha

**RN**
O usuário preceisa informar uma nova senha
O link enviado para a recuperação precisa expirar em 3 horas
