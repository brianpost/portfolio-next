
import React, {useState} from "react";

enum ToastType {
    Success,
    Failure
}

const Contact = () => {
    const [fullName, setFullName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [subject, setSubject] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const [isSending, setIsSending] = useState<boolean>(false)
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false)
    const [showFailureMessage, setShowFailureMessage] = useState<boolean>(false)

    const handleSend = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsSending(true)
        setShowSuccessMessage(false)
        setShowFailureMessage(false)
        const res = await fetch("/api/nodemailer", {
            body: JSON.stringify({
                fullName,
                email,
                subject,
                message
            }),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        })
        const { error } = await res.json();
        setIsSending(false)
        if (error) {
            console.error(error)
            setShowSuccessMessage(false)
            setShowFailureMessage(true)
            return;
        }
        setFullName('')
        setEmail('')
        setSubject('')
        setMessage('')
        setShowSuccessMessage(true)
        setShowFailureMessage(false)
    }

    const AfterSendToast = ({type, children} : {type: ToastType, children: React.ReactNode}) => {
        let textBackgroundClassName
        switch (type) {
            case ToastType.Success:
                textBackgroundClassName = 'text-bg-success'
                break
            case ToastType.Failure:
                textBackgroundClassName = 'text-bg-danger'
                break
        }
        return (
            <div
                className={`toast align-items-center border border-1 border-light position-fixed top-0 end-0 m-5 show ${textBackgroundClassName}`}
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
            >
                <div className="d-flex">
                    <div className="toast-body">
                        {children}
                    </div>
                    <button
                        type="button"
                        className="btn-close btn-close-white me-2 m-auto"
                        data-bs-dismiss="toast"
                        aria-label="Close"
                        onClick={()=>{
                            setShowSuccessMessage(false)
                            setShowFailureMessage(false)
                        }}
                    />
                </div>
            </div>
        )
    }

    return (
        <form onSubmit={handleSend}>
            <h2 className="h4 text-uppercase fw-bold">Contact me</h2>
            <div className="my-3">
                <label htmlFor="inputContactFullName" className="form-label">Your Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="inputContactFullName"
                    required={true}
                    value={fullName}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFullName(event.target.value)}
                />
            </div>
            <div className="my-3">
                <label htmlFor="inputContactEmail" className="form-label">Your Email</label>
                <input
                    type="email"
                    className="form-control"
                    id="inputContactEmail"
                    required={true}
                    value={email}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                />
            </div>
            <div className="my-3">
                <label htmlFor="inputContactSubject" className="form-label">Subject</label>
                <input
                    type="text"
                    className="form-control"
                    id="inputContactSubject"
                    required={true}
                    value={subject}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSubject(event.target.value)}
                />
            </div>
            <div className="my-3">
                <label htmlFor="inputContactMessage" className="form-label">Message</label>
                <textarea
                    className="form-control"
                    id="inputContactMessage"
                    rows={4}
                    required={true}
                    value={message}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(event.target.value)}
                />
            </div>
            <div className="my-3 text-end">
                <input type="submit" className="btn" value={isSending ? 'Sending...' : 'Send message'} disabled={isSending}/>
            </div>
            {showSuccessMessage &&
                <AfterSendToast type={ToastType.Success}>
                    Thank you! Your message has been delivered.
                </AfterSendToast>
            }
            {showFailureMessage &&
                <AfterSendToast type={ToastType.Failure}>
                    Oops! Something went wrong sending your message. Please try again.
                </AfterSendToast>
            }
        </form>
    )
}

export default Contact