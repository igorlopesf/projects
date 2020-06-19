const startButton = document.getElementById('start-btn')
const startPage = document.getElementById('teste')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex


startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  startPage.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Reiniciar Quiz'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Sobre as empresas que terão que se adequar as normas da Lei Geral de Proteção de Dados Pessoais, assinale a alternativa correta.',
    answers: [
      { text: 'A LGPD se aplica para apenas para empresas de tecnologia que possuam um setor especializado na coleta de dados pessoais.', correct: false },
      { text: 'A LGPD não se aplica apenas para empresas de tecnologia, e sim para toda empresa que colete ou armazene dados pessoais.', correct: true },
      { text: 'A LGPD se aplica apenas para as empresas da área de tecnologia que possuem mais de 100 clientes.', correct: false },
      { text: 'A LGPD se aplica para todas as empresas.', correct: false }
    ]
  },
  {
    question: 'Sobre a coleta de dados pessoais, escolha a alternativa correta:',
    answers: [
      { text: 'A empresa que coletar informações pessoais precisará ter apenas uma base de dados para armazená-los.', correct: false },
      { text: 'A empresa poderá coletar os dados pessoais de adolescente de 16 a 18 anos mesmo sem a autorização dos pais.', correct: false },
      { text: 'A empresa deverá garantir o direito ao titular de apagar todos os dados pessoais caso o mesmo solicite.', correct: true },
      { text: 'A empresa só poderá coletar dados pessoais caso o titular autorize, e não precisará informar a principio para qual finalidade os dados serão coletados.', correct: false }
    ]
  },
  {
    question: 'Todo dado pessoal precisará ter o consentimento das pessoas para ser armazenado?',
    answers: [
      { text: 'Sim, sem exceção. Pois é previsto por lei que a pessoa deverá saber que seus dados estão sendo armazenados pela empresa.', correct: false },
      { text: 'Sim, porém, se a pessoa não tiver consentimento, e aconteça um vazamento de dados, a empresa se ausentará da multa, mas poderá sofrer uma ação judicial.', correct: false },
      { text: 'Não, a lei prevê outras bases legais, como o legítimo Interesse. Ex: Caso a pessoa resida em um edifício pode ser de legítimo interesse do condomínio registrar as imagens das câmeras de segurança.', correct: true },
      { text: 'Não, a empresa poderá armazenar os dados sem o consentimento das pessoas.', correct: false }
    ]
  },
  {
    question: 'Quem fiscaliza o cumprimento da lei LGPD?',
    answers: [
      { text: 'Autoridade Nacional de Padronização dos Dados (ANPD).', correct: false },
      { text: 'Autoridade Nacional de Proteção de Dados (ANPD).', correct: true },
      { text: 'Controladoria-Geral da União (CGU).', correct: false },
      { text: 'Conselho de Controle das Atividades de Proteção de Dados (CCAPD).', correct: false }
    ]
  },
  {
    question: 'Quais os fundamentos da LGPD?',
    answers: [
      { text: 'Respeito à privacidade, a autodeterminação informativa, inviolabilidade da intimidade, e honra da imagem.', correct: true },
      { text: 'Toda pessoa tem o direito de acesso às ações e serviços , independente de sexo, raça, ocupação, ou outras caracteristicas sociais ou pessoais.', correct: false },
      { text: 'Toda pessoa que tem seus dados coletados, tem o direito de saber para que esses dados serão utilizados, respeitando sempre as normas do Conselho de Controle das Atividades de Proteção de Dados.', correct: false },
      { text: 'Dignidade, essa é a qualidade que define a essência humana para a LGPD. Um homem digno para a coleta de dados, é um homem que cujo existência dos dados tem valor absoluto.', correct: false }
    ]
  },
  {
    question: 'Complete a frase: É do titular o direito de ___________, assim como a _________ de informações, tendo o _______, e informando-o sobre a informação da ___________.',
    answers: [
      { text: 'Acesso aos dados coletados, finalidade da coleta, consentimento do titular, solicitação da coleta.', correct: false },
      { text: 'Segurança, empresa dispor, dado pessoal, empresa.', correct: false },
      { text: 'Manter seus dados protegidos, empresa na coleta, consentimento do titular, solicitação da coleta.', correct: false },
      { text: 'Acesso aos dados coletados, solicitação de correção, consentimento do titular, finalidade da coleta.', correct: true }
    ]
  },
  {
    question: 'Segundo o Artigo 5º da LGPD, considera-se “titular”:',
    answers: [
      { text: 'Conjunto estruturado de dados pessoais, estabelecido em um ou em vários locais, em suporte eletrônico ou físico.', correct: false },
      { text: 'Pessoa natural a quem se referem os dados pessoais que são objeto de tratamento.', correct: true },
      { text: 'Agente de tratamento: o controlador e o operador.', correct: false },
      { text: 'Caráter particular ou original que distingue alguém, individualidade.', correct: false }
    ]
  },
  {
    question: 'Quais os dados que poderão ser coletados pelas empresas?',
    answers: [
      { text: 'As empresas deverão coletar somente: Nome, Idade, Sexo, CPF, RG, Renda mensal, email e uma foto recente.', correct: false },
      { text: 'As empresas poderão coletar qualquer dado pessoal, caso a pessoa permita. ', correct: false },
      { text: 'As empresas poderão coletar somente: Nome, idade e sexo de adolescentes menores de 18 anos, mesmo com a autorização dos pais.', correct: false },
      { text: 'As empresas deverão coletar somente os dados necessários aos serviços prestados.', correct: true }
    ]
  },
  {
    question: 'Para que serve a Lei Geral de Proteção de Dados Pessoais (LGPD)?',
    answers: [
      { text: 'Definir as principais diretrizes relacionadas com a obtenção, tratamento, proteção e análise dos dados pessoais, principalmente pelos meios digitais.', correct: true },
      { text: 'Manter todos os dados pessoais em sigilo, porém poderá serem sedidos para uma pessoa que comprove ser parente próximo do titular.', correct: false },
      { text: 'Essa lei foi criada com o intuito de estabelecer normas direcionadas para a responsabilidade dos gestores com relação às finaças públicas.', correct: false },
      { text: 'Essa lei é elaborada anualmente e tem como objetivo apontar as prioridades do governo sobre a análise anual dos dados pessoais.', correct: false }
    ]
  },
  {
    question: 'Sem o consentimento do titular, os dados já fornecidos serão excluídos?',
    answers: [
      { text: 'Sim, a pessoa é quem decide se a empresa terá seus dados ou não.', correct: false },
      { text: 'Sim, a empresa não tem o direito de manter os dados das pessoas em hipótese alguma.', correct: false },
      { text: 'Não, a empresa poderá manter todos os dados.', correct: false },
      { text: 'Não necessáriamente, pois, a empresa pode necessitar de certos dados para que seja enviado boletos ou cobranças.', correct: true }
    ]
  }
]