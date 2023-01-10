import nodemailer from 'nodemailer'

interface EmailOptions {
  to: string
  html: string
  subject?: string
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  const testAccount = await nodemailer.createTestAccount()
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  })
  const result = await transporter.sendMail({
    from: 'megafinz',
    to,
    subject,
    html
  })
  console.log('SENT EMAIL:', nodemailer.getTestMessageUrl(result))
  return result
}

export function sendForgotPasswordEmail({
  to,
  link
}: {
  to: string
  link: string
}) {
  return sendEmail({
    to,
    subject: 'FullStackTut: Forgot Password',
    html: `Click this link to reset your email: ${link}`
  })
}
