import {
  Button,
  Html,
  Head,
  Font,
  Container,
  Section,
  Body,
  Img,
  Preview,
  Heading,
  Text,
} from '@react-email/components'
import * as React from 'react'

export default function Email({ url, userName }) {
  return (
    <Html lang="pt-BR">
      <Head>
        <Font
          fontFamily="Raleway"
          fallbackFontFamily="sans-serif"
          webFont={{
            url: 'https://fonts.gstatic.com/s/raleway/v12/1Ptrg8zYS_SKggPNwN4rWqZPANqczVs.woff2',
            format: 'woff2',
          }}
          fontWeight={500}
          fontStyle="normal"
        />
        <Font
          fontFamily="Raleway"
          fallbackFontFamily="sans-serif"
          webFont={{
            url: 'https://fonts.gstatic.com/s/raleway/v12/1Ptrg8zYS_SKggPNwJYtWqZPANqczVs.woff2',
            format: 'woff2',
          }}
          fontWeight={700}
          fontStyle="normal"
        />
        <Font
          fontFamily="Raleway"
          fallbackFontFamily="sans-serif"
          webFont={{
            url: 'https://fonts.gstatic.com/s/raleway/v12/1Ptrg8zYS_SKggPNwK4vWqZPANqczVs.woff2',
            format: 'woff2',
          }}
          fontWeight={900}
          fontStyle="normal"
        />
      </Head>
      <Preview>Connectattoo Confirmação de Email</Preview>
      <Body
        style={{
          backgroundColor: '#eeeeee',
          padding: '48px 0 48px 0',
        }}
      >
        <Container
          style={{
            maxWidth: '650px',
            backgroundColor: '#ffffff',
            position: 'relative',
          }}
        >
          <Container
            className="header"
            style={{
              height: '70px',
              maxWidth: '650px',
              backgroundColor: '#7A32C1',
              position: 'absolute',
              left: 0,
              right: 0,
            }}
          >
            <Img
              style={{
                margin: '0 auto',
              }}
              src={`https://iili.io/JcCpEhB.png`}
              width="191"
              height="35"
              alt="Connectatoo Logo"
            />
          </Container>
          <Section
            className="content"
            style={{
              position: 'absolute',
              left: 0,
              maxWidth: '410px',
            }}
          >
            <Heading
              style={{
                fontSize: '24px',
                marginBottom: '19px',
                marginTop: '48px',
                color: '#000',
              }}
            >
              Verifique seu endereço de email
            </Heading>
            <Text
              style={{
                fontSize: '16px',
                fontWeight: '500',
                maxWidth: '367px',
                marginBottom: '48px',
                color: '#000',
              }}
              className="confirm-acount-instructions"
            >
              Olá,
              <strong
                style={{ fontWeight: '700', color: '#000' }}
                className="user-name"
              >
                {' '}
                {userName}
              </strong>
              ,<br />
              Obrigado por criar uma conta no{' '}
              <strong style={{ fontWeight: '700', color: '#000' }}>
                Connectattoo.
              </strong>{' '}
              Para ativar a sua conta, clique no botão abaixo.
            </Text>
            <Section style={{}}>
              <Text
                style={{
                  color: '#7A32C1',
                  fontSize: '16px',
                  fontWeight: '900',
                  lineHeight: '111.5%' /* 17.84px */,
                  textTransform: 'uppercase',
                  marginBottom: '48px',
                  marginTop: '0px',
                }}
                className="time-remark"
              >
                O link de verificação de email é válido <br /> por 24 horas
              </Text>
            </Section>

            <Container
              style={{
                textAlign: 'center',
                marginBottom: '48px',
                position: 'relative',
              }}
            >
              <Button
                style={{
                  padding: '14px 32px',
                  borderRadius: '30px',
                  backgroundColor: '#7A32C1',
                  color: '#FFF',
                  lineHeight: '140%' /* 22.4px */,
                  fontWeight: 'bold',
                  fontSize: '16px',
                }}
                className="email-confirmation-button"
                href={url}
                target="_blank"
              >
                Confirmar e-mail e ativar conta
              </Button>
            </Container>

            <Text
              style={{
                maxWidth: '367px',
                fontSize: '12px',
                letterSpacing: ' -0.12px',
                lineHeight: '13px',
                fontWeight: '500',
                marginBottom: '48px',
                color: '#000',
              }}
              className="action-remark"
            >
              Se você não iniciou a solicitação, não é necessário tomar nenhuma
              ação adicional.
            </Text>
          </Section>
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '4px',
              backgroundColor: '#7A32C1',
            }}
            className="bottom-line"
          ></div>
        </Container>
      </Body>
    </Html>
  )
}
