export default function TermsOfUsePage() {
  return (
    <main className='flex flex-col items-center justify-center w-full min-h-screen py-20 bg-gray-100'>
      <section className='flex flex-col items-start gap-4 w-full max-w-6xl mx-auto'>
        <h1 className='text-4xl font-semibold text-gray-800 mb-6'>
          Termos de Uso
        </h1>
        <p className='mb-4'>
          Bem-vindo ao site da EasePage! Estes Termos de Uso regulam o acesso e
          a utilização dos nossos serviços e plataformas. Ao acessar ou usar o
          site{' '}
          <a href='https://easepage.io' className='text-blue-500 underline'>
            easepage.io
          </a>{' '}
          ou nossos serviços, você concorda com os termos abaixo. Caso não
          concorde com eles, por favor, não utilize nossos serviços.
        </p>

        <hr className='my-6' />

        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
          1. Aceitação dos Termos
        </h2>
        <ul className='list-disc list-inside mb-6'>
          <li>
            É maior de 18 anos ou possui permissão legal para utilizar nossos
            serviços;
          </li>
          <li>
            Concorda com os presentes Termos de Uso e com nossa{' '}
            <a
              href='https://easepage.io/privacy-police'
              className='text-blue-500 underline'
            >
              Política de Privacidade
            </a>
            ;
          </li>
          <li>
            As informações fornecidas por você são precisas, verdadeiras e
            atualizadas.
          </li>
        </ul>

        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
          2. Serviços Oferecidos
        </h2>
        <ul className='list-disc list-inside mb-6'>
          <li>
            Criação de sites e páginas de vendas otimizadas para conversão;
          </li>
          <li>
            Ferramentas e soluções voltadas para empreendedores e empresas.
          </li>
        </ul>
        <p className='mb-6'>
          Reservamo-nos o direito de modificar ou descontinuar nossos serviços a
          qualquer momento, sem aviso prévio.
        </p>

        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
          3. Cadastro e Conta de Usuário
        </h2>
        <p className='mb-6'>
          Para utilizar alguns serviços, pode ser necessário criar uma conta.
          Você é responsável por:
        </p>
        <ul className='list-disc list-inside mb-6'>
          <li>Manter a confidencialidade das credenciais da sua conta;</li>
          <li>Todas as atividades realizadas na sua conta;</li>
          <li>Informar-nos imediatamente em caso de uso não autorizado.</li>
        </ul>

        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
          4. Pagamento e Assinaturas
        </h2>
        <ul className='list-disc list-inside mb-6'>
          <li>
            Todos os preços estão listados em reais (BRL), salvo indicado de
            outra forma;
          </li>
          <li>
            Os pagamentos devem ser realizados conforme as condições descritas
            no momento da contratação;
          </li>
          <li>
            Assinaturas podem ser renovadas automaticamente, salvo cancelamento
            pelo usuário antes do período de renovação.
          </li>
        </ul>

        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
          5. Uso Aceitável
        </h2>
        <p className='mb-6'>
          Você concorda em não utilizar nossos serviços para:
        </p>
        <ul className='list-disc list-inside mb-6'>
          <li>Violar qualquer lei ou regulamento aplicável;</li>
          <li>Transmitir materiais ilegais, ofensivos ou difamatórios;</li>
          <li>
            Realizar atividades que prejudiquem o funcionamento do site ou da
            plataforma.
          </li>
        </ul>

        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
          6. Propriedade Intelectual
        </h2>
        <p className='mb-6'>
          Todo o conteúdo do site e serviços, incluindo textos, imagens, códigos
          e logotipos, é de propriedade da EasePage ou de terceiros licenciados.
          Você não tem permissão para copiar, reproduzir, modificar ou
          distribuir qualquer parte sem autorização prévia.
        </p>

        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
          7. Limitação de Responsabilidade
        </h2>
        <p className='mb-6'>
          Na máxima extensão permitida por lei, a EasePage não será responsável
          por:
        </p>
        <ul className='list-disc list-inside mb-6'>
          <li>
            Danos diretos, indiretos, incidentais ou consequentes resultantes do
            uso ou incapacidade de uso dos serviços;
          </li>
          <li>Perdas de dados ou lucros cessantes.</li>
        </ul>

        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
          8. Rescisão
        </h2>
        <p className='mb-6'>
          Podemos suspender ou encerrar seu acesso aos serviços caso você viole
          estes Termos de Uso ou qualquer outra política aplicável. Você também
          pode encerrar sua conta a qualquer momento.
        </p>

        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
          9. Alterações nos Termos de Uso
        </h2>
        <p className='mb-6'>
          Reservamo-nos o direito de modificar estes Termos de Uso a qualquer
          momento. Notificaremos alterações significativas através do site ou
          por e-mail. O uso continuado dos serviços após tais alterações
          constitui sua aceitação dos novos termos.
        </p>

        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
          10. Contato
        </h2>
        <p className='mb-6'>
          Se você tiver dúvidas ou preocupações sobre estes Termos de Uso, entre
          em contato conosco:
        </p>
        <ul className='list-disc list-inside mb-6'>
          <li>
            <strong>E-mail:</strong>{' '}
            <a
              href='mailto:hello@easepage.io'
              className='text-blue-500 underline'
            >
              hello@easepage.io
            </a>
          </li>
          <li>
            <strong>Site:</strong>{' '}
            <a href='https://easepage.io' className='text-blue-500 underline'>
              easepage.io
            </a>
          </li>
          <li>
            <strong>CNPJ:</strong> 46.343.973/0001-24
          </li>
        </ul>
      </section>
    </main>
  )
}
