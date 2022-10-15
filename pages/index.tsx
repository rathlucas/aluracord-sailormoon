import { Box, Button, Text, TextField, Image } from '@skynexui/components'
import { FormEvent, ReactNode, useState } from 'react'
import { useRouter } from 'next/router'
import appConfig from '../config.json'
import styles from './index/index.module.scss'
import { NextPage } from 'next'

type TitleProps = {
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  children: ReactNode
}

function Title(props: TitleProps) {
  const Tag = props.tag
  return (
    <>
      <style jsx>{`
        ${Tag} {
          color: ${appConfig.theme.colors.neutrals['000']};
          font-size: 24px;
          font-weight: 600;
        }
      `}</style>
      <Tag>{props.children}</Tag>
    </>
  )
}

export default function PaginaInicial(): NextPage {
  const [username, setUsername] = useState('')
  const roteamento = useRouter()

  const handleLogin = (e: FormEvent) => {
    e.preventDefault()

    roteamento.push(`./chat?username=${username}`)
    console.log(`${username} successfully logged in`)
  }

  return (
    <>
      <div className={styles.homeBackground}>
        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={handleLogin}>
            <Title tag='h2'>Boas vindas de volta!</Title>
            <Text
              variant='body3'
              styleSheet={{
                marginBottom: '32px',
                color: appConfig.theme.colors.neutrals[300],
              }}
            >
              {appConfig.name}
            </Text>

            {/* <input
              type="text"
              value={username}
              onChange={function (event) {
                console.log("Usuário digitou", event.target.value);
                // Onde tá o valor?
                const valor = event.target.value;
                // Trocar o valor da variável através do react
                setUsername(valor);
              }}
            /> */}

            <TextField
              value={username}
              onChange={function (event) {
                console.log('Usuário digitou', event.target.value)
                const valor = event.target.value

                setUsername(valor)
              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />
            <Button
              type='submit'
              label='Entrar'
              disabled={username.length < 3}
              fullWidth
              buttonColors={{
                mainColorStrong: appConfig.theme.colors.primary[400],
                mainColor: appConfig.theme.colors.primary[500],
              }}
            />
          </form>

          {/* Photo Area */}
          <Box
            disabled={username.length < 3}
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={`https://github.com/${username}.png`}
            />
            <Text
              variant='body4'
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000px',
              }}
            >
              {username}
            </Text>
          </Box>
        </div>
        {/* Photo Area */}
      </div>
    </>
  )
}
