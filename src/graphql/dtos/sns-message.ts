import { Expose } from 'class-transformer'

export class SNSMessageDto {
  @Expose({ name: 'Message' })
  message: string

  @Expose({ name: 'MessageID' })
  messageId: string

  @Expose({ name: 'Signature' })
  signature: string

  @Expose({ name: 'SignatureVersion' })
  signatureVersion: string

  @Expose({ name: 'SigningCertURL' })
  signingCertUrl: string

  @Expose({ name: 'Subject' })
  subject: string

  @Expose({ name: 'Timestamp' })
  timestamp: string

  @Expose({ name: 'TopicArn' })
  topicArn: string

  @Expose({ name: 'Type' })
  type: string

  @Expose({ name: 'UnsubscribeURL' })
  unsubscribeUrl: string
}
