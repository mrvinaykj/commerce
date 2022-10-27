type Header = string | number | string[] | undefined

export default function getUserNameFromEmail(email: string) {
  return email.substring(0, email.indexOf('@')).replace(/[^\w\s]/gi, '')
}
