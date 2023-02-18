import {NextApiRequest, NextApiResponse} from "next"
const nodemailer = require('nodemailer');

interface NodemailerTransport {
    host: string,
    user: string,
    pass: string,
}

interface SendValues {
    transport: NodemailerTransport
    fullName: string
    email: string
    subject: string
    message: string
    toEmail: string
    fromEmail: string
}

const prepareValues = (req: NextApiRequest) : SendValues => {
    const nodemailerToEmail = process.env.NODEMAILER_TO_EMAIL;
    const nodemailerHost = process.env.NODEMAILER_HOST;
    const nodemailerUser = process.env.NODEMAILER_USER;
    const nodemailerPass = process.env.NODEMAILER_PASS;
    if (!nodemailerToEmail || !nodemailerHost || !nodemailerUser || !nodemailerPass) {
        throw Error('A required environment variable is missing')
    }
    const fullName = req.body.fullName?.trim() ?? ''
    const email = req.body.email?.trim() ?? ''
    const subject = req.body.subject?.trim() ?? ''
    const message = req.body.message?.trim() ?? ''
    if (!fullName || !email || !subject || !message) {
        throw Error('An empty form value was sent')
    }
    const toEmail = nodemailerToEmail;
    const fromEmail = nodemailerUser;
    return {
        transport: {
            host: nodemailerHost,
            user: nodemailerUser,
            pass: nodemailerPass
        },
        fullName,
        email,
        subject,
        message,
        toEmail,
        fromEmail
    }
}

const sendEmail = async (req: NextApiRequest, res: NextApiResponse) => {

    try {

        const sendValues = prepareValues(req)

        let transporter = nodemailer.createTransport({
            host: sendValues.transport.host,
            port: 465,
            secure: true,
            auth: {
                user: sendValues.transport.user,
                pass: sendValues.transport.pass,
            },
        });

        await transporter.sendMail({
            from: `${sendValues.fullName} <${sendValues.fromEmail}>`,
            replyTo: `${sendValues.fullName} <${sendValues.email}>`,
            to: sendValues.toEmail,
            subject: sendValues.subject,
            text: sendValues.message,
        });

    } catch (error: any) {
        return res.status(error.statusCode || 500).json({ error: error.message })
    }

    return res.status(200).json({ error: "" })
}

export default sendEmail