import nodemailer from "nodemailer"
// checking email for validity

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    })
  }
  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Activate acaunt in " + process.env.API_URL,
      text: "",
      html:
        `
          <div>
              <h1>activeate link</h1>
              <a href="${link}">${link}</a>
          </div>
        `
    })
  }
}

export default new MailService;
