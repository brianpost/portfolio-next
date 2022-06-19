import sendgrid from "@sendgrid/mail"
import {NextApiRequest, NextApiResponse} from "next"

const apiKey = process.env.SENDGRID_API_KEY
const toEmail = process.env.SENDGRID_TO_EMAIL
const fromEmail = process.env.SENDGRID_FROM_EMAIL

if (apiKey) {
    sendgrid.setApiKey(apiKey)
}

interface SendValues {
    fullName: string
    email: string
    subject: string
    message: string
    toEmail: string
    fromEmail: string
}

const prepareValues = (req: NextApiRequest) : SendValues => {
    if (!apiKey || !toEmail || !fromEmail) {
        throw Error('A required environment variable is missing')
    }
    const fullName = req.body.fullName?.trim() ?? ''
    const email = req.body.email?.trim() ?? ''
    const subject = req.body.subject?.trim() ?? ''
    const message = req.body.message?.trim() ?? ''
    const hasEmptyValue =
        fullName.length === 0 || email.length === 0 || subject.length === 0 || message.length === 0
    if (hasEmptyValue) {
        throw Error('An empty form value was sent')
    }
    return {
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

        await sendgrid.send({
            to: sendValues.toEmail,
            from: sendValues.fromEmail,
            replyTo: {
                name: sendValues.fullName,
                email: sendValues.email,
            },
            subject: sendValues.subject,
            text: `A message has been sent from www.brianpost.net by ${sendValues.fullName} <${sendValues.email}>:\n\n${sendValues.message}`,
        })

    } catch (error: any) {
        return res.status(error.statusCode || 500).json({ error: error.message })
    }

    return res.status(200).json({ error: "" })
}

export default sendEmail