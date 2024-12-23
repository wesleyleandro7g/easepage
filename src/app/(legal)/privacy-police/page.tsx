export default function PrivacyPolicePage() {
  return (
    <main className='flex flex-col items-center justify-center w-full min-h-screen py-20 bg-gray-100'>
      <section className='flex flex-col items-start gap-4 w-full max-w-6xl mx-auto'>
        <h1 className='text-4xl font-semibold text-gray-800 mb-6'>
          Política de Privacidade
        </h1>
        <p className='mb-4'>
          A EasePage (&quot;nós&quot;, &quot;nosso&quot;, &quot;nós
          mesmos&quot;) respeita a sua privacidade e está comprometida em
          proteger os dados pessoais que você compartilha conosco. Esta Política
          de Privacidade descreve como coletamos, usamos, armazenamos e
          protegemos suas informações. Ao acessar nosso site (
          <a href='https://easepage.io' className='text-blue-500 underline'>
            easepage.io
          </a>
          ) ou utilizar nossos serviços, você concorda com os termos descritos
          nesta política.
        </p>

        <hr className='my-6' />

        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
          1. Informações que Coletamos
        </h2>
        <ul className='list-disc list-inside mb-6'>
          <li>
            <strong>Informações pessoais fornecidas por você:</strong> Nome,
            e-mail, telefone, dados de pagamento e outras informações que você
            compartilha ao preencher formulários ou contratar nossos serviços.
          </li>
          <li>
            <strong>Informações automáticas:</strong> Endereço IP, tipo de
            navegador, páginas acessadas, tempo de visita e outras informações
            coletadas por cookies e tecnologias semelhantes.
          </li>
          <li>
            <strong>Comunicações:</strong> Dados das interações feitas conosco
            via e-mail (
            <a
              href='mailto:hello@easepage.io'
              className='text-blue-500 underline'
            >
              hello@easepage.io
            </a>
            ) ou WhatsApp.
          </li>
        </ul>

        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
          2. Como Utilizamos as Informações
        </h2>
        <ul className='list-disc list-inside mb-6'>
          <li>Processar pagamentos e gerenciar assinaturas;</li>
          <li>Personalizar sua experiência com nossos serviços;</li>
          <li>Melhorar a usabilidade do site e identificar problemas;</li>
          <li>
            Enviar informações promocionais e atualizações sobre nossos
            produtos, com seu consentimento;
          </li>
          <li>
            Cumprir obrigações legais ou regulatórias, incluindo as exigidas
            pelo CNPJ 46.343.973/0001-24.
          </li>
        </ul>

        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
          3. Compartilhamento de Informações
        </h2>
        <p className='mb-6'>
          Nunca vendemos ou alugamos suas informações pessoais. Podemos
          compartilhar dados com terceiros apenas quando:
        </p>
        <ul className='list-disc list-inside mb-6'>
          <li>
            Necessário para processar pagamentos (ex.: processadores de
            pagamento);
          </li>
          <li>Exigido por lei ou autoridades legais;</li>
          <li>
            Relativo a parceiros que oferecem serviços complementares, mediante
            sua autorização.
          </li>
        </ul>

        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
          4. Cookies e Tecnologias Semelhantes
        </h2>
        <p className='mb-6'>Utilizamos cookies para:</p>
        <ul className='list-disc list-inside mb-6'>
          <li>Melhorar sua experiência de navegação;</li>
          <li>Analisar estatísticas de uso do site;</li>
          <li>Oferecer conteúdo personalizado.</li>
        </ul>
        <p className='mb-6'>
          Você pode gerenciar ou desativar cookies por meio das configurações do
          seu navegador.
        </p>

        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
          5. Segurança dos Dados
        </h2>
        <p className='mb-6'>
          Adotamos medidas técnicas e organizacionais para proteger suas
          informações contra acesso não autorizado, perda ou alteração. No
          entanto, nenhum sistema é completamente seguro. Caso identifiquemos
          alguma violação, notificaremos os envolvidos e as autoridades
          competentes, conforme exigido por lei.
        </p>

        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
          6. Retenção de Dados
        </h2>
        <p className='mb-6'>
          Reteremos suas informações pessoais enquanto for necessário para:
        </p>
        <ul className='list-disc list-inside mb-6'>
          <li>Cumprir os propósitos descritos nesta política;</li>
          <li>Atender requisitos legais.</li>
        </ul>
        <p className='mb-6'>
          Após este período, seus dados serão anonimizados ou excluídos de forma
          segura.
        </p>

        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
          7. Seus Direitos
        </h2>
        <p className='mb-6'>
          Você tem os seguintes direitos relacionados aos seus dados pessoais:
        </p>
        <ul className='list-disc list-inside mb-6'>
          <li>Acessar, corrigir ou excluir suas informações;</li>
          <li>Solicitar a portabilidade dos seus dados;</li>
          <li>Revogar o consentimento para comunicações promocionais.</li>
        </ul>
        <p className='mb-6'>
          Para exercer esses direitos, entre em contato pelo e-mail{' '}
          <a
            href='mailto:hello@easepage.io'
            className='text-blue-500 underline'
          >
            hello@easepage.io
          </a>
          .
        </p>

        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
          8. Alterações na Política de Privacidade
        </h2>
        <p className='mb-6'>
          Podemos atualizar esta política periodicamente. Notificaremos
          alterações significativas através do site ou por e-mail. Recomendamos
          revisar esta página regularmente para se manter informado.
        </p>

        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
          9. Contato
        </h2>
        <p className='mb-6'>
          Se tiver dúvidas ou preocupações sobre esta política, entre em contato
          conosco:
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
